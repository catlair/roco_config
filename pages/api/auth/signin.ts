import type { AuthResponse } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/initSupabase'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  res.status(200).json(
    await supabase.auth.signInWithPassword({
      email: 'catlair@qq.com',
      password: '123456',
    })
  )
}
