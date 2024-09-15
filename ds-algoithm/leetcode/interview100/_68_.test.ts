import { fullJustify } from './_68_full_justify';

describe('fullJustify', () => {

  it('leetCode case 0', () => {
    expect(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16)).toEqual([
      "This    is    an",
      "example  of text",
      "justification.  ",
    ]);
  })

  it('leetCode case 1', () => {
    expect(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16)).toEqual([
      'What   must   be',
      'acknowledgment  ',
      'shall be        ',
    ]);
  });

  it ('leetCode case 2', () => {
    expect(fullJustify(["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20)).toEqual(
      [
        "Science  is  what we",
        "understand      well",
        "enough to explain to",
        "a  computer.  Art is",
        "everything  else  we",
        "do                  "
      ]);
  })
});