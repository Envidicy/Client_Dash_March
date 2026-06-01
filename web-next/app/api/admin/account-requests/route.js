import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'
const UPSTREAM_TIMEOUT_MS = 25000

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
}

async function upstreamFetch(path, auth, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    return await fetch(`${apiBase()}${path}`, {
      ...options,
      headers: {
        ...(auth ? { Authorization: auth } : {}),
        ...(options.headers || {}),
      },
      cache: 'no-store',
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const query = request.nextUrl.searchParams.toString()
  let upstreamRes
  try {
    upstreamRes = await upstreamFetch(`/admin/account-requests${query ? `?${query}` : ''}`, auth)
  } catch (error) {
    const timedOut = error?.name === 'AbortError'
    return NextResponse.json(
      { detail: timedOut ? 'Admin account requests timed out.' : 'Failed to reach admin account requests backend.' },
      { status: timedOut ? 504 : 502 }
    )
  }
  if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  if (upstreamRes.status === 403) return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })

  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json(
      { detail: data?.detail || 'Failed to load account requests' },
      { status: upstreamRes.status || 500 }
    )
  }

  if (Array.isArray(data)) return NextResponse.json(data)
  return NextResponse.json({
    items: Array.isArray(data?.items) ? data.items : [],
    count: Number(data?.count || 0),
    stats: data?.stats || null,
    limit: Number(data?.limit || 0),
    offset: Number(data?.offset || 0),
  })
}
