// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]


// ============= Your Code Here =============
// 是否完全相等
type IsEqual<A,B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
// 是否存在
type IsExist<T extends any[], U> = T extends [infer F, ...infer R] ? IsEqual<F,U> extends true ? true : IsExist<R,U> : false
type Unique<T extends any[], A extends any[] = []> = 
  T extends [infer F, ...infer R] 
    ? IsExist<A, F> extends true
      ? Unique<R, A> 
      : Unique<R, [...A, F]> 
    : A


type test = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>

type A = [1,2,number,'1']
type test2 = IsExist<A,number>
