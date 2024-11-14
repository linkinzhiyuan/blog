import { groupAnagrams } from './49.字母异位词分组';

describe('groupAnagrams', () => {
  it('should return empty array for empty input', () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  it('should return array with single string for single string input', () => {
    expect(groupAnagrams(['abc'])).toEqual([['abc']]);
  });

  it('should group anagrams correctly', () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toEqual([
      [ 'eat', 'tea', 'ate'],
      ['tan', 'nat'],
      ['bat'],
    ]);
  });

  it('should handle anagrams with different lengths', () => {
    expect(groupAnagrams(['a', 'ab', 'abc'])).toEqual([ [ 'a' ], [ 'ab' ], [ 'abc' ] ]);
  });

  it('should handle anagrams with repeated characters', () => {
    expect(groupAnagrams(['aabbcc', 'ccabba', 'ccabbb'])).toEqual([['aabbcc', 'ccabba'], ['ccabbb']]);
  });

  it('should handle anagrams with non-alphabetic characters', () => {
    expect(groupAnagrams(['1a2b3c', '3c2b1a'])).toEqual([['1a2b3c', '3c2b1a']]);
  });

});
