import { isAdminEmail } from './admin-access'

const KEY_TOKEN = 'auth_token'
const KEY_EMAIL = 'auth_email'
const KEY_USER_ID = 'auth_user_id'
const KEY_IMPERSONATION_ACTIVE = 'impersonation_active'
const KEY_IMPERSONATION_RETURN = 'impersonation_return'
const KEY_IMPERSONATION_LABEL = 'impersonation_label'
const COOKIE_TOKEN = 'auth_token'
const COOKIE_EMAIL = 'auth_email'
const COOKIE_IS_ADMIN = 'auth_is_admin'

function storageGet(key) {
  if (typeof window === 'undefined') return null
  return window.sessionStorage.getItem(key) || window.localStorage.getItem(key)
}

function setTokenCookie(token) {
  if (typeof window === 'undefined') return
  if (!token) return
  document.cookie = `${COOKIE_TOKEN}=${encodeURIComponent(token)}; Path=/; SameSite=Lax`
}

function clearTokenCookie() {
  if (typeof window === 'undefined') return
  document.cookie = `${COOKIE_TOKEN}=; Path=/; Max-Age=0; SameSite=Lax`
}

function setCookie(name, value) {
  if (typeof window === 'undefined') return
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`
}

function clearCookie(name) {
  if (typeof window === 'undefined') return
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`
}

function syncAccessCookies(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  if (!normalizedEmail) {
    clearCookie(COOKIE_EMAIL)
    clearCookie(COOKIE_IS_ADMIN)
    return
  }
  setCookie(COOKIE_EMAIL, normalizedEmail)
  setCookie(COOKIE_IS_ADMIN, isAdminEmail(normalizedEmail) ? '1' : '0')
}

function consumeImpersonationFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const token = params.get('impersonate_token')
  if (!token) return

  window.sessionStorage.setItem(KEY_TOKEN, token)
  window.sessionStorage.setItem(KEY_EMAIL, params.get('impersonate_email') || '')
  window.sessionStorage.setItem(KEY_USER_ID, params.get('impersonate_user_id') || '')
  window.sessionStorage.setItem(KEY_IMPERSONATION_ACTIVE, '1')
  window.sessionStorage.setItem(KEY_IMPERSONATION_RETURN, params.get('impersonation_return') || '/admin/clients')
  window.sessionStorage.setItem(KEY_IMPERSONATION_LABEL, params.get('impersonate_email') || '')

  params.delete('impersonate_token')
  params.delete('impersonate_email')
  params.delete('impersonate_user_id')
  params.delete('impersonation_return')
  const query = params.toString()
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash || ''}`
  window.history.replaceState({}, '', nextUrl)
}

export function setAuth(auth) {
  if (typeof window === 'undefined') return
  clearImpersonation()
  localStorage.setItem(KEY_TOKEN, auth.token)
  localStorage.setItem(KEY_EMAIL, auth.email)
  localStorage.setItem(KEY_USER_ID, String(auth.id))
  setTokenCookie(auth.token)
  syncAccessCookies(auth.email)
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  clearImpersonation()
  localStorage.removeItem(KEY_TOKEN)
  localStorage.removeItem(KEY_EMAIL)
  localStorage.removeItem(KEY_USER_ID)
  clearTokenCookie()
  clearCookie(COOKIE_EMAIL)
  clearCookie(COOKIE_IS_ADMIN)
}

export function getAuthToken() {
  consumeImpersonationFromUrl()
  if (typeof window !== 'undefined' && window.sessionStorage.getItem(KEY_IMPERSONATION_ACTIVE) === '1') {
    return window.sessionStorage.getItem(KEY_TOKEN)
  }
  const token = storageGet(KEY_TOKEN)
  if (token) {
    setTokenCookie(token)
    syncAccessCookies(storageGet(KEY_EMAIL))
  }
  return token
}

export function getAuthEmail() {
  consumeImpersonationFromUrl()
  return storageGet(KEY_EMAIL)
}

export function isImpersonating() {
  if (typeof window === 'undefined') return false
  consumeImpersonationFromUrl()
  return window.sessionStorage.getItem(KEY_IMPERSONATION_ACTIVE) === '1'
}

export function getImpersonationReturnUrl() {
  if (typeof window === 'undefined') return '/admin/clients'
  consumeImpersonationFromUrl()
  return window.sessionStorage.getItem(KEY_IMPERSONATION_RETURN) || '/admin/clients'
}

export function getImpersonationLabel() {
  if (typeof window === 'undefined') return ''
  consumeImpersonationFromUrl()
  return window.sessionStorage.getItem(KEY_IMPERSONATION_LABEL) || ''
}

export function clearImpersonation() {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(KEY_TOKEN)
  window.sessionStorage.removeItem(KEY_EMAIL)
  window.sessionStorage.removeItem(KEY_USER_ID)
  window.sessionStorage.removeItem(KEY_IMPERSONATION_ACTIVE)
  window.sessionStorage.removeItem(KEY_IMPERSONATION_RETURN)
  window.sessionStorage.removeItem(KEY_IMPERSONATION_LABEL)
  const persistentToken = window.localStorage.getItem(KEY_TOKEN)
  const persistentEmail = window.localStorage.getItem(KEY_EMAIL)
  if (persistentToken) {
    setTokenCookie(persistentToken)
    syncAccessCookies(persistentEmail)
    return
  }
  clearTokenCookie()
  clearCookie(COOKIE_EMAIL)
  clearCookie(COOKIE_IS_ADMIN)
}
