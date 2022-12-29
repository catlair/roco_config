// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
}

export async function middleware(request: NextRequest, response: NextResponse) {
  if (!(await isAuthenticated(request, response))) {
    return new NextResponse(
      JSON.stringify({ code: 401, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}