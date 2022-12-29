import type { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function isAuthenticated(req: NextRequest, res: NextResponse) {
  const supabaseMiddlewareClient = createMiddlewareSupabaseClient({ req, res })
  const {
    data: { user },
  } = await supabaseMiddlewareClient.auth.getUser()

  return Boolean(user)
}
