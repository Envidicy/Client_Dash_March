import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../lib/api'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

function authHeader(request) {
  const direct = (request.headers.get('authorization') || '').trim()
  if (direct) return direct
  const cookieToken = (request.cookies?.get('auth_token')?.value || '').trim()
  return cookieToken ? `Bearer ${cookieToken}` : ''
}

async function upstreamFetch(path, auth, options = {}) {
  return fetch(`${apiBase()}${path}`, {
    ...options,
    headers: {
      ...(auth ? { Authorization: auth } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  })
}

export async function GET(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  try {
    const upstreamRes = await upstreamFetch('/agencies/mine', auth)
    const data = await upstreamRes.json().catch(() => ({}))
    if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
    if (!upstreamRes.ok) return NextResponse.json({ items: [] }, { status: 200 })
    return NextResponse.json(data && typeof data === 'object' ? data : { items: [] })
  } catch {
    return NextResponse.json({ items: [], degraded: true }, { status: 200 })
  }
}
