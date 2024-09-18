import { threeSum } from './_15_three_sum';

describe('threeSum function', () => {
  it('should return empty array for empty input', () => {
    expect(threeSum([])).toEqual([]);
  });

  it('should return empty array for input with less than 3 elements', () => {
    expect(threeSum([1, 2])).toEqual([]);
  });

  it('should return empty array for input with all positive numbers', () => {
    expect(threeSum([1, 2, 3])).toEqual([]);
  });

  it('should return empty array for input with all negative numbers', () => {
    expect(threeSum([-1, -2, -3])).toEqual([]);
  });

  it('should return correct result for input with mix of positive and negative numbers', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]]);
  });

  it('should return correct result for input with duplicate numbers', () => {
    expect(threeSum([-1,0,1,2,-1,-4])).toEqual([[-1,-1,2],[-1,0,1]]);
  });

  it('should return correct result for input with zero', () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  it('should return empty array', () => {
    expect(threeSum([0,1,1])).toEqual([]);
  });
});


import { threeSumBinarySearch } from './_15_three_sum';

describe('threeSumBinarySearch function', () => {
  it('should return empty array for empty input', () => {
    expect(threeSumBinarySearch([])).toEqual([]);
  });

  it('should return empty array for input with less than 3 elements', () => {
    expect(threeSumBinarySearch([1, 2])).toEqual([]);
  });

  it('should return empty array for input with all positive numbers', () => {
    expect(threeSumBinarySearch([1, 2, 3])).toEqual([]);
  });

  it('should return empty array for input with all negative numbers', () => {
    expect(threeSumBinarySearch([-1, -2, -3])).toEqual([]);
  });

  it('should return correct result for input with mix of positive and negative numbers', () => {
    expect(threeSumBinarySearch([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]]);
  });

  it('should return correct result for input with duplicate numbers', () => {
    expect(threeSumBinarySearch([-1,0,1,2,-1,-4])).toEqual([[-1,-1,2],[-1,0,1]]);
  });

  it('should return correct result for input with zero', () => {
    expect(threeSumBinarySearch([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  it('should return empty array', () => {
    expect(threeSumBinarySearch([0,1,1])).toEqual([]);
  });
});