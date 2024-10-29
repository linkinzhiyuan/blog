// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
// type LengthOfString<S extends string> = S extends `${infer First}${infer Rest}` ? 1 + LengthOfString<Rest> : 0

// 累加到数组中
type LengthOfString<S extends string, T extends Array<any> = []> = S extends `${infer First}${infer Rest}` ? LengthOfString<Rest, [...T,First]> : T['length']

