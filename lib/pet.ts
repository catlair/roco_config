import { getPetProperty } from './local'
import { domParser, getNumber } from './xml'

function getFeatures(node: Element) {
  const features = node.getAttribute('features')
  return features?.split(',')?.map((feature) => Number(feature)) ?? []
}

function getEvolutiontoIDs(node: Element) {
  const evolutiontoIDs = node.getAttribute('EvolutiontoIDs')
  return evolutiontoIDs?.split('|')?.map((id) => Number(id)) ?? []
}

export class PetDes {
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

  getGroupTypeJSON() {
    return Array.from(this.doc.getElementsByTagName('groupTypeDes')).map(
      (node) => ({
        id: getNumber(node, 'id'),
        name: node.getAttribute('name'),
      })
    )
  }

  getSpiritJSON() {
    return Array.from(this.doc.getElementsByTagName('SpiritDes')).map(
      (node) => ({
        form: getNumber(node, 'evolutionFormID'),
        to: getEvolutiontoIDs(node),
        mtype: node.getAttribute('Mtype'),
        catchrate: node.getAttribute('catchrate'),
        color: node.getAttribute('color'),
        description: node.getAttribute('description'),
        endTime: node.getAttribute('endTime'),
        evolution: node.getAttribute('evolution'),
        expType: getNumber(node, 'expType'),
        features: getFeatures(node),
        firstID: getNumber(node, 'firstID'),
        getForm: node.getAttribute('getForm'),
        group: getNumber(node, 'group'),
        habitat: node.getAttribute('habitat'),
        height: node.getAttribute('height'),
        iconSrc: node.getAttribute('iconSrc'),
        id: getNumber(node, 'id'),
        interest: node.getAttribute('interest'),
        isInBook: node.getAttribute('isInBook'),
        // 魔攻
        mg: getNumber(node, 'mg'),
        // 魔防
        mk: getNumber(node, 'mk'),
        // 防御
        fy: getNumber(node, 'fy'),
        // 速度
        sd: getNumber(node, 'sd'),
        // 生命
        sm: getNumber(node, 'sm'),
        // 物攻
        wg: getNumber(node, 'wg'),
        mspeed: node.getAttribute('mspeed'),
        name: node.getAttribute('name'),
        previewSrc: node.getAttribute('previewSrc'),
        propoLevel: node.getAttribute('propoLevel'),
        src: node.getAttribute('src'),
        state: node.getAttribute('state'),
        weight: node.getAttribute('weight'),
      })
    )
  }

  getAllDesJSON() {
    return {
      property: this.getPropertyJSON(),
      groupType: this.getGroupTypeJSON(),
      pet: this.getSpiritJSON(),
    }
  }
}

/**
 * 设置系别
 */
export function setFeatures(features: number[]) {
  const props = getPetProperty()
  if (!props) return '解析错误'
  if (features.length === 1) return props[features[0]]
  return features.map((f) => props![f]).join('、')
}

let groups: PetDesType['groupType'] | undefined

/**
 * 设置组别
 */
export function setGroupType(
  group: number,
  groupTypes?: PetDesType['groupType']
) {
  if (groupTypes) groups = groupTypes
  if (!groups) return '解析错误'
  return groups[group - 1].name
}

export type PetDesType = ReturnType<PetDes['getAllDesJSON']>
