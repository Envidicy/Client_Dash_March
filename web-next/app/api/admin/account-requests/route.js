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

  const upstreamRes = await upstreamFetch('/admin/account-requests', auth)
  if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  if (upstreamRes.status === 403) return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })

  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json(
      { detail: data?.detail || 'Failed to load account requests' },
      { status: upstreamRes.status || 500 }
    )
  }

  return NextResponse.json(Array.isArray(data) ? data : [])
}