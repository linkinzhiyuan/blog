import { spiralOrder } from './54.spiralOrder';

describe('spiralOrder', () => {
  test('should return the correct spiral order for a 6x6 matrix', () => {
    const matrix = [
      [1,  2,  3,  4,  5,  6],
      [7,  8,  9,  10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36]
    ];

    const expectedOutput = [
      1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 36, 35, 34, 33, 32, 31, 25, 19, 13, 7, 
      8, 9, 10, 11, 17, 23, 29, 28, 27, 26, 20, 14, 15, 16, 22, 21
    ];

    expect(spiralOrder(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for an empty matrix', () => {
    const matrix: number[][] = [];
    const expectedOutput: number[] = [];
    expect(spiralOrder(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 1x1 matrix', () => {
    const matrix = [[1]];
    const expectedOutput = [1];
    expect(spiralOrder(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 2x2 matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    const expectedOutput = [1, 2, 4, 3];
    expect(spiralOrder(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expectedOutput = [1, 2, 3, 6, 9, 8, 7, 4, 5];
    expect(spiralOrder(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 4x3 matrix', () => {
    const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    const expectedOutput = [1,2,3,4,8,12,11,10,9,5,6,7]
    expect(spiralOrder(matrix)).toEqual(expectedOutput)
  })
});

import { spiralOrderRecursive } from './54.spiralOrder';

describe('spiralOrderRecursive', () => {
  test('should return the correct spiral order for a 6x6 matrix', () => {
    const matrix = [
      [1,  2,  3,  4,  5,  6],
      [7,  8,  9,  10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36]
    ];

    const expectedOutput = [
      1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 36, 35, 34, 33, 32, 31, 25, 19, 13, 7, 
      8, 9, 10, 11, 17, 23, 29, 28, 27, 26, 20, 14, 15, 16, 22, 21
    ];

    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for an empty matrix', () => {
    const matrix: number[][] = [];
    const expectedOutput: number[] = [];
    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 1x1 matrix', () => {
    const matrix = [[1]];
    const expectedOutput = [1];
    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 2x2 matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    const expectedOutput = [1, 2, 4, 3];
    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 3x3 matrix', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const expectedOutput = [1, 2, 3, 6, 9, 8, 7, 4, 5];
    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput);
  });

  test('should return the correct spiral order for a 4x3 matrix', () => {
    const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    const expectedOutput = [1,2,3,4,8,12,11,10,9,5,6,7]
    expect(spiralOrderRecursive(matrix)).toEqual(expectedOutput)
  })
});

