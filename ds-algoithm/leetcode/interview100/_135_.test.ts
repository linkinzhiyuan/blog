import { candy, candy2 } from './_135_candy';

describe('candy function', () => {
  it('should return 0 for an empty ratings array', () => {
    expect(candy2([])).toBe(0);
  });

  it('should return 1 for a single rating', () => {
    expect(candy2([1])).toBe(1);
  });

  it('should return the correct sum for multiple ratings with no changes', () => {
    expect(candy2([1, 1, 1])).toBe(3);
  });

  it('should return the correct sum for multiple ratings with single changes', () => {
    expect(candy2([1, 0, 2])).toBe(5);
  });

  it('should return the correct sum for multiple ratings with multiple changes', () => {
    expect(candy2([1, 2, 2])).toBe(4);
  });

  it('should return the correct sum for multiple ratings with increasing changes', () => {
    expect(candy2([1, 2, 3])).toBe(6);
  });

  it('should return the correct sum for multiple ratings with decreasing changes', () => {
    expect(candy2([3, 2, 1])).toBe(6);
  });

  it('should return the correct sum for multiple ratings with mixed changes', () => {
    expect(candy2([1, 2, 3, 2, 1])).toBe(9);
  });
});