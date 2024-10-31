// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
// 递归
// type KebabCase<S> = S extends `${infer F}${infer R}` ? F extends '-' | '_' ? '' : F extends Uppercase<F> ? `-${Lowercase<F>}${KebabCase<R>}` : `${F}${KebabCase<R>}` : S

// type demo = KebabCase<'foo-bar'>
// type KebabCase<S> = S extends `${infer F}${infer R}` ? F extends Lowercase<F> ? `${F}${KebabCase<R>}` : `-${Lowercase<F>}${KebabCase<R>}` : S

// github S2第一个字符是小写 不是小写转化成小写并加-
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
  ? `${Uncapitalize<S1>}${KebabCase<S2>}`
  : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;
