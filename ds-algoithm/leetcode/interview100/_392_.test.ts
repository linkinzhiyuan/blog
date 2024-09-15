import { isSubsequence } from './_392_is_sub_sequence';

describe('isSubsequence', () => {
  it('should return false for empty string s and t', () => {
    expect(isSubsequence('', '')).toBe(true);
  });

  it('should return false when s is longer than t', () => {
    expect(isSubsequence('abc', 'ab')).toBe(false);
  });

  it('should return true when s is a subsequence of t', () => {
    expect(isSubsequence('abc', 'ahbgdc')).toBe(true);
  });

  it('should return false when s is not a subsequence of t', () => {
    expect(isSubsequence('axc', 'ahbgdc')).toBe(false);
  });

  it('should return true when s and t are the same', () => {
    expect(isSubsequence('abc', 'abc')).toBe(true);
  });

  it('should return true when s is a subsequence of t with multiple occurrences', () => {
    expect(isSubsequence('abc', 'abcabc')).toBe(true);
  });
});

import { isSubsequenceRecursive } from './_392_is_sub_sequence';

describe('isSubsequenceRecursive', () => {
  it('should return false for empty string s and t', () => {
    expect(isSubsequenceRecursive('', '')).toBe(true);
  });

  it('should return false when s is longer than t', () => {
    expect(isSubsequenceRecursive('abc', 'ab')).toBe(false);
  });

  it('should return true when s is a subsequence of t', () => {
    expect(isSubsequenceRecursive('abc', 'ahbgdc')).toBe(true);
  });

  it('should return false when s is not a subsequence of t', () => {
    expect(isSubsequenceRecursive('axc', 'ahbgdc')).toBe(false);
  });

  it('should return true when s and t are the same', () => {
    expect(isSubsequenceRecursive('abc', 'abc')).toBe(true);
  });

  it('should return true when s is a subsequence of t with multiple occurrences', () => {
    expect(isSubsequenceRecursive('abc', 'abcabc')).toBe(true);
  });
});

import { isSubsequenceIndexOf } from './_392_is_sub_sequence';

describe('isSubsequenceIndexOf', () => {
  it('should return false for empty string s and t', () => {
    expect(isSubsequenceIndexOf('', '')).toBe(true);
  });

  it('should return false when s is longer than t', () => {
    expect(isSubsequenceIndexOf('abc', 'ab')).toBe(false);
  });

  it('should return true when s is a subsequence of t', () => {
    expect(isSubsequenceIndexOf('abc', 'ahbgdc')).toBe(true);
  });

  it('should return false when s is not a subsequence of t', () => {
    expect(isSubsequenceIndexOf('axc', 'ahbgdc')).toBe(false);
  });

  it('should return true when s and t are the same', () => {
    expect(isSubsequenceIndexOf('abc', 'abc')).toBe(true);
  });

  it('should return true when s is a subsequence of t with multiple occurrences', () => {
    expect(isSubsequenceIndexOf('abc', 'abcabc')).toBe(true);
  });
});