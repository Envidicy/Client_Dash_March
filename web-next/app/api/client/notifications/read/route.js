import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../lib/api'

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

export async function POST(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const upstreamRes = await upstreamFetch('/notifications/read', auth, { method: 'POST' })
  if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json({ detail: data?.detail || 'Failed to mark notifications as read' }, { status: upstreamRes.status || 500 })
  }
  return NextResponse.json(data || { status: 'ok' })
}
