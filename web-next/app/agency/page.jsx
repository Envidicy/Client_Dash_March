'use client'

import { useEffect, useState } from 'react'
import ClientShell from '../../components/client/ClientShell'
import styles from '../../components/client/client.module.css'
import { clearAuth, getAuthToken } from '../../lib/auth'

function formatMoney(value, currency = 'KZT') {
  return `${Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

function formatDate(value) {
  if (!value) return '—'
  return String(value).replace('T', ' ').slice(0, 16)
}

export default function AgencyPage() {
  const [payload, setPayload] = useState(null)
  const [status, setStatus] = useState('Loading agency workspace...')
  const [transferForm, setTransferForm] = useState({ client_user_id: '', amount: '', note: '' })

  async function agencyFetch(path, options = {}) {
    const token = getAuthToken()
    if (!token) throw new Error('Unauthorized')
    const res = await fetch(`/api/client${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401) {
      clearAuth()
      window.location.href = '/login'
      throw new Error('Unauthorized')
    }
    return res
  }

  async function loadAgency() {
    try {
      const res = await agencyFetch('/agency/me')
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to load agency workspace.')
      setPayload(data)
      setStatus('')
    } catch (e) {
      setPayload(null)
      setStatus(e?.message || 'Failed to load agency workspace.')
    }
  }

  async function transferToClient() {
    if (!transferForm.client_user_id || !transferForm.amount) {
      setStatus('Select a client and enter amount.')
      return
    }
    try {
      const res = await agencyFetch(`/agency/clients/${transferForm.client_user_id}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(transferForm.amount),
          currency: 'KZT',
          note: transferForm.note || null,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to transfer balance.')
      setTransferForm({ client_user_id: '', amount: '', note: '' })
      await loadAgency()
      setStatus('Balance transferred to client.')
    } catch (e) {
      setStatus(e?.message || 'Failed to transfer balance.')
    }
  }

  async function impersonateClient(clientUserId, email) {
    try {
      const res = await agencyFetch(`/agency/clients/${clientUserId}/impersonate`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to open client workspace.')
      const params = new URLSearchParams({
        impersonate_token: data.token,
        impersonate_email: data.email || email || '',
        impersonate_user_id: String(data.id || clientUserId),
        impersonation_return: '/agency',
      })
      window.open(`/dashboard?${params.toString()}`, '_blank', 'noopener')
    } catch (e) {
      setStatus(e?.message || 'Failed to open client workspace.')
    }
  }

  useEffect(() => {
    loadAgency()
  }, [])

  const agency = payload?.agency || null
  const membership = payload?.membership || {}
  const wallet = payload?.wallet || {}
  const summary = payload?.summary || {}
  const clients = payload?.clients || []
  const ownAccounts = payload?.own_accounts || []
  const ledger = payload?.ledger || []
  const canManage = Boolean(membership?.can_manage)
  const canImpersonate = Boolean(membership?.can_impersonate)
  const currency = summary?.currency || wallet?.currency || 'KZT'

  return (
    <ClientShell
      activeNav="agency"
      headerActionLabel=""
      pageTitle={agency?.name || 'Agency workspace'}
      pageSubtitle="Clients, balances, own accounts and agency ledger."
      statusAlerts={status || 'Agency mode'}
    >
      <div className={styles.cardGrid4}>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Operating balance</p>
          <h3 className={styles.metricValue}>{formatMoney(summary?.balance ?? wallet?.balance, currency)}</h3>
          <p className={styles.metricHint}>Separate from client balances</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Clients</p>
          <h3 className={styles.metricValue}>{clients.length}</h3>
          <p className={styles.metricHint}>Active agency clients</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Rebate earned</p>
          <h3 className={styles.metricValue}>{formatMoney(summary?.rebate_earned, currency)}</h3>
          <p className={styles.metricHint}>Completed client topups</p>
        </article>
        <article className={styles.metricCard}>
          <p className={styles.metricLabel}>Role</p>
          <h3 className={styles.metricValue}>{membership?.role || '—'}</h3>
          <p className={styles.metricHint}>{canManage ? 'Can manage balances' : canImpersonate ? 'Can open clients' : 'Read-only'}</p>
        </article>
      </div>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Client balances</h3>
            <div className={styles.metricHint}>Transfer agency balance to client wallets and open client workspaces.</div>
          </div>
        </div>
        {canManage ? (
          <div className={styles.requestFormGrid} style={{ padding: '18px 22px' }}>
            <label className={styles.requestField}>
              <span>Client</span>
              <select value={transferForm.client_user_id} onChange={(e) => setTransferForm((s) => ({ ...s, client_user_id: e.target.value }))}>
                <option value="">Select client</option>
                {clients.map((row) => (
                  <option key={row.id} value={String(row.client_user_id)}>{row.email}</option>
                ))}
              </select>
            </label>
            <label className={styles.requestField}>
              <span>Amount</span>
              <input value={transferForm.amount} onChange={(e) => setTransferForm((s) => ({ ...s, amount: e.target.value }))} type="number" placeholder="50000" />
            </label>
            <label className={styles.requestField}>
              <span>Note</span>
              <input value={transferForm.note} onChange={(e) => setTransferForm((s) => ({ ...s, note: e.target.value }))} placeholder="Client funding" />
            </label>
            <button className={styles.headerPrimaryAction} type="button" onClick={transferToClient}>Transfer to client</button>
          </div>
        ) : null}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Email</th><th>Balance</th><th>Rebate</th><th>Status</th><th>Login</th></tr>
            </thead>
            <tbody>
              {!clients.length ? (
                <tr><td colSpan={5}>No agency clients.</td></tr>
              ) : (
                clients.map((row) => (
                  <tr key={row.id}>
                    <td><span className={styles.tableStrong}>{row.email}</span></td>
                    <td>{formatMoney(row.wallet_balance, row.wallet_currency || 'KZT')}</td>
                    <td>{row.default_rebate_percent ?? 3}%</td>
                    <td><span className={styles.statusChip}>{row.status || 'active'}</span></td>
                    <td>
                      {canImpersonate ? (
                        <button className={styles.tableActionButton} type="button" onClick={() => impersonateClient(row.client_user_id, row.email)}>
                          Open client
                        </button>
                      ) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ height: 18 }} />

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Agency ad accounts</h3>
            <div className={styles.metricHint}>Personal agency-owned ad accounts.</div>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Account</th><th>Platform</th><th>Currency</th><th>Budget</th><th>Status</th></tr>
            </thead>
            <tbody>
              {!ownAccounts.length ? (
                <tr><td colSpan={5}>No agency-owned accounts.</td></tr>
              ) : (
                ownAccounts.map((row) => (
                  <tr key={row.id}>
                    <td><span className={styles.tableStrong}>{row.name}</span></td>
                    <td>{row.platform}</td>
                    <td>{row.currency || 'USD'}</td>
                    <td>{formatMoney(row.budget_total, row.currency || 'USD')}</td>
                    <td><span className={styles.statusChip}>{row.status || 'active'}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ height: 18 }} />

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Agency ledger</h3>
            <div className={styles.metricHint}>Rebates, transfers and own-account funding.</div>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Date</th><th>Type</th><th>Amount</th><th>Client</th><th>Account</th><th>Note</th></tr>
            </thead>
            <tbody>
              {!ledger.length ? (
                <tr><td colSpan={6}>No agency ledger entries yet.</td></tr>
              ) : (
                ledger.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDate(row.created_at)}</td>
                    <td>{row.type}</td>
                    <td>{formatMoney(row.amount, row.currency || 'KZT')}</td>
                    <td>{row.client_email || '—'}</td>
                    <td>{row.account_name ? `${row.account_platform} · ${row.account_name}` : '—'}</td>
                    <td>{row.note || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </ClientShell>
  )
}
