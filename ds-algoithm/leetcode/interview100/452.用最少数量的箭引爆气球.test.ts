import { findMinArrowShots } from './452.用最少数量的箭引爆气球';

describe('findMinArrowShots', () => {
  it('should return 0 for empty input', () => {
    expect(findMinArrowShots([])).toBe(0);
  });

  it('should return 1 for single element input', () => {
    expect(findMinArrowShots([[1, 2]])).toBe(1);
  });

  it('should return 2 for multiple non-overlapping intervals', () => {
    expect(findMinArrowShots([[1, 2], [3, 4]])).toBe(2);
  });

  it('should return 1 for multiple overlapping intervals', () => {
    expect(findMinArrowShots([[1, 3], [2, 4]])).toBe(1);
  });

  it('should return 1 for intervals with same start and end points', () => {
    expect(findMinArrowShots([[1, 1], [2, 2]])).toBe(2);
  });

  it('should return correct result for large input', () => {
    const points = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
    expect(findMinArrowShots(points)).toBe(3);
  });
});
