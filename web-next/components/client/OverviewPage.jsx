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

function AccountActionIcon({ type }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  }

  if (type === 'topup') {
    return (
      <svg {...common}>
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }

  if (type === 'dashboard') {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M3 12A9 9 0 0 1 18.5 5.8" />
      <path d="M18 2v4h4" />
      <path d="M6 22v-4H2" />
    </svg>
  )
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
                ? tr('Completed Funding', 'Завершенные пополнения')
                : tr('Spend', 'Расход'),
            ]}
            labelStyle={{ color: '#4a463f', fontWeight: 700 }}
          />
          <Legend
            formatter={(value) =>
              value === 'topups' || !showSpend ? tr('Completed Funding', 'Завершенные пополнения') : tr('Spend', 'Расход')
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

function AccountGroupsModal({
  accounts,
  hiddenAccountIds,
  onClose,
  onReload,
  open,
  tr,
  views,
}) {
  const [selectedId, setSelectedId] = useState('')
  const [draft, setDraft] = useState({
    id: null,
    name: '',
    account_ids: [],
    is_pinned: true,
    is_default: false,
    position: 0,
  })
  const [hiddenDraft, setHiddenDraft] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  const orderedViews = useMemo(
    () => [...(views || [])].sort((a, b) => Number(a.position || 0) - Number(b.position || 0) || Number(a.id) - Number(b.id)),
    [views]
  )

  function editView(view) {
    if (!view) {
      setSelectedId('new')
      setDraft({
        id: null,
        name: '',
        account_ids: [],
        is_pinned: orderedViews.filter((item) => item.is_pinned).length < 5,
        is_default: false,
        position: orderedViews.length,
      })
      setSearch('')
      setStatus('')
      return
    }
    setSelectedId(String(view.id))
    setDraft({
      id: view.id,
      name: view.name || '',
      account_ids: Array.isArray(view.account_ids) ? view.account_ids.map(Number) : [],
      is_pinned: Boolean(view.is_pinned),
      is_default: Boolean(view.is_default),
      position: Number(view.position || 0),
    })
    setSearch('')
    setStatus('')
  }

  useEffect(() => {
    if (!open) return
    setHiddenDraft((hiddenAccountIds || []).map(Number))
    editView(orderedViews[0] || null)
  }, [open])

  const filteredAccounts = useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return accounts
    return accounts.filter((row) =>
      [
        row?.account,
        row?.platform,
        row?.status,
        row?.accountId,
        row?.externalId,
        row?.accountCode,
      ].some((value) => String(value || '').toLowerCase().includes(needle))
    )
  }, [accounts, search])

  async function request(path, method, body) {
    const token = getAuthToken()
    if (!token) throw new Error(tr('Session expired.', 'Сессия истекла.'))
    const res = await fetch(path, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: 'no-store',
    })
    const payload = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(payload?.detail || tr('Failed to save account groups.', 'Не удалось сохранить группы аккаунтов.'))
    return payload
  }

  function toggleMember(accountId) {
    const id = Number(accountId)
    setDraft((current) => ({
      ...current,
      account_ids: current.account_ids.includes(id)
        ? current.account_ids.filter((value) => value !== id)
        : [...current.account_ids, id],
    }))
  }

  function toggleHidden(accountId) {
    const id = Number(accountId)
    setHiddenDraft((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    )
  }

  async function saveChanges() {
    const name = draft.name.trim()
    if (!name && draft.account_ids.length) {
      setStatus(tr('Enter a group name.', 'Укажите название группы.'))
      return
    }
    if (name && name.length < 2) {
      setStatus(tr('Group name must contain at least 2 characters.', 'Название группы должно содержать минимум 2 символа.'))
      return
    }
    if (name && !draft.account_ids.length) {
      setStatus(tr('Select at least one account for the group.', 'Выберите хотя бы один аккаунт для группы.'))
      return
    }
    setSaving(true)
    setStatus(tr('Saving...', 'Сохраняем...'))
    try {
      if (name) {
        await request(
          draft.id ? `/api/client/account-views/${draft.id}` : '/api/client/account-views',
          draft.id ? 'PUT' : 'POST',
          {
            name,
            account_ids: draft.account_ids,
            is_pinned: draft.is_pinned,
            is_default: draft.is_default,
            position: draft.position,
          }
        )
      }
      await request('/api/client/account-overview-preferences', 'PUT', {
        hidden_account_ids: hiddenDraft,
      })
      await onReload()
      onClose()
    } catch (error) {
      setStatus(error?.message || tr('Failed to save changes.', 'Не удалось сохранить изменения.'))
    } finally {
      setSaving(false)
    }
  }

  async function deleteView() {
    if (!draft.id) return
    if (!window.confirm(tr(`Delete group "${draft.name}"?`, `Удалить группу «${draft.name}»?`))) return
    setSaving(true)
    try {
      await request(`/api/client/account-views/${draft.id}`, 'DELETE')
      await onReload()
      editView(null)
    } catch (error) {
      setStatus(error?.message || tr('Failed to delete group.', 'Не удалось удалить группу.'))
    } finally {
      setSaving(false)
    }
  }

  async function moveView(direction) {
    if (!draft.id) return
    const index = orderedViews.findIndex((view) => Number(view.id) === Number(draft.id))
    const nextIndex = index + direction
    if (index < 0 || nextIndex < 0 || nextIndex >= orderedViews.length) return
    const current = orderedViews[index]
    const neighbor = orderedViews[nextIndex]
    setSaving(true)
    try {
      await request(`/api/client/account-views/${current.id}`, 'PUT', {
        name: current.name,
        account_ids: current.account_ids,
        is_pinned: current.is_pinned,
        is_default: current.is_default,
        position: neighbor.position,
      })
      await request(`/api/client/account-views/${neighbor.id}`, 'PUT', {
        name: neighbor.name,
        account_ids: neighbor.account_ids,
        is_pinned: neighbor.is_pinned,
        is_default: neighbor.is_default,
        position: current.position,
      })
      await onReload()
      setDraft((value) => ({ ...value, position: neighbor.position }))
      setStatus(tr('Group order updated.', 'Порядок групп обновлён.'))
    } catch (error) {
      setStatus(error?.message || tr('Failed to reorder groups.', 'Не удалось изменить порядок групп.'))
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  return (
    <div className={styles.accountGroupsOverlay} role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="account-groups-title"
        aria-modal="true"
        className={styles.accountGroupsModal}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className={styles.accountGroupsHeader}>
          <div>
            <p className={styles.metricLabel}>{tr('Personal workspace', 'Персональное рабочее пространство')}</p>
            <h2 id="account-groups-title">{tr('Account groups', 'Группы аккаунтов')}</h2>
            <p>{tr('Create compact views for the accounts you work with.', 'Создавайте компактные подборки нужных аккаунтов.')}</p>
          </div>
          <button aria-label={tr('Close', 'Закрыть')} className={styles.accountGroupsClose} onClick={onClose} type="button">×</button>
        </header>

        <div className={styles.accountGroupsBody}>
          <aside className={styles.accountGroupsSidebar}>
            <button className={selectedId === 'new' ? styles.accountGroupItemActive : styles.accountGroupItem} onClick={() => editView(null)} type="button">
              {tr('+ New group', '+ Новая группа')}
            </button>
            {orderedViews.map((view) => (
              <button
                className={selectedId === String(view.id) ? styles.accountGroupItemActive : styles.accountGroupItem}
                key={view.id}
                onClick={() => editView(view)}
                type="button"
              >
                <span>{view.name}</span>
                <small>{view.account_ids?.length || 0}</small>
              </button>
            ))}
          </aside>

          <div className={styles.accountGroupsEditor}>
            <div className={styles.accountGroupsFormGrid}>
              <label className={styles.settingsField}>
                <span>{tr('Group name', 'Название группы')}</span>
                <input
                  maxLength={60}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder={tr('Main accounts', 'Основные аккаунты')}
                  value={draft.name}
                />
              </label>
              <label className={styles.settingsField}>
                <span>{tr('Find account', 'Найти аккаунт')}</span>
                <input
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={tr('Name, platform or ID', 'Название, платформа или ID')}
                  value={search}
                />
              </label>
            </div>

            <div className={styles.accountGroupsOptions}>
              <label>
                <input
                  checked={draft.is_pinned}
                  onChange={(event) => setDraft((current) => ({ ...current, is_pinned: event.target.checked }))}
                  type="checkbox"
                />
                <span>{tr('Show in the top row', 'Показывать в верхней строке')}</span>
              </label>
              <label>
                <input
                  checked={draft.is_default}
                  onChange={(event) => setDraft((current) => ({
                    ...current,
                    is_default: event.target.checked,
                    is_pinned: event.target.checked ? true : current.is_pinned,
                  }))}
                  type="checkbox"
                />
                <span>{tr('Open by default', 'Открывать по умолчанию')}</span>
              </label>
              <div className={styles.accountGroupsOrder}>
                <button disabled={!draft.id || saving} onClick={() => moveView(-1)} type="button">{tr('Move up', 'Выше')}</button>
                <button disabled={!draft.id || saving} onClick={() => moveView(1)} type="button">{tr('Move down', 'Ниже')}</button>
              </div>
            </div>

            <div className={styles.accountGroupsTableHeader}>
              <span>{tr('Account', 'Аккаунт')}</span>
              <span>{tr('In group', 'В группе')}</span>
              <span>{tr('Hide from overview', 'Скрыть с главной')}</span>
            </div>
            <div className={styles.accountGroupsAccountList}>
              {!filteredAccounts.length ? (
                <div className={styles.accountGroupsEmpty}>
                  {tr('No matching accounts. Try another search.', 'Нет подходящих аккаунтов. Измените запрос.')}
                </div>
              ) : filteredAccounts.map((account) => {
                const accountId = Number(account.accountId)
                return (
                  <div className={styles.accountGroupsAccountRow} key={accountId}>
                    <div>
                      <strong>{account.account}</strong>
                      <span>{account.platform} · {account.status}</span>
                    </div>
                    <label>
                      <input
                        checked={draft.account_ids.includes(accountId)}
                        onChange={() => toggleMember(accountId)}
                        type="checkbox"
                      />
                    </label>
                    <label>
                      <input
                        checked={hiddenDraft.includes(accountId)}
                        onChange={() => toggleHidden(accountId)}
                        type="checkbox"
                      />
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <footer className={styles.accountGroupsFooter}>
          <p aria-live="polite">{status}</p>
          <div>
            {draft.id ? (
              <button className={styles.accountGroupsDelete} disabled={saving} onClick={deleteView} type="button">
                {tr('Delete group', 'Удалить группу')}
              </button>
            ) : null}
            <button className={styles.settingsGhostButton} onClick={onClose} type="button">{tr('Cancel', 'Отмена')}</button>
            <button className={styles.settingsPrimaryButton} disabled={saving} onClick={saveChanges} type="button">
              {saving ? tr('Saving...', 'Сохраняем...') : tr('Save changes', 'Сохранить изменения')}
            </button>
          </div>
        </footer>
      </section>
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
  const [statusAlerts, setStatusAlerts] = useState(tr('0 Alerts', '0 уведомлений'))
  const [statusRows, setStatusRows] = useState([])
  const [loadError, setLoadError] = useState('')
  const [fundingAccountId, setFundingAccountId] = useState(null)
  const [accountRequestOpen, setAccountRequestOpen] = useState(false)
  const [accountViews, setAccountViews] = useState([])
  const [hiddenAccountIds, setHiddenAccountIds] = useState([])
  const [selectedAccountView, setSelectedAccountView] = useState('')
  const [accountSearch, setAccountSearch] = useState('')
  const [accountPlatformFilter, setAccountPlatformFilter] = useState('')
  const [accountStatusFilter, setAccountStatusFilter] = useState('')
  const [accountGroupsOpen, setAccountGroupsOpen] = useState(false)
  const [refreshingAccountIds, setRefreshingAccountIds] = useState([])
  const [refreshingAll, setRefreshingAll] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [customRangeActive, setCustomRangeActive] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  function translateOverviewLabel(value) {
    const v = String(value || '')
    if (v === 'Available Balance') return tr('Available Balance', 'Доступный баланс')
    if (v === 'Monthly Spend') return tr('Monthly Spend', 'Расход за месяц')
    if (v === 'Active Accounts') return tr('Active Accounts', 'Активные аккаунты')
    if (v === 'Pending Items') return tr('Pending Items', 'Ожидающие задачи')
    return v
  }

  function translateOverviewHint(value) {
    const v = String(value || '')
    if (v === 'Ready for allocation') return tr('Ready for allocation', 'Готов к распределению')
    if (v === 'Approvals, docs, renewals') return tr('Approvals, docs, renewals', 'Согласования, документы, продления')
    if (v === 'Current 30 days') return tr('Current 30 days', 'Текущие 30 дней')
    if (v === 'Completed account funding is currently covering period spend.') {
      return tr('Completed account funding is currently covering period spend.', 'Завершенные пополнения покрывают расход за период.')
    }
    if (v === 'Completed account funding is trailing period spend.') {
      return tr('Completed account funding is trailing period spend.', 'Завершенные пополнения отстают от расхода за период.')
    }
    if (v === 'Data unavailable') return tr('Data unavailable', 'Данные недоступны')
    if (v === 'Completed account funding by selected period.') {
      return tr('Completed account funding by selected period.', 'Только завершенные пополнения за выбранный период.')
    }
    if (v === 'Not connected') return tr('Not connected', 'Не подключено')
    if (v === 'Calculated') return tr('Calculated', 'Расчётный')
    if (v === 'Estimated') return tr('Estimated', 'Оценочный')
    if (v === 'Unavailable') return tr('Unavailable', 'Недоступно')
    if (v === 'Live') return tr('Live', 'Live')
    if (v === 'Not synced yet') return tr('Not synced yet', 'Ещё не синхронизировано')
    const syncedMatch = v.match(/^Synced\s+(.+)$/i)
    if (syncedMatch) {
      const raw = String(syncedMatch[1] || '').trim()
      if (/^just now$/i.test(raw)) return tr('Synced Just now', 'Синхронизировано только что')
      if (/^recently$/i.test(raw)) return tr('Synced Recently', 'Синхронизировано недавно')
      const hourMatch = raw.match(/^(\d+)\s+hours?\s+ago$/i)
      if (hourMatch) return tr(`Synced ${raw}`, `Синхронизировано ${hourMatch[1]} ч. назад`)
      const dayMatch = raw.match(/^(\d+)\s+days?\s+ago$/i)
      if (dayMatch) return tr(`Synced ${raw}`, `Синхронизировано ${dayMatch[1]} дн. назад`)
      return tr(`Synced ${raw}`, `Синхронизировано ${raw}`)
    }
    const acrossMatch = v.match(/^Across\s+(\d+)\s+platforms$/i)
    if (acrossMatch) return tr(`Across ${acrossMatch[1]} platforms`, `По ${acrossMatch[1]} платформам`)
    const vsMatch = v.match(/^vs last period\s+([+-]?\d+(?:\.\d+)?)%$/i)
    if (vsMatch) return tr(`vs last period ${vsMatch[1]}%`, `к прошлому периоду ${vsMatch[1]}%`)
    return v
  }

  function translateAction(value) {
    const v = String(value || '')
    if (v === 'Top up now') return tr('Top up now', 'Пополнить')
    if (v === 'Upload docs') return tr('Upload docs', 'Загрузить документы')
    if (v === 'Review') return tr('Review', 'Проверить')
    if (v === 'Open') return tr('Open', 'Открыть')
    if (v === 'Open request') return tr('Open request', 'Открыть запрос')
    return v
  }

  function translateStatus(value) {
    const v = String(value || '')
    if (v === 'Active') return tr('Active', 'Активен')
    if (v === 'Pending Setup') return tr('Pending Setup', 'Ожидает настройки')
    if (v === 'Paused') return tr('Paused', 'На паузе')
    if (v === 'Archived') return tr('Archived', 'Архив')
    return v
  }

  function markAccountRefreshing(accountId, refreshing) {
    const id = String(accountId || '').trim()
    if (!id) return
    setRefreshingAccountIds((current) => {
      const next = new Set(current)
      if (refreshing) next.add(id)
      else next.delete(id)
      return Array.from(next)
    })
  }

  async function requestAccountLiveBilling(accountId, token) {
    const id = String(accountId || '').trim()
    if (!id) throw new Error('account_id is required')
    const res = await fetch(`/api/client/accounts/${encodeURIComponent(id)}/refresh-live-billing`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (res.status === 401) {
      router.replace('/login')
      return false
    }
    const payload = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(payload?.detail || tr('Failed to refresh account balance', 'Не удалось обновить баланс аккаунта'))
    return true
  }

  async function refreshAccountLiveBilling(accountId) {
    const id = String(accountId || '').trim()
    if (!id) return
    if (refreshingAccountIds.includes(id)) return
    const token = getAuthToken()
    if (!token) {
      router.replace('/login')
      return
    }
    try {
      markAccountRefreshing(id, true)
      setLoadError('')
      const ok = await requestAccountLiveBilling(id, token)
      if (ok) await loadOverview({ loadAnalytics: false })
    } catch (error) {
      setLoadError(error?.message || tr('Failed to refresh account balance', 'Не удалось обновить баланс аккаунта'))
    } finally {
      markAccountRefreshing(id, false)
    }
  }

  async function refreshVisibleAccounts() {
    const ids = visibleAccounts.map((row) => String(row?.accountId || '').trim()).filter(Boolean)
    const uniqueIds = Array.from(new Set(ids))
    if (!uniqueIds.length || refreshingAll) return
    const token = getAuthToken()
    if (!token) {
      router.replace('/login')
      return
    }
    setRefreshingAll(true)
    setLoadError('')
    setRefreshingAccountIds(uniqueIds)
    try {
      for (const id of uniqueIds) {
        try {
          const ok = await requestAccountLiveBilling(id, token)
          if (ok) await loadOverview({ loadAnalytics: false })
        } catch (error) {
          setLoadError(error?.message || tr('Failed to refresh account balance', 'Не удалось обновить баланс аккаунта'))
        } finally {
          markAccountRefreshing(id, false)
        }
      }
    } finally {
      setRefreshingAll(false)
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

  async function loadOverviewAnalytics(next = {}) {
    const token = getAuthToken()
    if (!token) return

    const nextDateFrom = Object.prototype.hasOwnProperty.call(next, 'dateFrom') ? next.dateFrom : dateFrom
    const nextDateTo = Object.prototype.hasOwnProperty.call(next, 'dateTo') ? next.dateTo : dateTo
    const useCustom = Object.prototype.hasOwnProperty.call(next, 'useCustom') ? next.useCustom : customRangeActive

    try {
      setAnalyticsLoading(true)
      const params = new URLSearchParams()
      params.set('full', '1')
      if (useCustom && nextDateFrom && nextDateTo) {
        params.set('date_from', nextDateFrom)
        params.set('date_to', nextDateTo)
      }
      const res = await fetch(`/api/client/overview?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (res.status === 401) {
        router.replace('/login')
        return
      }
      if (!res.ok) return
      const payload = await res.json()
      if (payload?.capitalFlow) setCapitalFlow(payload.capitalFlow)
      if (Array.isArray(payload?.alerts)) {
        setAlerts(payload.alerts)
        setStatusAlerts(payload.statusAlerts || `${payload.alerts.length} Alerts`)
      }
    } finally {
      setAnalyticsLoading(false)
    }
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
    const shouldLoadAnalytics = next.loadAnalytics !== false

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
      if (!res.ok) throw new Error(tr('Failed to load overview', 'Не удалось загрузить overview'))
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
      setStatusAlerts(payload.statusAlerts || tr('0 Alerts', '0 уведомлений'))
      setStatusRows(Array.isArray(payload.statusRows) ? payload.statusRows : [])
      const payloadRange = payload?.range || {}
      setCustomRangeActive(Boolean(payloadRange.custom))
      setDateFrom(String(payloadRange.date_from || nextDateFrom || ''))
      setDateTo(String(payloadRange.date_to || nextDateTo || ''))
      if (shouldLoadAnalytics) {
        loadOverviewAnalytics({
          dateFrom: String(payloadRange.date_from || nextDateFrom || ''),
          dateTo: String(payloadRange.date_to || nextDateTo || ''),
          useCustom: Boolean(payloadRange.custom),
        })
      }
    } catch {
      setLoadError(tr('Failed to load overview data. Please refresh or contact support.', 'Не удалось загрузить данные overview. Обновите страницу или обратитесь в поддержку.'))
    } finally {
      setLoading(false)
    }
  }

  async function loadAccountViews() {
    const token = getAuthToken()
    if (!token) return
    try {
      const res = await fetch('/api/client/account-views', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (res.status === 401) {
        router.replace('/login')
        return
      }
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.detail || 'Failed to load account groups')
      const nextViews = Array.isArray(payload?.views) ? payload.views : []
      setAccountViews(nextViews)
      setHiddenAccountIds(Array.isArray(payload?.hidden_account_ids) ? payload.hidden_account_ids.map(Number) : [])
      setSelectedAccountView((current) => {
        const validIds = new Set(nextViews.map((view) => String(view.id)))
        if (current === 'all' || validIds.has(String(current))) return current
        const stored = typeof window !== 'undefined' ? window.localStorage.getItem('envidicy_account_view') : ''
        if (stored === 'all' || validIds.has(String(stored))) return stored
        const defaultView = nextViews.find((view) => view.is_default)
        return defaultView ? String(defaultView.id) : 'all'
      })
    } catch (error) {
      setSelectedAccountView((current) => current || 'all')
      setLoadError(error?.message || tr('Failed to load account groups.', 'Не удалось загрузить группы аккаунтов.'))
    }
  }

  function selectAccountView(viewId) {
    const nextId = String(viewId || 'all')
    setSelectedAccountView(nextId)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('envidicy_account_view', nextId)
    }
  }

  useEffect(() => {
    loadOverview()
    loadAccountViews()
  }, [router])

  const pendingHint = useMemo(() => {
    const parts = []
    if (pendingSummary.approvals) parts.push(`${pendingSummary.approvals} ${tr('approvals', 'согласований')}`)
    if (pendingSummary.funding) parts.push(`${pendingSummary.funding} ${tr('funding', 'пополнений')}`)
    if (pendingSummary.documents) parts.push(`${pendingSummary.documents} ${tr('docs', 'документов')}`)
    return parts.join(' / ') || tr('No client actions pending', 'Нет ожидающих действий клиента')
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

  const hiddenAccountSet = useMemo(
    () => new Set(hiddenAccountIds.map(Number)),
    [hiddenAccountIds]
  )

  const overviewAccounts = useMemo(
    () => dedupedAccounts.filter((row) => !hiddenAccountSet.has(Number(row?.accountId))),
    [dedupedAccounts, hiddenAccountSet]
  )

  const orderedAccountViews = useMemo(
    () => [...accountViews].sort((a, b) => Number(a.position || 0) - Number(b.position || 0) || Number(a.id) - Number(b.id)),
    [accountViews]
  )

  const pinnedAccountViews = useMemo(
    () => orderedAccountViews.filter((view) => view.is_pinned).slice(0, 5),
    [orderedAccountViews]
  )

  const overflowAccountViews = useMemo(
    () => orderedAccountViews.filter((view) => !pinnedAccountViews.some((pinned) => Number(pinned.id) === Number(view.id))),
    [orderedAccountViews, pinnedAccountViews]
  )

  const selectedView = useMemo(
    () => orderedAccountViews.find((view) => String(view.id) === String(selectedAccountView)) || null,
    [orderedAccountViews, selectedAccountView]
  )

  const viewScopedAccounts = useMemo(() => {
    if (!selectedAccountView) return []
    if (selectedAccountView === 'all' || !selectedView) return overviewAccounts
    const memberIds = new Set((selectedView.account_ids || []).map(Number))
    return overviewAccounts.filter((row) => memberIds.has(Number(row?.accountId)))
  }, [overviewAccounts, selectedAccountView, selectedView])

  const accountPlatformOptions = useMemo(
    () => Array.from(new Set(overviewAccounts.map((row) => String(row?.platform || '').trim()).filter(Boolean))).sort(),
    [overviewAccounts]
  )

  const accountStatusOptions = useMemo(
    () => Array.from(new Set(overviewAccounts.map((row) => String(row?.status || '').trim()).filter(Boolean))).sort(),
    [overviewAccounts]
  )

  const visibleAccounts = useMemo(() => {
    const needle = accountSearch.trim().toLowerCase()
    return viewScopedAccounts.filter((row) => {
      if (accountPlatformFilter && String(row?.platform || '') !== accountPlatformFilter) return false
      if (accountStatusFilter && String(row?.status || '') !== accountStatusFilter) return false
      if (!needle) return true
      return [
        row?.account,
        row?.platform,
        row?.status,
        row?.accountId,
        row?.externalId,
        row?.accountCode,
      ].some((value) => String(value || '').toLowerCase().includes(needle))
    })
  }, [viewScopedAccounts, accountSearch, accountPlatformFilter, accountStatusFilter])

  const accountViewCounts = useMemo(() => {
    const availableIds = new Set(overviewAccounts.map((row) => Number(row?.accountId)))
    const counts = { all: overviewAccounts.length }
    for (const view of orderedAccountViews) {
      counts[String(view.id)] = (view.account_ids || []).filter((id) => availableIds.has(Number(id))).length
    }
    return counts
  }, [overviewAccounts, orderedAccountViews])

  const accountFiltersActive = Boolean(accountSearch || accountPlatformFilter || accountStatusFilter)

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
      setLoadError(tr('Select both dates to apply a custom range.', 'Выберите обе даты, чтобы применить произвольный диапазон.'))
      return
    }
    if (dateFrom > dateTo) {
      setLoadError(tr('Start date must be earlier than end date.', 'Дата начала должна быть раньше даты окончания.'))
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
      pageTitle={tr('Overview', 'Обзор')}
      pageSubtitle={tr('Track your balances, account status and approvals.', 'Отслеживайте балансы, статусы аккаунтов и согласования.')}
      pageActionLabel={tr('Request Account', 'Запросить аккаунт')}
      pageActionOnClick={() => setAccountRequestOpen(true)}
      headerActionLabel={tr('Create Request', 'Создать запрос')}
      headerActionOnClick={() => setAccountRequestOpen(true)}
      entityLabel={tr('Entity Switcher', 'Переключатель юрлица')}
      statusAlerts={loading ? tr('Loading...', 'Loading...') : statusAlerts}
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
            <h3 className={styles.sectionTitle}>{tr('Ad Accounts Overview', 'Обзор рекламных аккаунтов')}</h3>
            <div className={styles.tagRow}>
              <span className={styles.tag}>{accountTags.active} {tr('Active', 'Активны')}</span>
              <span className={styles.tagDanger}>{accountTags.warn} {tr('Need Attention', 'Требуют внимания')}</span>
              <span className={styles.tagMuted}>{accountTags.pending} {tr('Setup Pending', 'Ожидают настройки')}</span>
            </div>
          </div>
          <div className={styles.headerControls}>
            <button
              className={styles.outlinedActionButton}
              disabled={!visibleAccounts.some((row) => row.accountId) || refreshingAll}
              onClick={refreshVisibleAccounts}
              type="button"
            >
              {refreshingAll ? tr('Refreshing...', 'Обновляем...') : tr('Refresh All', 'Обновить все')}
            </button>
            <button className={styles.headerPrimaryAction} onClick={() => setAccountRequestOpen(true)} type="button">
              {tr('New Account Request', 'Новый запрос на аккаунт')}
            </button>
            <Link className={styles.outlinedAction} href="/funds">
              {tr('View All Accounts', 'Все аккаунты')}
            </Link>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <div className={styles.accountViewsToolbar}>
            <div className={styles.accountViewsRow}>
              <button
                className={selectedAccountView === 'all' ? styles.accountViewChipActive : styles.accountViewChip}
                onClick={() => selectAccountView('all')}
                type="button"
              >
                <span>{tr('All', 'Все')}</span>
                <small>{accountViewCounts.all || 0}</small>
              </button>
              {pinnedAccountViews.map((view) => (
                <button
                  className={selectedAccountView === String(view.id) ? styles.accountViewChipActive : styles.accountViewChip}
                  key={view.id}
                  onClick={() => selectAccountView(view.id)}
                  type="button"
                >
                  <span>{view.name}</span>
                  <small>{accountViewCounts[String(view.id)] || 0}</small>
                </button>
              ))}
              {overflowAccountViews.length ? (
                <select
                  aria-label={tr('More account groups', 'Другие группы аккаунтов')}
                  className={styles.accountViewsMore}
                  onChange={(event) => {
                    if (event.target.value) selectAccountView(event.target.value)
                  }}
                  value={overflowAccountViews.some((view) => String(view.id) === selectedAccountView) ? selectedAccountView : ''}
                >
                  <option value="">{tr('More groups', 'Ещё группы')}</option>
                  {overflowAccountViews.map((view) => (
                    <option key={view.id} value={String(view.id)}>
                      {view.name} ({accountViewCounts[String(view.id)] || 0})
                    </option>
                  ))}
                </select>
              ) : null}
              <button className={styles.accountViewsManage} onClick={() => setAccountGroupsOpen(true)} type="button">
                {tr('Manage groups', 'Настроить группы')}
              </button>
            </div>

            <div className={styles.accountFiltersRow}>
              <label className={styles.accountSearchField}>
                <span className={styles.srOnly}>{tr('Search accounts', 'Поиск аккаунтов')}</span>
                <input
                  onChange={(event) => setAccountSearch(event.target.value)}
                  placeholder={tr('Search by name, platform or ID', 'Поиск по названию, платформе или ID')}
                  type="search"
                  value={accountSearch}
                />
              </label>
              <select
                aria-label={tr('Filter by platform', 'Фильтр по платформе')}
                onChange={(event) => setAccountPlatformFilter(event.target.value)}
                value={accountPlatformFilter}
              >
                <option value="">{tr('All platforms', 'Все платформы')}</option>
                {accountPlatformOptions.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
              </select>
              <select
                aria-label={tr('Filter by status', 'Фильтр по статусу')}
                onChange={(event) => setAccountStatusFilter(event.target.value)}
                value={accountStatusFilter}
              >
                <option value="">{tr('All statuses', 'Все статусы')}</option>
                {accountStatusOptions.map((status) => <option key={status} value={status}>{translateStatus(status)}</option>)}
              </select>
              <span className={styles.accountResultsCount}>
                {visibleAccounts.length} {tr('shown', 'показано')}
              </span>
              {accountFiltersActive ? (
                <button
                  className={styles.accountFiltersReset}
                  onClick={() => {
                    setAccountSearch('')
                    setAccountPlatformFilter('')
                    setAccountStatusFilter('')
                  }}
                  type="button"
                >
                  {tr('Reset filters', 'Сбросить')}
                </button>
              ) : null}
            </div>
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
                <th>{tr('Account', 'Аккаунт')}</th>
                <th>{tr('Platform', 'Платформа')}</th>
                <th>{tr('Status', 'Статус')}</th>
                <th>{tr('Balance', 'Баланс')}</th>
                <th>{tr('Spend', 'Расход')}</th>
                <th>{tr('Note', 'Комментарий')}</th>
                <th>{tr('Action', 'Действие')}</th>
              </tr>
            </thead>
            <tbody>
              {!visibleAccounts.length ? (
                <tr>
                  <td colSpan={7}>
                    <div className={styles.accountListEmpty}>
                      <strong>{tr('No accounts in this view', 'В этой группе нет аккаунтов')}</strong>
                      <span>
                        {accountFiltersActive
                          ? tr('Reset filters or try another search.', 'Сбросьте фильтры или измените поисковый запрос.')
                          : tr('Open group settings to add accounts or show hidden ones.', 'Откройте настройки групп, чтобы добавить аккаунты или вернуть скрытые.')}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : visibleAccounts.map((row, index) => (
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
                        aria-label={tr('Top up account', 'Пополнить аккаунт')}
                        className={styles.accountIconButton}
                        disabled={!row.accountId}
                        onClick={() => openFundingModal(row.accountId)}
                        title={tr('Top up account', 'Пополнить аккаунт')}
                        type="button"
                      >
                        <AccountActionIcon type="topup" />
                      </button>
                      <button
                        aria-label={tr('Open dashboard', 'Открыть дашборд')}
                        className={styles.accountIconButton}
                        onClick={() => openAccountDashboard(row.accountId)}
                        title={tr('Open dashboard', 'Открыть дашборд')}
                        type="button"
                      >
                        <AccountActionIcon type="dashboard" />
                      </button>
                      <button
                        aria-label={tr('Refresh account balance', 'Обновить баланс аккаунта')}
                        className={`${styles.accountIconButton} ${refreshingAccountIds.includes(String(row.accountId || '')) ? styles.accountIconButtonLoading : ''}`}
                        disabled={!row.accountId || refreshingAccountIds.includes(String(row.accountId || ''))}
                        onClick={() => handleOverviewAction('refresh', row.accountId)}
                        title={tr('Refresh account balance', 'Обновить баланс аккаунта')}
                        type="button"
                      >
                        <AccountActionIcon type="refresh" />
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
                  ? tr('Completed Funding Timeline', 'Динамика завершенных пополнений')
                  : tr('Spend vs Completed Funding', 'Расход vs Завершенные пополнения')}
              </h3>
              <p className={styles.chartInsight}>
                {analyticsLoading ? tr('Updating chart...', 'Обновляем график...') : translateOverviewHint(capitalFlow.insight)}
              </p>
            </div>
            <div className={styles.dateRangeControls}>
              <input
                className={styles.dateInput}
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                max={dateTo || undefined}
                aria-label={tr('Date from', 'Дата с')}
                title={tr('Date from', 'Дата с')}
              />
              <input
                className={styles.dateInput}
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                min={dateFrom || undefined}
                aria-label={tr('Date to', 'Дата по')}
                title={tr('Date to', 'Дата по')}
              />
              <button className={styles.dateApplyButton} onClick={applyOverviewRange} type="button">
                {tr('Apply', 'Применить')}
              </button>
              <button className={styles.dateResetButton} onClick={resetOverviewRange} type="button">
                {customRangeActive ? tr('Reset', 'Сброс') : tr('Last 30d', '30 дней')}
              </button>
            </div>
          </div>

          <div className={styles.chartMetrics}>
            <div className={styles.chartMetric}>
              <span>{tr('Top-ups', 'Пополнения')}</span>
              <strong>{capitalFlow.topups}</strong>
            </div>
            {capitalFlow?.spendVisible === false ? (
              <div className={styles.chartMetric}>
                <span>{tr('Days with completed top-up', 'Дней с завершенным пополнением')}</span>
                <strong>{String(topupDaysCount)}</strong>
              </div>
            ) : (
              <>
                <div className={styles.chartMetric}>
                  <span>{tr('Spend', 'Расход')}</span>
                  <strong>{capitalFlow.spend}</strong>
                </div>
                <div className={styles.chartMetric}>
                  <span>{tr('Net Flow', 'Чистый поток')}</span>
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
                'За этот период не было завершенных пополнений аккаунтов.'
              )}
              
            </div>
          ) : null}

        </article>

        <div className={styles.rightStack}>
          <article className={styles.smallCard}>
            <h3 className={styles.smallTitle}>{tr('Important Alerts', 'Важные уведомления')}</h3>
            <div className={styles.alertList}>
              {displayAlerts.map((item) => (
                <div className={styles.alertItem} key={item.id || item.title}>
                  <strong>{item.title}</strong>
                  {item.action === tr('Top up now', 'Пополнить') && item.accountId ? (
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
              <h3 className={styles.sectionTitle}>{tr('Recent Activity', 'Недавняя активность')}</h3>
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
              <h3 className={styles.sectionTitle}>{tr('Pending Requests', 'Ожидающие запросы')}</h3>
            </div>
            <Link className={styles.linkAction} href="/funds">
              {tr('View All', 'Смотреть все')}
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

      <AccountGroupsModal
        accounts={dedupedAccounts}
        hiddenAccountIds={hiddenAccountIds}
        onClose={() => setAccountGroupsOpen(false)}
        onReload={loadAccountViews}
        open={accountGroupsOpen}
        tr={tr}
        views={orderedAccountViews}
      />
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


