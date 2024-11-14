import { containsNearbyDuplicate } from './219.存在重复元素';

describe('containsNearbyDuplicate', () => {
  it('should return false for empty array', () => {
    expect(containsNearbyDuplicate([], 3)).toBe(false);
  });

  it('should return false for single element array', () => {
    expect(containsNearbyDuplicate([1], 3)).toBe(false);
  });

  it('should return false for array with no duplicates', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 4, 5], 3)).toBe(false);
  });

  it('should return false for array with duplicates, but not within k distance', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 1)).toBe(false);
  });

  it('should return true for array with duplicates within k distance', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toBe(true);
  });

  it('should return false for edge case: k = 0', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 0)).toBe(false);
  });

  it('should return true for edge case: k = nums.length', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 4)).toBe(true);
  });
});


import { containsNearbyDuplicateSet } from './219.存在重复元素';

describe('containsNearbyDuplicateSet', () => {
  it('should return false for empty array', () => {
    expect(containsNearbyDuplicateSet([], 3)).toBe(false);
  });

  it('should return false for single element array', () => {
    expect(containsNearbyDuplicateSet([1], 3)).toBe(false);
  });

  it('should return false for array with no duplicates', () => {
    expect(containsNearbyDuplicateSet([1, 2, 3, 4, 5], 3)).toBe(false);
  });

  it('should return false for array with duplicates, but not within k distance', () => {
    expect(containsNearbyDuplicateSet([1, 2, 3, 1], 1)).toBe(false);
  });

  it('should return true for array with duplicates within k distance', () => {
    expect(containsNearbyDuplicateSet([1, 2, 3, 1], 3)).toBe(true);
  });

  it('should return false for edge case: k = 0', () => {
    expect(containsNearbyDuplicateSet([1, 2, 3, 1], 0)).toBe(false);
  });

  it('should return true for edge case: k = nums.length', () => {
    expect(containsNearbyDuplicateSet([1, 2, 3, 1], 4)).toBe(true);
  });
});
