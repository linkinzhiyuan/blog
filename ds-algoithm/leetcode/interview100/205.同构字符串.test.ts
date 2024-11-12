import { isIsomorphic } from './205.同构字符串';

describe('isIsomorphic', () => {
  it('should return true for empty strings', () => {
    expect(isIsomorphic('', '')).toBe(true);
  });

  it('should return true for same strings', () => {
    expect(isIsomorphic('abc', 'abc')).toBe(true);
  });

  it('should return false for different strings with same length', () => {
    expect(isIsomorphic('abc', 'def')).toBe(true);
  });

  it('should return false for strings with different lengths', () => {
    expect(isIsomorphic('abc', 'abcd')).toBe(false);
  });

  it('should return false for strings with same characters but different order', () => {
    expect(isIsomorphic('abc', 'bca')).toBe(true);
  });

  it('should return false for strings with different characters but same order', () => {
    expect(isIsomorphic('abc', '123')).toBe(true);
  });

  it('should return true for strings with non-ASCII characters', () => {
    expect(isIsomorphic('åbc', 'åbc')).toBe(true);
  });

  it('should return true for isomorphic strings', () => {
    expect(isIsomorphic('egg', 'add')).toBe(true);
  });

  it('should return false for non-isomorphic strings', () => {
    expect(isIsomorphic('foo', 'bar')).toBe(false);
  });

  it('leetcode case 3', () => {
    expect(isIsomorphic('paper', 'title')).toBe(true);
  });

  it('leetcode case 39', () => {
    expect(isIsomorphic('badc', 'baba')).toBe(false);
  })
});


import { isIsomorphic2 } from './205.同构字符串';

describe('isIsomorphic2', () => {
  it('should return true for empty strings', () => {
    expect(isIsomorphic2('', '')).toBe(true);
  });

  it('should return true for same strings', () => {
    expect(isIsomorphic2('abc', 'abc')).toBe(true);
  });

  it('should return false for different strings with same length', () => {
    expect(isIsomorphic2('abc', 'def')).toBe(true);
  });

  it('should return false for strings with different lengths', () => {
    expect(isIsomorphic2('abc', 'abcd')).toBe(false);
  });

  it('should return false for strings with same characters but different order', () => {
    expect(isIsomorphic2('abc', 'bca')).toBe(true);
  });

  it('should return false for strings with different characters but same order', () => {
    expect(isIsomorphic2('abc', '123')).toBe(true);
  });

  it('should return true for strings with non-ASCII characters', () => {
    expect(isIsomorphic2('åbc', 'åbc')).toBe(true);
  });

  it('should return true for isomorphic strings', () => {
    expect(isIsomorphic2('egg', 'add')).toBe(true);
  });

  it('should return false for non-isomorphic strings', () => {
    expect(isIsomorphic2('foo', 'bar')).toBe(false);
  });

  it('leetcode case 3', () => {
    expect(isIsomorphic2('paper', 'title')).toBe(true);
  });

  it('leetcode case 39', () => {
    expect(isIsomorphic2('badc', 'baba')).toBe(false);
  })
});
