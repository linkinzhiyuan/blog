import { romanToInt, romanToInt2 } from './_13_roman_to_int';

describe('romanToInt function', () => {
  it('should return correct value for valid Roman numerals', () => {
    expect(romanToInt("III")).toBe(3);
    expect(romanToInt("IV")).toBe(4);
    expect(romanToInt("IX")).toBe(9);
    expect(romanToInt("LVIII")).toBe(58);
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });

  it('should return 0 for empty string', () => {
    expect(romanToInt("")).toBe(0);
  });

  it('should return 0 for non-string input', () => {
    expect(romanToInt('123')).toBe(0);
    expect(romanToInt('null')).toBe(0);
    expect(romanToInt('undefined')).toBe(0);
  });
});

describe('romanToInt2 function', () => {
  it('should return correct value for valid Roman numerals', () => {
    expect(romanToInt2("III")).toBe(3);
    expect(romanToInt2("IV")).toBe(4);
    expect(romanToInt2("IX")).toBe(9);
    expect(romanToInt2("LVIII")).toBe(58);
    expect(romanToInt2("MCMXCIV")).toBe(1994);
  });

  it('should return 0 for empty string', () => {
    expect(romanToInt2("")).toBe(0);
  });

  it('should return 0 for non-string input', () => {
    expect(romanToInt2('123')).toBe(0);
    expect(romanToInt2('null')).toBe(0);
    expect(romanToInt2('undefined')).toBe(0);
  });
})