import { NextResponse } from 'next/server'
import { getApiBase } from '../../../../lib/api'
import {
  accountDisplayCurrency,
  calculateFundingPreview,
  extractLiveBalance,
  formatMoney,
  getAllowedInputCurrencies,
  getMarkedRate,
  getWalletAvailableBalance,
  getWalletHints,
  platformLabel,
} from '../../../../lib/finance/model'

export const dynamic = 'force-dynamic'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

function authHeader(request) {
  return (request.headers.get('authorization') || '').trim()
}

async function upstreamFetch(path, auth, options = {}) {
  return fetch(`${apiBase()}${path}`, {
    ...options,
    headers: {
      ...(auth ? { Authorization: auth } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  })
}

function resolveAccountBalance(account, financeSnapshot) {
  const remaining = Number(financeSnapshot?.remaining_balance)
  if (Number.isFinite(remaining)) {
    return { value: remaining, source: 'calculated' }
  }
  const optional = Number(financeSnapshot?.optional_balance)
  if (Number.isFinite(optional)) {
    return { value: optional, source: 'snapshot' }
  }
  const live = extractLiveBalance(account?.live_billing)
  if (Number.isFinite(live)) {
    return { value: live, source: 'live' }
  }
  return { value: null, source: 'none' }
}

function normalizeContext(account, wallet, ratesPayload, fees, financeSnapshot = null) {
  const accountCurrency = accountDisplayCurrency(account?.platform, account?.currency)
  const rates = {
    USD: getMarkedRate(ratesPayload?.rates?.USD),
    EUR: getMarkedRate(ratesPayload?.rates?.EUR),
  }
  const walletBalance = getWalletAvailableBalance(wallet)
  const walletHints = getWalletHints(walletBalance, rates)
  const feePercent = Number((fees && fees[String(account?.platform || '').toLowerCase()]) ?? 0)
  const vatPercent = 0
  const allowedInputCurrencies = getAllowedInputCurrencies(accountCurrency)
  const defaultInputCurrency = allowedInputCurrencies[0]
  const balanceState = resolveAccountBalance(account, financeSnapshot)
  const preview = calculateFundingPreview({
    amount: 0,
    inputCurrency: defaultInputCurrency,
    accountCurrency,
    rates,
    feePercent,
    vatPercent,
  })

  return {
    wallet: {
      balance: walletBalance,
      currency: String(wallet?.currency || 'KZT').toUpperCase(),
      displayValue: formatMoney(walletBalance, wallet?.currency || 'KZT', 2),
      hints: {
        usd: walletHints.usd,
        eur: walletHints.eur,
        usdLabel: walletHints.usd != null ? formatMoney(walletHints.usd, 'USD', 2) : null,
        eurLabel: walletHints.eur != null ? formatMoney(walletHints.eur, 'EUR', 2) : null,
      },
    },
    account: {
      id: account?.id,
      name: account?.name || `Account ${account?.id}`,
      platform: String(account?.platform || '').toLowerCase(),
      platformLabel: platformLabel(account?.platform),
      currency: accountCurrency,
      balance: balanceState.value,
      balanceLabel:
        balanceState.value != null
          ? formatMoney(balanceState.value, accountCurrency, 2)
          : null,
      balanceSource: balanceState.source,
    },
    funding: {
      feePercent,
      vatPercent,
      rates,
      allowedInputCurrencies,
      defaultInputCurrency,
      preview,
    },
  }
}

export async function GET(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const accountId = request.nextUrl.searchParams.get('account_id')
  if (!accountId) return NextResponse.json({ detail: 'account_id is required' }, { status: 400 })

  const [walletRes, ratesRes, feesRes, accountsRes, financeSummaryRes] = await Promise.all([
    upstreamFetch('/wallet', auth),
    upstreamFetch('/rates/bcc', auth),
    upstreamFetch('/fees', auth),
    upstreamFetch('/accounts', auth),
    upstreamFetch('/accounts/finance/summary', auth),
  ])

  if ([walletRes, ratesRes, feesRes, accountsRes, financeSummaryRes].some((res) => res.status === 401)) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const [wallet, ratesPayload, fees, accounts, financeSummary] = await Promise.all([
    walletRes.ok ? walletRes.json() : null,
    ratesRes.ok ? ratesRes.json() : null,
    feesRes.ok ? feesRes.json() : null,
    accountsRes.ok ? accountsRes.json() : [],
    financeSummaryRes.ok ? financeSummaryRes.json() : { items: [] },
  ])

  const account = (accounts || []).find((row) => String(row.id) === String(accountId))
  if (!account) return NextResponse.json({ detail: 'Account not found' }, { status: 404 })
  const financeSnapshot = (Array.isArray(financeSummary?.items) ? financeSummary.items : []).find(
    (row) => String(row?.account_id) === String(accountId)
  ) || null

  return NextResponse.json(normalizeContext(account, wallet, ratesPayload, fees, financeSnapshot))
}

export async function POST(request) {
  const auth = authHeader(request)
  if (!auth) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const accountId = body?.accountId
  const inputAmount = Number(body?.inputAmount || 0)
  const inputCurrency = String(body?.inputCurrency || '').toUpperCase()
  if (!accountId) return NextResponse.json({ detail: 'accountId is required' }, { status: 400 })
  if (!(Number.isFinite(inputAmount) && inputAmount > 0)) {
    return NextResponse.json({ detail: 'Enter a valid top-up amount' }, { status: 400 })
  }

  const [walletRes, ratesRes, feesRes, accountsRes] = await Promise.all([
    upstreamFetch('/wallet', auth),
    upstreamFetch('/rates/bcc', auth),
    upstreamFetch('/fees', auth),
    upstreamFetch('/accounts', auth),
  ])

  if ([walletRes, ratesRes, feesRes, accountsRes].some((res) => res.status === 401)) {
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 })
  }

  const [wallet, ratesPayload, fees, accounts] = await Promise.all([
    walletRes.ok ? walletRes.json() : null,
    ratesRes.ok ? ratesRes.json() : null,
    feesRes.ok ? feesRes.json() : null,
    accountsRes.ok ? accountsRes.json() : [],
  ])

  const account = (accounts || []).find((row) => String(row.id) === String(accountId))
  if (!account) return NextResponse.json({ detail: 'Account not found' }, { status: 404 })

  const context = normalizeContext(account, wallet, ratesPayload, fees)
  const preview = calculateFundingPreview({
    amount: inputAmount,
    inputCurrency,
    accountCurrency: context.account.currency,
    rates: context.funding.rates,
    feePercent: context.funding.feePercent,
    vatPercent: context.funding.vatPercent,
  })

  if (!preview.valid) {
    return NextResponse.json({ detail: 'This account does not support the selected input currency' }, { status: 400 })
  }
  if (preview.missingRate) {
    return NextResponse.json({ detail: 'Unable to resolve FX rate for this account' }, { status: 400 })
  }
  if (preview.totalWalletDebitKzt > Number(context.wallet.balance || 0)) {
    return NextResponse.json({ detail: 'Insufficient wallet balance for this top-up' }, { status: 400 })
  }

  const upstreamPayload = {
    platform: context.account.platform,
    account_id: Number(accountId),
    amount_input: preview.fundingAmountKzt,
    currency: 'KZT',
    fx_rate: preview.fxRate,
    fee_percent: context.funding.feePercent,
    vat_percent: context.funding.vatPercent,
  }

  const upstreamRes = await upstreamFetch('/topups', auth, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(upstreamPayload),
  })

  const data = await upstreamRes.json().catch(() => ({}))
  if (!upstreamRes.ok) {
    return NextResponse.json({ detail: data?.detail || 'Failed to create top-up request' }, { status: upstreamRes.status || 500 })
  }

  return NextResponse.json({
    ok: true,
    detail: 'Top-up request created',
    preview,
    request: data,
  })
}
