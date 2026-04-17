'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthShell from '../../components/auth/AuthShell'
import { apiFetch } from '../../lib/api'
import { useI18n } from '../../lib/i18n/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const { tr } = useI18n()
  const [pending, setPending] = useState(false)
  const [prefilledPortalKey, setPrefilledPortalKey] = useState('')
  const [status, setStatus] = useState(
    tr('Enter admin portal key and admin bearer token to reset a password.', 'Введите ключ админ-портала и admin bearer token для сброса пароля.')
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const key = String(params.get('key') || '').trim()
    if (!key) return
    setPrefilledPortalKey(key)
    // Remove key from URL immediately so it does not remain in browser history/referrer.
    router.replace('/admin-login')
  }, [router])

  async function verifyPortalKey(portalKey) {
    const res = await apiFetch('/admin/check-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: portalKey }),
    })
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}))
      throw new Error(payload?.detail || 'Invalid admin key')
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const portalKey = String(form.get('portal_key') || '').trim()
    const email = String(form.get('email') || '').trim()
    const newPassword = String(form.get('password') || '').trim()
    const token = String(form.get('token') || '').trim()

    if (!portalKey || !email || !newPassword || !token) {
      setStatus(tr('Fill in all fields.', 'Заполните все поля.'))
      return
    }

    setPending(true)
    setStatus(tr('Verifying key...', 'Проверяем ключ...'))
    try {
      await verifyPortalKey(portalKey)

      setStatus(tr('Resetting password...', 'Сбрасываем пароль...'))
      const res = await apiFetch('/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email, new_password: newPassword }),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.detail || 'Failed to reset password')

      setStatus(tr('Password updated. You can now log in.', 'Пароль обновлен. Теперь можно войти.'))
    } catch (error) {
      setStatus(error?.message || tr('Failed to reset password. Check key and token.', 'Не удалось сбросить пароль. Проверьте ключ и токен.'))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell eyebrow={tr('Admin', 'Админ')} title={tr('Password Reset', 'Сброс пароля')} status={status} right="Private">
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          <span>{tr('Portal key', 'Ключ портала')}</span>
          <input name="portal_key" type="password" placeholder="Admin portal key" defaultValue={prefilledPortalKey} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="name@gmail.com" required />
        </label>
        <label>
          <span>{tr('New password', 'Новый пароль')}</span>
          <input name="password" type="password" placeholder="********" required />
        </label>
        <label>
          <span>Admin token</span>
          <input name="token" type="text" placeholder="Bearer token" required />
        </label>
        <button disabled={pending} className="auth-primary" type="submit">
          {pending ? tr('Resetting...', 'Сбрасываем...') : tr('Reset password', 'Сбросить пароль')}
        </button>
        <a className="auth-secondary" href="/login">
          {tr('Back to login', 'Вернуться ко входу')}
        </a>
      </form>
    </AuthShell>
  )
}
