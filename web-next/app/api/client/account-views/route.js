import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
}

async function forward(request, path, method) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  const options = {
    method,
    headers: { Authorization: auth },
    cache: 'no-store',
  }
  if (method !== 'GET') {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(await request.json().catch(() => ({})))
  }
  try {
    const upstream = await fetch(`${getApiBase().replace(/\/$/, '')}${path}`, options)
    const data = await upstream.json().catch(() => ({}))
    return NextResponse.json(data, { status: upstream.status })
  } catch {
    return NextResponse.json({ detail: 'Backend unavailable' }, { status: 503 })
  }
}

export async function GET(request) {
  return forward(request, '/account-views', 'GET')
}

export async function POST(request) {
  return forward(request, '/account-views', 'POST')
}
