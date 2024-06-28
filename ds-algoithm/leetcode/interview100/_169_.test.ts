import { majorityElement, majorityElementHash, majorityElementSort } from './_169_majority_element'

describe('169. 多数元素', () => {
  it('多个元素', () => {
    const nums = [2,2,1,1,1,2,2]
    const res = majorityElement(nums)
    expect(res).toBe(2)
  })
  it('3个元素', () => {
    const nums = [3,2,3]
    const res = majorityElement(nums)
    expect(res).toBe(3)
  })
  it('3个元素', () => {
    const nums = [3,3,4]
    const res = majorityElement(nums)
    expect(res).toBe(3)
  })
  it('一个元素', () => {
    const nums = [1]
    const res = majorityElement(nums)
    expect(res).toBe(1)
  })
  it('多个不相同的元素', () => {
    const nums = [1,2,2,3,2,3,4,4,2,3,4,3,4,1,3]
    const res = majorityElement(nums)
    expect(res).toBe(3)
  })
})

describe('169. 多数元素 hashMap', () => {
  it('多个元素', () => {
    const nums = [2,2,1,1,1,2,2]
    const res = majorityElementHash(nums)
    expect(res).toBe(2)
  })
  it('3个元素', () => {
    const nums = [3,2,3]
    const res = majorityElementHash(nums)
    expect(res).toBe(3)
  })
  it('3个元素', () => {
    const nums = [3,3,4]
    const res = majorityElementHash(nums)
    expect(res).toBe(3)
  })
  it('一个元素', () => {
    const nums = [1]
    const res = majorityElementHash(nums)
    expect(res).toBe(1)
  })
  it('多个不相同的元素', () => {
    const nums = [1,2,2,3,2,3,4,4,2,3,4,3,4,1,3]
    const res = majorityElementHash(nums)
    expect(res).toBe(3)
  })
})

describe('169. 多数元素 排序', () => {
  it('多个元素', () => {
    const nums = [2,2,1,1,1,2,2]
    const res = majorityElementSort(nums)
    expect(res).toBe(2)
  })
  it('3个元素', () => {
    const nums = [3,2,3]
    const res = majorityElementSort(nums)
    expect(res).toBe(3)
  })
  it('3个元素', () => {
    const nums = [3,3,4]
    const res = majorityElementSort(nums)
    expect(res).toBe(3)
  })
  it('一个元素', () => {
    const nums = [1]
    const res = majorityElementSort(nums)
    expect(res).toBe(1)
  })
  // it('多个不相同的元素', () => {
  //   const nums = [1,2,2,3,2,3,4,4,2,3,4,3,4,1,3,4,4]
  //   const res = majorityElementSort(nums)
  //   expect(res).toBe(4)
  // })
})
