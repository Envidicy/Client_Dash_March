import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export async function POST(request) {
  const body = await request.text()
  const authorization = request.headers.get('authorization') || ''
  const upstream = await fetch(`${getApiBase().replace(/\/$/, '')}/auth/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authorization },
    body,
    cache: 'no-store',
  })
  return new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
  })
}
