import { longestCommonPrefixRow } from './_14_longest_common_prefix';

describe('longestCommonPrefixRow', () => {
  it('should return empty string for empty array', () => {
    expect(longestCommonPrefixRow([])).toBe('');
  });

  it('should return single element for single element array', () => {
    expect(longestCommonPrefixRow(['hello'])).toBe('hello');
  });

  it('should return common prefix for multiple elements with common prefix', () => {
    expect(longestCommonPrefixRow(['hello', 'hello world', 'hello friend'])).toBe('hello');
  });

  it('should return empty string for multiple elements without common prefix', () => {
    expect(longestCommonPrefixRow(['hello', 'world', 'friend'])).toBe('');
  });

  it('should return common prefix for multiple elements with different lengths', () => {
    expect(longestCommonPrefixRow(['hello', 'hello world', 'hel'])).toBe('hel');
  });

  it('should return empty string for multiple elements with all empty strings and common prefix', () => {
    expect(longestCommonPrefixRow(['', '', 'hello'])).toBe('');
  });

  it('should return common prefix for multiple elements', () => {
    expect(longestCommonPrefixRow(["flower","flow","flight"])).toBe('fl');
  });
});

import { longestCommonPrefixColumn } from './_14_longest_common_prefix';

describe('longestCommonPrefixColumn', () => {
  it('should return empty string for empty array', () => {
    expect(longestCommonPrefixColumn([])).toBe('');
  });

  it('should return single element for single element array', () => {
    expect(longestCommonPrefixColumn(['hello'])).toBe('hello');
  });

  it('should return common prefix for multiple elements with common prefix', () => {
    expect(longestCommonPrefixColumn(['hello', 'hello world', 'hello friend'])).toBe('hello');
  });

  it('should return empty string for multiple elements without common prefix', () => {
    expect(longestCommonPrefixColumn(['hello', 'world', 'friend'])).toBe('');
  });

  it('should return common prefix for multiple elements with different lengths', () => {
    expect(longestCommonPrefixColumn(['hello', 'hello world', 'hel'])).toBe('hel');
  });

  it('should return empty string for multiple elements with all empty strings and common prefix', () => {
    expect(longestCommonPrefixColumn(['', '', 'hello'])).toBe('');
  });

  it('should return common prefix for multiple elements', () => {
    expect(longestCommonPrefixColumn(["flower","flow","flight"])).toBe('fl');
  });
});

import { longestCommonPrefixBinarySearch } from './_14_longest_common_prefix';

describe('longestCommonPrefixBinarySearch', () => {
  it('should return empty string for empty array', () => {
    expect(longestCommonPrefixBinarySearch([])).toBe('');
  });

  it('should return single element for single element array', () => {
    expect(longestCommonPrefixBinarySearch(['hello'])).toBe('hello');
  });

  it('should return common prefix for multiple elements with common prefix', () => {
    expect(longestCommonPrefixBinarySearch(['hello', 'hello world', 'hello friend'])).toBe('hello');
  });

  it('should return empty string for multiple elements without common prefix', () => {
    expect(longestCommonPrefixBinarySearch(['hello', 'world', 'friend'])).toBe('');
  });

  it('should return common prefix for multiple elements with different lengths', () => {
    expect(longestCommonPrefixBinarySearch(['hello', 'hello world', 'hel'])).toBe('hel');
  });

  it('should return empty string for multiple elements with all empty strings and common prefix', () => {
    expect(longestCommonPrefixBinarySearch(['', '', 'hello'])).toBe('');
  });

  it('should return common prefix for multiple elements', () => {
    expect(longestCommonPrefixBinarySearch(["flower","flow","flight"])).toBe('fl');
  });
});