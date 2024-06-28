import { removeElement, removeElementFastSlow,  removeElementFastSlowRefactor} from './_27_remove_element'

test('27. 移除元素', () => {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2]
  const val = 2
  const result = removeElement(nums, val)
  expect(result).toBe(5)
})

test('27. 移除元素', () => {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2]
  const val = 4
  const result = removeElement(nums, val)
  expect(result).toBe(7)
})

test('27. 移除元素', () => {
  const nums = [3,3]
  const val = 3
  const result = removeElement(nums, val)
  expect(result).toBe(0)
})

test('27. 移除元素 快慢指针', () => {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2]
  const val = 2
  const result = removeElementFastSlow(nums, val)
  expect(result).toBe(5)
})

test('27. 移除元素 快慢指针', () => {
  const nums = [3,3]
  const val = 3
  const result = removeElementFastSlow(nums, val)
  expect(result).toBe(0)
})

test('27. 移除元素 快慢指针优化', () => {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2]
  const val = 2
  const result = removeElementFastSlowRefactor(nums, val)
  expect(result).toBe(5)
})

test('27. 移除元素 快慢指针优化', () => {
  const nums = [3,3]
  const val = 3
  const result = removeElementFastSlowRefactor(nums, val)
  expect(result).toBe(0)
})