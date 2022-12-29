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

export async function getSpiritConfig() {
  return getTag((await getAngelConfig()).toString(), 'SpiritConfig')
}

export async function getSkillConfig() {
  return getTag((await getAngelConfig()).toString(), 'SpiritSkillConfig')
}
