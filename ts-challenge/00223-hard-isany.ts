// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]


// ============= Your Code Here =============
type IsAny<T> = 0 extends (1 & T) ? true : false

type Test = IsAny<number>
type Test2 = 1 & number // 1
type Test3 = 1 & never // never
type Test4 = 1 & unknown // 1
type Test5 = 1 & any // any
type Test6 = 1 & undefined // never
