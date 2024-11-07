// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]


// ============= Your Code Here =============
// // 1. 首先实现字符串转联合类型
// type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
//   ? F | StringToUnion<R>
//   : never;

// // 2. 实现从联合类型中排除某个类型
// type Exclude<T, U> = T extends U ? never : T;

// // 3. 实现组合生成
// type AllCombinations<
//   S extends string,
//   U extends string = StringToUnion<S>
// > = [U] extends [never]
//   ? ''
//   : '' | {[P in U]: `${P}${AllCombinations<never, Exclude<U, P>>}`}[U];



type StringToUnion<S extends string> = S extends `${infer F}${infer R}` ? F | StringToUnion<R> : never

type Exclude<T,U> = T extends U ? never : T

type AllCombinations<S extends string, U extends string = StringToUnion<S>> = [U] extends [never] ? '' : '' | { [P in U]: `${P}${AllCombinations<never, Exclude<U, P>>}`}[U]
