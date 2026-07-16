import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

export async function PUT(request) {
  const auth = (request.headers.get('authorization') || '').trim()
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  try {
    const upstream = await fetch(
      `${getApiBase().replace(/\/$/, '')}/account-overview/preferences`,
      {
        method: 'PUT',
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      }
    )
    const data = await upstream.json().catch(() => ({}))
    return NextResponse.json(data, { status: upstream.status })
  } catch {
    return NextResponse.json({ detail: 'Backend unavailable' }, { status: 503 })
  }
}
