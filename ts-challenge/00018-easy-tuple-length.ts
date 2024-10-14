// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const



type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]


// ============= Your Code Here =============
// 1. 什么是tuple 类型  length 是指定的数字，而数组的length是可变的number类型
// type a = typeof tesla
// type b = typeof spaceX
// 2. 和数组的区别
type Length<T extends readonly any[]> = T['length']
