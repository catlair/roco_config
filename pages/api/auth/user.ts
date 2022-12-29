import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  res.status(200).json({ data: { name: user?.id ?? '' } })
}
