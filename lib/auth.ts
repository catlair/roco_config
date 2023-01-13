import type { NextRequest, NextResponse } from 'next/server'

export async function isAuthenticated(req: NextRequest, res: NextResponse) {
  try {
    const { createMiddlewareSupabaseClient } = await import(
      '@supabase/auth-helpers-nextjs'
    )
    const supabaseMiddlewareClient = createMiddlewareSupabaseClient({
      req,
      res,
    })
    const {
      data: { user },
    } = await supabaseMiddlewareClient.auth.getUser()

    return Boolean(user)
  } catch (error) {
    console.error(error)
    return false
  }
}
