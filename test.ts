import { describe, given, it } from './src'

export const test =
  describe(`my tests`,
    given(`stuff and things`,
      it(`works`, () => { throw new Error('foo') }),
    ),
  )
