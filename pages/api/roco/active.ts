import type { NextApiRequest, NextApiResponse } from 'next'
import { getActive } from '@/lib/active'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({
    data: await getActive(),
  })
}
