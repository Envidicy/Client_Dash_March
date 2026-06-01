import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'
import { getTopupBreakdown, platformLabel } from '../../../../lib/finance/model'

export const dynamic = 'force-dynamic'
const UPSTREAM_TIMEOUT_MS = 25000

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
}

async function upstreamFetch(path, auth, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    return await fetch(`${apiBase()}${path}`, {
      ...options,
      headers: {
        ...(auth ? { Authorization: auth } : {}),
        ...(options.headers || {}),
      },
      cache: 'no-store',
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeStatus(status) {
  const value = String(status || '').toLowerCase()
  if (value === 'completed' || value === 'approved') return 'completed'
  if (value === 'failed' || value === 'rejected') return 'failed'
  return 'pending'
}

function normalizeTopup(row, index) {
  const breakdown = getTopupBreakdown(row)
  return {
    id: row?.id ?? `topup-${index}`,
    created_at: row?.created_at || '',
    status: normalizeStatus(row?.status),
    raw_status: row?.status || '',
    user_email: row?.user_email || '',
    account_id: row?.account_id || null,
    account_name: row?.account_name || 'Ad Account',
    account_platform: row?.account_platform || row?.platform || '',
    account_platform_label: platformLabel(row?.account_platform || row?.platform),
    account_currency: breakdown.accountCurrency,
    reference_id: row?.reference_id || row?.invoice_number || null,
    amount_input: breakdown.inputAmount,
    currency: breakdown.inputCurrency,
    fee_percent: breakdown.feePercent,
    vat_percent: breakdown.vatPercent,
    fx_rate: breakdown.fxRate,
    total_wallet_debit: breakdown.totalWalletDebit,
    net_account_funding: breakdown.netAccountFunding,
    breakdown: {
      clientFunding: breakdown.inputAmount,
      acquiringFee: breakdown.feeAmount,
      vat: breakdown.vatAmount,
      totalWalletDebit: breakdown.totalWalletDebit,
      netAccountFunding: breakdown.netAccountFunding,
      accountCurrency: breakdown.accountCurrency,
      inputCurrency: breakdown.inputCurrency,
    },
  }
}

function buildStats(items) {
  return items.reduce(
    (acc, row) => {
      acc.total += 1
      if (row.status === 'pending') acc.pending += 1
      if (row.status === 'completed') {
        acc.completed += 1
        acc.completedGross += Number(row.total_wallet_debit || 0)
      }
      if (row.status === 'failed') acc.failed += 1
      return acc
    },
    { total: 0, pending: 0, completed: 0, failed: 0, completedGross: 0 }
  )
}

export async function GET(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const query = request.nextUrl.searchParams.toString()
  let upstreamRes
  try {
    upstreamRes = await upstreamFetch(`/admin/topups${query ? `?${query}` : ''}`, auth)
  } catch (error) {
    const timedOut = error?.name === 'AbortError'
    return NextResponse.json(
      { detail: timedOut ? 'Admin topups request timed out.' : 'Failed to reach admin topups backend.' },
      { status: timedOut ? 504 : 502 }
    )
  }
  if (upstreamRes.status === 401) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  if (upstreamRes.status === 403) return NextResponse.json({ detail: 'Forbidden' }, { status: 403 })
  if (!upstreamRes.ok) {
    const data = await upstreamRes.json().catch(() => ({}))
    return NextResponse.json({ detail: data?.detail || 'Failed to load admin topups' }, { status: upstreamRes.status || 500 })
  }

  const data = await upstreamRes.json().catch(() => [])
  const rawItems = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : []
  const items = rawItems.map(normalizeTopup)
  const stats = data?.stats || buildStats(items)
  const count = Number.isFinite(Number(data?.count)) ? Number(data.count) : items.length
  return NextResponse.json({
    items,
    count,
    stats,
    limit: Number(data?.limit || items.length || 0),
    offset: Number(data?.offset || 0),
  })
}
