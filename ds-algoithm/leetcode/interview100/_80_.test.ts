import { removeDuplicates, removeDuplicatesRefactor } from './_80_remove_duplicates_II'

describe('80. 删除有序数组中的重复项 II 借用次数', () => {
  it('正常情况 5个', () => {
    const nums = [1,1,1,2,2,3]
    const res = removeDuplicates(nums)
    expect(res).toBe(5)
  })
  it('正常情况 7个', () => {
    const nums = [0,0,1,1,1,1,2,3,3]
    const res = removeDuplicates(nums)
    expect(res).toBe(7)
  })
  it('正常情况 1个', () => {
    const nums = [0]
    const res = removeDuplicates(nums)
    expect(res).toBe(1)
  })
  it('正常情况 0个', () => {
    const nums: number[] = []
    const res = removeDuplicates(nums)
    expect(res).toBe(0)
  })
  it('正常情况 2个', () => {
    const nums = [1,1]
    const res = removeDuplicates(nums)
    expect(res).toBe(2)
  })
  it('正常情况 2个', () => {
    const nums = [1,1,1]
    const res = removeDuplicates(nums)
    expect(res).toBe(2)
  })
})

describe('80. 删除有序数组中的重复项 II 优化方案', () => {
  it('正常情况 5个', () => {
    const nums = [1,1,1,2,2,3]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(5)
  })
  it('正常情况 7个', () => {
    const nums = [0,0,1,1,1,1,2,3,3]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(7)
  })
  it('正常情况 1个', () => {
    const nums = [0]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(1)
  })
  it('正常情况 0个', () => {
    const nums: number[] = []
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(0) 
  })
  it('正常情况 2个', () => {
    const nums = [1,1]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(2)
  })
  it('正常情况 2个', () => {
    const nums = [1,1,1]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(2)
  })
}) 