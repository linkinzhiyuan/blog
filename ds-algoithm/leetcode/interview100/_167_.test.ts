import { twoSumIndexOf } from './_167_two_sum';

describe('twoSumIndexOf', () => {
  it('should return empty array for empty input', () => {
    expect(twoSumIndexOf([], 0)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSumIndexOf([1], 2)).toEqual([]);
  });

  it('should return correct indices for two element input', () => {
    expect(twoSumIndexOf([2, 7], 9)).toEqual([1, 2]);
  });

  it('should return correct indices for multiple element input', () => {
    expect(twoSumIndexOf([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it('should return empty array for no matching elements', () => {
    expect(twoSumIndexOf([2, 7, 11, 15], 10)).toEqual([]);
  });

  it('should return correct indices for duplicate elements', () => {
    expect(twoSumIndexOf([2, 2, 7, 11, 15], 4)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumIndexOf([-1, 0], -1)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumIndexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 18)).toEqual([6, 12]);
  });

  it('should return correct indices for large numbers', () => {
    expect(twoSumIndexOf([1000, 2000, 3000], 4000)).toEqual([1, 3]);
  });
});

import { twoSumTwoPointers } from './_167_two_sum';

describe('twoSumTwoPointers', () => {
  it('should return empty array for empty input', () => {
    expect(twoSumTwoPointers([], 0)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSumTwoPointers([1], 2)).toEqual([]);
  });

  it('should return correct indices for two element input', () => {
    expect(twoSumTwoPointers([2, 7], 9)).toEqual([1, 2]);
  });

  it('should return correct indices for multiple element input', () => {
    expect(twoSumTwoPointers([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it('should return empty array for no matching elements', () => {
    expect(twoSumTwoPointers([2, 7, 11, 15], 10)).toEqual([]);
  });

  it('should return correct indices for duplicate elements', () => {
    expect(twoSumTwoPointers([2, 2, 7, 11, 15], 4)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumTwoPointers([-1, 0], -1)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumTwoPointers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 18)).toEqual([6, 12]);
  });

  it('should return correct indices for large numbers', () => {
    expect(twoSumTwoPointers([1000, 2000, 3000], 4000)).toEqual([1, 3]);
  });
});

import { twoSumBinarySearch } from './_167_two_sum';

describe('twoSumBinarySearch', () => {
  it('should return empty array for empty input', () => {
    expect(twoSumBinarySearch([], 0)).toEqual([]);
  });

  it('should return empty array for single element input', () => {
    expect(twoSumBinarySearch([1], 2)).toEqual([]);
  });

  it('should return correct indices for two element input', () => {
    expect(twoSumBinarySearch([2, 7], 9)).toEqual([1, 2]);
  });

  it('should return correct indices for multiple element input', () => {
    expect(twoSumBinarySearch([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it('should return empty array for no matching elements', () => {
    expect(twoSumBinarySearch([2, 7, 11, 15], 10)).toEqual([]);
  });

  it('should return correct indices for duplicate elements', () => {
    expect(twoSumBinarySearch([2, 2, 7, 11, 15], 4)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumBinarySearch([-1, 0], -1)).toEqual([1, 2]);
  });

  it('should return correct indices for negative numbers', () => {
    expect(twoSumBinarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 18)).toEqual([6, 12]);
  });

  it('should return correct indices for large numbers', () => {
    expect(twoSumBinarySearch([1000, 2000, 3000], 4000)).toEqual([1, 3]);
  });
});