import { mergeTwoArray, mergeTwoArrayRefactor, mergeTwoArrayRefactor2 } from './_88_merge_two_array'

test('88. 合并两个有序数组 双指针', () => {
  const nums1 = [1, 2, 3, 0, 0, 0]
  const m = 3
  const nums2 = [2, 5, 6]
  const n = 3
  mergeTwoArray(nums1, m, nums2, n)
  expect(nums1).toEqual([1, 2, 2, 3, 5, 6])
})

test('88. 合并两个有序数组 双指针', () => {
  const nums1 = [1]
  const m = 1
  const nums2: number[] = []
  const n = 0
  mergeTwoArray(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})

test('88. 合并两个有序数组 双指针', () => {
  const nums1 = [0]
  const m = 0
  const nums2: number[] = [1]
  const n = 1
  mergeTwoArray(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})

test('88. 合并两个有序数组 追加合并之后冒泡排序', () => {
  const nums1 = [1, 2, 3, 0, 0, 0]
  const m = 3
  const nums2 = [2, 5, 6]
  const n = 3
  mergeTwoArrayRefactor(nums1, m, nums2, n)
  expect(nums1).toEqual([1, 2, 2, 3, 5, 6])
})

test('88. 合并两个有序数组 追加合并之后冒泡排序', () => {
  const nums1 = [1]
  const m = 1
  const nums2: number[] = []
  const n = 0
  mergeTwoArrayRefactor(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})

test('88. 合并两个有序数组 追加合并之后冒泡排序', () => {
  const nums1 = [0]
  const m = 0
  const nums2: number[] = [1]
  const n = 1
  mergeTwoArrayRefactor(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})

test('88. 合并两个有序数组 利用有序性双指针头部排序', () => {
  const nums1 = [1, 2, 3, 0, 0, 0]
  const m = 3
  const nums2 = [2, 5, 6]
  const n = 3
  mergeTwoArrayRefactor2(nums1, m, nums2, n)
  expect(nums1).toEqual([1, 2, 2, 3, 5, 6])
})

test('88. 合并两个有序数组 利用有序性双指针头部排序', () => {
  const nums1 = [1]
  const m = 1
  const nums2: number[] = []
  const n = 0
  mergeTwoArrayRefactor2(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})

test('88. 合并两个有序数组 利用有序性双指针头部排序', () => {
  const nums1 = [0]
  const m = 0
  const nums2: number[] = [1]
  const n = 1
  mergeTwoArrayRefactor2(nums1, m, nums2, n)
  expect(nums1).toEqual([1])
})
