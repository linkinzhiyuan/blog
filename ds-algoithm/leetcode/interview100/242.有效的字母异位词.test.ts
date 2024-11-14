import { isAnagram } from './242.有效的字母异位词';

describe('isAnagram', () => {
  it('should return true for two empty strings', () => {
    expect(isAnagram('', '')).toBe(true);
  });

  it('should return true for two strings with same length and same characters', () => {
    expect(isAnagram('listen', 'silent')).toBe(true);
  });

  it('should return false for two strings with same length but different characters', () => {
    expect(isAnagram('hello', 'world')).toBe(false);
  });

  it('should return false for two strings with different lengths', () => {
    expect(isAnagram('hello', 'helloo')).toBe(false);
  });

  it('should return true for strings with repeated characters', () => {
    expect(isAnagram('aabbcc', 'ccbbba')).toBe(false);
  });

  it('should return false for strings with non-alphabetic characters', () => {
    expect(isAnagram('hello1', 'hello2')).toBe(false);
  });

  it('should return false for strings with uppercase and lowercase letters', () => {
    expect(isAnagram('Hello', 'hello')).toBe(false);
  });
});

import { isAnagramChartCodeAt } from './242.有效的字母异位词';

describe('isAnagramChartCodeAt', () => {
  it('should return true for two empty strings', () => {
    expect(isAnagramChartCodeAt('', '')).toBe(true);
  });

  it('should return true for two strings with same length and same characters', () => {
    expect(isAnagramChartCodeAt('listen', 'silent')).toBe(true);
  });

  it('should return false for two strings with same length but different characters', () => {
    expect(isAnagramChartCodeAt('hello', 'world')).toBe(false);
  });

  it('should return false for two strings with different lengths', () => {
    expect(isAnagramChartCodeAt('hello', 'helloo')).toBe(false);
  });

  it('should return true for strings with repeated characters', () => {
    expect(isAnagramChartCodeAt('aabbcc', 'ccbbba')).toBe(false);
  });

  it('should return false for strings with non-alphabetic characters', () => {
    expect(isAnagramChartCodeAt('helloa', 'hellob')).toBe(false);
  });

  it('should return false for strings with uppercase and lowercase letters', () => {
    expect(isAnagramChartCodeAt('Hello', 'hello')).toBe(false);
  });
});


import { isAnagramSort } from './242.有效的字母异位词';

describe('isAnagramSort', () => {
  it('should return true for two empty strings', () => {
    expect(isAnagramSort('', '')).toBe(true);
  });

  it('should return true for two strings with same length and same characters', () => {
    expect(isAnagramSort('listen', 'silent')).toBe(true);
  });

  it('should return false for two strings with same length but different characters', () => {
    expect(isAnagramSort('hello', 'world')).toBe(false);
  });

  it('should return false for two strings with different lengths', () => {
    expect(isAnagramSort('hello', 'helloo')).toBe(false);
  });

  it('should return true for strings with repeated characters', () => {
    expect(isAnagramSort('aabbcc', 'ccbbba')).toBe(false);
  });

  it('should return false for strings with non-alphabetic characters', () => {
    expect(isAnagramSort('helloa', 'hellob')).toBe(false);
  });

  it('should return false for strings with uppercase and lowercase letters', () => {
    expect(isAnagramSort('Hello', 'hello')).toBe(false);
  });
});
