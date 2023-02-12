// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/((?!api|login|_next/static|favicon.ico).*)',
}

export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.next()
  }
  if (pathname.startsWith('/rank')) {
    return NextResponse.next()
  }
  if (!(await isAuthenticated(request, response))) {
    if (pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ code: 401, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
    return NextResponse.redirect(`/login`)
  }
}
