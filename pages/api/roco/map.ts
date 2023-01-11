import { getMapConfig } from '@/lib/angel'
import { SceneConfig } from '@/lib/map'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sceneConfig = new SceneConfig(await getMapConfig())

  return res.status(200).json({
    data: sceneConfig.getSceneDes(),
  })
}
