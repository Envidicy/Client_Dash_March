import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

export async function POST(request) {
  let body = ''
  try {
    body = await request.text()
    const upstreamRes = await fetch(`${apiBase()}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
      },
      body,
      cache: 'no-store',
    })

    const text = await upstreamRes.text()
    return new NextResponse(text, {
      status: upstreamRes.status,
      headers: {
        'Content-Type': upstreamRes.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    })
  } catch {
    return NextResponse.json({ detail: 'Auth upstream unavailable' }, { status: 502 })
  }
}
