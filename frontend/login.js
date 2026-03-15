const loginForm = document.getElementById('login-form')
const setPasswordForm = document.getElementById('set-password-form')
const statusEl = document.getElementById('login-status')
const loginModeBtn = document.getElementById('login-mode-btn')
const setPasswordModeBtn = document.getElementById('set-password-mode-btn')
const apiBase = window.API_BASE || 'https://envidicy-dash-client.onrender.com'

function setMode(mode) {
  const loginActive = mode !== 'set-password'
  if (loginForm) loginForm.hidden = !loginActive
  if (setPasswordForm) setPasswordForm.hidden = loginActive
  if (loginModeBtn) loginModeBtn.classList.toggle('active', loginActive)
  if (setPasswordModeBtn) setPasswordModeBtn.classList.toggle('active', !loginActive)
  if (statusEl) {
    statusEl.textContent = loginActive
      ? '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email \u0438 \u043f\u0430\u0440\u043e\u043b\u044c, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c.'
      : '\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 email \u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0434\u043b\u044f \u043d\u0435\u0433\u043e \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c.'
  }
}

if (loginModeBtn) loginModeBtn.addEventListener('click', () => setMode('login'))
if (setPasswordModeBtn) setPasswordModeBtn.addEventListener('click', () => setMode('set-password'))

if (loginForm && statusEl) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.getElementById('login-email')?.value?.trim()
    const password = document.getElementById('login-password')?.value?.trim()

    if (!email || !password) {
      statusEl.textContent = '\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, email \u0438 \u043f\u0430\u0440\u043e\u043b\u044c.'
      return
    }

    statusEl.textContent = '\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0432\u0445\u043e\u0434...'
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'login failed')
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_email', data.email)
      localStorage.setItem('auth_user_id', String(data.id))
      statusEl.textContent = '\u0412\u0445\u043e\u0434 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d. \u041f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435...'
      window.location.href = '/plan'
    } catch (e) {
      statusEl.textContent = e?.message || '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0432\u043e\u0439\u0442\u0438. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0447\u0442\u0443 \u0438 \u043f\u0430\u0440\u043e\u043b\u044c.'
    }
  })
}

if (setPasswordForm && statusEl) {
  setPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.getElementById('set-password-email')?.value?.trim()
    const next = document.getElementById('set-password-new')?.value?.trim()
    const confirm = document.getElementById('set-password-confirm')?.value?.trim()

    if (!email || !next) {
      statusEl.textContent = '\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 email \u0438 \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c.'
      return
    }
    if (next !== confirm) {
      statusEl.textContent = '\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442.'
      return
    }

    statusEl.textContent = '\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f...'
    try {
      const res = await fetch(`${apiBase}/auth/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: next }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'set-password failed')
      statusEl.textContent = '\u041f\u0430\u0440\u043e\u043b\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d. \u0422\u0435\u043f\u0435\u0440\u044c \u043c\u043e\u0436\u043d\u043e \u0432\u043e\u0439\u0442\u0438.'
      setMode('login')
      const loginEmail = document.getElementById('login-email')
      if (loginEmail) loginEmail.value = email
      if (setPasswordForm) setPasswordForm.reset()
    } catch (e) {
      statusEl.textContent = e?.message || '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0434\u0430\u0442\u044c \u043f\u0430\u0440\u043e\u043b\u044c.'
    }
  })
}

setMode('login')
