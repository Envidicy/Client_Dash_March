import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const authorization = request.headers.get('authorization') || ''
  if (!authorization) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  const query = new URL(request.url).search
  const upstream = await fetch(`${getApiBase().replace(/\/$/, '')}/analytics/dashboard${query}`, {
    headers: { Authorization: authorization },
    cache: 'no-store',
  })
  return new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
  })
}
