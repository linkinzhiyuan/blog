// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]


// ============= Your Code Here =============
type IsAny<T> = 0 extends (1 & T) ? true : false;

// type IsEqual<T, U> = T extends U ? true : false
type IsEqual<X, Y> = 
  (<T>() => T extends X ? true : false) extends
  (<T>() => T extends Y ? true : false) ? true : false;

type IndexOf<T extends any[], U, A extends any[] = []> = 
  T extends [infer First, ...infer Rest] 
    ? IsEqual<First, U> extends true
      ? A['length']
      : IndexOf<Rest, U, [...A, First]>
    : -1


type demo = IndexOf<[string, 1, number, 'a'], number>


type test = 1 extends number ? true : false
