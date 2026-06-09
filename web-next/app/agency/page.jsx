'use client'

import { useEffect, useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import { apiFetch } from '../../lib/api'
import { clearAuth, getAuthToken } from '../../lib/auth'

function formatMoney(value, currency = 'KZT') {
  return `${Number(value || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

function formatDate(value) {
  if (!value) return '-'
  return String(value).replace('T', ' ').slice(0, 16)
}

export default function AgencyPage() {
  const [payload, setPayload] = useState(null)
  const [status, setStatus] = useState('Loading agency workspace...')
  const [transferForm, setTransferForm] = useState({ client_user_id: '', amount: '', note: '' })

  async function agencyFetch(path, options = {}) {
    const token = getAuthToken()
    if (!token) throw new Error('Unauthorized')
    const res = await apiFetch(path, {
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

  return (
    <AppShell eyebrow="Envidicy Agency" title="Agency workspace" subtitle="Clients, balances, own accounts and ledger.">
      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Agency</p>
            <h2>{agency?.name || 'Agency workspace'}</h2>
          </div>
        </div>
        <div className="grid-3">
          <article className="stat">
            <p className="muted">Operating balance</p>
            <h3>{formatMoney(summary?.balance ?? wallet?.balance, summary?.currency || wallet?.currency || 'KZT')}</h3>
            <p className="muted small">Separate from client balances</p>
          </article>
          <article className="stat">
            <p className="muted">Clients</p>
            <h3>{clients.length}</h3>
            <p className="muted small">Active agency clients</p>
          </article>
          <article className="stat">
            <p className="muted">Role</p>
            <h3>{membership?.role || '-'}</h3>
            <p className="muted small">{canManage ? 'Can manage balances' : canImpersonate ? 'Can open clients' : 'Read-only'}</p>
          </article>
        </div>
        {status ? <p className="muted">{status}</p> : null}
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Finance</p>
            <h2>Agency totals</h2>
          </div>
        </div>
        <div className="grid-3">
          <article className="stat">
            <p className="muted">Rebate earned</p>
            <h3>{formatMoney(summary?.rebate_earned, summary?.currency || 'KZT')}</h3>
            <p className="muted small">Completed client topups</p>
          </article>
          <article className="stat">
            <p className="muted">Sent to clients</p>
            <h3>{formatMoney(summary?.transferred_to_clients, summary?.currency || 'KZT')}</h3>
            <p className="muted small">Agency balance to client balance</p>
          </article>
          <article className="stat">
            <p className="muted">Own account funding</p>
            <h3>{formatMoney(summary?.own_account_funding, summary?.currency || 'KZT')}</h3>
            <p className="muted small">Agency accounts spend base</p>
          </article>
          <article className="stat">
            <p className="muted">Platform fees paid</p>
            <h3>{formatMoney(summary?.platform_fees_paid, summary?.currency || 'KZT')}</h3>
            <p className="muted small">Fees on agency own funding</p>
          </article>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Clients</p>
            <h2>Client balances</h2>
          </div>
        </div>
        {canManage ? (
          <>
            <div className="form-grid">
              <label className="field">
                <span>Client</span>
                <select value={transferForm.client_user_id} onChange={(e) => setTransferForm((s) => ({ ...s, client_user_id: e.target.value }))}>
                  <option value="">Select client</option>
                  {clients.map((row) => (
                    <option key={row.id} value={String(row.client_user_id)}>{row.email}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Amount</span>
                <input value={transferForm.amount} onChange={(e) => setTransferForm((s) => ({ ...s, amount: e.target.value }))} type="number" placeholder="50000" />
              </label>
              <label className="field">
                <span>Note</span>
                <input value={transferForm.note} onChange={(e) => setTransferForm((s) => ({ ...s, note: e.target.value }))} placeholder="Client funding" />
              </label>
            </div>
            <div className="panel-actions">
              <button className="btn primary" type="button" onClick={transferToClient}>Transfer to client</button>
            </div>
          </>
        ) : null}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th><th>Balance</th><th>Rebate</th><th>Status</th><th>Вход</th>
              </tr>
            </thead>
            <tbody>
              {!clients.length ? (
                <tr><td colSpan={5}>No agency clients.</td></tr>
              ) : (
                clients.map((row) => (
                  <tr key={row.id}>
                    <td>{row.email}</td>
                    <td>{formatMoney(row.wallet_balance, row.wallet_currency || 'KZT')}</td>
                    <td>{row.default_rebate_percent ?? 3}%</td>
                    <td>{row.status || 'active'}</td>
                    <td>
                      {canImpersonate ? (
                        <button className="btn ghost small" type="button" onClick={() => impersonateClient(row.client_user_id, row.email)}>
                          Войти
                        </button>
                      ) : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Own accounts</p>
            <h2>Agency ad accounts</h2>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Account</th><th>Platform</th><th>Currency</th><th>Budget</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!ownAccounts.length ? (
                <tr><td colSpan={5}>No agency-owned accounts.</td></tr>
              ) : (
                ownAccounts.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.platform}</td>
                    <td>{row.currency || 'USD'}</td>
                    <td>{formatMoney(row.budget_total, row.currency || 'USD')}</td>
                    <td>{row.status || 'active'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Ledger</p>
            <h2>Agency ledger</h2>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th><th>Type</th><th>Amount</th><th>Client</th><th>Account</th><th>Note</th>
              </tr>
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
                    <td>{row.client_email || '-'}</td>
                    <td>{row.account_name ? `${row.account_platform} · ${row.account_name}` : '-'}</td>
                    <td>{row.note || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  )
}
