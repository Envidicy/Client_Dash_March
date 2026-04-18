import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

const FALLBACK_RATES = {
  rates: {
    USD: { sell: null, sell_marked: null },
    EUR: { sell: null, sell_marked: null },
  },
  markup_percent: 5,
}

export async function GET() {
  try {
    const upstreamRes = await fetch(`${apiBase()}/rates/bcc`, { cache: 'no-store' })
    const data = await upstreamRes.json().catch(() => ({}))
    if (!upstreamRes.ok) {
      return NextResponse.json(FALLBACK_RATES, { status: 200 })
    }
    return NextResponse.json(data && typeof data === 'object' ? data : FALLBACK_RATES)
  } catch {
    return NextResponse.json(FALLBACK_RATES, { status: 200 })
  }
}
