import { getCaptureConfig, getMapConfig } from '@/lib/angel'
import { SpiritRect } from '@/lib/capture'
import { SceneConfig } from '@/lib/map'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spiritRect = new SpiritRect(await getCaptureConfig())
  const sceneConfig = new SceneConfig(await getMapConfig()).getSceneDes()
  const sceneNames: string[] = []
  for (const scene of sceneConfig) {
    sceneNames[scene.id!] = scene.name
  }
  const data = spiritRect
    .getSpiritRect()
    .filter((item) => {
      if (item.scene === 11000) {
        return true
      }
      if (
        item.endTime &&
        new Date(item.endTime).getTime() < new Date().getTime()
      ) {
        if (/^.{2}宝宝/.test(item.name!)) {
          return true
        }
        return false
      }
      if (item.scene < 2000) {
        return true
      }
    })
    .sort((a, b) => a.scene - b.scene)

  return res.status(200).json({
    data: data.map((item) => ({
      ...item,
      sceneName: sceneNames[item.scene!],
      scene: '' + item.scene,
    })),
  })
}
