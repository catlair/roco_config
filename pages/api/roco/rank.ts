import type { NextApiRequest, NextApiResponse } from 'next'
import { getSpiritConfig } from '@/lib/angel'
import { PetDes } from '@/lib/pet'
import { getDoubleAttackLimit } from '@/lib/petLimit'

type RankType = {
  rank: number
  name: string
  double: number
  xg: string
  id: number
}

function rankHandle(arr: RankType[]) {
  let rank = 1
  let lastScore = arr[0].double
  let name = ''
  return (
    arr
      .sort((a, b) => b.double - a.double || a.id - b.id)
      .map((item, index, arr) => {
        if (item.double === lastScore) {
          item.rank = rank
          if (item.name === name) {
            console.log(item.name, item.xg)
            arr[index - 1].xg += `/${item.xg}`
            return
          }
        } else {
          item.rank = ++rank
          lastScore = item.double
        }
        name = item.name
        return item
      })
      .filter(Boolean) as RankType[]
  ).sort((a, b) => a.rank - b.rank || a.xg.localeCompare(b.xg))
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const petDes = new PetDes(await getSpiritConfig())

  res.status(200).json({
    data: rankHandle(
      getDoubleAttackLimit(petDes.getSpiritJSON()) as RankType[]
    ),
  })
}
