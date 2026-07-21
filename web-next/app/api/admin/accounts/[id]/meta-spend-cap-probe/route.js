import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../../../lib/api'

export const dynamic = 'force-dynamic'

export async function POST(request, { params }) {
  const auth = (request.headers.get('authorization') || '').trim()
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const id = params?.id
  if (!id) return NextResponse.json({ detail: 'id is required' }, { status: 400 })

  const apiBase = getApiBase().replace(/\/$/, '')
  const upstreamRes = await fetch(`${apiBase}/admin/accounts/${encodeURIComponent(id)}/meta-spend-cap-probe`, {
    method: 'POST',
    headers: { Authorization: auth },
    cache: 'no-store',
  })
  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json({ detail: data?.detail || 'Meta spend cap probe failed' }, { status: upstreamRes.status || 500 })
  }
  return NextResponse.json(data)
}
