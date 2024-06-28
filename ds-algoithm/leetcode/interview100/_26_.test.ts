import { removeDuplicates, removeDuplicatesRefactor } from "./_26_remove_duplicates";
describe('26.删除有序数组中的重复项', () => {
  it('正常情况 5个', () => {
    const nums = [0,0,1,1,1,2,2,3,3,4]
    const res = removeDuplicates(nums)
    expect(res).toBe(5)
  })
  it('正常情况 10个', () => {
    const nums = [0,1,3,4,5,6,7,8,9,10]
    const res = removeDuplicates(nums)
    expect(res).toBe(10)
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
})

describe('26.删除有序数组中的重复项 优化方案', () => {
  it('正常情况 5个', () => {
    const nums = [0,0,1,1,1,2,2,3,3,4]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(5)
  })
  it('正常情况 10个', () => {
    const nums = [0,1,3,4,5,6,7,8,9,10]
    const res = removeDuplicatesRefactor(nums)
    expect(res).toBe(10)
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
})