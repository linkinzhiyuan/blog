import { insert, insert2 } from './57.插入区间';

describe('insert intervals', () => {
  it('should return new interval for empty intervals array', () => {
    expect(insert([], [1, 2])).toEqual([[1, 2]]);
  });

  it('should insert and merge single interval', () => {
    expect(insert([[1, 2]], [3, 4])).toEqual([[1, 2], [3, 4]]);
  });

  it('should insert and merge multiple non-overlapping intervals', () => {
    expect(insert([[1, 2], [4, 5]], [3, 3])).toEqual([[1, 2], [3, 3], [4, 5]]);
  });

  it('should insert and merge multiple overlapping intervals', () => {
    expect(insert([[1, 3], [4, 6]], [2, 5])).toEqual([[1, 6]]);
  });

  it('should insert new interval completely contained within an existing interval', () => {
    expect(insert([[1, 5]], [2, 3])).toEqual([[1, 5]]);
  });

  it('should insert new interval completely outside of all existing intervals', () => {
    expect(insert([[1, 2]], [6, 7])).toEqual([[1, 2], [6, 7]]);
  });

  it('should insert new interval overlapping with multiple existing intervals', () => {
    expect(insert([[1, 3], [5, 7]], [2, 6])).toEqual([[1, 7]]);
  });

  it('should handle intervals with negative numbers', () => {
    expect(insert([[-1, 1], [2, 4]], [-2, 3])).toEqual([[-2, 4]]);
  });

  it('should handle intervals with zero', () => {
    expect(insert([[0, 2]], [1, 3])).toEqual([[0, 3]]);
  });
});


describe('insert intervals', () => {
  it('should return new interval for empty intervals array', () => {
    expect(insert2([], [1, 2])).toEqual([[1, 2]]);
  });

  it('should insert2 and merge single interval', () => {
    expect(insert2([[1, 2]], [3, 4])).toEqual([[1, 2], [3, 4]]);
  });

  it('should insert2 and merge multiple non-overlapping intervals', () => {
    expect(insert2([[1, 2], [4, 5]], [3, 3])).toEqual([[1, 2], [3, 3], [4, 5]]);
  });

  it('should insert2 and merge multiple overlapping intervals', () => {
    expect(insert2([[1, 3], [4, 6]], [2, 5])).toEqual([[1, 6]]);
  });

  it('should insert2 new interval completely contained within an existing interval', () => {
    expect(insert2([[1, 5]], [2, 3])).toEqual([[1, 5]]);
  });

  it('should insert2 new interval completely outside of all existing intervals', () => {
    expect(insert2([[1, 2]], [6, 7])).toEqual([[1, 2], [6, 7]]);
  });

  it('should insert2 new interval overlapping with multiple existing intervals', () => {
    expect(insert2([[1, 3], [5, 7]], [2, 6])).toEqual([[1, 7]]);
  });

  it('should handle intervals with negative numbers', () => {
    expect(insert2([[-1, 1], [2, 4]], [-2, 3])).toEqual([[-2, 4]]);
  });

  it('should handle intervals with zero', () => {
    expect(insert2([[0, 2]], [1, 3])).toEqual([[0, 3]]);
  });
});
