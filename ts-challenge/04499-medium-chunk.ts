// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
// T 是输入的元组，N 是拆分每个元组的长度，A 是中间的临时数组，返回一个拆分后的元组[A]
type Chunk<T extends any[], N extends number, A extends any[] = []> = 
  T extends [infer F, ...infer R] 
  ? A['length'] extends N 
    ? [A, ...Chunk<T, N>] 
    : Chunk<R, N, [...A, F]> 
  : A extends [] 
    ? [] 
    : [A]

// type Chunk<T extends unknown[], N extends number, Acc extends unknown[] = []> = 
//   T extends [infer F, ...infer R] 
//     ? Acc['length'] extends N 
//       ? [Acc, ...Chunk<T, N>] 
//       : Chunk<R, N, [...Acc, F]>
//     : Acc extends [] 
//       ? []
//       : [Acc];
