import { merge } from './56.合并区间';

describe('merge intervals', () => {
  it('should return empty array for empty input', () => {
    expect(merge([])).toEqual([]);
  });

  it('should return single interval for single input', () => {
    expect(merge([[1, 2]])).toEqual([[1, 2]]);
  });

  it('should return non-overlapping intervals', () => {
    expect(merge([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
  });

  it('should merge overlapping intervals', () => {
    expect(merge([[1, 3], [2, 4]])).toEqual([[1, 4]]);
  });

  it('should handle intervals with same start and end values', () => {
    expect(merge([[1, 1], [2, 2]])).toEqual([[1, 1], [2, 2]]);
  });

  it('should handle intervals with negative values', () => {
    expect(merge([[-1, 1], [0, 2]])).toEqual([[-1, 2]]);
  });

  it('should handle large input', () => {
    expect(merge([[1, 3], [2, 4], [5, 7], [6, 8]])).toEqual([[1, 4], [5, 8]]);
  });
});
