import { reverseWords } from './_151_reverse_words';

describe('reverseWords', () => {
  it('should return empty string for empty input', () => {
    expect(reverseWords('')).toBe('');
  });

  it('should return single word for single word input', () => {
    expect(reverseWords('hello')).toBe('hello');
  });

  it('should reverse words for multiple words input', () => {
    expect(reverseWords('hello world')).toBe('world hello');
  });

  it('should ignore leading and trailing spaces', () => {
    expect(reverseWords('   hello world   ')).toBe('world hello');
  });

  it('should reduce multiple spaces between words to single space', () => {
    expect(reverseWords('hello   world')).toBe('world hello');
  });

  it('should handle very long string', () => {
    const longString = 'a'.repeat(10000);
    expect(reverseWords(longString)).toBe(longString);
  });

  it('should handle case 1', () => {
    expect(reverseWords('the sky is blue')).toBe('blue is sky the');
  });

  it('should handle case 2', () => {
    expect(reverseWords('a good   example')).toBe('example good a');
  });
});

import { reverseWordsSplit } from './_151_reverse_words';

describe('reverseWordsSplit', () => {
  it('should return empty string for empty input', () => {
    expect(reverseWordsSplit('')).toBe('');
  });

  it('should return single word for single word input', () => {
    expect(reverseWordsSplit('hello')).toBe('hello');
  });

  it('should reverse words for multiple words input', () => {
    expect(reverseWordsSplit('hello world')).toBe('world hello');
  });

  it('should ignore leading and trailing spaces', () => {
    expect(reverseWordsSplit('   hello world   ')).toBe('world hello');
  });

  it('should reduce multiple spaces between words to single space', () => {
    expect(reverseWordsSplit('hello   world')).toBe('world hello');
  });

  it('should handle very long string', () => {
    const longString = 'a'.repeat(10000);
    expect(reverseWordsSplit(longString)).toBe(longString);
  });

  it('should handle case 1', () => {
    expect(reverseWordsSplit('the sky is blue')).toBe('blue is sky the');
  });

  it('should handle case 2', () => {
    expect(reverseWordsSplit('a good   example')).toBe('example good a');
  });
});

import { reverseWordsDoublePointer } from './_151_reverse_words';

describe('reverseWordsDoublePointer', () => {
  it('should return empty string for empty input', () => {
    expect(reverseWordsDoublePointer('')).toBe('');
  });

  it('should return single word for single word input', () => {
    expect(reverseWordsDoublePointer('hello')).toBe('hello');
  });

  it('should reverse words for multiple words input', () => {
    expect(reverseWordsDoublePointer('hello world')).toBe('world hello');
  });

  it('should ignore leading and trailing spaces', () => {
    expect(reverseWordsDoublePointer('   hello world   ')).toBe('world hello');
  });

  it('should reduce multiple spaces between words to single space', () => {
    expect(reverseWordsDoublePointer('hello   world')).toBe('world hello');
  });

  it('should handle very long string', () => {
    const longString = 'a'.repeat(10000);
    expect(reverseWordsDoublePointer(longString)).toBe(longString);
  });

  it('should handle case 1', () => {
    expect(reverseWordsDoublePointer('the sky is blue')).toBe('blue is sky the');
  });

  it('should handle case 2', () => {
    expect(reverseWordsDoublePointer('a good   example')).toBe('example good a');
  });
});

import { reverseWordsStack } from './_151_reverse_words';

describe('reverseWordsStack', () => {
  it('should return empty string for empty input', () => {
    expect(reverseWordsStack('')).toBe('');
  });

  it('should return single word for single word input', () => {
    expect(reverseWordsStack('hello')).toBe('hello');
  });

  it('should reverse words for multiple words input', () => {
    expect(reverseWordsStack('hello world')).toBe('world hello');
  });

  it('should ignore leading and trailing spaces', () => {
    expect(reverseWordsStack('   hello world   ')).toBe('world hello');
  });

  it('should reduce multiple spaces between words to single space', () => {
    expect(reverseWordsStack('hello   world')).toBe('world hello');
  });

  it('should handle very long string', () => {
    const longString = 'a'.repeat(10000);
    expect(reverseWordsStack(longString)).toBe(longString);
  });

  it('should handle case 1', () => {
    expect(reverseWordsStack('the sky is blue')).toBe('blue is sky the');
  });

  it('should handle case 2', () => {
    expect(reverseWordsStack('a good   example')).toBe('example good a');
  });
});