import { rotateMapK, rotateForeach, rotateArrRerverse } from './_189_rotate_array'

describe('189. 旋转数组 循环k 优化版', () => {
  it('k = 3', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 3
    rotateMapK(nums, k)
    expect(nums).toEqual([5,6,7,1,2,3,4])
  })
  it('k = 15, 取k/length的余数 作为新的k', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 15
    rotateMapK(nums, k)
    expect(nums).toEqual([7,1,2,3,4,5,6])
  })
  it('k = 7, 数组长度也是7, 顺序不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 7
    rotateMapK(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })
  it('k = 0, 数组不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 0
    rotateMapK(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })
  it('k = 1', () => {
    const nums = [1]
    const k = 1
    rotateMapK(nums, k)
    expect(nums).toEqual([1])
  })
  it('数组是空, k 任意值', () => {
    const nums:number[] = []
    const k = 1
    rotateMapK(nums, k)
    expect(nums).toEqual([])
  })
})

describe('189. 旋转数组 foreach', () => {
  it('k = 3', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 3
    rotateForeach(nums, k)
    expect(nums).toEqual([5,6,7,1,2,3,4])
  })
  it('k = 15, 取k/length的余数 作为新的k', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 15
    rotateForeach(nums, k)
    expect(nums).toEqual([7,1,2,3,4,5,6])
  })
  it('k = 7, 数组长度也是7, 顺序不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 7 
    rotateForeach(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })  
  it('k = 0, 数组不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 0
    rotateForeach(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })
  it('k = 1', () => {
    const nums = [1]
    const k = 1
    rotateForeach(nums, k)
    expect(nums).toEqual([1])
  })
  it('数组是空, k 任意值', () => {
    const nums:number[] = []
    const k = 1
    rotateForeach(nums, k)
    expect(nums).toEqual([])
  })
})

describe('189. 旋转数组 reverse', () => {
  it('k = 3', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 3
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([5,6,7,1,2,3,4])
  })
  it('k = 15, 取k/length的余数 作为新的k', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 15
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([7,1,2,3,4,5,6])
  })
  it('k = 7, 数组长度也是7, 顺序不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 7
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })    
  it('k = 0, 数组不变', () => {
    const nums = [1,2,3,4,5,6,7]
    const k = 0
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([1,2,3,4,5,6,7])
  })
  it('k = 1', () => {
    const nums = [1]
    const k = 1
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([1])
  })
  it('数组是空, k 任意值', () => {
    const nums:number[] = []
    const k = 1
    rotateArrRerverse(nums, k)
    expect(nums).toEqual([])
  })
})

