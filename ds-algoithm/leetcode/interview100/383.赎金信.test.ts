import { canConstruct, canConstructTwoMap, canConstructCharCodeAt } from './383.赎金信';

describe('canConstruct', () => {
  it('should return true when ransomNote is a subsequence of magazine', () => {
    expect(canConstruct('aa', 'ab')).toBe(false);
    expect(canConstruct('abc', 'ahbgdc')).toBe(true);
    expect(canConstruct('abc', 'abc')).toBe(true);
    expect(canConstruct('abc', 'abcabc')).toBe(true);
  });

  it('should return false when ransomNote is not a subsequence of magazine', () => {
    expect(canConstruct('axc', 'ahbgdc')).toBe(false);
    expect(canConstruct('abcd', 'ab')).toBe(false);
    expect(canConstruct('aa', 'a')).toBe(false);
  });

  it('should return false when ransomNote is longer than magazine', () => {
    expect(canConstruct('aaa', 'ab')).toBe(false);
    expect(canConstruct('abcd', 'abc')).toBe(false);
  });
});

describe('canConstructTwoMap', () => {
  it('should return true when ransomNote is a subsequence of magazine', () => {
    expect(canConstructTwoMap('aa', 'ab')).toBe(false);
    expect(canConstructTwoMap('abc', 'ahbgdc')).toBe(true);
    expect(canConstructTwoMap('abc', 'abc')).toBe(true);
    expect(canConstructTwoMap('abc', 'abcabc')).toBe(true);
  });

  it('should return false when ransomNote is not a subsequence of magazine', () => {
    expect(canConstructTwoMap('axc', 'ahbgdc')).toBe(false);
    expect(canConstructTwoMap('abcd', 'ab')).toBe(false);
    expect(canConstructTwoMap('aa', 'a')).toBe(false);
  });

  it('should return false when ransomNote is longer than magazine', () => {
    expect(canConstructTwoMap('aaa', 'ab')).toBe(false);
    expect(canConstructTwoMap('abcd', 'abc')).toBe(false);
  });
});

describe('canConstructCharCodeAt', () => {
  it('should return true when ransomNote is a subsequence of magazine', () => {
    expect(canConstructCharCodeAt('aa', 'ab')).toBe(false);
    expect(canConstructCharCodeAt('abc', 'ahbgdc')).toBe(true);
    expect(canConstructCharCodeAt('abc', 'abc')).toBe(true);
    expect(canConstructCharCodeAt('abc', 'abcabc')).toBe(true);
  });

  it('should return false when ransomNote is not a subsequence of magazine', () => {
    expect(canConstructCharCodeAt('axc', 'ahbgdc')).toBe(false);
    expect(canConstructCharCodeAt('abcd', 'ab')).toBe(false);
    expect(canConstructCharCodeAt('aa', 'a')).toBe(false);
  });

  it('should return false when ransomNote is longer than magazine', () => {
    expect(canConstructCharCodeAt('aaa', 'ab')).toBe(false);
    expect(canConstructCharCodeAt('abcd', 'abc')).toBe(false);
  });
});
