import { NextResponse } from 'next/server'

const LOGIN_PATH = '/login'
const DASHBOARD_PATH = '/dashboard'

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
    const verifyRes = await fetch(new URL('/api/admin/user-options', request.url), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (verifyRes.ok) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  } catch {
    const url = new URL(LOGIN_PATH, request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}