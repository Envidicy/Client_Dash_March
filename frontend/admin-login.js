const apiBase = window.API_BASE || 'https://envidicy-dash-client.onrender.com'
const params = new URLSearchParams(window.location.search)
const prefilledPortalKey = String(params.get('key') || '').trim()
if (prefilledPortalKey && typeof window !== 'undefined' && window.history?.replaceState) {
  window.history.replaceState({}, document.title, '/admin-login')
}

const resetForm = document.getElementById('reset-form')
const resetStatus = document.getElementById('reset-status')
const portalKeyInput = document.getElementById('reset-portal-key')

if (portalKeyInput && prefilledPortalKey) {
  portalKeyInput.value = prefilledPortalKey
}

async function verifyPortalKey(portalKey) {
  const res = await fetch(`${apiBase}/admin/check-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: portalKey }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.detail || 'Invalid key')
}

if (resetForm && resetStatus) {
  resetForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const portalKey = document.getElementById('reset-portal-key')?.value?.trim()
    const email = document.getElementById('reset-email')?.value?.trim()
    const password = document.getElementById('reset-password')?.value?.trim()
    const token = document.getElementById('reset-token')?.value?.trim()

    if (!portalKey || !email || !password || !token) {
      resetStatus.textContent = 'Заполните все поля.'
      return
    }

    resetStatus.textContent = 'Проверяем ключ...'
    try {
      await verifyPortalKey(portalKey)
      resetStatus.textContent = 'Сбрасываем пароль...'
      const res = await fetch(`${apiBase}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email, new_password: password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'reset failed')
      resetStatus.textContent = 'Пароль обновлен. Теперь можно войти.'
    } catch (e) {
      resetStatus.textContent = e?.message || 'Не удалось сбросить пароль. Проверьте ключ и токен.'
    }
  })
}
