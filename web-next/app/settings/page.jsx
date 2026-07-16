'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { apiFetch } from '../../lib/api'
import { clearAuth, getAuthToken } from '../../lib/auth'
import ClientShell from '../../components/client/ClientShell'
import styles from '../../components/client/client.module.css'
import { useI18n } from '../../lib/i18n/client'

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://envidicy-dash-client.onrender.com').replace(/\/$/, '')

function authHeaders() {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function SettingsPage() {
  const router = useRouter()
  const { tr } = useI18n()
  const [tab, setTab] = useState('profile')

  const [profile, setProfile] = useState({
    name: '',
    company: '',
    email: '',
    language: 'ru',
    whatsapp_phone: '',
    telegram_handle: '',
    avatar_url: '',
    can_manage_accesses: false,
  })
  const [profileStatus, setProfileStatus] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarStatus, setAvatarStatus] = useState('')

  const [passwordState, setPasswordState] = useState({ current_password: '', new_password: '', confirm_password: '' })
  const [passwordStatus, setPasswordStatus] = useState('')

  const [accessEmail, setAccessEmail] = useState('')
  const [accessStatus, setAccessStatus] = useState('')
  const [accesses, setAccesses] = useState([])
  const [accessSetupUrl, setAccessSetupUrl] = useState('')
  const [accessSetupEmail, setAccessSetupEmail] = useState('')

  const [fees, setFees] = useState(null)
  const [documents, setDocuments] = useState([])
  const [docsStatus, setDocsStatus] = useState('')
  const [apiKeys, setApiKeys] = useState([])
  const [apiKeyStatus, setApiKeyStatus] = useState('')
  const [apiKeySecret, setApiKeySecret] = useState('')
  const [apiKeyCreating, setApiKeyCreating] = useState(false)
  const [apiKeyForm, setApiKeyForm] = useState({
    name: '',
    expires_in_days: '365',
    scopes: {
      'accounts:read': true,
      'finance:read': true,
      'performance:read': true,
    },
  })

  const canManageAccesses = Boolean(profile.can_manage_accesses)

  const visibleTabs = useMemo(
    () => [
      { key: 'profile', label: tr('Profile', 'Профиль') },
      { key: 'security', label: tr('Security', 'Безопасность') },
      ...(canManageAccesses ? [{ key: 'accesses', label: tr('Accesses', 'Доступы') }] : []),
      { key: 'fees', label: tr('Fees', 'Комиссии') },
      { key: 'docs', label: tr('Documents', 'Документы') },
      ...(canManageAccesses ? [{ key: 'developer', label: tr('Developer API', 'API для интеграций') }] : []),
    ],
    [canManageAccesses, tr]
  )

  async function safeFetch(path, options = {}) {
    const res = await apiFetch(path, { ...options, headers: { ...(options.headers || {}), ...authHeaders() } })
    if (res.status === 401) {
      clearAuth()
      router.push('/login')
      throw new Error('Unauthorized')
    }
    return res
  }

  async function loadProfile() {
    try {
      const res = await safeFetch('/profile')
      if (!res.ok) throw new Error('profile failed')
      const data = await res.json()
      setProfile((prev) => ({
        ...prev,
        name: data.name || '',
        company: data.company || '',
        email: data.email || '',
        language: data.language || 'ru',
        whatsapp_phone: data.whatsapp_phone || '',
        telegram_handle: data.telegram_handle || '',
        avatar_url: data.avatar_url || '',
        can_manage_accesses: Boolean(data.can_manage_accesses),
      }))
      if (Boolean(data.can_manage_accesses)) loadAccesses()
    } catch {
      setProfileStatus(tr('Failed to load profile.', 'Не удалось загрузить профиль.'))
    }
  }

  async function loadAccesses() {
    if (!canManageAccesses && !profile.can_manage_accesses) return
    try {
      const res = await safeFetch('/profile/accesses')
      if (res.status === 403) return
      if (!res.ok) throw new Error('accesses failed')
      const data = await res.json()
      setAccesses(Array.isArray(data.items) ? data.items : [])
    } catch {
      setAccessStatus(tr('Failed to load accesses.', 'Не удалось загрузить доступы.'))
    }
  }

  async function addAccess() {
    const email = accessEmail.trim().toLowerCase()
    if (!email) {
      setAccessStatus(tr('Enter an email.', 'Введите email.'))
      return
    }
    setAccessStatus(tr('Adding access...', 'Добавляем доступ...'))
    try {
      const res = await safeFetch('/profile/accesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'create access failed')
      setAccessEmail('')
      const setupUrl = String(data?.setup_url || '').trim()
      setAccessSetupUrl(setupUrl)
      setAccessSetupEmail(String(data?.email || email || '').trim())
      if (setupUrl) {
        setAccessStatus(tr('Access added. Share the setup link below with the invited email.', 'Access added. Share the setup link below with the invited email.'))
      } else {
        setAccessStatus(tr('Access added. Secondary email can set a password on the login page.', 'Access added. Secondary email can set a password on the login page.'))
      }
      await loadAccesses()
    } catch (e) {
      setAccessStatus(e?.message || tr('Failed to add access.', 'Не удалось добавить доступ.'))
    }
  }

  async function deleteAccess(id) {
    if (!id) return
    if (!window.confirm(tr('Delete this secondary access?', 'Удалить этот дополнительный доступ?'))) return
    setAccessStatus(tr('Removing access...', 'Удаляем доступ...'))
    try {
      const res = await safeFetch(`/profile/accesses/${id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'delete access failed')
      setAccessStatus(tr('Access removed.', 'Access removed.'))
      setAccessSetupUrl('')
      setAccessSetupEmail('')
      await loadAccesses()
    } catch (e) {
      setAccessStatus(e?.message || tr('Failed to remove access.', 'Не удалось удалить доступ.'))
    }
  }


  async function copyAccessSetupUrl() {
    if (!accessSetupUrl) return
    try {
      await navigator.clipboard.writeText(accessSetupUrl)
      setAccessStatus(tr('Setup link copied.', 'Setup link copied.'))
    } catch {
      setAccessStatus(tr('Failed to copy setup link.', 'Failed to copy setup link.'))
    }
  }

  async function saveProfile() {
    setProfileStatus(tr('Saving...', 'Сохраняем...'))
    try {
      const res = await safeFetch('/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name?.trim() || null,
          company: profile.company?.trim() || null,
          language: profile.language || 'ru',
          whatsapp_phone: profile.whatsapp_phone?.trim() || null,
          telegram_handle: profile.telegram_handle?.trim() || null,
        }),
      })
      if (!res.ok) throw new Error('save failed')
      setProfileStatus(tr('Profile saved.', 'Профиль сохранён.'))
    } catch {
      setProfileStatus(tr('Failed to save changes.', 'Не удалось сохранить изменения.'))
    }
  }

  async function uploadAvatar() {
    if (!avatarFile) {
      setAvatarStatus(tr('Choose a file.', 'Выберите файл.'))
      return
    }
    setAvatarStatus(tr('Uploading...', 'Загрузка...'))
    const form = new FormData()
    form.append('file', avatarFile)
    try {
      const res = await safeFetch('/profile/avatar', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('upload failed')
      const data = await res.json()
      setProfile((prev) => ({ ...prev, avatar_url: data.avatar_url || prev.avatar_url }))
      setAvatarStatus(tr('Avatar updated.', 'Аватар обновлён.'))
    } catch {
      setAvatarStatus(tr('Failed to upload avatar.', 'Не удалось загрузить аватар.'))
    }
  }

  async function changePassword() {
    const current = passwordState.current_password.trim()
    const next = passwordState.new_password.trim()
    const confirm = passwordState.confirm_password.trim()

    if (!current || !next) {
      setPasswordStatus(tr('Fill current and new password.', 'Заполните текущий и новый пароль.'))
      return
    }
    if (next !== confirm) {
      setPasswordStatus(tr('Passwords do not match.', 'Пароли не совпадают.'))
      return
    }

    setPasswordStatus(tr('Changing password...', 'Меняем пароль...'))
    try {
      const res = await safeFetch('/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: current, new_password: next }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'change failed')

      if (data?.token && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token)
      }

      setPasswordState({ current_password: '', new_password: '', confirm_password: '' })
      setPasswordStatus(tr('Password changed.', 'Пароль изменён.'))
    } catch {
      setPasswordStatus(tr('Failed to change password.', 'Не удалось изменить пароль.'))
    }
  }

  async function loadFees() {
    try {
      const res = await safeFetch('/fees')
      if (!res.ok) throw new Error('fees failed')
      const data = await res.json()
      setFees(data || {})
    } catch {
      setFees({ __error: true })
    }
  }

  async function loadDocuments() {
    try {
      const res = await safeFetch('/documents')
      if (!res.ok) throw new Error('docs failed')
      const data = await res.json()
      setDocuments(Array.isArray(data) ? data : [])
      setDocsStatus('')
    } catch {
      setDocuments([])
      setDocsStatus(tr('Failed to load documents.', 'Не удалось загрузить документы.'))
    }
  }

  async function loadApiKeys() {
    if (!canManageAccesses && !profile.can_manage_accesses) return
    try {
      const res = await safeFetch('/profile/api-keys')
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to load API keys.')
      setApiKeys(Array.isArray(data?.items) ? data.items : [])
      setApiKeyStatus('')
    } catch (e) {
      setApiKeyStatus(e?.message || tr('Failed to load API keys.', 'Не удалось загрузить API-ключи.'))
    }
  }

  async function createApiKey() {
    const name = apiKeyForm.name.trim()
    const scopes = Object.entries(apiKeyForm.scopes)
      .filter(([, enabled]) => enabled)
      .map(([scope]) => scope)
    if (name.length < 2) {
      setApiKeyStatus(tr('Enter a key name.', 'Укажите название ключа.'))
      return
    }
    if (!scopes.length) {
      setApiKeyStatus(tr('Select at least one permission.', 'Выберите хотя бы одно разрешение.'))
      return
    }
    setApiKeyCreating(true)
    setApiKeyStatus(tr('Creating API key...', 'Создаём API-ключ...'))
    setApiKeySecret('')
    try {
      const res = await safeFetch('/profile/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          scopes,
          expires_in_days: Number(apiKeyForm.expires_in_days || 365),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to create API key.')
      setApiKeySecret(String(data.secret || ''))
      setApiKeyForm((current) => ({ ...current, name: '' }))
      await loadApiKeys()
      setApiKeyStatus(
        tr(
          'API key created. Copy it now — it will not be shown again.',
          'API-ключ создан. Скопируйте его сейчас — повторно он показан не будет.'
        )
      )
    } catch (e) {
      setApiKeyStatus(e?.message || tr('Failed to create API key.', 'Не удалось создать API-ключ.'))
    } finally {
      setApiKeyCreating(false)
    }
  }

  async function copyApiKey() {
    if (!apiKeySecret) return
    try {
      await navigator.clipboard.writeText(apiKeySecret)
      setApiKeyStatus(tr('API key copied.', 'API-ключ скопирован.'))
    } catch {
      setApiKeyStatus(tr('Failed to copy API key.', 'Не удалось скопировать API-ключ.'))
    }
  }

  async function revokeApiKey(row) {
    if (!row?.id) return
    if (!window.confirm(
      tr(
        `Revoke API key "${row.name}"? Existing integrations will stop working immediately.`,
        `Отозвать API-ключ «${row.name}»? Интеграции с этим ключом сразу перестанут работать.`
      )
    )) return
    setApiKeyStatus(tr('Revoking API key...', 'Отзываем API-ключ...'))
    try {
      const res = await safeFetch(`/profile/api-keys/${row.id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Failed to revoke API key.')
      setApiKeySecret('')
      await loadApiKeys()
      setApiKeyStatus(tr('API key revoked.', 'API-ключ отозван.'))
    } catch (e) {
      setApiKeyStatus(e?.message || tr('Failed to revoke API key.', 'Не удалось отозвать API-ключ.'))
    }
  }

  async function downloadDocument(row) {
    if (!row?.id) return
    const token = getAuthToken()
    if (!token) {
      clearAuth()
      router.push('/login')
      return
    }
    setDocsStatus('')
    try {
      const res = await fetch(`/api/client/documents/${row.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (res.status === 401) {
        clearAuth()
        router.push('/login')
        return
      }
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.detail || tr('Failed to download document.', 'Не удалось скачать документ.'))
      }

      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const disposition = res.headers.get('content-disposition') || ''
      const match = disposition.match(/filename="?([^"]+)"?/)
      const fileName = match?.[1] || row.title || `document-${row.id}`
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    } catch (e) {
      setDocsStatus(e?.message || tr('Failed to download document.', 'Не удалось скачать документ.'))
    }
  }

  useEffect(() => {
    loadProfile()
    loadFees()
    loadDocuments()
  }, [])

  useEffect(() => {
    if (tab === 'accesses' && canManageAccesses) {
      loadAccesses()
    }
    if (tab === 'developer' && canManageAccesses) {
      loadApiKeys()
    }
  }, [tab, canManageAccesses])

  return (
    <ClientShell
      activeNav=""
      headerActionLabel=""
      pageActionLabel=""
      pageSubtitle={tr('Profile, security, accesses, fees, documents and integrations.', 'Профиль, безопасность, доступы, комиссии, документы и интеграции.')}
      pageTitle={tr('Settings', 'Настройки')}
    >
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.metricLabel}>{tr('Profile', 'Профиль')}</p>
            <h2 className={styles.sectionTitle}>{tr('Account settings', 'Настройки аккаунта')}</h2>
          </div>
          <span className={styles.tagMuted}>{tr('Private', 'Личный')}</span>
        </div>

        <div className={styles.settingsSectionBody}>
          <div className={styles.settingsTabsRow}>
            <div className={styles.settingsTabs}>
            {visibleTabs.map((t) => (
                <button
                  className={tab === t.key ? styles.settingsTabActive : styles.settingsTab}
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  type="button"
                >
                {t.label}
              </button>
            ))}
            </div>
          </div>

          {tab === 'profile' ? (
            <div className={styles.settingsTabPanel}>
              <div className={styles.settingsAvatarRow}>
                <div className={styles.settingsAvatarLarge} id="profile-avatar-preview">
                  {profile.avatar_url ? (
                    <img alt={tr('avatar', 'аватар')} src={`${API_BASE}${profile.avatar_url}`} />
                  ) : (
                    <span className={styles.settingsAvatarFallback}>{(profile.email || 'U').trim().charAt(0).toUpperCase() || '?'}</span>
                  )}
                </div>
                <div className={styles.settingsAvatarActions}>
                  <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
                  <button className={styles.settingsGhostButton} onClick={uploadAvatar} type="button">
                    {tr('Upload avatar', 'Загрузить аватар')}
                  </button>
                  <p className={styles.settingsMuted}>{avatarStatus}</p>
                </div>
              </div>

              <div className={styles.settingsFieldGrid}>
                <label className={styles.settingsField}>
                  <span>{tr('Name', 'Имя')}</span>
                  <input type="text" value={profile.name} onChange={(e) => setProfile((s) => ({ ...s, name: e.target.value }))} />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Company', 'Компания')}</span>
                  <input type="text" value={profile.company} onChange={(e) => setProfile((s) => ({ ...s, company: e.target.value }))} />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Email', 'Email')}</span>
                  <input value={profile.email} type="email" disabled />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Language', 'Язык')}</span>
                  <select value={profile.language} onChange={(e) => setProfile((s) => ({ ...s, language: e.target.value }))}>
                    <option value="ru">{tr('Russian', 'Русский')}</option>
                    <option value="en">{tr('English', 'Английский')}</option>
                  </select>
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('WhatsApp', 'WhatsApp')}</span>
                  <input type="text" value={profile.whatsapp_phone} onChange={(e) => setProfile((s) => ({ ...s, whatsapp_phone: e.target.value }))} />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Telegram', 'Telegram')}</span>
                  <input type="text" value={profile.telegram_handle} onChange={(e) => setProfile((s) => ({ ...s, telegram_handle: e.target.value }))} />
                </label>
              </div>
              <div className={styles.settingsActions}>
                <button className={styles.settingsPrimaryButton} onClick={saveProfile} type="button">
                  {tr('Save', 'Сохранить')}
                </button>
              </div>
              <p className={styles.settingsMuted}>{profileStatus}</p>
            </div>
          ) : null}

          {tab === 'security' ? (
            <div className={styles.settingsTabPanel}>
              <div className={styles.settingsFieldGrid}>
                <label className={styles.settingsField}>
                  <span>{tr('Current password', 'Текущий пароль')}</span>
                  <input type="password" value={passwordState.current_password} onChange={(e) => setPasswordState((s) => ({ ...s, current_password: e.target.value }))} />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('New password', 'Новый пароль')}</span>
                  <input type="password" value={passwordState.new_password} onChange={(e) => setPasswordState((s) => ({ ...s, new_password: e.target.value }))} />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Confirm password', 'Подтвердите пароль')}</span>
                  <input type="password" value={passwordState.confirm_password} onChange={(e) => setPasswordState((s) => ({ ...s, confirm_password: e.target.value }))} />
                </label>
              </div>
              <div className={styles.settingsActions}>
                <button className={styles.settingsPrimaryButton} onClick={changePassword} type="button">
                  {tr('Change password', 'Сменить пароль')}
                </button>
              </div>
              <p className={styles.settingsMuted}>{passwordStatus}</p>
            </div>
          ) : null}

          {tab === 'accesses' && canManageAccesses ? (
            <div className={styles.settingsTabPanel}>
              <div className={styles.settingsFieldGridSingle}>
                <label className={styles.settingsField}>
                  <span>{tr('Secondary email', 'Дополнительный email')}</span>
                  <input value={accessEmail} onChange={(e) => setAccessEmail(e.target.value)} type="email" placeholder={tr('team@company.com', 'team@company.com')} />
                </label>
              </div>
              <div className={styles.settingsActions}>
                <button className={styles.settingsPrimaryButton} onClick={addAccess} type="button">
                  {tr('Add access', 'Добавить доступ')}
                </button>
              </div>
              <p className={styles.settingsMuted}>
                {tr(
                  'Added email can access the same workspace after setting a password on the login page.',
                  'Добавленный email получит доступ к тому же рабочему пространству после установки пароля на странице входа.'
                )}
              </p>
              <p className={styles.settingsMuted}>{accessStatus}</p>
              {accessSetupUrl ? (
                <div className={styles.settingsNotice}>
                  <p>
                    {tr('Share this one-time setup link with invited email:', 'Share this one-time setup link with invited email:')}{' '}
                    {accessSetupEmail || '-'}
                  </p>
                  <p>
                    <a href={accessSetupUrl} rel="noreferrer" target="_blank">{accessSetupUrl}</a>
                  </p>
                  <button className={styles.settingsGhostButton} onClick={copyAccessSetupUrl} type="button">
                    {tr('Copy setup link', 'Copy setup link')}
                  </button>
                </div>
              ) : null}
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{tr('Email', 'Email')}</th>
                      <th>{tr('Role', 'Роль')}</th>
                      <th>{tr('Status', 'Статус')}</th>
                      <th style={{ textAlign: 'right' }}>{tr('Action', 'Действие')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!accesses.length ? (
                      <tr>
                        <td colSpan={4} className={styles.tableSubtle}>
                          {tr('No secondary accesses yet.', 'Пока нет дополнительных доступов.')}
                        </td>
                      </tr>
                    ) : (
                      accesses.map((row) => {
                        const isOwner = (row.role || 'member') === 'owner'
                        return (
                          <tr key={row.id}>
                            <td>{row.email || '?'}</td>
                            <td>{isOwner ? tr('Owner', 'Владелец') : tr('Secondary', 'Дополнительный')}</td>
                            <td>{row.needs_password ? tr('Awaiting password', 'Awaiting password') : row.status === 'active' ? tr('Active', 'Active') : row.status || '?'}</td>
                            <td style={{ textAlign: 'right' }}>
                              {isOwner ? (
                                <span className={styles.tableSubtle}>{tr('Cannot delete', 'Нельзя удалить')}</span>
                              ) : (
                                <button className={styles.tableActionButton} onClick={() => deleteAccess(row.id)} type="button">
                                  {tr('Delete', 'Удалить')}
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {tab === 'fees' ? (
            <div className={styles.settingsTabPanel}>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{tr('Platform', 'Платформа')}</th>
                      <th>{tr('Fee', 'Комиссия')}</th>
                      <th>{tr('Note', 'Примечание')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees?.__error ? (
                      <tr>
                        <td colSpan={3} className={styles.tableSubtle}>
                          {tr('Failed to load fees.', 'Не удалось загрузить комиссии.')}
                        </td>
                      </tr>
                    ) : (
                      [
                        { key: 'meta', platform: 'Meta', note: 'Facebook / Instagram' },
                        { key: 'google', platform: 'Google Ads', note: 'Search / Display / YouTube' },
                        { key: 'yandex', platform: 'Yandex Direct', note: 'Search / Network' },
                        { key: 'tiktok', platform: 'TikTok Ads', note: 'Video' },
                        { key: 'telegram', platform: 'Telegram Ads', note: 'Channels / Bots' },
                        { key: 'monochrome', platform: 'Monochrome', note: 'Programmatic' },
                      ].map((r) => {
                        const val = fees?.[r.key]
                        const label = val == null || val === '' ? '-' : `${Number(val).toFixed(2)}%`
                        return (
                          <tr key={r.key}>
                            <td>{r.platform}</td>
                            <td>{label}</td>
                            <td>{r.note}</td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <p className={styles.settingsMuted}>{tr('Fees are shown per advertising platform.', 'Комиссии показаны по каждой рекламной платформе.')}</p>
            </div>
          ) : null}

          {tab === 'docs' ? (
            <div className={styles.settingsTabPanel}>
              {docsStatus ? <div className={styles.settingsNotice}>{docsStatus}</div> : null}
              {!documents.length ? <div className={styles.settingsNotice}>{tr('No documents uploaded yet.', 'Документы пока не загружены.')}</div> : null}
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{tr('Document', 'Документ')}</th>
                      <th>{tr('Date', 'Дата')}</th>
                      <th style={{ textAlign: 'right' }}>{tr('Action', 'Действие')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((row) => {
                      return (
                        <tr key={row.id}>
                          <td>{row.title}</td>
                          <td>{String(row.created_at || '').split(' ')[0] || '?'}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button className={styles.tableActionButton} onClick={() => downloadDocument(row)} type="button">
                              {tr('Download', 'Скачать')}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {tab === 'developer' && canManageAccesses ? (
            <div className={styles.settingsTabPanel}>
              <div className={styles.settingsDeveloperIntro}>
                <div>
                  <p className={styles.metricLabel}>{tr('Read-only integration', 'Интеграция только для чтения')}</p>
                  <h3>{tr('Connect your finance and analytics systems', 'Подключите финансовые и аналитические системы')}</h3>
                  <p className={styles.settingsMuted}>
                    {tr(
                      'API keys provide access only to this client workspace. They cannot create topups, change balances or modify advertising accounts.',
                      'API-ключи дают доступ только к данным этого клиентского кабинета. Они не могут создавать пополнения, менять баланс или рекламные аккаунты.'
                    )}
                  </p>
                </div>
                <Link className={styles.settingsDocsLink} href="/developers/integration-api">
                  {tr('Open API documentation', 'Открыть документацию API')}
                </Link>
              </div>

              <div className={styles.settingsFieldGrid}>
                <label className={styles.settingsField}>
                  <span>{tr('Key name', 'Название ключа')}</span>
                  <input
                    maxLength={100}
                    onChange={(e) => setApiKeyForm((current) => ({ ...current, name: e.target.value }))}
                    placeholder={tr('Finance integration', 'Финансовая интеграция')}
                    type="text"
                    value={apiKeyForm.name}
                  />
                </label>
                <label className={styles.settingsField}>
                  <span>{tr('Expires after', 'Срок действия')}</span>
                  <select
                    onChange={(e) => setApiKeyForm((current) => ({ ...current, expires_in_days: e.target.value }))}
                    value={apiKeyForm.expires_in_days}
                  >
                    <option value="90">{tr('90 days', '90 дней')}</option>
                    <option value="180">{tr('180 days', '180 дней')}</option>
                    <option value="365">{tr('1 year', '1 год')}</option>
                    <option value="730">{tr('2 years', '2 года')}</option>
                  </select>
                </label>
              </div>

              <fieldset className={styles.settingsScopeFieldset}>
                <legend>{tr('Permissions', 'Разрешения')}</legend>
                <div className={styles.settingsScopeGrid}>
                  {[
                    {
                      key: 'accounts:read',
                      title: tr('Accounts', 'Аккаунты'),
                      description: tr('Account identifiers, status and commission settings.', 'Идентификаторы, статусы и настройки комиссий.'),
                    },
                    {
                      key: 'finance:read',
                      title: tr('Finance', 'Финансы'),
                      description: tr('Wallet movements, topups, funding events and exchange rates.', 'Движения кошелька, пополнения, зачисления и курсы.'),
                    },
                    {
                      key: 'performance:read',
                      title: tr('Performance', 'Статистика'),
                      description: tr('Daily spend, impressions and clicks.', 'Ежедневные расходы, показы и клики.'),
                    },
                  ].map((scope) => (
                    <label className={styles.settingsScopeOption} key={scope.key}>
                      <input
                        checked={Boolean(apiKeyForm.scopes[scope.key])}
                        onChange={(e) => setApiKeyForm((current) => ({
                          ...current,
                          scopes: { ...current.scopes, [scope.key]: e.target.checked },
                        }))}
                        type="checkbox"
                      />
                      <span>
                        <strong>{scope.title}</strong>
                        <small>{scope.description}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.settingsActions}>
                <button
                  className={styles.settingsPrimaryButton}
                  disabled={apiKeyCreating}
                  onClick={createApiKey}
                  type="button"
                >
                  {apiKeyCreating ? tr('Creating...', 'Создаём...') : tr('Create API key', 'Создать API-ключ')}
                </button>
              </div>

              {apiKeySecret ? (
                <div className={styles.settingsSecretPanel}>
                  <div>
                    <strong>{tr('Copy this key now', 'Скопируйте ключ сейчас')}</strong>
                    <p>{tr('For security, the full key is shown only once.', 'В целях безопасности полный ключ показывается только один раз.')}</p>
                  </div>
                  <code>{apiKeySecret}</code>
                  <div className={styles.settingsActions}>
                    <button className={styles.settingsPrimaryButton} onClick={copyApiKey} type="button">
                      {tr('Copy API key', 'Скопировать API-ключ')}
                    </button>
                    <button className={styles.settingsGhostButton} onClick={() => setApiKeySecret('')} type="button">
                      {tr('I saved it', 'Я сохранил ключ')}
                    </button>
                  </div>
                </div>
              ) : null}

              <p aria-live="polite" className={styles.settingsMuted}>{apiKeyStatus}</p>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{tr('Name', 'Название')}</th>
                      <th>{tr('Key', 'Ключ')}</th>
                      <th>{tr('Permissions', 'Разрешения')}</th>
                      <th>{tr('Status', 'Статус')}</th>
                      <th>{tr('Last used', 'Последнее использование')}</th>
                      <th>{tr('Expires', 'Истекает')}</th>
                      <th style={{ textAlign: 'right' }}>{tr('Action', 'Действие')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!apiKeys.length ? (
                      <tr>
                        <td className={styles.tableSubtle} colSpan={7}>
                          {tr('No API keys yet.', 'API-ключей пока нет.')}
                        </td>
                      </tr>
                    ) : apiKeys.map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td><code className={styles.settingsKeyPrefix}>{row.prefix}••••</code></td>
                        <td>{(row.scopes || []).map((scope) => scope.replace(':read', '')).join(', ') || '-'}</td>
                        <td>{row.status}</td>
                        <td>{row.last_used_at ? String(row.last_used_at).replace('T', ' ').slice(0, 16) : tr('Never', 'Никогда')}</td>
                        <td>{row.expires_at ? String(row.expires_at).replace('T', ' ').slice(0, 10) : '-'}</td>
                        <td style={{ textAlign: 'right' }}>
                          {row.status === 'active' ? (
                            <button className={styles.tableActionButton} onClick={() => revokeApiKey(row)} type="button">
                              {tr('Revoke', 'Отозвать')}
                            </button>
                          ) : (
                            <span className={styles.tableSubtle}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </ClientShell>
  )
}
