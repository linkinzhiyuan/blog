// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]


// ============= Your Code Here =============
type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer R}` ? R extends `${string}${F}${string}` ? true : CheckRepeatedChars<R> : false;

// type test = 'c' extends 'bc' ? true : false
// type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}` 
//   ? E extends `${string}${F}${string}`
//     ? true
//     : CheckRepeatedChars<E>
//   : false
