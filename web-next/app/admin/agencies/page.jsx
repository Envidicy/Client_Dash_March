'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../../components/admin/AdminShell'
import { adminFetch } from '../../../lib/admin'

const PLATFORMS = ['meta', 'google', 'tiktok', 'yandex', 'telegram', 'monochrome']
const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'clients', label: 'Clients' },
  { key: 'rates', label: 'Rates' },
  { key: 'own-accounts', label: 'Own accounts' },
  { key: 'team', label: 'Team & access' },
  { key: 'ledger', label: 'Ledger' },
]

function dash(value) {
  return value == null || value === '' ? '-' : value
}

function formatDate(value) {
  if (!value) return '-'
  return String(value).replace('T', ' ').slice(0, 16)
}

function formatMoney(value, currency = 'KZT') {
  return `${Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

function statusText(message) {
  return message ? <p className="muted small" style={{ marginTop: 12 }}>{message}</p> : null
}

export default function AdminAgenciesPage() {
  const router = useRouter()
  const [agencies, setAgencies] = useState([])
  const [users, setUsers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [selectedAgencyId, setSelectedAgencyId] = useState('')
  const [detail, setDetail] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [status, setStatus] = useState('Loading agencies...')

  const [createForm, setCreateForm] = useState({ name: '', slug: '', owner_user_id: '' })
  const [memberForm, setMemberForm] = useState({ user_id: '', role: 'client_viewer' })
  const [accountForm, setAccountForm] = useState({ account_id: '', label: '' })
  const [accessForm, setAccessForm] = useState({ user_id: '', account_id: '', access_level: 'viewer' })
  const [clientForm, setClientForm] = useState({ client_user_id: '', default_rebate_percent: '3' })
  const [rateForm, setRateForm] = useState({ client_user_id: '', platform: 'meta', platform_fee_percent: '', rebate_percent: '3' })
  const [walletForm, setWalletForm] = useState({ amount: '', note: '' })
  const [transferForm, setTransferForm] = useState({ client_user_id: '', amount: '', note: '' })
  const [ownAccountForm, setOwnAccountForm] = useState({ platform: 'meta', name: '', external_id: '', account_code: '', currency: 'USD' })
  const [ownFundingForm, setOwnFundingForm] = useState({ account_id: '', amount: '', platform_fee_percent: '3', note: '' })

  async function safeFetch(path, options = {}) {
    return adminFetch(router, path, options)
  }

  async function loadBase() {
    try {
      const [agenciesRes, usersRes, clientsRes, accountsRes] = await Promise.all([
        safeFetch('/admin/agencies'),
        safeFetch('/admin/users'),
        safeFetch('/admin/clients'),
        safeFetch('/admin/accounts'),
      ])
      if (!agenciesRes.ok || !usersRes.ok || !clientsRes.ok || !accountsRes.ok) throw new Error('Failed to load agency data.')

      const [agenciesData, usersData, clientsData, accountsData] = await Promise.all([
        agenciesRes.json(),
        usersRes.json(),
        clientsRes.json(),
        accountsRes.json(),
      ])

      const mergedUsers = [...(Array.isArray(usersData) ? usersData : []), ...(Array.isArray(clientsData) ? clientsData : [])]
      const uniqueUsers = new Map()
      mergedUsers.forEach((row) => {
        if (row?.id != null && row?.email) uniqueUsers.set(String(row.id), { id: row.id, email: row.email })
      })

      const nextAgencies = Array.isArray(agenciesData) ? agenciesData : []
      setAgencies(nextAgencies)
      setUsers(Array.from(uniqueUsers.values()).sort((a, b) => String(a.email).localeCompare(String(b.email), 'ru')))
      setAccounts(Array.isArray(accountsData) ? accountsData : [])
      setSelectedAgencyId((current) => current || (nextAgencies[0]?.id ? String(nextAgencies[0].id) : ''))
      setStatus('')
    } catch (e) {
      setStatus(e?.message || 'Failed to load agency data.')
    }
  }

  async function loadDetail(agencyId) {
    if (!agencyId) {
      setDetail(null)
      return
    }
    try {
      const res = await safeFetch(`/admin/agencies/${agencyId}`)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to load agency.')
      setDetail(data)
      setStatus('')
    } catch (e) {
      setDetail(null)
      setStatus(e?.message || 'Failed to load agency.')
    }
  }

  async function postJson(path, body, successMessage, reset) {
    try {
      const res = await safeFetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || successMessage.replace(' saved.', ' failed.'))
      if (reset) reset(data)
      const nextAgencyId = selectedAgencyId
      if (nextAgencyId) {
        if (!selectedAgencyId) setSelectedAgencyId(nextAgencyId)
        await loadDetail(nextAgencyId)
      }
      setStatus(successMessage)
      return data
    } catch (e) {
      setStatus(e?.message || 'Operation failed.')
      return null
    }
  }

  async function createAgency() {
    if (!createForm.name.trim()) {
      setStatus('Provide an agency name.')
      return
    }
    const data = await postJson(
      '/admin/agencies',
      {
        name: createForm.name.trim(),
        slug: createForm.slug.trim() || null,
        owner_user_id: createForm.owner_user_id ? Number(createForm.owner_user_id) : null,
      },
      'Agency created.',
      () => setCreateForm({ name: '', slug: '', owner_user_id: '' })
    )
    if (data?.id) {
      setSelectedAgencyId(String(data.id))
      await loadBase()
      await loadDetail(String(data.id))
    }
  }

  async function addClient() {
    if (!selectedAgencyId || !clientForm.client_user_id) {
      setStatus('Select an agency and a client.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/clients`,
      {
        client_user_id: Number(clientForm.client_user_id),
        default_rebate_percent: Number(clientForm.default_rebate_percent || 0),
        status: 'active',
      },
      'Client attached to agency.',
      () => setClientForm({ client_user_id: '', default_rebate_percent: '3' })
    )
  }

  async function transferToClient() {
    if (!selectedAgencyId || !transferForm.client_user_id || !transferForm.amount) {
      setStatus('Select a client and enter transfer amount.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/clients/${transferForm.client_user_id}/transfer`,
      {
        amount: Number(transferForm.amount),
        currency: 'KZT',
        note: transferForm.note || null,
      },
      'Balance transferred to client.',
      () => setTransferForm({ client_user_id: '', amount: '', note: '' })
    )
  }

  async function saveRate() {
    if (!selectedAgencyId || !rateForm.client_user_id) {
      setStatus('Select an agency client.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/clients/${rateForm.client_user_id}/rates`,
      {
        platform: rateForm.platform,
        platform_fee_percent: rateForm.platform_fee_percent === '' ? null : Number(rateForm.platform_fee_percent),
        rebate_percent: Number(rateForm.rebate_percent || 0),
      },
      'Agency client rate saved.',
      null
    )
  }

  async function adjustAgencyWallet() {
    if (!selectedAgencyId || !walletForm.amount) {
      setStatus('Enter an agency wallet amount.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/wallet/adjust`,
      {
        amount: Number(walletForm.amount),
        currency: 'KZT',
        note: walletForm.note || null,
        type: Number(walletForm.amount) >= 0 ? 'deposit' : 'manual_adjustment',
      },
      'Agency wallet updated.',
      () => setWalletForm({ amount: '', note: '' })
    )
  }

  async function createOwnAccount() {
    if (!selectedAgencyId || !ownAccountForm.name.trim()) {
      setStatus('Enter agency account name.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/own-accounts`,
      {
        platform: ownAccountForm.platform,
        name: ownAccountForm.name.trim(),
        external_id: ownAccountForm.external_id.trim() || null,
        account_code: ownAccountForm.account_code.trim() || null,
        currency: ownAccountForm.platform === 'yandex' ? 'KZT' : ownAccountForm.currency,
        status: 'active',
      },
      'Agency account saved.',
      () => setOwnAccountForm({ platform: 'meta', name: '', external_id: '', account_code: '', currency: 'USD' })
    )
  }

  async function fundOwnAccount() {
    if (!selectedAgencyId || !ownFundingForm.account_id || !ownFundingForm.amount) {
      setStatus('Select agency account and enter amount.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/own-accounts/${ownFundingForm.account_id}/fund`,
      {
        amount: Number(ownFundingForm.amount),
        currency: 'KZT',
        platform_fee_percent: Number(ownFundingForm.platform_fee_percent || 0),
        note: ownFundingForm.note || null,
      },
      'Agency account funded.',
      () => setOwnFundingForm({ account_id: '', amount: '', platform_fee_percent: '3', note: '' })
    )
  }

  async function addMember() {
    if (!selectedAgencyId || !memberForm.user_id) {
      setStatus('Select an agency and a user.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/members`,
      { user_id: Number(memberForm.user_id), role: memberForm.role, status: 'active' },
      'Member added.',
      () => setMemberForm({ user_id: '', role: 'client_viewer' })
    )
  }

  async function attachAccount() {
    if (!selectedAgencyId || !accountForm.account_id) {
      setStatus('Select an agency and an account.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/accounts/${accountForm.account_id}`,
      { label: accountForm.label.trim() || null, status: 'active' },
      'Account attached to agency.',
      () => setAccountForm({ account_id: '', label: '' })
    )
  }

  async function grantAccess() {
    if (!selectedAgencyId || !accessForm.user_id || !accessForm.account_id) {
      setStatus('Select an agency, user and account.')
      return
    }
    await postJson(
      `/admin/agencies/${selectedAgencyId}/accounts/${accessForm.account_id}/access`,
      { user_id: Number(accessForm.user_id), access_level: accessForm.access_level },
      'Account access granted.',
      () => setAccessForm({ user_id: '', account_id: '', access_level: 'viewer' })
    )
  }

  useEffect(() => {
    loadBase()
  }, [])

  useEffect(() => {
    loadDetail(selectedAgencyId)
  }, [selectedAgencyId])

  const selectedAgency = detail?.agency || agencies.find((row) => String(row.id) === String(selectedAgencyId)) || null
  const members = detail?.members || []
  const mappedAccounts = detail?.accounts || []
  const accesses = detail?.accesses || []
  const clients = detail?.clients || []
  const rates = detail?.rates || []
  const ledger = detail?.ledger || []
  const wallet = detail?.wallet || {}
  const ownAccounts = detail?.own_accounts || []

  const summary = useMemo(() => {
    const byType = ledger.reduce((acc, row) => {
      const key = String(row?.type || '')
      acc[key] = (acc[key] || 0) + Number(row?.amount || 0)
      return acc
    }, {})
    return {
      rebateEarned: (byType.rebate_accrual || 0) + (byType.rebate_reversal || 0),
      sentToClients: -(byType.transfer_to_client || 0),
      ownFunding: -(byType.own_account_funding || 0),
      platformFees: -(byType.platform_fee || 0),
    }
  }, [ledger])

  return (
    <AdminShell title="Agencies" subtitle="Agency setup, balances, client rebates and account access.">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>{selectedAgency?.name || 'Select agency'}</h2>
            <p className="muted small">{selectedAgency ? `${dash(selectedAgency.slug)} - ${dash(selectedAgency.owner_email)}` : 'Create or select an agency to manage it.'}</p>
          </div>
          <div className="panel-actions">
            <button className="btn ghost" type="button" onClick={loadBase}>Refresh</button>
          </div>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Agency</span>
            <select value={selectedAgencyId} onChange={(e) => setSelectedAgencyId(e.target.value)}>
              <option value="">Select agency</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={String(agency.id)}>{agency.name} - {agency.slug || `id-${agency.id}`}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>New agency name</span>
            <input value={createForm.name} onChange={(e) => setCreateForm((s) => ({ ...s, name: e.target.value }))} placeholder="Smart Lab" />
          </label>
          <label className="field">
            <span>Slug</span>
            <input value={createForm.slug} onChange={(e) => setCreateForm((s) => ({ ...s, slug: e.target.value }))} placeholder="smart-lab" />
          </label>
          <label className="field">
            <span>Owner</span>
            <select value={createForm.owner_user_id} onChange={(e) => setCreateForm((s) => ({ ...s, owner_user_id: e.target.value }))}>
              <option value="">No owner</option>
              {users.map((user) => <option key={user.id} value={String(user.id)}>{user.email}</option>)}
            </select>
          </label>
        </div>
        <div className="panel-actions">
          <button className="btn primary" type="button" onClick={createAgency}>Create agency</button>
        </div>
        {statusText(status)}
      </section>

      <section className="grid-3">
        <article className="stat">
          <p className="muted">Agency balance</p>
          <h3>{formatMoney(wallet?.balance, wallet?.currency || 'KZT')}</h3>
          <p className="muted small">Separate operating wallet</p>
        </article>
        <article className="stat">
          <p className="muted">Clients</p>
          <h3>{clients.length}</h3>
          <p className="muted small">{members.length} members, {mappedAccounts.length} mapped accounts</p>
        </article>
        <article className="stat">
          <p className="muted">Rebate earned</p>
          <h3>{formatMoney(summary.rebateEarned, wallet?.currency || 'KZT')}</h3>
          <p className="muted small">Completed agency-client topups</p>
        </article>
      </section>

      <section className="panel">
        <div className="tabs">
          <div className="tab-buttons">
            {TABS.map((tab) => (
              <button
                className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' ? (
            <div className="tab-panel active">
              <div className="grid-3">
                <article className="stat">
                  <p className="muted">Sent to clients</p>
                  <h3>{formatMoney(summary.sentToClients, wallet?.currency || 'KZT')}</h3>
                  <p className="muted small">Agency balance to client balance</p>
                </article>
                <article className="stat">
                  <p className="muted">Own account funding</p>
                  <h3>{formatMoney(summary.ownFunding, wallet?.currency || 'KZT')}</h3>
                  <p className="muted small">Agency accounts spend base</p>
                </article>
                <article className="stat">
                  <p className="muted">Platform fees paid</p>
                  <h3>{formatMoney(summary.platformFees, wallet?.currency || 'KZT')}</h3>
                  <p className="muted small">Fees on agency own funding</p>
                </article>
              </div>
              <div className="form-grid" style={{ marginTop: 16 }}>
                <label className="field">
                  <span>Wallet adjustment</span>
                  <input value={walletForm.amount} onChange={(e) => setWalletForm((s) => ({ ...s, amount: e.target.value }))} type="number" placeholder="100000" />
                </label>
                <label className="field">
                  <span>Note</span>
                  <input value={walletForm.note} onChange={(e) => setWalletForm((s) => ({ ...s, note: e.target.value }))} placeholder="Agency deposit" />
                </label>
              </div>
              <div className="panel-actions">
                <button className="btn primary" type="button" onClick={adjustAgencyWallet}>Update agency balance</button>
              </div>
            </div>
          ) : null}

          {activeTab === 'clients' ? (
            <div className="tab-panel active">
              <div className="form-grid">
                <label className="field">
                  <span>Attach client</span>
                  <select value={clientForm.client_user_id} onChange={(e) => setClientForm((s) => ({ ...s, client_user_id: e.target.value }))}>
                    <option value="">Select client</option>
                    {users.map((user) => <option key={user.id} value={String(user.id)}>{user.email}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Default rebate %</span>
                  <input value={clientForm.default_rebate_percent} onChange={(e) => setClientForm((s) => ({ ...s, default_rebate_percent: e.target.value }))} type="number" step="0.1" placeholder="3" />
                </label>
                <label className="field">
                  <span>Transfer client</span>
                  <select value={transferForm.client_user_id} onChange={(e) => setTransferForm((s) => ({ ...s, client_user_id: e.target.value }))}>
                    <option value="">Select agency client</option>
                    {clients.map((row) => <option key={row.id} value={String(row.client_user_id)}>{row.email}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Transfer amount</span>
                  <input value={transferForm.amount} onChange={(e) => setTransferForm((s) => ({ ...s, amount: e.target.value }))} type="number" placeholder="50000" />
                </label>
                <label className="field">
                  <span>Transfer note</span>
                  <input value={transferForm.note} onChange={(e) => setTransferForm((s) => ({ ...s, note: e.target.value }))} placeholder="Client funding" />
                </label>
              </div>
              <div className="panel-actions">
                <button className="btn primary" type="button" onClick={addClient}>Attach client</button>
                <button className="btn ghost" type="button" onClick={transferToClient}>Transfer to client</button>
              </div>
              <Table columns={['Email', 'Balance', 'Default rebate', 'Status']}>
                {!clients.length ? (
                  <tr><td colSpan={4}>No agency clients.</td></tr>
                ) : clients.map((row) => (
                  <tr key={row.id}>
                    <td>{row.email}</td>
                    <td>{formatMoney(row.wallet_balance, row.wallet_currency || 'KZT')}</td>
                    <td>{row.default_rebate_percent ?? 3}%</td>
                    <td>{row.status || 'active'}</td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : null}

          {activeTab === 'rates' ? (
            <div className="tab-panel active">
              <div className="form-grid">
                <label className="field">
                  <span>Client</span>
                  <select value={rateForm.client_user_id} onChange={(e) => setRateForm((s) => ({ ...s, client_user_id: e.target.value }))}>
                    <option value="">Select agency client</option>
                    {clients.map((row) => <option key={row.id} value={String(row.client_user_id)}>{row.email}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Platform</span>
                  <select value={rateForm.platform} onChange={(e) => setRateForm((s) => ({ ...s, platform: e.target.value }))}>
                    {PLATFORMS.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Our fee override %</span>
                  <input value={rateForm.platform_fee_percent} onChange={(e) => setRateForm((s) => ({ ...s, platform_fee_percent: e.target.value }))} type="number" step="0.1" placeholder="Use client fee" />
                </label>
                <label className="field">
                  <span>Agency rebate %</span>
                  <input value={rateForm.rebate_percent} onChange={(e) => setRateForm((s) => ({ ...s, rebate_percent: e.target.value }))} type="number" step="0.1" placeholder="3" />
                </label>
              </div>
              <div className="panel-actions">
                <button className="btn primary" type="button" onClick={saveRate}>Save rate</button>
              </div>
              <Table columns={['Email', 'Platform', 'Our fee', 'Agency rebate']}>
                {!rates.length ? (
                  <tr><td colSpan={4}>No custom rates.</td></tr>
                ) : rates.map((row) => (
                  <tr key={row.id}>
                    <td>{row.email}</td>
                    <td>{row.platform}</td>
                    <td>{row.platform_fee_percent == null ? 'client fee' : `${row.platform_fee_percent}%`}</td>
                    <td>{row.rebate_percent ?? 0}%</td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : null}

          {activeTab === 'own-accounts' ? (
            <div className="tab-panel active">
              <div className="form-grid">
                <label className="field">
                  <span>Platform</span>
                  <select value={ownAccountForm.platform} onChange={(e) => setOwnAccountForm((s) => ({ ...s, platform: e.target.value, currency: e.target.value === 'yandex' ? 'KZT' : s.currency }))}>
                    {PLATFORMS.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Name</span>
                  <input value={ownAccountForm.name} onChange={(e) => setOwnAccountForm((s) => ({ ...s, name: e.target.value }))} placeholder="Agency Meta" />
                </label>
                <label className="field">
                  <span>External ID</span>
                  <input value={ownAccountForm.external_id} onChange={(e) => setOwnAccountForm((s) => ({ ...s, external_id: e.target.value }))} placeholder="1234567890" />
                </label>
                <label className="field">
                  <span>Account code</span>
                  <input value={ownAccountForm.account_code} onChange={(e) => setOwnAccountForm((s) => ({ ...s, account_code: e.target.value }))} placeholder="ACC-001" />
                </label>
                <label className="field">
                  <span>Currency</span>
                  <select value={ownAccountForm.currency} onChange={(e) => setOwnAccountForm((s) => ({ ...s, currency: e.target.value }))}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="KZT">KZT</option>
                  </select>
                </label>
                <label className="field">
                  <span>Fund account</span>
                  <select value={ownFundingForm.account_id} onChange={(e) => setOwnFundingForm((s) => ({ ...s, account_id: e.target.value }))}>
                    <option value="">Select agency account</option>
                    {ownAccounts.map((row) => <option key={row.id} value={String(row.id)}>{row.platform} - {row.name}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Funding amount</span>
                  <input value={ownFundingForm.amount} onChange={(e) => setOwnFundingForm((s) => ({ ...s, amount: e.target.value }))} type="number" placeholder="100000" />
                </label>
                <label className="field">
                  <span>Our fee %</span>
                  <input value={ownFundingForm.platform_fee_percent} onChange={(e) => setOwnFundingForm((s) => ({ ...s, platform_fee_percent: e.target.value }))} type="number" step="0.1" placeholder="3" />
                </label>
                <label className="field">
                  <span>Funding note</span>
                  <input value={ownFundingForm.note} onChange={(e) => setOwnFundingForm((s) => ({ ...s, note: e.target.value }))} placeholder="Own account topup" />
                </label>
              </div>
              <div className="panel-actions">
                <button className="btn primary" type="button" onClick={createOwnAccount}>Save account</button>
                <button className="btn ghost" type="button" onClick={fundOwnAccount}>Fund from agency balance</button>
              </div>
              <Table columns={['Account', 'Platform', 'Currency', 'Budget', 'Status']}>
                {!ownAccounts.length ? (
                  <tr><td colSpan={5}>No agency-owned accounts.</td></tr>
                ) : ownAccounts.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.platform}</td>
                    <td>{row.currency || 'USD'}</td>
                    <td>{formatMoney(row.budget_total, row.currency || 'USD')}</td>
                    <td>{row.status || 'active'}</td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : null}

          {activeTab === 'team' ? (
            <div className="tab-panel active">
              <div className="form-grid">
                <label className="field">
                  <span>Member user</span>
                  <select value={memberForm.user_id} onChange={(e) => setMemberForm((s) => ({ ...s, user_id: e.target.value }))}>
                    <option value="">Select user</option>
                    {users.map((user) => <option key={user.id} value={String(user.id)}>{user.email}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Role</span>
                  <select value={memberForm.role} onChange={(e) => setMemberForm((s) => ({ ...s, role: e.target.value }))}>
                    <option value="owner">owner</option>
                    <option value="agency_admin">agency_admin</option>
                    <option value="manager">manager</option>
                    <option value="client_viewer">client_viewer</option>
                  </select>
                </label>
                <label className="field">
                  <span>Map client account</span>
                  <select value={accountForm.account_id} onChange={(e) => setAccountForm((s) => ({ ...s, account_id: e.target.value }))}>
                    <option value="">Select account</option>
                    {accounts.map((row) => <option key={row.id} value={String(row.id)}>{row.user_email || '-'} - {row.platform} - {row.name}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Account label</span>
                  <input value={accountForm.label} onChange={(e) => setAccountForm((s) => ({ ...s, label: e.target.value }))} placeholder="Client reporting label" />
                </label>
                <label className="field">
                  <span>Access user</span>
                  <select value={accessForm.user_id} onChange={(e) => setAccessForm((s) => ({ ...s, user_id: e.target.value }))}>
                    <option value="">Select member</option>
                    {members.map((row) => <option key={row.id} value={String(row.user_id)}>{row.email}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Access account</span>
                  <select value={accessForm.account_id} onChange={(e) => setAccessForm((s) => ({ ...s, account_id: e.target.value }))}>
                    <option value="">Select mapped account</option>
                    {mappedAccounts.map((row) => <option key={row.id} value={String(row.ad_account_id)}>{row.platform} - {row.name}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Access level</span>
                  <select value={accessForm.access_level} onChange={(e) => setAccessForm((s) => ({ ...s, access_level: e.target.value }))}>
                    <option value="viewer">viewer</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                  </select>
                </label>
              </div>
              <div className="panel-actions">
                <button className="btn primary" type="button" onClick={addMember}>Add member</button>
                <button className="btn ghost" type="button" onClick={attachAccount}>Attach account</button>
                <button className="btn ghost" type="button" onClick={grantAccess}>Grant access</button>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                <Table columns={['Email', 'Role', 'Status', 'Date']}>
                  {!members.length ? (
                    <tr><td colSpan={4}>No members.</td></tr>
                  ) : members.map((row) => (
                    <tr key={row.id}>
                      <td>{row.email}</td>
                      <td>{row.role}</td>
                      <td>{row.status || 'active'}</td>
                      <td>{formatDate(row.created_at)}</td>
                    </tr>
                  ))}
                </Table>
                <Table columns={['Account', 'Platform', 'Client', 'Label', 'Status']}>
                  {!mappedAccounts.length ? (
                    <tr><td colSpan={5}>No attached accounts.</td></tr>
                  ) : mappedAccounts.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.platform}</td>
                      <td>{dash(row.user_email)}</td>
                      <td>{dash(row.label)}</td>
                      <td>{row.status || row.ad_account_status || 'active'}</td>
                    </tr>
                  ))}
                </Table>
                <Table columns={['Email', 'Account', 'Platform', 'Level', 'Date']}>
                  {!accesses.length ? (
                    <tr><td colSpan={5}>No granted accesses yet.</td></tr>
                  ) : accesses.map((row) => (
                    <tr key={row.id}>
                      <td>{row.email}</td>
                      <td>{row.account_name}</td>
                      <td>{row.platform}</td>
                      <td>{row.access_level}</td>
                      <td>{formatDate(row.created_at)}</td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          ) : null}

          {activeTab === 'ledger' ? (
            <div className="tab-panel active">
              <Table columns={['Date', 'Type', 'Amount', 'Client', 'Account', 'Note', 'Created by']}>
                {!ledger.length ? (
                  <tr><td colSpan={7}>No agency ledger entries yet.</td></tr>
                ) : ledger.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDate(row.created_at)}</td>
                    <td>{row.type}</td>
                    <td>{formatMoney(row.amount, row.currency || 'KZT')}</td>
                    <td>{dash(row.client_email)}</td>
                    <td>{row.account_name ? `${row.account_platform} - ${row.account_name}` : '-'}</td>
                    <td>{dash(row.note)}</td>
                    <td>{row.created_by || 'system'}</td>
                  </tr>
                ))}
              </Table>
            </div>
          ) : null}
        </div>
      </section>
    </AdminShell>
  )
}

function Table({ columns, children }) {
  return (
    <div className="table-wrapper" style={{ marginTop: 16 }}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
