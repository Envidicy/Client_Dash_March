'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '../../lib/api'
import { setAuth } from '../../lib/auth'
import { useI18n } from '../../lib/i18n/client'
import styles from '../login/login.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const { locale, tr } = useI18n()
  const [status, setStatus] = useState(tr('We will verify your details and send an invitation.', 'Мы проверим данные и отправим приглашение.'))
  const [pending, setPending] = useState(false)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [verificationToken, setVerificationToken] = useState('')
  const [codePending, setCodePending] = useState(false)
  const features = useMemo(
    () => [
      {
        icon: 'speed',
        title: tr('Everything in one place', 'Всё в одном месте'),
        text: tr('Analytics across every connected advertising platform.', 'Аналитика по всем подключённым рекламным площадкам.'),
      },
      {
        icon: 'verified_user',
        title: tr('Secure access', 'Безопасный доступ'),
        text: tr('Phone verification protects your account from the first sign-in.', 'Подтверждение телефона защищает аккаунт с первого входа.'),
      },
      {
        icon: 'architecture',
        title: tr('Ready to scale', 'Готово к росту'),
        text: tr('Add accounts, teams and new data sources as you grow.', 'Добавляйте кабинеты, команды и новые источники данных.'),
      },
    ],
    [tr]
  )

  useEffect(() => {
    setStatus(tr('We will verify your details and send an invitation.', 'Мы проверим данные и отправим приглашение.'))
  }, [locale, tr])

  function onPhoneChange(event) {
    setPhone(event.target.value)
    setPhoneVerified(false)
    setVerificationToken('')
  }

  async function onSendCode() {
    if (!phone.trim()) {
      setStatus(tr('Enter your phone number.', 'Введите номер телефона.'))
      return
    }
    setCodePending(true)
    setStatus(tr('Sending a code to WhatsApp...', 'Отправляем код в WhatsApp...'))
    try {
      const res = await apiFetch('/auth/phone-verification/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || tr('Could not send the code.', 'Не удалось отправить код.'))
      setCodeSent(true)
      setCode('')
      setStatus(tr('The code was sent to WhatsApp. It is valid for 10 minutes.', 'Код отправлен в WhatsApp и действует 10 минут.'))
    } catch (error) {
      setStatus(error?.message || tr('Could not send the code.', 'Не удалось отправить код.'))
    } finally {
      setCodePending(false)
    }
  }

  async function onConfirmCode() {
    if (!/^\d{6}$/.test(code.trim())) {
      setStatus(tr('Enter the 6-digit code.', 'Введите шестизначный код.'))
      return
    }
    setCodePending(true)
    setStatus(tr('Checking the code...', 'Проверяем код...'))
    try {
      const res = await apiFetch('/auth/phone-verification/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || tr('The code is incorrect.', 'Неверный код.'))
      setVerificationToken(data.verification_token)
      setPhoneVerified(true)
      setStatus(tr('Phone number verified.', 'Номер телефона подтвержден.'))
    } catch (error) {
      setStatus(error?.message || tr('Could not verify the code.', 'Не удалось подтвердить код.'))
    } finally {
      setCodePending(false)
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const company = String(form.get('company') || '').trim()
    const submittedPhone = String(form.get('phone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '').trim()
    const confirm = String(form.get('confirm_password') || '').trim()

    if (!name || !submittedPhone || !email || !password) {
      setStatus(tr('Fill in required fields.', 'Заполните обязательные поля.'))
      return
    }
    if (password !== confirm) {
      setStatus(tr('Passwords do not match.', 'Пароли не совпадают. Проверьте ввод.'))
      return
    }
    if (!phoneVerified || !verificationToken) {
      setStatus(tr('Verify your phone number first.', 'Сначала подтвердите номер телефона.'))
      return
    }

    setPending(true)
    setStatus(tr('Creating account...', 'Создаем аккаунт...'))
    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company: company || null,
          phone: submittedPhone,
          email,
          password,
          phone_verification_token: verificationToken,
        }),
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
    <div className={styles.page}>
      <aside className={styles.hero}>
        <div className={styles.pattern} />
        <div className={styles.heroInner}>
          <Link className={styles.brand} href="/login">Envidicy</Link>
          <h1 className={styles.heroTitle}>{tr('One dashboard. Every result.', 'Один кабинет. Все результаты.')}</h1>
          <p className={styles.heroSubtitle}>
            {tr(
              'Create your workspace and keep advertising analytics, finances and access under control.',
              'Создайте рабочее пространство и держите аналитику, финансы и доступы под контролем.'
            )}
          </p>

          <div className={styles.featureList}>
            {features.map((item) => (
              <div className={styles.feature} key={item.title}>
                <span className={`material-symbols-outlined ${styles.featureIcon}`}>{item.icon}</span>
                <div>
                  <p className={styles.featureTitle}>{item.title}</p>
                  <p className={styles.featureText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroFooter}>
          <span>{tr('Secure onboarding', 'Безопасная регистрация')}</span>
          <div className={styles.heroLine} />
        </div>
      </aside>

      <main className={styles.side}>
        <div className={`${styles.panel} ${styles.registerPanel}`}>
          <span className={styles.mobileBrand}>Envidicy</span>

          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>{tr('Create account', 'Создать аккаунт')}</h2>
            <p className={styles.panelText}>
              {tr('Enter your details and verify your WhatsApp number.', 'Заполните данные и подтвердите номер через WhatsApp.')}
            </p>
          </div>

          <div className={styles.card}>
            <form className={`${styles.form} ${styles.registerForm}`} onSubmit={onSubmit}>
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{tr('Name', 'Имя')}</span>
                  <input className={styles.fieldInput} name="name" type="text" placeholder={tr('Anna Marketer', 'Анна Маркетолог')} required />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{tr('Company', 'Компания')}</span>
                  <input className={styles.fieldInput} name="company" type="text" placeholder="ACME Corp" />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>{tr('Phone number', 'Номер телефона')}</span>
                <div className={styles.codeRow}>
                  <input className={styles.fieldInput} name="phone" value={phone} onChange={onPhoneChange} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 700 000 00 00" required />
                  <button disabled={codePending || phoneVerified} className={styles.codeButton} type="button" onClick={onSendCode}>
                    {phoneVerified ? tr('Verified', 'Подтверждено') : codeSent ? tr('Send again', 'Отправить ещё') : tr('Send code', 'Отправить код')}
                  </button>
                </div>
              </label>

              {codeSent && !phoneVerified ? (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{tr('WhatsApp verification code', 'Код подтверждения из WhatsApp')}</span>
                  <div className={styles.codeRow}>
                    <input className={styles.fieldInput} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} type="text" inputMode="numeric" autoComplete="one-time-code" placeholder="000000" />
                    <button disabled={codePending || code.length !== 6} className={styles.codeButton} type="button" onClick={onConfirmCode}>
                      {tr('Confirm', 'Подтвердить')}
                    </button>
                  </div>
                </label>
              ) : null}

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <input className={styles.fieldInput} name="email" type="email" placeholder="name@company.com" required />
              </label>

              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{tr('Password', 'Пароль')}</span>
                  <input className={styles.fieldInput} name="password" type="password" placeholder="********" required />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>{tr('Confirm password', 'Повторите пароль')}</span>
                  <input className={styles.fieldInput} name="confirm_password" type="password" placeholder="********" required />
                </label>
              </div>

              <button disabled={pending || !phoneVerified} className={styles.submit} type="submit">
                <span>{pending ? tr('Creating...', 'Создаем...') : tr('Create account', 'Создать аккаунт')}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              <div className={styles.divider}><span>{tr('or', 'или')}</span></div>
              <a className={styles.metaButton} href="/api/auth/meta/start">
                <span className={styles.metaMark}>f</span>
                <span>{tr('Continue with Meta', 'Продолжить через Meta')}</span>
              </a>
            </form>
          </div>

          <div className={styles.bottomLinks}>
            <Link href="/login">
              <span>{tr('Already have an account', 'Уже есть аккаунт')}</span>
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <p className={styles.status}>{status}</p>
        </div>
      </main>
    </div>
  )
}
