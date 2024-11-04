// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]


// ============= Your Code Here =============
// type TupleToNestedObject<T extends string[], U> = T extends [infer First extends string, ...infer Rest extends string[]] ? { [K in First]: Rest['length'] extends 0 ? U : TupleToNestedObject<Rest, U> } : U

// type TupleToNestedObject<T extends string[], U> = T['length'] extends 0 ? U : { [K in T[0]]: TupleToNestedObject<T extends [infer First, ...infer Rest] ? Rest : [], U> }

// github
type TupleToNestedObject<T,U> = T extends [infer First, ...infer Rest] ? { [K in First & string]: TupleToNestedObject<Rest, U> } : U
