// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
// 转化成元组类型，方便extends
type ToUnion<T> = T extends any[] ? T[number] : T
// 依次遍历 T ，判断 T 中的元素是否在 U 中
type Without<T extends any[], U> = T extends [infer F, ...infer R] ? F extends ToUnion<U> ? Without<R,U> : [F, ...Without<R,U>] : []
