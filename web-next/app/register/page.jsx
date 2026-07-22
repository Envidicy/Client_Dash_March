'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthShell from '../../components/auth/AuthShell'
import { apiFetch } from '../../lib/api'
import { setAuth } from '../../lib/auth'
import { useI18n } from '../../lib/i18n/client'

export default function RegisterPage() {
  const router = useRouter()
  const { tr } = useI18n()
  const [status, setStatus] = useState(tr('We will verify your details and send an invitation.', 'Мы проверим данные и отправим приглашение.'))
  const [pending, setPending] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const company = String(form.get('company') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '').trim()
    const confirm = String(form.get('confirm_password') || '').trim()

    if (!name || !phone || !email || !password) {
      setStatus(tr('Fill in required fields.', 'Заполните обязательные поля.'))
      return
    }
    if (password !== confirm) {
      setStatus(tr('Passwords do not match.', 'Пароли не совпадают. Проверьте ввод.'))
      return
    }

    setPending(true)
    setStatus(tr('Creating account...', 'Создаем аккаунт...'))
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company: company || null, phone, email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || tr('Failed to create account', 'Не удалось создать аккаунт'))

      setAuth(data)

      setStatus(tr('Account created. Redirecting...', 'Аккаунт создан. Перенаправляем...'))
      router.push('/dashboard')
    } catch (error) {
      setStatus(error?.message || tr('Failed to create account. Check input data.', 'Не удалось создать аккаунт. Проверьте данные.'))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell eyebrow={tr('Sign Up', 'Регистрация')} title={tr('New Access', 'Новый доступ')} status={status} right="Invite">
      <form className="auth-form" onSubmit={onSubmit}>
        <label>
          <span>{tr('Name', 'Имя')}</span>
          <input name="name" type="text" placeholder={tr('Anna Marketer', 'Анна Маркетолог')} required />
        </label>
        <label>
          <span>{tr('Company', 'Компания')}</span>
          <input name="company" type="text" placeholder="ACME Corp" />
        </label>
        <label>
          <span>{tr('Phone number', 'Номер телефона')}</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 700 000 00 00" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="name@gmail.com" required />
        </label>
        <label>
          <span>{tr('Password', 'Пароль')}</span>
          <input name="password" type="password" placeholder="••••••••" required />
        </label>
        <label>
          <span>{tr('Confirm password', 'Повторите пароль')}</span>
          <input name="confirm_password" type="password" placeholder="••••••••" required />
        </label>
        <button disabled={pending} className="auth-primary" type="submit">
          {pending ? tr('Creating...', 'Создаем...') : tr('Create account', 'Создать аккаунт')}
        </button>
        <div className="auth-divider"><span>{tr('or', 'или')}</span></div>
        <a className="auth-meta" href="/api/auth/meta/start">
          <span className="auth-meta-mark">f</span>
          {tr('Continue with Meta', 'Продолжить через Meta')}
        </a>
        <a className="auth-secondary" href="/login">
          {tr('Already have an account', 'Уже есть аккаунт')}
        </a>
      </form>
    </AuthShell>
  )
}
