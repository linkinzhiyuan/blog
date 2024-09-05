import { lengthOfLastWordPop } from './_58_last_word_len';

describe('lengthOfLastWordPop', () => {
  it('should return the length of the last word in a string', () => {
    expect(lengthOfLastWordPop('hello world')).toBe(5);
    expect(lengthOfLastWordPop('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWordPop('luffy is still joyboy')).toBe(6);
    expect(lengthOfLastWordPop('')).toBe(0);
    expect(lengthOfLastWordPop('   ')).toBe(0);
    expect(lengthOfLastWordPop('a b c d e f g h i j k l m n o p q r s t u v w x y z')).toBe(1);
  });

  it('should return 0 if the input string is empty', () => {
    expect(lengthOfLastWordPop('')).toBe(0);
  });

  it('should return 0 if the input string only contains whitespace', () => {
    expect(lengthOfLastWordPop('   ')).toBe(0);
  });
});

import { lengthOfLastWordStep } from './_58_last_word_len';

describe('lengthOfLastWordStep', () => {
  it('should return the length of the last word in a string', () => {
    expect(lengthOfLastWordStep('hello world')).toBe(5);
    expect(lengthOfLastWordStep('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWordStep('luffy is still joyboy')).toBe(6);
    expect(lengthOfLastWordStep('')).toBe(0);
    expect(lengthOfLastWordStep('   ')).toBe(0);
    expect(lengthOfLastWordStep('a b c d e f g h i j k l m n o p q r s t u v w x y z')).toBe(1);
  });

  it('should return 0 if the input string is empty', () => {
    expect(lengthOfLastWordStep('')).toBe(0);
  });

  it('should return 0 if the input string only contains whitespace', () => {
    expect(lengthOfLastWordStep('   ')).toBe(0);
  });
});

import { lengthOfLastWord } from './_58_last_word_len';

describe('lengthOfLastWord', () => {
  it('should return the length of the last word in a string', () => {
    expect(lengthOfLastWord('hello world')).toBe(5);
    expect(lengthOfLastWord('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWord('luffy is still joyboy')).toBe(6);
    expect(lengthOfLastWord('')).toBe(0);
    expect(lengthOfLastWord('   ')).toBe(0);
    expect(lengthOfLastWord('a b c d e f g h i j k l m n o p q r s t u v w x y z')).toBe(1);
  });

  it('should return 0 if the input string is empty', () => {
    expect(lengthOfLastWord('')).toBe(0);
  });

  it('should return 0 if the input string only contains whitespace', () => {
    expect(lengthOfLastWord('   ')).toBe(0);
  });
});


import { lengthOfLastWordSkipLastSpace } from './_58_last_word_len';

describe('lengthOfLastWordSkipLastSpace', () => {
  it('should return the length of the last word in a string', () => {
    expect(lengthOfLastWordSkipLastSpace('hello world')).toBe(5);
    expect(lengthOfLastWordSkipLastSpace('   fly me   to   the moon  ')).toBe(4);
    expect(lengthOfLastWordSkipLastSpace('luffy is still joyboy')).toBe(6);
    expect(lengthOfLastWordSkipLastSpace('')).toBe(0);
    expect(lengthOfLastWordSkipLastSpace('   ')).toBe(0);
    expect(lengthOfLastWordSkipLastSpace('a b c d e f g h i j k l m n o p q r s t u v w x y z')).toBe(1);
  });

  it('should return 0 if the input string is empty', () => {
    expect(lengthOfLastWordSkipLastSpace('')).toBe(0);
  });

  it('should return 0 if the input string only contains whitespace', () => {
    expect(lengthOfLastWordSkipLastSpace('   ')).toBe(0);
  });
});