import { domParser, getNumber } from './xml'

export class SkillDes {
  doc: Document

  constructor(xml: string) {
    this.doc = domParser(xml)
  }

  getPropertyJSON() {
    return Array.from(this.doc.getElementsByTagName('PropertyDes')).map(
      (node) => ({
        id: getNumber(node, 'id'),
        name: node.getAttribute('name'),
      })
    )
  }

  getTalentJSON() {
    return Array.from(this.doc.getElementsByTagName('talentDes')).map(
      (node) => ({
        id: getNumber(node, 'id'),
        name: node.getAttribute('name'),
        des: node.getAttribute('des'),
      })
    )
  }

  getSkillJSON() {
    return Array.from(this.doc.getElementsByTagName('SpiritSkillDes')).map(
      (node) => ({
        attackType: getNumber(node, 'attackType'),
        damageType: getNumber(node, 'damageType'),
        description: node.getAttribute('description'),
        id: getNumber(node, 'id'),
        name: node.getAttribute('name'),
        power: getNumber(node, 'power'),
        ppMax: getNumber(node, 'ppMax'),
        property: getNumber(node, 'property'),
        speed: getNumber(node, 'speed'),
        src: node.getAttribute('src'),
      })
    )
  }

  getAllDesJSON() {
    return {
      property: this.getPropertyJSON(),
      talent: this.getTalentJSON(),
      skill: this.getSkillJSON(),
    }
  }
}

export type SkillDesType = ReturnType<SkillDes['getAllDesJSON']>
