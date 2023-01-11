import { domParser } from './xml'

export class SpiritRect {
  doc: Document

  constructor(xml: string) {
    this.doc = domParser(xml)
  }

  getSpiritRect() {
    return Array.from(this.doc.getElementsByTagName('spirit')).map((node) => ({
      name: node.getAttribute('name'),
      id: +node.getAttribute('id')!,
      lv: node.getAttribute('lv')?.replace('LV.', ''),
      endTime: node.getAttribute('endTime'),
      startTime: node.getAttribute('startTime'),
      scene: +node.getAttribute('scene')!,
    }))
  }
}

export type SpiritRectType = ReturnType<SpiritRect['getSpiritRect']>
