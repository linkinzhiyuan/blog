import { wordPattern } from './290.单词规律';

describe('wordPattern', () => {
  it('should return false for empty pattern and string', () => {
    expect(wordPattern('', '')).toBe(false);
  });

  it('should return false for pattern and string with different lengths', () => {
    expect(wordPattern('ab', 'hello world world')).toBe(false);
  });

  it('should return true for pattern and string with matching words', () => {
    expect(wordPattern('abba', 'dog cat cat dog')).toBe(true);
  });

  it('should return false for pattern and string with non-matching words', () => {
    expect(wordPattern('abba', 'dog cat cat fish')).toBe(false);
  });

  it('should return false for pattern and string with repeated words', () => {
    expect(wordPattern('aaaa', 'dog cat cat dog')).toBe(false);
  });

  it('should return true for pattern and string with single word', () => {
    expect(wordPattern('a', 'dog')).toBe(true);
  });

  it('should return false for pattern and string with multiple spaces', () => {
    expect(wordPattern('ab', 'hello  world')).toBe(false);
  });

  it('should return true for pattern and string with multiple words', () => {
    expect(wordPattern('abc', 'hello world dog')).toBe(true);
  });
});
