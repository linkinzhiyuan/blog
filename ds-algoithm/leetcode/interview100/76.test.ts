import { minWindow } from './76.minWindow';

describe('minWindow', () => {
  it('should return empty string for empty inputs', () => {
    expect(minWindow('', '')).toBe('');
    expect(minWindow('', 'abc')).toBe('');
    expect(minWindow('abc', '')).toBe('');
  });

  it('should return empty string if s is shorter than t', () => {
    expect(minWindow('abc', 'abcd')).toBe('');
  });

  it('should return the substring if t is a substring of s', () => {
    expect(minWindow('abcde', 'abc')).toBe('abc');
  });

  it('should return empty string if t is not a substring of s', () => {
    expect(minWindow('abcde', 'fgh')).toBe('');
  });

  it('should handle duplicate characters in s and t', () => {
    expect(minWindow('aabbc', 'ab')).toBe('ab');
  });

  it('should handle different case characters in s and t', () => {
    expect(minWindow('AbcDe', 'abc')).toBe('');
  });

  it('should handle edge cases (single characters)', () => {
    expect(minWindow('a', 'a')).toBe('a');
    expect(minWindow('a', 'b')).toBe('');
  });
});

import { minWindowRefactor } from './76.minWindow';

describe('minWindow', () => {
  it('should return empty string for empty inputs', () => {
    expect(minWindowRefactor('', '')).toBe('');
    expect(minWindowRefactor('', 'abc')).toBe('');
    expect(minWindowRefactor('abc', '')).toBe('');
  });

  it('should return empty string if s is shorter than t', () => {
    expect(minWindowRefactor('abc', 'abcd')).toBe('');
  });

  it('should return the substring if t is a substring of s', () => {
    expect(minWindowRefactor('abcde', 'abc')).toBe('abc');
  });

  it('should return empty string if t is not a substring of s', () => {
    expect(minWindowRefactor('abcde', 'fgh')).toBe('');
  });

  it('should handle duplicate characters in s and t', () => {
    expect(minWindowRefactor('aabbc', 'ab')).toBe('ab');
  });

  it('should handle different case characters in s and t', () => {
    expect(minWindowRefactor('AbcDe', 'abc')).toBe('');
  });

  it('should handle edge cases (single characters)', () => {
    expect(minWindowRefactor('a', 'a')).toBe('a');
    expect(minWindowRefactor('a', 'b')).toBe('');
  });
});