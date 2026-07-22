'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientShell from './ClientShell'
import styles from './client.module.css'
import { getAuthToken } from '../../lib/auth'

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

function defaultRange() {
  const to = new Date()
  const from = new Date()
  from.setDate(from.getDate() - 29)
  return { from: isoDate(from), to: isoDate(to) }
}

function number(value, digits = 0) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(Number(value || 0))
}

function money(value, currency = 'USD') {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency, maximumFractionDigits: 2 }).format(Number(value || 0))
}

export default function MetaAnalyticsPage() {
  const router = useRouter()
  const initial = useMemo(defaultRange, [])
  const [dateFrom, setDateFrom] = useState(initial.from)
  const [dateTo, setDateTo] = useState(initial.to)
  const [accountId, setAccountId] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load(nextAccountId = accountId) {
    const token = getAuthToken()
    if (!token) return router.replace('/login')
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ date_from: dateFrom, date_to: dateTo })
      if (nextAccountId) params.set('account_id', nextAccountId)
      const response = await fetch(`/api/client/meta-analytics?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      const payload = await response.json().catch(() => ({}))
      if (response.status === 401) return router.replace('/login')
      if (!response.ok) throw new Error(payload?.detail || 'Не удалось загрузить аналитику Meta')
      setData(payload)
    } catch (reason) {
      setError(reason?.message || 'Не удалось загрузить аналитику Meta')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load('') }, [])

  const summary = data?.summary || {}
  const daily = Array.isArray(data?.daily) ? data.daily : []
  const maxSpend = Math.max(...daily.map((row) => Number(row.spend || 0)), 1)
  const cards = [
    ['Расход', money(summary.spend, data?.currency || 'USD')],
    ['Показы', number(summary.impressions)],
    ['Клики', number(summary.clicks)],
    ['CTR', `${number(summary.ctr, 2)}%`],
    ['Охват', number(summary.reach)],
    ['Результаты', number(summary.conversions, 1)],
  ]

  return (
    <ClientShell activeNav="meta-analytics" pageTitle="Meta Analytics" pageSubtitle="Кампании и рекламные показатели из подключённого аккаунта Meta." statusAlerts={loading ? 'Загрузка…' : 'Meta Ads'}>
      <section className={styles.metaToolbar}>
        <select value={accountId} onChange={(event) => { setAccountId(event.target.value); load(event.target.value) }}>
          <option value="">Все рекламные аккаунты</option>
          {(data?.accounts || []).map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
        </select>
        <input type="date" value={dateFrom} max={dateTo} onChange={(event) => setDateFrom(event.target.value)} />
        <input type="date" value={dateTo} min={dateFrom} onChange={(event) => setDateTo(event.target.value)} />
        <button type="button" onClick={() => load()}>Применить</button>
      </section>

      {error ? (
        <section className={styles.metaConnectState}>
          <h3>Подключите Meta Ads</h3>
          <p>{error}</p>
          <a href="/api/auth/meta/start">Подключить Meta</a>
        </section>
      ) : null}

      {!error ? <>
        <section className={styles.metaMetricGrid}>
          {cards.map(([label, value]) => <article key={label}><span>{label}</span><strong>{loading ? '—' : value}</strong></article>)}
        </section>

        <section className={styles.metaChartCard}>
          <div><h3>Динамика расходов</h3><p>По дням за выбранный период</p></div>
          <div className={styles.metaBars}>
            {daily.map((row) => (
              <div key={row.date} className={styles.metaBarColumn} title={`${row.date}: ${money(row.spend, data?.currency || 'USD')}`}>
                <div style={{ height: `${Math.max(4, (Number(row.spend || 0) / maxSpend) * 100)}%` }} />
                <span>{row.date.slice(5)}</span>
              </div>
            ))}
            {!daily.length && !loading ? <p className={styles.metaEmpty}>За выбранный период данных нет.</p> : null}
          </div>
        </section>

        <section className={styles.metaTableCard}>
          <div><h3>Кампании</h3><p>{(data?.campaigns || []).length} кампаний в выбранном диапазоне</p></div>
          <div className={styles.metaTableScroll}>
            <table>
              <thead><tr><th>Кампания</th><th>Аккаунт</th><th>Расход</th><th>Показы</th><th>Клики</th><th>CTR</th><th>CPC</th><th>Результаты</th></tr></thead>
              <tbody>
                {(data?.campaigns || []).map((row) => <tr key={`${row.account_id}-${row.campaign_id}`}>
                  <td><strong>{row.campaign_name}</strong></td><td>{row.account_name}</td><td>{money(row.spend, data?.currency || 'USD')}</td><td>{number(row.impressions)}</td><td>{number(row.clicks)}</td><td>{number(row.ctr, 2)}%</td><td>{money(row.cpc, data?.currency || 'USD')}</td><td>{number(row.conversions, 1)}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>
      </> : null}
    </ClientShell>
  )
}
