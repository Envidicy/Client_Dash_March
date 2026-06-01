'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AccountRequestModal from './AccountRequestModal'
import ClientShell from './ClientShell'
import FundingModal from './FundingModal'
import styles from './client.module.css'
import { getAuthToken } from '../../lib/auth'
import { useI18n } from '../../lib/i18n/client'

function MetricCard({ card }) {
  const hintClass =
    card.tone === 'good'
      ? `${styles.metricHint} ${styles.metricHintGood}`
      : card.tone === 'warn'
        ? `${styles.metricHint} ${styles.metricHintWarn}`
        : styles.metricHint

  return (
    <article className={styles.metricCard}>
      <p className={styles.metricLabel}>{card.label}</p>
      <p className={styles.metricValue}>{card.value}</p>
      <div className={hintClass}>{card.hint}</div>
    </article>
  )
}

function formatChartAxis(value) {
  const num = Number(value || 0)
  if (!Number.isFinite(num)) return '0'
  if (Math.abs(num) >= 1000) return `${Math.round(num / 1000)}k`
  return String(Math.round(num))
}

function formatChartMoney(value, currency = 'USD') {
  const num = Number(value || 0)
  const code = String(currency || 'USD').toUpperCase()
  if (!Number.isFinite(num)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(0)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(num)
}

function SpendFundingChart({ data = [], tr, showSpend = true, currency = 'USD' }) {
  return (
    <div className={styles.rechartsWrap}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 6 }}>
          <CartesianGrid stroke="#efe8dc" strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            tick={{ fill: '#8b857b', fontSize: 11, fontWeight: 600 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: '#a1988c', fontSize: 11 }}
            tickFormatter={formatChartAxis}
            tickLine={false}
            width={42}
          />
          <Tooltip
            contentStyle={{
              background: '#fffdfa',
              border: '1px solid #eee7db',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(29, 27, 24, 0.08)',
              fontSize: 12,
            }}
            cursor={{ fill: 'rgba(36, 87, 255, 0.06)' }}
            formatter={(value, key) => [
              formatChartMoney(value, showSpend && key !== 'topups' ? 'USD' : currency),
              key === 'topups' || !showSpend
                ? tr('Completed Funding', 'Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ')
                : tr('Spend', 'Р Р°СЃС…РѕРґ'),
            ]}
            labelStyle={{ color: '#4a463f', fontWeight: 700 }}
          />
          <Legend
            formatter={(value) =>
              value === 'topups' || !showSpend ? tr('Completed Funding', 'Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ') : tr('Spend', 'Р Р°СЃС…РѕРґ')
            }
            iconType="circle"
            wrapperStyle={{ paddingTop: 12, fontSize: 11, fontWeight: 700, color: '#7e786d' }}
          />
          <Bar dataKey="topups" fill="#dfe5f8" maxBarSize={24} name="topups" radius={[8, 8, 2, 2]} />
          {showSpend ? <Bar dataKey="spend" fill="#2457ff" maxBarSize={24} name="spend" radius={[8, 8, 2, 2]} /> : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function OverviewPage() {
  const router = useRouter()
  const { tr } = useI18n()
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState([])
  const [pendingSummary, setPendingSummary] = useState({ approvals: 0, funding: 0, documents: 0, total: 0 })
  const [accountsData, setAccountsData] = useState([])
  const [accountTags, setAccountTags] = useState({ active: 0, warn: 0, pending: 0 })
  const [capitalFlow, setCapitalFlow] = useState({
    spend: '$0',
    topups: '$0',
    net: '$0',
    insight: 'Data unavailable',
    series: [],
  })
  const [activity, setActivity] = useState([])
  const [requests, setRequests] = useState([])
  const [alerts, setAlerts] = useState([])
  const [statusAlerts, setStatusAlerts] = useState(tr('0 Alerts', '0 СѓРІРµРґРѕРјР»РµРЅРёР№'))
  const [statusRows, setStatusRows] = useState([])
  const [loadError, setLoadError] = useState('')
  const [fundingAccountId, setFundingAccountId] = useState(null)
  const [accountRequestOpen, setAccountRequestOpen] = useState(false)
  const [selectedAccountTab, setSelectedAccountTab] = useState('')
  const [refreshingAccountId, setRefreshingAccountId] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [customRangeActive, setCustomRangeActive] = useState(false)

  function translateOverviewLabel(value) {
    const v = String(value || '')
    if (v === 'Available Balance') return tr('Available Balance', 'Р”РѕСЃС‚СѓРїРЅС‹Р№ Р±Р°Р»Р°РЅСЃ')
    if (v === 'Monthly Spend') return tr('Monthly Spend', 'Р Р°СЃС…РѕРґ Р·Р° РјРµСЃСЏС†')
    if (v === 'Active Accounts') return tr('Active Accounts', 'РђРєС‚РёРІРЅС‹Рµ Р°РєРєР°СѓРЅС‚С‹')
    if (v === 'Pending Items') return tr('Pending Items', 'РћР¶РёРґР°СЋС‰РёРµ Р·Р°РґР°С‡Рё')
    return v
  }

  function translateOverviewHint(value) {
    const v = String(value || '')
    if (v === 'Ready for allocation') return tr('Ready for allocation', 'Р“РѕС‚РѕРІ Рє СЂР°СЃРїСЂРµРґРµР»РµРЅРёСЋ')
    if (v === 'Approvals, docs, renewals') return tr('Approvals, docs, renewals', 'РЎРѕРіР»Р°СЃРѕРІР°РЅРёСЏ, РґРѕРєСѓРјРµРЅС‚С‹, РїСЂРѕРґР»РµРЅРёСЏ')
    if (v === 'Current 30 days') return tr('Current 30 days', 'РўРµРєСѓС‰РёРµ 30 РґРЅРµР№')
    if (v === 'Completed account funding is currently covering period spend.') {
      return tr('Completed account funding is currently covering period spend.', 'Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ РїРѕРєСЂС‹РІР°СЋС‚ СЂР°СЃС…РѕРґ Р·Р° РїРµСЂРёРѕРґ.')
    }
    if (v === 'Completed account funding is trailing period spend.') {
      return tr('Completed account funding is trailing period spend.', 'Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ РѕС‚СЃС‚Р°СЋС‚ РѕС‚ СЂР°СЃС…РѕРґР° Р·Р° РїРµСЂРёРѕРґ.')
    }
    if (v === 'Data unavailable') return tr('Data unavailable', 'Р”Р°РЅРЅС‹Рµ РЅРµРґРѕСЃС‚СѓРїРЅС‹')
    if (v === 'Completed account funding by selected period.') {
      return tr('Completed account funding by selected period.', 'РўРѕР»СЊРєРѕ Р·Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ Р·Р° РІС‹Р±СЂР°РЅРЅС‹Р№ РїРµСЂРёРѕРґ.')
    }
    if (v === 'Not connected') return tr('Not connected', 'РќРµ РїРѕРґРєР»СЋС‡РµРЅРѕ')
    if (v === 'Calculated') return tr('Calculated', 'Р Р°СЃС‡С‘С‚РЅС‹Р№')
    if (v === 'Estimated') return tr('Estimated', 'РћС†РµРЅРѕС‡РЅС‹Р№')
    if (v === 'Unavailable') return tr('Unavailable', 'РќРµРґРѕСЃС‚СѓРїРЅРѕ')
    if (v === 'Live') return tr('Live', 'Live')
    if (v === 'Not synced yet') return tr('Not synced yet', 'Р•С‰С‘ РЅРµ СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ')
    const syncedMatch = v.match(/^Synced\s+(.+)$/i)
    if (syncedMatch) {
      const raw = String(syncedMatch[1] || '').trim()
      if (/^just now$/i.test(raw)) return tr('Synced Just now', 'РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ С‚РѕР»СЊРєРѕ С‡С‚Рѕ')
      if (/^recently$/i.test(raw)) return tr('Synced Recently', 'РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ РЅРµРґР°РІРЅРѕ')
      const hourMatch = raw.match(/^(\d+)\s+hours?\s+ago$/i)
      if (hourMatch) return tr(`Synced ${raw}`, `РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ ${hourMatch[1]} С‡. РЅР°Р·Р°Рґ`)
      const dayMatch = raw.match(/^(\d+)\s+days?\s+ago$/i)
      if (dayMatch) return tr(`Synced ${raw}`, `РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ ${dayMatch[1]} РґРЅ. РЅР°Р·Р°Рґ`)
      return tr(`Synced ${raw}`, `РЎРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅРѕ ${raw}`)
    }
    const acrossMatch = v.match(/^Across\s+(\d+)\s+platforms$/i)
    if (acrossMatch) return tr(`Across ${acrossMatch[1]} platforms`, `РџРѕ ${acrossMatch[1]} РїР»Р°С‚С„РѕСЂРјР°Рј`)
    const vsMatch = v.match(/^vs last period\s+([+-]?\d+(?:\.\d+)?)%$/i)
    if (vsMatch) return tr(`vs last period ${vsMatch[1]}%`, `Рє РїСЂРѕС€Р»РѕРјСѓ РїРµСЂРёРѕРґСѓ ${vsMatch[1]}%`)
    return v
  }

  function translateAction(value) {
    const v = String(value || '')
    if (v === 'Top up now') return tr('Top up now', 'РџРѕРїРѕР»РЅРёС‚СЊ')
    if (v === 'Upload docs') return tr('Upload docs', 'Р—Р°РіСЂСѓР·РёС‚СЊ РґРѕРєСѓРјРµРЅС‚С‹')
    if (v === 'Review') return tr('Review', 'РџСЂРѕРІРµСЂРёС‚СЊ')
    if (v === 'Open') return tr('Open', 'РћС‚РєСЂС‹С‚СЊ')
    if (v === 'Open request') return tr('Open request', 'РћС‚РєСЂС‹С‚СЊ Р·Р°РїСЂРѕСЃ')
    return v
  }

  function translateStatus(value) {
    const v = String(value || '')
    if (v === 'Active') return tr('Active', 'РђРєС‚РёРІРµРЅ')
    if (v === 'Pending Setup') return tr('Pending Setup', 'РћР¶РёРґР°РµС‚ РЅР°СЃС‚СЂРѕР№РєРё')
    if (v === 'Paused') return tr('Paused', 'РќР° РїР°СѓР·Рµ')
    if (v === 'Archived') return tr('Archived', 'РђСЂС…РёРІ')
    return v
  }

  async function refreshAccountLiveBilling(accountId) {
    const id = String(accountId || '').trim()
    if (!id) {
      await loadOverview()
      return
    }
    const token = getAuthToken()
    if (!token) {
      router.replace('/login')
      return
    }
    try {
      setRefreshingAccountId(id)
      setLoadError('')
      const res = await fetch(`/api/client/accounts/${encodeURIComponent(id)}/refresh-live-billing`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (res.status === 401) {
        router.replace('/login')
        return
      }
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.detail || tr('Failed to refresh account balance', 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕР±РЅРѕРІРёС‚СЊ Р±Р°Р»Р°РЅСЃ Р°РєРєР°СѓРЅС‚Р°'))
      await loadOverview()
    } catch (error) {
      setLoadError(error?.message || tr('Failed to refresh account balance', 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕР±РЅРѕРІРёС‚СЊ Р±Р°Р»Р°РЅСЃ Р°РєРєР°СѓРЅС‚Р°'))
    } finally {
      setRefreshingAccountId('')
    }
  }

  function handleOverviewAction(action, accountId) {
    const normalized = String(action || '').toLowerCase()
    if (normalized === 'top up now' && accountId) {
      openFundingModal(accountId)
      return
    }
    if (normalized === 'refresh') {
      refreshAccountLiveBilling(accountId)
      return
    }
    if (normalized === 'review' || normalized === 'open request' || normalized === 'upload docs') {
      router.push('/funds')
      return
    }
    if (normalized === 'open') {
      router.push('/funds')
      return
    }
    router.push('/funds')
  }

  async function loadOverview(next = {}) {
    const token = getAuthToken()
    if (!token) {
      router.replace('/login')
      return
    }

    const nextDateFrom = Object.prototype.hasOwnProperty.call(next, 'dateFrom') ? next.dateFrom : dateFrom
    const nextDateTo = Object.prototype.hasOwnProperty.call(next, 'dateTo') ? next.dateTo : dateTo
    const useCustom = Object.prototype.hasOwnProperty.call(next, 'useCustom') ? next.useCustom : customRangeActive

    try {
      setLoadError('')
      const params = new URLSearchParams()
      if (useCustom && nextDateFrom && nextDateTo) {
        params.set('date_from', nextDateFrom)
        params.set('date_to', nextDateTo)
      }
      const query = params.toString()
      const res = await fetch(`/api/client/overview${query ? `?${query}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (res.status === 401) {
        router.replace('/login')
        return
      }
      if (!res.ok) throw new Error(tr('Failed to load overview', 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ overview'))
      const payload = await res.json()
      setMetrics(Array.isArray(payload.metrics) ? payload.metrics : [])
      setPendingSummary(payload.pending || { approvals: 0, funding: 0, documents: 0, total: 0 })
      setAccountsData(Array.isArray(payload.accounts) ? payload.accounts : [])
      setAccountTags(payload.accountTags || { active: 0, warn: 0, pending: 0 })
      setCapitalFlow(
        payload.capitalFlow || {
          spend: '$0',
          topups: '$0',
          net: '$0',
          insight: 'Data unavailable',
          series: [],
        }
      )
      setActivity(Array.isArray(payload.activity) ? payload.activity : [])
      setRequests(Array.isArray(payload.requests) ? payload.requests : [])
      setAlerts(Array.isArray(payload.alerts) ? payload.alerts : [])
      setStatusAlerts(payload.statusAlerts || tr('0 Alerts', '0 СѓРІРµРґРѕРјР»РµРЅРёР№'))
      setStatusRows(Array.isArray(payload.statusRows) ? payload.statusRows : [])
      const payloadRange = payload?.range || {}
      setCustomRangeActive(Boolean(payloadRange.custom))
      setDateFrom(String(payloadRange.date_from || nextDateFrom || ''))
      setDateTo(String(payloadRange.date_to || nextDateTo || ''))
    } catch {
      setLoadError(tr('Failed to load overview data. Please refresh or contact support.', 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РґР°РЅРЅС‹Рµ overview. РћР±РЅРѕРІРёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ РёР»Рё РѕР±СЂР°С‚РёС‚РµСЃСЊ РІ РїРѕРґРґРµСЂР¶РєСѓ.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOverview()
  }, [router])

  const pendingHint = useMemo(() => {
    const parts = []
    if (pendingSummary.approvals) parts.push(`${pendingSummary.approvals} ${tr('approvals', 'СЃРѕРіР»Р°СЃРѕРІР°РЅРёР№')}`)
    if (pendingSummary.funding) parts.push(`${pendingSummary.funding} ${tr('funding', 'РїРѕРїРѕР»РЅРµРЅРёР№')}`)
    if (pendingSummary.documents) parts.push(`${pendingSummary.documents} ${tr('docs', 'РґРѕРєСѓРјРµРЅС‚РѕРІ')}`)
    return parts.join(' В· ') || tr('No client actions pending', 'РќРµС‚ РѕР¶РёРґР°СЋС‰РёС… РґРµР№СЃС‚РІРёР№ РєР»РёРµРЅС‚Р°')
  }, [pendingSummary, tr])

  const displayMetrics = useMemo(
    () =>
      metrics.map((card) =>
        String(card.label) === 'Pending Items'
          ? {
              ...card,
              label: translateOverviewLabel(card.label),
              hint: pendingHint,
            }
          : {
              ...card,
              label: translateOverviewLabel(card.label),
              hint: translateOverviewHint(card.hint),
            }
      ),
    [metrics, pendingHint, tr]
  )

  const displayStatusRows = useMemo(
    () =>
      (statusRows || []).map((row) => ({
        ...row,
        label: translateOverviewHint(row?.label),
      })),
    [statusRows, tr]
  )

  const displayAlerts = useMemo(
    () =>
      (alerts || []).map((item) => ({
        ...item,
        action: translateAction(item?.action),
      })),
    [alerts, tr]
  )

  const displayActivity = useMemo(
    () =>
      (activity || []).map((item) => ({
        ...item,
        title: translateOverviewHint(item?.title),
        text: translateOverviewHint(item?.text),
        time: translateOverviewHint(item?.time),
      })),
    [activity, tr]
  )

  const displayRequests = useMemo(
    () =>
      (requests || []).map((item) => ({
        ...item,
        title: translateOverviewHint(item?.title),
        text: translateOverviewHint(item?.text),
        badge: translateOverviewHint(item?.badge),
      })),
    [requests, tr]
  )

  const chartSeries = useMemo(() => {
    const source = Array.isArray(capitalFlow?.series) ? capitalFlow.series : []
    return source.map((row) => {
      const spend = Number(row?.spend || 0)
      const topups = Number(row?.topups || 0)
      return {
        ...row,
        spend: Number.isFinite(spend) ? spend : 0,
        topups: Number.isFinite(topups) ? topups : 0,
      }
    })
  }, [capitalFlow?.series])

  const topupDaysCount = useMemo(
    () => chartSeries.filter((row) => Number(row?.topups || 0) > 0).length,
    [chartSeries]
  )

  const dedupedAccounts = useMemo(() => {
    const seen = new Set()
    const result = []
    for (const row of accountsData || []) {
      const idKey = row?.accountId != null ? `id:${row.accountId}` : ''
      const fallbackKey = `${String(row?.account || '').toLowerCase().trim()}::${String(row?.platform || '').toLowerCase().trim()}`
      const key = idKey || fallbackKey
      if (!key || seen.has(key)) continue
      seen.add(key)
      result.push(row)
    }
    return result
  }, [accountsData])

  const accountTabs = useMemo(() => {
    const seen = new Set()
    return dedupedAccounts
      .map((row) => {
        const label = String(row?.account || '').trim()
        if (!label) return null
        return { id: label.toLowerCase(), label }
      })
      .filter(Boolean)
      .filter((item) => {
        const key = item.id
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
  }, [dedupedAccounts])

  const visibleAccounts = useMemo(() => {
    if (!selectedAccountTab) return []
    return dedupedAccounts.filter((row) => String(row?.account || '').trim().toLowerCase() === selectedAccountTab)
  }, [dedupedAccounts, selectedAccountTab])

  useEffect(() => {
    if (!accountTabs.length) {
      setSelectedAccountTab('')
      return
    }
    if (!selectedAccountTab || !accountTabs.some((tab) => tab.id === selectedAccountTab)) {
      setSelectedAccountTab(accountTabs[0].id)
    }
  }, [accountTabs, selectedAccountTab])

  function openFundingModal(accountId) {
    if (!accountId) return
    setFundingAccountId(String(accountId))
  }

  function openAccountDashboard(accountId) {
    if (accountId) {
      router.push(`/performance?account_id=${encodeURIComponent(String(accountId))}`)
      return
    }
    router.push('/performance')
  }

  function applyOverviewRange() {
    if (!dateFrom || !dateTo) {
      setLoadError(tr('Select both dates to apply a custom range.', 'Р’С‹Р±РµСЂРёС‚Рµ РѕР±Рµ РґР°С‚С‹, С‡С‚РѕР±С‹ РїСЂРёРјРµРЅРёС‚СЊ РїСЂРѕРёР·РІРѕР»СЊРЅС‹Р№ РґРёР°РїР°Р·РѕРЅ.'))
      return
    }
    if (dateFrom > dateTo) {
      setLoadError(tr('Start date must be earlier than end date.', 'Р”Р°С‚Р° РЅР°С‡Р°Р»Р° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ СЂР°РЅСЊС€Рµ РґР°С‚С‹ РѕРєРѕРЅС‡Р°РЅРёСЏ.'))
      return
    }
    loadOverview({
      dateFrom,
      dateTo,
      useCustom: true,
    })
  }

  function resetOverviewRange() {
    setCustomRangeActive(false)
    setDateFrom('')
    setDateTo('')
    loadOverview({
      useCustom: false,
      dateFrom: '',
      dateTo: '',
    })
  }

  return (
    <ClientShell
      activeNav="overview"
      pageTitle={tr('Overview', 'РћР±Р·РѕСЂ')}
      pageSubtitle={tr('Track your balances, account status and approvals.', 'РћС‚СЃР»РµР¶РёРІР°Р№С‚Рµ Р±Р°Р»Р°РЅСЃС‹, СЃС‚Р°С‚СѓСЃС‹ Р°РєРєР°СѓРЅС‚РѕРІ Рё СЃРѕРіР»Р°СЃРѕРІР°РЅРёСЏ.')}
      pageActionLabel={tr('Request Account', 'Р—Р°РїСЂРѕСЃРёС‚СЊ Р°РєРєР°СѓРЅС‚')}
      pageActionOnClick={() => setAccountRequestOpen(true)}
      headerActionLabel={tr('Create Request', 'РЎРѕР·РґР°С‚СЊ Р·Р°РїСЂРѕСЃ')}
      headerActionOnClick={() => setAccountRequestOpen(true)}
      entityLabel={tr('Entity Switcher', 'РџРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ СЋСЂР»РёС†Р°')}
      statusAlerts={loading ? tr('LoadingвЂ¦', 'Р—Р°РіСЂСѓР·РєР°вЂ¦') : statusAlerts}
      statusRows={displayStatusRows}
    >
      {loadError ? <div className={styles.pageErrorBanner}>{loadError}</div> : null}
      <section className={styles.cardGrid4}>
        {displayMetrics.map((card) => (
          <MetricCard card={card} key={card.label} />
        ))}
      </section>

      <section className={styles.sectionCard} id="accounts-overview">
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>{tr('Ad Accounts Overview', 'РћР±Р·РѕСЂ СЂРµРєР»Р°РјРЅС‹С… Р°РєРєР°СѓРЅС‚РѕРІ')}</h3>
            <div className={styles.tagRow}>
              <span className={styles.tag}>{accountTags.active} {tr('Active', 'РђРєС‚РёРІРЅС‹')}</span>
              <span className={styles.tagDanger}>{accountTags.warn} {tr('Need Attention', 'РўСЂРµР±СѓСЋС‚ РІРЅРёРјР°РЅРёСЏ')}</span>
              <span className={styles.tagMuted}>{accountTags.pending} {tr('Setup Pending', 'РћР¶РёРґР°СЋС‚ РЅР°СЃС‚СЂРѕР№РєРё')}</span>
            </div>
          </div>
          <div className={styles.headerControls}>
            <button className={styles.headerPrimaryAction} onClick={() => setAccountRequestOpen(true)} type="button">
              {tr('New Account Request', 'РќРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ РЅР° Р°РєРєР°СѓРЅС‚')}
            </button>
            <Link className={styles.outlinedAction} href="/funds">
              {tr('View All Accounts', 'Р’СЃРµ Р°РєРєР°СѓРЅС‚С‹')}
            </Link>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <div className={styles.accountTabsRow}>
            {accountTabs.map((tab) => (
              <button
                className={selectedAccountTab === tab.id ? styles.accountTabActive : styles.accountTab}
                key={tab.id}
                onClick={() => setSelectedAccountTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <table className={styles.table}>
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '8%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>{tr('Account', 'РђРєРєР°СѓРЅС‚')}</th>
                <th>{tr('Platform', 'РџР»Р°С‚С„РѕСЂРјР°')}</th>
                <th>{tr('Status', 'РЎС‚Р°С‚СѓСЃ')}</th>
                <th>{tr('Balance', 'Р‘Р°Р»Р°РЅСЃ')}</th>
                <th>{tr('Spend', 'Р Р°СЃС…РѕРґ')}</th>
                <th>{tr('Note', 'РљРѕРјРјРµРЅС‚Р°СЂРёР№')}</th>
                <th>{tr('Action', 'Р”РµР№СЃС‚РІРёРµ')}</th>
              </tr>
            </thead>
            <tbody>
              {visibleAccounts.map((row, index) => (
                <tr key={row.accountId || `${row.account || 'account'}-${row.platform || 'platform'}-${index}`}>
                  <td className={styles.accountCell}>
                    <span className={`${styles.tableStrong} ${styles.accountName}`}>{row.account}</span>
                  </td>
                  <td>
                    <span className={styles.tableSubtle}>{row.platform}</span>
                  </td>
                  <td>
                    <span className={row.status === 'Active' ? styles.statusChip : styles.statusChipMuted}>{translateStatus(row.status)}</span>
                  </td>
                  <td>
                    <span className={styles.tableStrong}>{row.balance}</span>
                    <span className={styles.tableSubtle}>{translateOverviewHint(row.balanceSourceLabel || '')}</span>
                    <span className={styles.tableSubtle}>{translateOverviewHint(row.lastSyncedLabel || '')}</span>
                  </td>
                  <td>
                    <span className={styles.tableSubtle}>{row.spend}</span>
                  </td>
                  <td>
                    <span
                      className={
                        row.noteTone === 'good'
                          ? styles.noteGood
                          : row.noteTone === 'neutral'
                            ? styles.tableSubtle
                            : styles.noteWarn
                      }
                    >
                      {row.note}
                    </span>
                  </td>
                  <td>
                    <div className={styles.accountActions}>
                      <button
                        className={styles.accountIconButton}
                        disabled={!row.accountId}
                        onClick={() => openFundingModal(row.accountId)}
                        title={tr('Top up account', 'РџРѕРїРѕР»РЅРёС‚СЊ Р°РєРєР°СѓРЅС‚')}
                        type="button"
                      >
                        в‚ё
                      </button>
                      <button
                        className={styles.accountIconButton}
                        onClick={() => openAccountDashboard(row.accountId)}
                        title={tr('Open dashboard', 'РћС‚РєСЂС‹С‚СЊ РґР°С€Р±РѕСЂРґ')}
                        type="button"
                      >
                        в–Ў
                      </button>
                      <button
                        className={styles.accountIconButton}
                        disabled={!row.accountId || refreshingAccountId === String(row.accountId)}
                        onClick={() => handleOverviewAction('refresh', row.accountId)}
                        title={tr('Refresh account balance', 'Обновить баланс аккаунта')}
                        type="button"
                      >
                        {refreshingAccountId === String(row.accountId) ? 'вЂ¦' : 'в†»'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.overviewGrid}>
        <article className={`${styles.sectionCard} ${styles.chartCard}`}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>
                {capitalFlow?.spendVisible === false
                  ? tr('Completed Funding Timeline', 'Р”РёРЅР°РјРёРєР° Р·Р°РІРµСЂС€РµРЅРЅС‹С… РїРѕРїРѕР»РЅРµРЅРёР№')
                  : tr('Spend vs Completed Funding', 'Р Р°СЃС…РѕРґ vs Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ РїРѕРїРѕР»РЅРµРЅРёСЏ')}
              </h3>
              <p className={styles.chartInsight}>{translateOverviewHint(capitalFlow.insight)}</p>
            </div>
            <div className={styles.dateRangeControls}>
              <input
                className={styles.dateInput}
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                max={dateTo || undefined}
                aria-label={tr('Date from', 'Р”Р°С‚Р° СЃ')}
                title={tr('Date from', 'Р”Р°С‚Р° СЃ')}
              />
              <input
                className={styles.dateInput}
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                min={dateFrom || undefined}
                aria-label={tr('Date to', 'Р”Р°С‚Р° РїРѕ')}
                title={tr('Date to', 'Р”Р°С‚Р° РїРѕ')}
              />
              <button className={styles.dateApplyButton} onClick={applyOverviewRange} type="button">
                {tr('Apply', 'РџСЂРёРјРµРЅРёС‚СЊ')}
              </button>
              <button className={styles.dateResetButton} onClick={resetOverviewRange} type="button">
                {customRangeActive ? tr('Reset', 'РЎР±СЂРѕСЃ') : tr('Last 30d', '30 РґРЅРµР№')}
              </button>
            </div>
          </div>

          <div className={styles.chartMetrics}>
            <div className={styles.chartMetric}>
              <span>{tr('Top-ups', 'РџРѕРїРѕР»РЅРµРЅРёСЏ')}</span>
              <strong>{capitalFlow.topups}</strong>
            </div>
            {capitalFlow?.spendVisible === false ? (
              <div className={styles.chartMetric}>
                <span>{tr('Days with completed top-up', 'Р”РЅРµР№ СЃ Р·Р°РІРµСЂС€РµРЅРЅС‹Рј РїРѕРїРѕР»РЅРµРЅРёРµРј')}</span>
                <strong>{String(topupDaysCount)}</strong>
              </div>
            ) : (
              <>
                <div className={styles.chartMetric}>
                  <span>{tr('Spend', 'Р Р°СЃС…РѕРґ')}</span>
                  <strong>{capitalFlow.spend}</strong>
                </div>
                <div className={styles.chartMetric}>
                  <span>{tr('Net Flow', 'Р§РёСЃС‚С‹Р№ РїРѕС‚РѕРє')}</span>
                  <strong>{capitalFlow.net}</strong>
                </div>
              </>
            )}
          </div>

          <SpendFundingChart
            data={chartSeries}
            tr={tr}
            showSpend={capitalFlow?.spendVisible !== false}
            currency={capitalFlow?.currency || 'USD'}
          />

          {Number(capitalFlow?.topupsValue || 0) <= 0 ? (
            <div className={styles.chartEmptyNote}>
              {tr(
                'No completed account funding was recorded during this period.',
                'Р—Р° СЌС‚РѕС‚ РїРµСЂРёРѕРґ РЅРµ Р±С‹Р»Рѕ Р·Р°РІРµСЂС€РµРЅРЅС‹С… РїРѕРїРѕР»РЅРµРЅРёР№ Р°РєРєР°СѓРЅС‚РѕРІ.'
              )}
              
            </div>
          ) : null}

        </article>

        <div className={styles.rightStack}>
          <article className={styles.smallCard}>
            <h3 className={styles.smallTitle}>{tr('Important Alerts', 'Р’Р°Р¶РЅС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ')}</h3>
            <div className={styles.alertList}>
              {displayAlerts.map((item) => (
                <div className={styles.alertItem} key={item.id || item.title}>
                  <strong>{item.title}</strong>
                  {item.action === tr('Top up now', 'РџРѕРїРѕР»РЅРёС‚СЊ') && item.accountId ? (
                    <button className={styles.inlineActionButton} onClick={() => openFundingModal(item.accountId)} type="button">
                      {item.action}
                    </button>
                  ) : (
                    <button className={styles.inlineActionButton} onClick={() => handleOverviewAction(item.action, item.accountId)} type="button">
                      {item.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <article className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>{tr('Recent Activity', 'РќРµРґР°РІРЅСЏСЏ Р°РєС‚РёРІРЅРѕСЃС‚СЊ')}</h3>
            </div>
          </div>
          <div className={styles.feedList}>
            {displayActivity.map((item, index) => (
              <div className={styles.feedItem} key={item.id || `${item.title || 'activity'}-${item.time || 'time'}-${index}`}>
                <div className={styles.feedTop}>
                  <span
                    className={`${styles.feedMarker} ${
                      item.tone === 'good'
                        ? styles.feedMarkerGood
                        : item.tone === 'info'
                          ? styles.feedMarkerInfo
                          : styles.feedMarkerWarn
                    }`}
                  />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>{tr('Pending Requests', 'РћР¶РёРґР°СЋС‰РёРµ Р·Р°РїСЂРѕСЃС‹')}</h3>
            </div>
            <Link className={styles.linkAction} href="/funds">
              {tr('View All', 'РЎРјРѕС‚СЂРµС‚СЊ РІСЃРµ')}
            </Link>
          </div>
          <div className={styles.requestList}>
            {displayRequests.map((item) => (
              <div className={styles.requestItem} key={item.id || `${item.title}-${item.text}`}>
                <div className={styles.requestTop}>
                  <span
                    className={`${styles.requestMarker} ${
                      item.marker === 'good'
                        ? styles.requestMarkerGood
                        : item.marker === 'warn'
                          ? styles.requestMarkerWarn
                          : styles.requestMarkerNeutral
                    }`}
                  />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                  {item.badge ? <span className={`${styles.requestBadge} ${styles.requestBadgeDanger}`}>{item.badge}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <FundingModal
        accountId={fundingAccountId}
        onClose={() => setFundingAccountId(null)}
        onSubmitted={loadOverview}
        open={Boolean(fundingAccountId)}
      />
      <AccountRequestModal
        onClose={() => setAccountRequestOpen(false)}
        onSubmitted={loadOverview}
        open={accountRequestOpen}
      />
    </ClientShell>
  )
}


