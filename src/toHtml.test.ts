import { Test, describe, given, it } from '@typed/test'
import { br, button, div, svg } from 'mostly-dom'

import { eq } from '@briancavalier/assert'
import { toHtml } from './toHtml'

export const test: Test =
  describe(`toHtml`,
    given(`a div VNode`,
      it(`returns an html representation`, () => {
        eq(`<div></div>`, toHtml(div()))
      }),

      given(`it has children`,
        it(`returns an html representation`, () => {
          eq(
            `<div><button></button></div>`,
            toHtml(div([ button() ])),
          )
        }),
      ),
    ),

    given(`a self-closing VNode`,
      it(`returns an html representation`, () => {
        eq(`<br />`, toHtml(br()))
      }),
    ),

    given(`a svg VNode`,
      it(`returns an html representation`, () => {
        eq(`<svg></svg>`, toHtml(svg()))
      }),

      given(`it has children`,
        it(`returns an html representation`, () => {
          eq(`<svg><g><polygon /></g></svg>`, toHtml(svg([ svg.g([ svg.polygon() ]) ])))
        }),
      ),
    ),
  )
