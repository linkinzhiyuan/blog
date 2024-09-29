import { lengthOfLongestSubstring } from './3.longestSubString';

describe('lengthOfLongestSubstring', () => {
  test('should return 0 for an empty string', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });

  test('should return 1 for a string with one character', () => {
    expect(lengthOfLongestSubstring('a')).toBe(1);
  });

  test('should return 2 for a string with two different characters', () => {
    expect(lengthOfLongestSubstring('ab')).toBe(2);
  });

  test('should return 3 for a string with repeating characters', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('should return 5 for a string with a longer substring', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });

  test('should return 4 for a string with mixed characters', () => {
    expect(lengthOfLongestSubstring('dvdf')).toBe(3);
  });

  test('should return the length of the longest substring for a complex case', () => {
    expect(lengthOfLongestSubstring('anviaj')).toBe(5);
  });
});

import { lengthOfLongestSubstringAscii } from './3.longestSubString';

describe('lengthOfLongestSubstringAscii', () => {
  
  test('should return 0 for an empty string', () => {
    expect(lengthOfLongestSubstringAscii('')).toBe(0);
  });

  test('should return 1 for a string with one character', () => {
    expect(lengthOfLongestSubstringAscii('a')).toBe(1);
  });

  test('should return 2 for a string with two different characters', () => {
    expect(lengthOfLongestSubstringAscii('ab')).toBe(2);
  });

  test('should return 3 for a string with repeating characters', () => {
    expect(lengthOfLongestSubstringAscii('abcabcbb')).toBe(3);
  });

  test('should return 5 for a string with a longer substring', () => {
    expect(lengthOfLongestSubstringAscii('pwwkew')).toBe(3);
  });

  test('should return 4 for a string with mixed characters', () => {
    expect(lengthOfLongestSubstringAscii('dvdf')).toBe(3);
  });

  test('should return the length of the longest substring for a complex case', () => {
    expect(lengthOfLongestSubstringAscii('anviaj')).toBe(5);
  });
});