// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>,
]


// ============= Your Code Here =============
type IsEqual<X,Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
type All<T extends readonly any[], U> = T extends [infer F, ...infer R] ? IsEqual<F,U> extends true ? All<R,U> : false  : true

// type test = never extends any ? true : false

type test1 = IsEqual<1,1>
