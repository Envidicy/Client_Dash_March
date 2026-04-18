import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
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
    const upstreamRes = await upstreamFetch('/notifications', auth)
    if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

    const data = await upstreamRes.json().catch(() => ({}))
    if (!upstreamRes.ok) {
      return NextResponse.json({ items: [], unread: 0, degraded: true }, { status: 200 })
    }
    return NextResponse.json(data && typeof data === 'object' ? data : { items: [], unread: 0 })
  } catch {
    return NextResponse.json({ items: [], unread: 0, degraded: true }, { status: 200 })
  }
}
