import { domParser } from './xml'

export class SceneConfig {
  doc: Document

  constructor(xml: string) {
    this.doc = domParser(xml)
  }

  getSceneDes() {
    return Array.from(this.doc.getElementsByTagName('SceneDes')).map(
      (node) => ({
        name: node.getAttribute('name'),
        id: node.getAttribute('id'),
        top: node.getAttribute('top'),
        ver: node.getAttribute('top'),
        sceneVer: node.getAttribute('sceneVer'),
        bgMusic: node.getAttribute('bgMusic'),
        allowData: node.getAttribute('allowData'),
      })
    )
  }
}

export type SceneConfigType = ReturnType<SceneConfig['getSceneDes']>
