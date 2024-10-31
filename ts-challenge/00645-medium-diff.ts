// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]


// ============= Your Code Here =============

// github
type Diff<O, O1> = Omit<O & O1, keyof (O1 | O)>

// O&O1 - O|O1
// & means 'either has', | means 'both have'
// type Diff<O, O1> = {
//   [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
// };

interface Colorful {
  color: string;
  age: number
}
interface Circle {
  radius: number;
  age: number
}

type demo1 = {
  name: string
  age: number
}

type demo2 = {
  name: string
  gender: number
}

type test = keyof (demo1 & demo2)
// 并集
type ColorfulCircle = keyof (Colorful & Circle) // "color" | "radius" | "age"
// 交集
type result = keyof (Foo | Bar) // "name" | "age"
