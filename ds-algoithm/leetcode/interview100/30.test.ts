import { findSubstring } from './30.findSubstring'

describe('findSubstring', () => {
  test('should return correct indices for basic example', () => {
    const s = "barfoothefoobarman";
    const words: string[] = ["foo", "bar"];
    expect(findSubstring(s, words)).toEqual([0, 9]);
  });

  test('should return empty array when no concatenation is possible', () => {
    const s = "wordgoodgoodgoodbestword";
    const words: string[] = ["word", "good", "best", "word"];
    expect(findSubstring(s, words)).toEqual([]);
  });

  test('should handle overlapping words correctly', () => {
    const s = "barfoofoobarthefoobarman";
    const words: string[] = ["bar", "foo", "the"];
    expect(findSubstring(s, words)).toEqual([6, 9, 12]);
  });

  test('should return empty array for empty string', () => {
    const s = "";
    const words: string[] = ["foo", "bar"];
    expect(findSubstring(s, words)).toEqual([]);
  });

  test('should return empty array for empty words list', () => {
    const s = "barfoothefoobarman";
    const words: string[] = [];
    expect(findSubstring(s, words)).toEqual([]);
  });

  test('should handle single word match', () => {
    const s = "foobar";
    const words: string[] = ["foo"];
    expect(findSubstring(s, words)).toEqual([0]);
  });

  test('should handle repeated words in the list', () => {
    const s = "wordgoodgoodgoodbestword";
    const words: string[] = ["good", "good"];
    expect(findSubstring(s, words)).toEqual([4,8]);
  });
});


import { findSubstring2 } from './30.findSubstring'

describe('findSubstring2', () => {
  test('should return correct indices for basic example', () => {
    const s = "barfoothefoobarman";
    const words: string[] = ["foo", "bar"];
    expect(findSubstring2(s, words)).toEqual([0, 9]);
  });

  test('should return empty array when no concatenation is possible', () => {
    const s = "wordgoodgoodgoodbestword";
    const words: string[] = ["word", "good", "best", "word"];
    expect(findSubstring2(s, words)).toEqual([]);
  });

  test('should handle overlapping words correctly', () => {
    const s = "barfoofoobarthefoobarman";
    const words: string[] = ["bar", "foo", "the"];
    expect(findSubstring2(s, words)).toEqual([6, 9, 12]);
  });

  test('should return empty array for empty string', () => {
    const s = "";
    const words: string[] = ["foo", "bar"];
    expect(findSubstring2(s, words)).toEqual([]);
  });

  test('should return empty array for empty words list', () => {
    const s = "barfoothefoobarman";
    const words: string[] = [];
    expect(findSubstring2(s, words)).toEqual([]);
  });

  test('should handle single word match', () => {
    const s = "foobar";
    const words: string[] = ["foo"];
    expect(findSubstring2(s, words)).toEqual([0]);
  });

  test('should handle repeated words in the list', () => {
    const s = "wordgoodgoodgoodbestword";
    const words: string[] = ["good", "good"];
    expect(findSubstring2(s, words)).toEqual([4,8]);
  });

  test('leetcode error case', () => {
    const s = "aaa";
    const words: string[] = ["a", "a"];
    expect(findSubstring2(s, words)).toEqual([0,1]);
  });
});
