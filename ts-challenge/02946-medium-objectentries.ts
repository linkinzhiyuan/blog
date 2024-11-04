// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

// type PartialModel = Partial<Model>

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]


// ============= Your Code Here =============
// type ObjectEntries<T extends object> = {
//   [K in keyof T]-?: [K, T[K]]
// }[keyof T]

// type ObjectEntries<T> = {
//   [K in keyof T]-?: [K, [T[K]] extends [undefined] ? T[K] : Exclude<T[K], undefined>] 
// }[keyof T]

// type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>
// type ObjectEntries<T> = {
//   [K in keyof T]-?: [K, RemoveUndefined<T[K]>]
// }[keyof T]

// github
// type ObjectEntries<T> = {
//   [P in keyof Required<T>]: [P, Required<T>[P] extends never ? undefined : Required<T>[P]]
// }[keyof T]

type ObjectEntries<T> = {
  [K in keyof Required<T>]: [K, [T[K]] extends [undefined] ? undefined : Required<T>[K]]
}[keyof T]

