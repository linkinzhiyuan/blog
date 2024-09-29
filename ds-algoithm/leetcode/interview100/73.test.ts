import { setZeroes } from './73.matrixSetZero';

describe('setZeroes', () => {
  it('should set entire row and column to zero if an element is zero', () => {
    const matrix = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ];
    const expected = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle multiple zeros correctly', () => {
    const matrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5]
    ];
    const expected = [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle matrix with no zeros', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle empty matrix', () => {
    const matrix: number[][] = [];
    const expected: number[][] = [];
    setZeroes(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle matrix with a single element', () => {
    const matrix = [[0]];
    const expected = [[0]];
    setZeroes(matrix);
    expect(matrix).toEqual(expected);
  });
});

import { setZeroesConstant } from './73.matrixSetZero';

describe('setZeroesConstant', () => {
  it('should set entire row and column to zero if an element is zero', () => {
    const matrix = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ];
    const expected = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ];
    setZeroesConstant(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle multiple zeros correctly', () => {
    const matrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5]
    ];
    const expected = [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0]
    ];
    setZeroesConstant(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle matrix with no zeros', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    setZeroesConstant(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle empty matrix', () => {
    const matrix: number[][] = [];
    const expected: number[][] = [];
    setZeroesConstant(matrix);
    expect(matrix).toEqual(expected);
  });

  it('should handle matrix with a single element', () => {
    const matrix = [[0]];
    const expected = [[0]];
    setZeroesConstant(matrix);
    expect(matrix).toEqual(expected);
  });
});

