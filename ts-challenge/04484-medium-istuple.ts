// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]


// ============= Your Code Here =============
// type IsTuple<T> = T extends readonly any[] ? number extends T['length'] ? false : true : false

// type test<T extends readonly any[]> = number extends T['length'] ? false : true 

// type demo = IsTuple<never>

type IsTuple<T> = [T] extends [never] ? false : 
  T extends readonly any[] ?
    number extends T['length'] ? 
    false : true
  :false


  // type demo<T> = T extends readonly any[] ? true : false
  // type test = demo<{ length: 1}>