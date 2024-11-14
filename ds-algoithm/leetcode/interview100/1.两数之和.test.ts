import { twoSum } from './1.两数之和';

describe('twoSum function', () => {
  it('should return empty array for empty input', () => {
    expect(twoSum([], 10)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSum([1], 10)).toEqual([]);
  });

  it('should return empty array for no matching pair', () => {
    expect(twoSum([1, 2, 3], 10)).toEqual([]);
  });

  it('should return matching pair at beginning', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('should return matching pair at end', () => {
    expect(twoSum([2, 7, 11, 15], 26)).toEqual([2, 3]);
  });

  it('should return matching pair in middle', () => {
    expect(twoSum([2, 7, 11, 15], 18)).toEqual([1, 2]);
  });

  it('should return matching pair with duplicate numbers', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it('should return matching pair with negative numbers', () => {
    expect(twoSum([-2, 7, 11, 15], 5)).toEqual([0, 1]);
  });

  it('should return matching pair with large numbers', () => {
    expect(twoSum([1000000, 2000000, 3000000], 4000000)).toEqual([0, 2]);
  });
});

import { twoSumTwoFor } from './1.两数之和';

describe('twoSum two for loop', () => {
  it('should return empty array for empty input', () => {
    expect(twoSumTwoFor([], 10)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSumTwoFor([1], 10)).toEqual([]);
  });

  it('should return empty array for no matching pair', () => {
    expect(twoSumTwoFor([1, 2, 3], 10)).toEqual([]);
  });

  it('should return matching pair at beginning', () => {
    expect(twoSumTwoFor([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('should return matching pair at end', () => {
    expect(twoSumTwoFor([2, 7, 11, 15], 26)).toEqual([2, 3]);
  });

  it('should return matching pair in middle', () => {
    expect(twoSumTwoFor([2, 7, 11, 15], 18)).toEqual([1, 2]);
  });

  it('should return matching pair with duplicate numbers', () => {
    expect(twoSumTwoFor([3, 3], 6)).toEqual([0, 1]);
  });

  it('should return matching pair with negative numbers', () => {
    expect(twoSumTwoFor([-2, 7, 11, 15], 5)).toEqual([0, 1]);
  });

  it('should return matching pair with large numbers', () => {
    expect(twoSumTwoFor([1000000, 2000000, 3000000], 4000000)).toEqual([0, 2]);
  });
});


import { twoSumTwoPointer } from './1.两数之和';

describe('twoSum two pointer', () => {
  it('should return empty array for empty input', () => {
    expect(twoSumTwoPointer([], 10)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSumTwoPointer([1], 10)).toEqual([]);
  });

  it('should return empty array for no matching pair', () => {
    expect(twoSumTwoPointer([1, 2, 3], 10)).toEqual([]);
  });

  it('should return matching pair at beginning', () => {
    expect(twoSumTwoPointer([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it('should return matching pair at end', () => {
    expect(twoSumTwoPointer([2, 7, 11, 15], 26)).toEqual([2, 3]);
  });

  it('should return matching pair in middle', () => {
    expect(twoSumTwoPointer([2, 7, 11, 15], 18)).toEqual([1, 2]);
  });

  it('should return matching pair with duplicate numbers', () => {
    expect(twoSumTwoPointer([3, 3], 6)).toEqual([0, 1]);
  });

  it('should return matching pair with negative numbers', () => {
    expect(twoSumTwoPointer([-2, 7, 11, 15], 5)).toEqual([0, 1]);
  });

  it('should return matching pair with large numbers', () => {
    expect(twoSumTwoPointer([1000000, 2000000, 3000000], 4000000)).toEqual([0, 2]);
  });
});
