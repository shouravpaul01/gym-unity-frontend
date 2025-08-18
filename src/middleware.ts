import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const { pathname } = nextUrl

  // Public and static routes that don't require auth
  const isPublicPath = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isStaticOrApi =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'

  if (isStaticOrApi) return NextResponse.next()

  const token = cookies.get('accessToken')?.value
console.log(token, "token in middleware")
  // If unauthenticated and trying to access protected route → redirect to login
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated and hitting auth pages → redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}