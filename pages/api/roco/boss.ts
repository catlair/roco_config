import type { NextApiRequest, NextApiResponse } from 'next'
import { getSpiritConfig } from '@/lib/angel'
import { PetDes, PetDesType } from '@/lib/pet'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const petDes = new PetDes(await getSpiritConfig())

  return getTypeAll()

  function getTypeAll() {
    // 分页
    const data = petDes.getAllDesJSON(),
      pets = getPagingPet(data.pet),
      total = data.pet.length
    data.pet = pets

    return res.status(200).json({
      data,
      total,
    })
  }

  /**
   * pet 分页
   */
  function getPagingPet(pets: PetDesType['pet']) {
    const page = Number(req.query.pn) || 1,
      pageSize = Number(req.query.ps) || 20,
      start = (page - 1) * pageSize

    return pets
      .filter((pet) => pet.id > 5000)
      .reverse()
      .slice(start, start + pageSize)
  }
}
