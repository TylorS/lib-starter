import { Test, describe, given, it } from '@typed/test'

export const test: Test = describe(`Foo`, [
  given(`Bar`, [
    it(`Baz`, ({ ok }) => { ok(true) })
  ])
])
