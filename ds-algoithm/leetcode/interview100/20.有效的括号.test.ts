import { isValid } from './20.有效的括号';

describe('isValid function', () => {
  it('should return true for empty string', () => {
    expect(isValid('')).toBe(true);
  });

  it('should return true for single pair of brackets', () => {
    expect(isValid('()')).toBe(true);
    expect(isValid('[]')).toBe(true);
    expect(isValid('{}')).toBe(true);
  });

  it('should return true for multiple pairs of brackets', () => {
    expect(isValid('()[]{}')).toBe(true);
    expect(isValid('({[]})')).toBe(true);
  });

  it('should return false for unbalanced brackets', () => {
    expect(isValid('(()')).toBe(false);
    expect(isValid('({}')).toBe(false);
    expect(isValid('([)]')).toBe(false);
  });

  it('should return false for invalid input', () => {
    expect(isValid('abc')).toBe(false);
    expect(isValid('123')).toBe(false);
  });
});
