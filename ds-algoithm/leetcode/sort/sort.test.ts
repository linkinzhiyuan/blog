import { bubblingSort,maximumGap, maximumGapRefactor } from './bubbling'

test('冒泡排序', () => {
  expect(bubblingSort([1,13,16,19,2,4,3])).toEqual([1,2,3,4,13,16,19])
  expect(bubblingSort([2])).toEqual([2])
})

describe('最大间距算法', () => {
  it('正常情况', () => {
    expect(maximumGap([1,13,16,19,2,4,3])).toEqual(9)
  })
  it('错误情况', () => {
    expect(maximumGap([1,13,16,19,2,4,3,5,6])).toEqual(7)
  })
})