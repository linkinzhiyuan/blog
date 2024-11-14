import { longestConsecutive } from './128.最长连续序列';

describe('longestConsecutive', () => {
  it('should return 0 for empty input array', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  it('should return 1 for single element array', () => {
    expect(longestConsecutive([1])).toBe(1);
  });

  it('should return 1 for array with non-consecutive numbers', () => {
    expect(longestConsecutive([1, 3, 5])).toBe(1);
  });

  it('should return 3 for array with consecutive numbers', () => {
    expect(longestConsecutive([1, 2, 3])).toBe(3);
  });

  it('should return 3 for array with duplicate numbers', () => {
    expect(longestConsecutive([1, 2, 2, 3])).toBe(3);
  });

  it('should return 5 for large input array', () => {
    expect(longestConsecutive([1, 2, 3, 4, 5, 7, 8, 9])).toBe(5);
  });
});


import { longestConsecutiveSort } from './128.最长连续序列';

describe('longestConsecutiveSort', () => {
  it('should return 0 for empty input array', () => {
    expect(longestConsecutiveSort([])).toBe(0);
  });

  it('should return 1 for single element array', () => {
    expect(longestConsecutiveSort([1])).toBe(1);
  });

  it('should return 1 for array with non-consecutive numbers', () => {
    expect(longestConsecutiveSort([1, 3, 5])).toBe(1);
  });

  it('should return 3 for array with consecutive numbers', () => {
    expect(longestConsecutiveSort([1, 2, 3])).toBe(3);
  });

  it('should return 3 for array with duplicate numbers', () => {
    expect(longestConsecutiveSort([1, 2, 2, 3])).toBe(3);
  });

  it('should return 5 for large input array', () => {
    expect(longestConsecutiveSort([1, 2, 3, 4, 5, 7, 8, 9])).toBe(5);
  });
});
