// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
type FlattenDepth<T extends any[], D extends number = 1, U extends number[] = []> = U['length'] extends D ? 
  T 
  : 
  T extends [infer F, ...infer R] 
    ? 
    (F extends any[] ? [...FlattenDepth<F,D,[...U,1]>, ...FlattenDepth<R,D,U>] : [F, ...FlattenDepth<R,D,U>]) 
    :
    T 
