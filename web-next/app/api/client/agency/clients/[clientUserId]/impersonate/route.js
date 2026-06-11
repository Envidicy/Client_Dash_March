import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../../../lib/api'

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

export async function POST(request, { params }) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const clientUserId = params?.clientUserId
  if (!clientUserId) return NextResponse.json({ detail: 'clientUserId is required' }, { status: 400 })

  const upstreamRes = await upstreamFetch(`/agency/clients/${encodeURIComponent(clientUserId)}/impersonate`, auth, { method: 'POST' })
  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json({ detail: data?.detail || 'Failed to open client workspace' }, { status: upstreamRes.status || 500 })
  }
  return NextResponse.json(data)
}
