import { maxAreaTwoPointers } from './_11_max_area_water';

describe('maxAreaTwoPointers', () => {
  it('should return 0 for an empty array', () => {
    expect(maxAreaTwoPointers([])).toBe(0);
  });

  it('should return 0 for an array with one element', () => {
    expect(maxAreaTwoPointers([1])).toBe(0);
  });

  it('should return the correct area for an array with two elements', () => {
    expect(maxAreaTwoPointers([1, 1])).toBe(1);
  });

  it('should return the correct area for an array with multiple elements (increasing order)', () => {
    expect(maxAreaTwoPointers([1, 2, 3, 4, 5])).toBe(6);
  });

  it('should return the correct area for an array with multiple elements (decreasing order)', () => {
    expect(maxAreaTwoPointers([5, 4, 3, 2, 1])).toBe(6);
  });

  it('should return the correct area for an array with multiple elements (random order)', () => {
    expect(maxAreaTwoPointers([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('should return the correct area for an array with all elements being the same', () => {
    expect(maxAreaTwoPointers([5, 5, 5, 5, 5])).toBe(20);
  });

  it('should return the correct area for an array with all elements being 0', () => {
    expect(maxAreaTwoPointers([0, 0, 0, 0, 0])).toBe(0);
  });
});

import { maxAreaTwoPointerRefactor } from './_11_max_area_water';

describe('maxAreaTwoPointerRefactor', () => {
  it('should return 0 for an empty array', () => {
    expect(maxAreaTwoPointerRefactor([])).toBe(0);
  });

  it('should return 0 for an array with one element', () => {
    expect(maxAreaTwoPointerRefactor([1])).toBe(0);
  });

  it('should return the correct area for an array with two elements', () => {
    expect(maxAreaTwoPointerRefactor([1, 1])).toBe(1);
  });

  it('should return the correct area for an array with multiple elements (increasing order)', () => {
    expect(maxAreaTwoPointerRefactor([1, 2, 3, 4, 5])).toBe(6);
  });

  it('should return the correct area for an array with multiple elements (decreasing order)', () => {
    expect(maxAreaTwoPointerRefactor([5, 4, 3, 2, 1])).toBe(6);
  });

  it('should return the correct area for an array with multiple elements (random order)', () => {
    expect(maxAreaTwoPointerRefactor([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  it('should return the correct area for an array with all elements being the same', () => {
    expect(maxAreaTwoPointerRefactor([5, 5, 5, 5, 5])).toBe(20);
  });

  it('should return the correct area for an array with all elements being 0', () => {
    expect(maxAreaTwoPointerRefactor([0, 0, 0, 0, 0])).toBe(0);
  });
});