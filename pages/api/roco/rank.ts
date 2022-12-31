import type { NextApiRequest, NextApiResponse } from 'next'
import { getSpiritConfig } from '@/lib/angel'
import { PetDes } from '@/lib/pet'
import { getDoubleAttackLimit } from '@/lib/petLimit'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const petDes = new PetDes(await getSpiritConfig())

  res.status(200).json({
    data: getDoubleAttackLimit(petDes.getSpiritJSON()),
  })
}
