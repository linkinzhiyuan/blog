// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]


// ============= Your Code Here =============
type Flatten<T,R extends any[] = []> = 
  T extends [infer F,...infer L]?
    [F] extends [never]?
      Flatten<L,R>:
      F extends any[]?
        Flatten<L,[...R,...Flatten<F>]  >
        :Flatten<L,[...R,F]>
    :R 


type Count<
  T,
  R extends Record<string | number,any[]> = {}
> = 
T extends [infer F extends string | number,...infer L]?
  F extends keyof R?
    Count<L, Omit<R,F>& Record<F,[...R[F],0] > >
    : Count<L, R & Record<F,[0]>>
  :{
    [K in keyof R]:R[K]['length']
  }


type CountElementNumberToObject<
  T
> = 
  Count<Flatten<T>>
