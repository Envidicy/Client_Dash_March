import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const appId = String(process.env.META_APP_ID || '').trim()
  if (!appId) return NextResponse.redirect(new URL('/login?meta_error=not_configured', request.url))

  const state = crypto.randomUUID()
  const redirectUri = new URL('/api/auth/meta/callback', request.url).toString()
  const scopes = String(process.env.META_OAUTH_SCOPES || 'email,public_profile')
  const graphVersion = String(process.env.META_GRAPH_API_VERSION || 'v25.0')
  const url = new URL(`https://www.facebook.com/${graphVersion}/dialog/oauth`)
  url.searchParams.set('client_id', appId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('state', state)
  url.searchParams.set('scope', scopes)
  url.searchParams.set('response_type', 'code')

  const response = NextResponse.redirect(url)
  response.cookies.set('meta_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return response
}
