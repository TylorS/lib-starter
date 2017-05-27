import { Maybe } from '167'

export type Done<E extends Error = Error> = (e?: E) => void

export type Result<A> = { name: string, passed: boolean, error: Maybe<Error> }

export type SingularTest<A> = { '@@typed/test': string, run: () => Promise<Result<A>> }

export type GroupTest = { '@@typed/test': string, tests: Array<Test<any>> }

export type Test<A> = SingularTest<A> | GroupTest
