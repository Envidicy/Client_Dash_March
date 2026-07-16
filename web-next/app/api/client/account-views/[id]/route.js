import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../lib/api'

export const dynamic = 'force-dynamic'

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
}

async function forward(request, id, method) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  if (!id) return NextResponse.json({ detail: 'id is required' }, { status: 400 })
  const options = {
    method,
    headers: { Authorization: auth },
    cache: 'no-store',
  }
  if (method === 'PUT') {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(await request.json().catch(() => ({})))
  }
  try {
    const upstream = await fetch(
      `${getApiBase().replace(/\/$/, '')}/account-views/${encodeURIComponent(id)}`,
      options
    )
    const data = await upstream.json().catch(() => ({}))
    return NextResponse.json(data, { status: upstream.status })
  } catch {
    return NextResponse.json({ detail: 'Backend unavailable' }, { status: 503 })
  }
}

export async function PUT(request, context) {
  const { id } = await context.params
  return forward(request, id, 'PUT')
}

export async function DELETE(request, context) {
  const { id } = await context.params
  return forward(request, id, 'DELETE')
}
