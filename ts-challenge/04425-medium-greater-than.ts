// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  // Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============
// type GreaterThan<T extends number, U extends number> = T extends U ? false : true

// type demo = GreaterThan<4,5>

// 1. 创建长度为 N 的数组类型
// type BuildArray<
//   Length extends number, 
//   Arr extends unknown[] = []
// > = Arr['length'] extends Length 
//     ? Arr 
//     : BuildArray<Length, [...Arr, unknown]>;

// // 2. 实现 GreaterThan 类型
// type GreaterThan<T extends number, U extends number> = BuildArray<U> extends [...BuildArray<T>, ...unknown[]]
//   ? false
//   : true;

// 创建一个长度为 N 的数组类型
type BuildArray<L extends number, Arr extends any[] = []> = Arr['length'] extends L ? Arr : BuildArray<L, [...Arr, unknown]>;

// 实现 GreaterThan 类型 T > U true
type GreaterThan<T extends number, U extends number> = BuildArray<U> extends [...BuildArray<T>, ...any[]] ? false : true;
