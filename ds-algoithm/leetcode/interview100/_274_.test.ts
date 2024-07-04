import { hIndex, hIndexBinarySearch, hIndexBucketSort } from "./_274_h_index";

describe('274. H 指数', () => {
  it('示例 1', () => {
    expect(hIndex([3, 0, 6, 1, 5])).toBe(3);
  });
  it('示例 2', () => {
    expect(hIndex([1, 3, 1])).toBe(1);
  });
  it('示例 3', () => {
    expect(hIndex([100])).toBe(1);
  });
  it('示例 4', () => {
    expect(hIndex([0])).toBe(0);
  });
  it('示例 5', () => {
    expect(hIndex([0, 0])).toBe(0);
  });
  it('示例 6', () => {  
    expect(hIndex([1,2])).toBe(1);
  });
  it('示例 7', () => {
    expect(hIndex([0,1])).toBe(1)
  });
})

describe('274. H 指数：二分查找', () => {
  it('示例 1', () => {
    expect(hIndexBinarySearch([3, 0, 6, 1, 5])).toBe(3);
  });
  it('示例 2', () => {
    expect(hIndexBinarySearch([1, 3, 1])).toBe(1);
  });
  it('示例 3', () => {
    expect(hIndexBinarySearch([100])).toBe(1);
  });
  it('示例 4', () => {
    expect(hIndexBinarySearch([0])).toBe(0);
  });
  it('示例 5', () => {
    expect(hIndexBinarySearch([0, 0])).toBe(0);
  });
  it('示例 6', () => {  
    expect(hIndexBinarySearch([1,2])).toBe(1);
  });
  it('示例 7', () => {
    expect(hIndexBinarySearch([0,1])).toBe(1)
  });
})

describe('274. H 指数：桶排序', () => {
  it('示例 1', () => {
    expect(hIndexBucketSort([3, 0, 6, 1, 5])).toBe(3);
  });
  it('示例 2', () => {
    expect(hIndexBucketSort([1, 3, 1])).toBe(1);
  });
  it('示例 3', () => {
    expect(hIndexBucketSort([100])).toBe(1);
  });
  it('示例 4', () => {
    expect(hIndexBucketSort([0])).toBe(0);
  });
  it('示例 5', () => {
    expect(hIndexBucketSort([0, 0])).toBe(0);
  });
  it('示例 6', () => {  
    expect(hIndexBucketSort([1,2])).toBe(1);
  });
  it('示例 7', () => {
    expect(hIndexBucketSort([0,1])).toBe(1)
  });
})