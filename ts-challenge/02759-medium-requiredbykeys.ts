// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]


// ============= Your Code Here =============
// type RequiredToObj<T> = {
//   [P in keyof T]: T[P]
// }
// type RequiredByKeys<T, K extends keyof T = keyof T> = RequiredToObj<{
//   [P in keyof T as P extends K ? never : P]: T[P]
// } & {
//   [P in K]-?: T[P]
// }>

// type RequiredByKeys<T, K extends keyof T = keyof T> = RequiredToObj<Omit<T, K> & Required<Pick<T, K>>>

type RequiredByKeys<T, K extends keyof T = keyof T, O = Omit<T, K> & Required<Pick<T, K>>> = {
  [K in keyof O]: O[K]
} 