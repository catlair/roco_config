import type { NextApiRequest, NextApiResponse } from 'next'
import { getAngelConfig } from '@/lib/angel'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(200)
    .setHeader('Content-Type', 'text/plain')
    .send(await getAngelConfig())
}
