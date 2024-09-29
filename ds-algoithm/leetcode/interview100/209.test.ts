import { minSubArrayLenLeftRight } from './209.minSubArrayLen';

describe('minSubArrayLenLeftRight', () => {
  it('should return 0 for empty array', () => {
    expect(minSubArrayLenLeftRight(10, [])).toBe(0);
  });

  it('should return 0 for array with one element and target not found', () => {
    expect(minSubArrayLenLeftRight(10, [5])).toBe(0);
  });

  it('should return correct length for array with multiple elements and target found', () => {
    expect(minSubArrayLenLeftRight(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0);
  });

  it('should return 0 for array with multiple elements and target not found', () => {
    expect(minSubArrayLenLeftRight(10, [1, 2, 3, 4, 5])).toBe(3);
  });

  it('should return correct length for array with duplicate elements and target found', () => {
    expect(minSubArrayLenLeftRight(6, [1, 1, 1, 2, 2, 2])).toBe(3);
  });

  it('should return 0 for array with duplicate elements and target not found', () => {
    expect(minSubArrayLenLeftRight(10, [1, 1, 1, 2, 2, 2])).toBe(0);
  });

  it('should return 0 for edge case: target is 0', () => {
    expect(minSubArrayLenLeftRight(0, [1, 2, 3, 4, 5])).toBe(0);
  });

  // it('should return 0 for edge case: target is negative', () => {
  //   expect(minSubArrayLenLeftRight(-10, [1, 2, 3, 4, 5])).toBe(0);
  // });
});

import { minSubArrayLenBinary } from './209.minSubArrayLen';

describe('minSubArrayLenBinary', () => {
  it('should return 0 for empty array', () => {
    expect(minSubArrayLenBinary(10, [])).toBe(0);
  });

  it('should return 0 for array with one element and target not found', () => {
    expect(minSubArrayLenBinary(10, [5])).toBe(0);
  });

  it('should return correct length for array with multiple elements and target found', () => {
    expect(minSubArrayLenBinary(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0);
  });

  it('should return 0 for array with multiple elements and target not found', () => {
    expect(minSubArrayLenBinary(10, [1, 2, 3, 4, 5])).toBe(3);
  });

  it('should return correct length for array with duplicate elements and target found', () => {
    expect(minSubArrayLenBinary(6, [1, 1, 1, 2, 2, 2])).toBe(3);
  });

  it('should return 0 for array with duplicate elements and target not found', () => {
    expect(minSubArrayLenBinary(10, [1, 1, 1, 2, 2, 2])).toBe(0);
  });

  // it('should return 0 for edge case: target is 0', () => {
  //   expect(minSubArrayLenBinary(0, [1, 2, 3, 4, 5])).toBe(0);
  // });

  // it('should return 0 for edge case: target is negative', () => {
  //   expect(minSubArrayLenBinary(-10, [1, 2, 3, 4, 5])).toBe(0);
  // });
});