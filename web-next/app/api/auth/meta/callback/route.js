import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../lib/api'

export const dynamic = 'force-dynamic'

function completionPage(payload) {
  const safePayload = JSON.stringify(payload).replace(/</g, '\\u003c')
  return `<!doctype html><html><head><meta charset="utf-8"><title>Meta login</title></head><body><script>
    const auth = ${safePayload};
    localStorage.setItem('auth_token', auth.token);
    localStorage.setItem('auth_email', auth.email);
    localStorage.setItem('auth_user_id', String(auth.id));
    window.location.replace(auth.requires_phone ? '/login?mode=phone' : '/dashboard');
  </script></body></html>`
}

export async function GET(request) {
  const url = new URL(request.url)
  const code = String(url.searchParams.get('code') || '')
  const state = String(url.searchParams.get('state') || '')
  const expectedState = String(request.cookies.get('meta_oauth_state')?.value || '')
  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL('/login?meta_error=invalid_state', request.url))
  }

  const redirectUri = new URL('/api/auth/meta/callback', request.url).toString()
  const upstream = await fetch(`${getApiBase().replace(/\/$/, '')}/auth/meta/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
    cache: 'no-store',
  })
  const data = await upstream.json().catch(() => ({}))
  if (!upstream.ok) {
    const target = new URL(upstream.status === 409 ? '/register' : '/login', request.url)
    target.searchParams.set('meta_error', upstream.status === 409 ? 'register_first' : 'failed')
    return NextResponse.redirect(target)
  }

  const response = new NextResponse(completionPage(data), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
  response.cookies.delete('meta_oauth_state')
  response.cookies.set('auth_token', data.token, { path: '/', sameSite: 'lax' })
  response.cookies.set('auth_email', data.email, { path: '/', sameSite: 'lax' })
  return response
}
