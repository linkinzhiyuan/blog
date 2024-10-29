// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
// type Replace<S extends string, From extends string, To extends string> = S extends `${infer First}${From}${infer Rest}` ? From extends '' ? S : `${First}${To}${Rest}` : S

type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer First}${From}${infer Rest}` ? `${First}${To}${Rest}` : S
