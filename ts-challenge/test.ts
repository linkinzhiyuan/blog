
/**
 * 发布订阅模式
 */
interface EventMap {
  [key: string]: Array<Function>
}

interface EventFace {
  on: <K extends keyof EventMap>(event: K, callback: (payload: EventMap[K]) => void) => void
  emit: <K extends keyof EventMap>(event: K, payload: EventMap[K]) => void
  off: <K extends keyof EventMap>(event: K, callback: (payload: EventMap[K]) => void) => void
  once: <K extends keyof EventMap>(event: K, callback: (payload: EventMap[K]) => void) => void
}

class Dispatch implements EventFace {
  list: EventMap;
  constructor() {
    this.list = {}
  }

  on<K extends keyof EventMap>(event: K, callback: Function) {
    const callbackList = this.list[event] || []
    callbackList.push(callback)
    this.list[event] = callbackList
  }

  emit<K extends keyof EventMap>(event: K, ...args: Array<any>) {
    let eventName = this.list[event]
    if (eventName) {
      eventName.forEach(fn => {
        fn.apply(this, args)
      })
    } else {
      console.log('没有订阅该事件')
    }
  }

  off<K extends keyof EventMap>(event: K, callback: (payload: EventMap[K]) => void) {
    const callbackList = this.list[event] || []
    this.list[event] = callbackList.filter(item => item !== callback)
  }

  once<K extends keyof EventMap>(event: K, callback: Function) {
    const onceCallback = (...args: Array<any>) => {
      callback.apply(this, args)
      this.off(event, onceCallback)
    }
    this.on(event, onceCallback)
  }
}

const dispatch = new Dispatch()

dispatch.on('abc', (...payload: any) => {
  console.log(payload)
})
dispatch.emit('abc', 'payload', 1, true)

dispatch.once('once', (...payload: any) => {
  console.log(payload)
})

dispatch.emit('once', 'once payload', 3, false)

/**
 * 泛型工具
 * Omit Pick Partial Required ReturnType Record
 */


type customPartial<T> = {
  [P in keyof T]?: T[P]
}

interface User {
  name: string
  age: number
}

type PartialUser = customPartial<User>

// Required
type customRequired<T> = {
  [P in keyof T]-?: T[P]
}

interface Person {
  name?: string
  age?: number
}

type RequiredPerson = customRequired<Person>

// Pick
type customPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Todo {
  title: string
  description?: string
  completed?: boolean
}

type TodoPick = customPick<Todo, 'title' | 'completed'>

// Exclude
type customExclude<T,K> = T extends K ? never : T

type List = 'a' | 'b' | 'c'

type TodoExclude = customExclude<List, 'a'>

// Omit: 用于创建一个新的类型，从原始类型中排除某些属性
type customOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface TodoOmit {
  title: string
  description?: string
  completed?: boolean
}

type TodoOmit1 = customOmit<TodoOmit, 'completed'>


// Record 有两个类型参数K和T，K代表表示创建的新对象需要具有的属性，属性可以只有一个，也可以有多个，多个属性时采用联合类型的写法，T代表对象属性的类型
type customRecord<K extends keyof any, T> = {
  [P in K]: T
}

type TodoRecord = customRecord<'title' | 'description', string>
type CatName = 'miffy' | 'boris' | 'mordred'
interface CatInfo {
  age: number
  breed: string
}
const Cat:customRecord<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon'},
  mordred: { age: 16, breed: 'British Shorthair'}
}

// infer
// 递归
type PromiseType<T> = T extends Promise<infer U> ? PromiseType<U> : T
interface User {
  name: string
  age: number
}
type PromiseTest = PromiseType<Promise<Promise<User>>>

// infer协变 获取对象属性，返回元组类型
const obj = {
  name: 'test',
  age: 18
}
type tupleType<T> = T extends {name: infer U, age: infer V} ? [U, V] : never
type tupleTypeResult = tupleType<typeof obj>

// 同一个对象使用一个变量就会产生协变，返回值就是联合类型
type protoType<T> = T extends { [key: string]: infer U } ? U : never
type objType = protoType<typeof obj>

// 逆变
const fnObj = {
  a: (x: string) => x,
  b: (y: number) => y
}
type fnType<T> = T extends {a: (x: infer U) => infer U, b: (y: infer U) => infer U} ? U : never
// 函数会产生逆变，此时返回的值是一个交叉类型 string & number 怎么可能一个类型同时是string又是number不可能所以是never
type fnTypeResult = fnType<typeof fnObj>

