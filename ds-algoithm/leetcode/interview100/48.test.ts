import { rotateMatrixImage } from './48.rotate';

describe('rotateMatrixImage', () => {
  test('should rotate a 1x1 matrix', () => {
    const matrix = [[1]];
    const expected = [[1]];
    rotateMatrixImage(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 2x2 matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    const expected = [
      [3, 1],
      [4, 2]
    ];
    rotateMatrixImage(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expected = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ];
    rotateMatrixImage(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 4x4 matrix', () => {
    const matrix = [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16]
    ];
    const expected = [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11]
    ];
    rotateMatrixImage(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should handle an empty matrix', () => {
    const matrix: number[][] = [];
    const expected: number[][] = [];
    rotateMatrixImage(matrix);
    expect(matrix).toEqual(expected);
  });
});

import { rotateMatrixReverse } from './48.rotate';

describe('rotateMatrixReverse', () => {
  test('should rotate a 1x1 matrix', () => {
    const matrix = [[1]];
    const expected = [[1]];
    rotateMatrixReverse(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 2x2 matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    const expected = [
      [3, 1],
      [4, 2]
    ];
    rotateMatrixReverse(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expected = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ];
    rotateMatrixReverse(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should rotate a 4x4 matrix', () => {
    const matrix = [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16]
    ];
    const expected = [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11]
    ];
    rotateMatrixReverse(matrix);
    expect(matrix).toEqual(expected);
  });

  test('should handle an empty matrix', () => {
    const matrix: number[][] = [];
    const expected: number[][] = [];
    rotateMatrixReverse(matrix);
    expect(matrix).toEqual(expected);
  });
});

