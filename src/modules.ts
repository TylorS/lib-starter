import { PROPERTIES_TO_SKIP } from './constants'
import { VNodeProps } from 'mostly-dom'

export function propsModule(props: VNodeProps, attributes: Map<string, any>): void {
  for (const name in props) {
    if (PROPERTIES_TO_SKIP.indexOf(name) > -1) continue

    if (name === 'className') {
      attributes.set('class', escape((props as any)[name]))
    } else {
      attributes.set(name.toLowerCase(), escape((props as any)[name]))
    }
  }
}

export function attrsModule(props: VNodeProps, attributes: Map<string, any>): void {
  const { attrs } = props

  if (!attrs) return

  for (const key in attrs)
    attributes.set(key, escape(attrs[key]))
}

export function classModule(props: VNodeProps, attributes: Map<string, any>): void {
  const { class: klass } = props

  if (!klass) return

  const existing = attributes.get('class')
  const classes = existing.length > 0 ? new Set(existing.split(' ')) : new Set()

  for (const className in klass) {
    if (!klass.hasOwnProperty(className)) continue

    const value = klass[className]

    if (value === true)
      classes.add(value)
  }

  attributes.set('class', Array.from(classes.values()).join(' '))
}

export function styleModule(props: VNodeProps, attributes: Map<string, any>): void {
  const { style } = props

  const styles = Object.assign({}, style)

  const values: Array<string> = []

  if (!style) return

  if (style.delayed) Object.assign(styles, style.delayed)

  for (const key in style) {
    if (!style.hasOwnProperty(key) || key === 'delayed') continue

    const value = (style as any)[key]

    const typeOf = typeof value

    if (typeOf === 'string' || typeOf === 'number')
      values.push(kebabCase(key) + ': ' + escape(value))
  }

  attributes.set('style', values.join('; ') + ';')
}

const htmlEscapes = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt',
  '"': '&quot',
  "'": '&#39',
}

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

function escape(str: string) {
  return (str && reHasUnescapedHtml.test(str))
    ? str.replace(reUnescapedHtml, (chr: keyof typeof htmlEscapes) => htmlEscapes[chr])
    : str
}

const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g

function kebabCase(str: string): string {
  return str.replace(KEBAB_REGEX, (match: string) => '-' + match.toLowerCase())
}
