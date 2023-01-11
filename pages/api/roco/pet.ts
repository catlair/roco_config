import type { NextApiRequest, NextApiResponse } from 'next'
import { getSpiritConfig } from '@/lib/angel'
import { PetDes, PetDesType } from '@/lib/pet'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const petDes = new PetDes(await getSpiritConfig())

  switch (req.query.type) {
    case 'all':
      return getTypeAll()
    case 'group':
      return res.status(200).json({ data: petDes.getGroupTypeJSON() })
    case 'pet':
      const pets = petDes.getSpiritJSON()
      return res
        .status(200)
        .json({ data: getPagingPet(pets), total: pets.length })
    case 'prop':
      return res.status(200).json({ data: petDes.getPropertyJSON() })
    default:
      return getTypeAll()
  }

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
    const id = Number(req.query.id)
    if (id) {
      const pet = pets.find((pet) => pet.id === id)
      return pet ? [pet] : []
    }

    const page = Number(req.query.pn) || 1,
      pageSize = Number(req.query.ps) || 20,
      sort = req.query.sort,
      boss = req.query.boss,
      start = (page - 1) * pageSize

    const tempPets = boss ? pets : pets.filter((pet) => pet.id < 5000)

    if (!sort) {
      return tempPets.reverse().slice(start, start + pageSize)
    }

    return tempPets
      .sort((a, b) => {
        switch (sort) {
          case 'id':
            return b.id - a.id
          default:
            return 0
        }
      })
      .slice(start, start + pageSize)
  }
}
