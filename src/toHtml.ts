import { SCOPE_ATTRIBUTE, VNode } from 'mostly-dom'
import { SELF_CLOSING_ELEMENTS, SVG_CONTAINER_ELEMENTS } from './constants'
import { attrsModule, classModule, propsModule, styleModule } from './modules'

export function toHtml<T extends Element = Element>(vNode: VNode<T>): string {
  return vNodeToHtml(vNode)
}

function vNodeToHtml(vNode: VNode): string {
  const { tagName, className, id, scope, children, props, namespace, text } = vNode

  const attributes: Map<string, any> = new Map()
  let result = '<' + tagName

  if (className)
    attributes.set('class', className)

  if (id)
    attributes.set('id', id)

  if (scope)
    attributes.set(SCOPE_ATTRIBUTE, scope)

  // call all modules here
  propsModule(props, attributes)
  attrsModule(props, attributes)
  classModule(props, attributes)
  styleModule(props, attributes)

  attributes.forEach((value: any, key: string) => {
    if (value)
      result += ` ${key}="${value}"`
  })

  const isSvg = namespace === 'http://www.w3.org/2000/svg'

  const isSvgContainerElement =
    SVG_CONTAINER_ELEMENTS[tagName as keyof typeof SVG_CONTAINER_ELEMENTS] === true

  const isSelfClosing =
    SELF_CLOSING_ELEMENTS[tagName as keyof typeof SELF_CLOSING_ELEMENTS] === true

  if ((!isSvg && isSelfClosing) || (isSvg && !isSvgContainerElement))
    result += ' /'

  result += '>'

  if ((!isSelfClosing && !isSvg) || (isSvg && isSvgContainerElement)) {
    if (props.innerHTML !== void 0) {
      result += props.innerHTML
    } else if (text !== void 0) {
      result += text
    } else if (children) {
      for (const child of children)
        result += vNodeToHtml(child)
    }

    result += `</${tagName}>`
  }

  return result
}
