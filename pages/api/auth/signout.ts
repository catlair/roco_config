import type { AuthError } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/initSupabase'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{
    error: AuthError | null
  }>
) {
  res.status(200).json(await supabase.auth.signOut())
}
