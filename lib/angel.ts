import { inflateSync } from 'zlib'
import { createRequest } from '@catlair/node-got'
import { getTag } from './xml'
const request = createRequest()

export async function getAngelConfig() {
  const res: Buffer = await request.get(
    'https://res.17roco.qq.com/conf/Angel.config',
    {
      responseType: 'buffer',
    }
  )
  return inflateSync(res.subarray(7))
}

export async function getXmlByTag(tag: string) {
  return getTag((await getAngelConfig()).toString(), tag)
}

export async function getSpiritConfig() {
  return getXmlByTag('SpiritConfig')
}

export async function getSkillConfig() {
  return getXmlByTag('SpiritSkillConfig')
}

export async function getMapConfig() {
  return getXmlByTag('SceneConfig')
}

export async function getCaptureConfig() {
  return getXmlByTag('spiritRect')
}
