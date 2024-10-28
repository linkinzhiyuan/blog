// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============
// 遍历 T，返回联合类型 
// type TupleToUnion<T extends Array<unknown>> = T['length'] extends 0 ? never : T[number]
// type TupleToUnion<T extends Array<unknown>> = T[number]
// type TupleToUnion<T extends any[]> = T extends [infer First, ...infer Rest] ? First | TupleToUnion<Rest> : never
type TupleToUnion<T> = T extends (infer U)[] ? U : never

type test = TupleToUnion<[123, '456', true]>
