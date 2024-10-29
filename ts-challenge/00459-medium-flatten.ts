// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>


// ============= Your Code Here =============
// 没有完成深层递归 错误的
// type Flatten<T extends Array<any>, A extends any[] = []> = T extends [infer F, ...infer R] ? R extends [] ? [...A, F] : Flatten<R, [...A, F]> : A

// codeium 写法 自身递归
// type Flatten<T extends any[]> = T extends [infer F, ...infer R] ? F extends any[] ? [...Flatten<F>, ...Flatten<R>] : [F, ...Flatten<R>] : []

type Flatten<T extends any[]> = T extends [infer F, ...infer R] ? F extends any[] ? Flatten<[...F, ...R]> : [F, ...Flatten<R>] : T

// github 写法 借用一个新的数组 Flatten<[...F,...R], A> : [F, ...Flatten<R, A>] : T
// type Flatten<T extends any[], A extends any[] = []> = T extends [infer F, ...infer R] ? F extends any[] ? Flatten<[...F, ...R], A> : Flatten<[...R], [...A, F]> : A