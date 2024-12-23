// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


// ============= Your Code Here =============
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : S
// type TrimLeft<S extends string> = S extends `${infer First}${infer Rest}` ? First extends ' ' | '\n' | '\t' ? TrimLeft<Rest> : S : S
