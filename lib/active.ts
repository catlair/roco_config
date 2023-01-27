import { createRequest } from '@catlair/node-got'
import { domParser, getTag } from './xml'
const request = createRequest()

export async function getActive() {
  const resp = await request.get(
    'https://res.17roco.qq.com/plugins/ActiveSystem/ActiveConfig.xml'
  )

  return Array.from(
    domParser(getTag(resp, 'ActiveList')).getElementsByTagName('Item')
  )
    .map((node) => ({
      id: +node.getAttribute('id')!,
      sceneId: +node.getAttribute('sceneID')!,
      npcX: +node.getAttribute('npcX')!,
      npcY: +node.getAttribute('npcY')!,
      time: node.getAttribute('time'),
      content: node.getAttribute('content'),
      autoStart: +node.getAttribute('auto_start')!,
    }))
    .reverse()
}
