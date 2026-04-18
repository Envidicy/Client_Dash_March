import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

export async function GET() {
  const upstreamRes = await fetch(`${apiBase()}/rates/bcc`, { cache: 'no-store' })
  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json({ detail: data?.detail || 'Failed to fetch rates' }, { status: upstreamRes.status || 500 })
  }
  return NextResponse.json(data)
}
