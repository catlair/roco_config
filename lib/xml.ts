import { DOMParser } from '@xmldom/xmldom'

export function domParser(xml: string) {
  return new DOMParser().parseFromString(xml, 'text/xml')
}

export function getNumber(node: Element, name: string) {
  return Number(node.getAttribute(name)) ?? -1
}

export function getTag(str: string, tag: string) {
  const data = str.match(new RegExp(`<${tag}.*<\/${tag}>`, 'ms'))
  return data ? data[0] : ''
}
