// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]


// ============= Your Code Here =============
// type Permutation<T> = T extends T ? [T, ...Permutation<Exclude<T, T>>] : [] 
type Permutation<T, K=T> = [T] extends [never] ? [] : T extends K ? [T, ...Permutation<Exclude<K, T>>] : never

// type demo = Permutation<'A' | 'B' | 'C'>

// type Test<T> = T extends T ? [T] : false

// type Demo1 = Test<'A' | 'B'>