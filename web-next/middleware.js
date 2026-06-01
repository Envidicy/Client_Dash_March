import { NextResponse } from 'next/server'
import { isAdminEmail } from './lib/admin-access'

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

  const adminFlag = (request.cookies.get('auth_is_admin')?.value || '').trim()
  if (adminFlag === '1') {
    return NextResponse.next()
  }
  if (adminFlag === '0') {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  }

  const authEmail = decodeURIComponent((request.cookies.get('auth_email')?.value || '').trim())
  if (!authEmail) {
    return NextResponse.next()
  }

  if (isAdminEmail(authEmail)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}
