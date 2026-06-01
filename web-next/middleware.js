import { NextResponse } from 'next/server'
import { getApiBase } from './lib/api'
import { isAdminEmail } from './lib/admin-access'

const LOGIN_PATH = '/login'
const DASHBOARD_PATH = '/dashboard'

function apiBase() {
  return getApiBase().replace(/\/$/, '')
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin/')) {
    return NextResponse.next()
  }

  const token = (request.cookies.get('auth_token')?.value || '').trim()
  if (!token) {
    const url = new URL(LOGIN_PATH, request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  try {
    const verifyRes = await fetch(`${apiBase()}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (verifyRes.status === 401) {
      const url = new URL(LOGIN_PATH, request.url)
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }

    if (!verifyRes.ok) {
      return NextResponse.next()
    }

    const user = await verifyRes.json().catch(() => null)
    if (isAdminEmail(user?.email) || isAdminEmail(user?.primary_email)) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
