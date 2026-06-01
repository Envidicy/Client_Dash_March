import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'
import { isAdminEmail } from '../../../../lib/admin-access'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

export async function POST(request) {
  let body = ''
  try {
    body = await request.text()
    const upstreamRes = await fetch(`${apiBase()}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
      },
      body,
      cache: 'no-store',
    })

    const text = await upstreamRes.text()
    const response = new NextResponse(text, {
      status: upstreamRes.status,
      headers: {
        'Content-Type': upstreamRes.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    })

    if (upstreamRes.ok) {
      try {
        const payload = JSON.parse(text || '{}')
        const token = String(payload?.token || '').trim()
        const email = String(payload?.email || '').trim().toLowerCase()

        if (token) {
          response.cookies.set('auth_token', token, { path: '/', sameSite: 'lax' })
        }
        if (email) {
          response.cookies.set('auth_email', email, { path: '/', sameSite: 'lax' })
          response.cookies.set('auth_is_admin', isAdminEmail(email) ? '1' : '0', { path: '/', sameSite: 'lax' })
        }
      } catch {
        // Keep auth response flowing even if payload shape is unexpected.
      }
    }

    return response
  } catch {
    return NextResponse.json({ detail: 'Auth upstream unavailable' }, { status: 502 })
  }
}
