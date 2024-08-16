import { RandomizedSet, RandomizedSetHashMap } from './_380_randomized_set'

describe('380. 常数时间插入、删除和获取随机元素', () => {
  it('常规测试', () => {
    const randomizedSet = new RandomizedSet()
    expect(randomizedSet.insert(1)).toBe(true)
    expect(randomizedSet.remove(2)).toBe(false)
    expect(randomizedSet.insert(2)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(1)
    expect(randomizedSet.remove(1)).toBe(true)
    expect(randomizedSet.insert(2)).toBe(false)
    expect(randomizedSet.getRandom()).toBe(2)
  })
  it('边界测试', () => {
    const randomizedSet = new RandomizedSet()
    expect(randomizedSet.remove(0)).toBe(false)
    expect(randomizedSet.insert(0)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(0)
    expect(randomizedSet.remove(0)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(undefined)
  })
  it('性能测试', () => {
    const randomizedSet = new RandomizedSet()
    for(let i = 0; i < 1000; i++) {
      randomizedSet.insert(i)
    }
    for(let i = 0; i < 1000; i++) {
      randomizedSet.remove(i)
    }
    expect(randomizedSet.getRandom()).toBe(undefined)
  })
})

describe('380. 常数时间插入、删除和获取随机元素 哈希表 + 数组', () => {
  it('常规测试', () => {
    const randomizedSet = new RandomizedSetHashMap()
    expect(randomizedSet.insert(1)).toBe(true)
    expect(randomizedSet.remove(2)).toBe(false)
    expect(randomizedSet.insert(2)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(1)
    expect(randomizedSet.remove(1)).toBe(true)
    expect(randomizedSet.insert(2)).toBe(false)
    expect(randomizedSet.getRandom()).toBe(2)
  })
  it('边界测试', () => {
    const randomizedSet = new RandomizedSetHashMap()
    expect(randomizedSet.remove(0)).toBe(false)
    expect(randomizedSet.insert(0)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(0)
    expect(randomizedSet.remove(0)).toBe(true)
    expect(randomizedSet.getRandom()).toBe(undefined)
  })
  it('性能测试', () => {
    const randomizedSet = new RandomizedSetHashMap()
    for(let i = 0; i < 1000; i++) {
      randomizedSet.insert(i)
    }
    for(let i = 0; i < 1000; i++) {
      randomizedSet.remove(i)
    }
    expect(randomizedSet.getRandom()).toBe(undefined)
  })
})