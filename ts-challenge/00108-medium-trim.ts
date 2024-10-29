// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============
// 先前面 再后面
type Space = ' ' | '\n' | '\t'
// type Trim<S extends string> = S extends `${Space}${infer Rest}` ? Trim<Rest> : S extends `${infer First}${Space}` ? Trim<First> : S

type Trim<S extends string> = S extends `${Space}${infer Rest}` | `${infer First}${Space}` ? Trim<`${First}${Rest}`> : S
// type Trim<S extends string> = S extends `${Space}${infer T}` | `${infer T}${Space}` ? Trim<T> : S

