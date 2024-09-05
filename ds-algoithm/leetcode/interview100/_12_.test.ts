import { intToRoman } from './_12_int_to_roman';

describe('intToRoman function', () => {
  it('should return correct Roman numeral for single digit numbers', () => {
    expect(intToRoman(1)).toBe('I');
    expect(intToRoman(2)).toBe('II');
    expect(intToRoman(3)).toBe('III');
    expect(intToRoman(4)).toBe('IV');
    expect(intToRoman(5)).toBe('V');
    expect(intToRoman(6)).toBe('VI');
    expect(intToRoman(7)).toBe('VII');
    expect(intToRoman(8)).toBe('VIII');
    expect(intToRoman(9)).toBe('IX');
  });

  it('should return correct Roman numeral for numbers less than 10', () => {
    expect(intToRoman(10)).toBe('X');
  });

  it('should return correct Roman numeral for numbers less than 100', () => {
    expect(intToRoman(50)).toBe('L');
    expect(intToRoman(99)).toBe('XCIX');
  });

  it('should return correct Roman numeral for numbers less than 1000', () => {
    expect(intToRoman(500)).toBe('D');
    expect(intToRoman(999)).toBe('CMXCIX');
  });

  it('should return correct Roman numeral for numbers less than 4000', () => {
    expect(intToRoman(1000)).toBe('M');
    expect(intToRoman(3999)).toBe('MMMCMXCIX');
  });

  it('should return empty string for invalid input', () => {
    expect(intToRoman(0)).toBe('');
    expect(intToRoman(-1)).toBe('');
  });
});

import { intToRoman2 } from './_12_int_to_roman';

describe('intToRoman2 function', () => {
  it('should return correct Roman numeral for single digit numbers', () => {
    expect(intToRoman2(1)).toBe('I');
    expect(intToRoman2(2)).toBe('II');
    expect(intToRoman2(3)).toBe('III');
    expect(intToRoman2(4)).toBe('IV');
    expect(intToRoman2(5)).toBe('V');
    expect(intToRoman2(6)).toBe('VI');
    expect(intToRoman2(7)).toBe('VII');
    expect(intToRoman2(8)).toBe('VIII');
    expect(intToRoman2(9)).toBe('IX');
  });

  it('should return correct Roman numeral for numbers less than 10', () => {
    expect(intToRoman2(10)).toBe('X');
  });

  it('should return correct Roman numeral for numbers less than 100', () => {
    expect(intToRoman2(50)).toBe('L');
    expect(intToRoman2(99)).toBe('XCIX');
  });

  it('should return correct Roman numeral for numbers less than 1000', () => {
    expect(intToRoman2(500)).toBe('D');
    expect(intToRoman2(999)).toBe('CMXCIX');
  });

  it('should return correct Roman numeral for numbers less than 4000', () => {
    expect(intToRoman2(1000)).toBe('M');
    expect(intToRoman2(3999)).toBe('MMMCMXCIX');
  });

  it('should return empty string for invalid input', () => {
    expect(intToRoman2(0)).toBe('');
    // expect(intToRoman2(-1)).toBe('');
  });
})


import { intToRoman3 } from './_12_int_to_roman';

describe('intToRoman3 function', () => {
  it('should return correct Roman numeral for single digit numbers', () => {
    expect(intToRoman3(1)).toBe('I');
    expect(intToRoman3(2)).toBe('II');
    expect(intToRoman3(3)).toBe('III');
    expect(intToRoman3(4)).toBe('IV');
    expect(intToRoman3(5)).toBe('V');
    expect(intToRoman3(6)).toBe('VI');
    expect(intToRoman3(7)).toBe('VII');
    expect(intToRoman3(8)).toBe('VIII');
    expect(intToRoman3(9)).toBe('IX');
  });

  it('should return correct Roman numeral for numbers less than 10', () => {
    expect(intToRoman3(10)).toBe('X');
  });

  it('should return correct Roman numeral for numbers less than 100', () => {
    expect(intToRoman3(50)).toBe('L');
    expect(intToRoman3(99)).toBe('XCIX');
  });

  it('should return correct Roman numeral for numbers less than 1000', () => {
    expect(intToRoman3(500)).toBe('D');
    expect(intToRoman3(999)).toBe('CMXCIX');
  });

  it('should return correct Roman numeral for numbers less than 4000', () => {
    expect(intToRoman3(1000)).toBe('M');
    expect(intToRoman3(3999)).toBe('MMMCMXCIX');
  });

  it('should return empty string for invalid input', () => {
    expect(intToRoman3(0)).toBe('');
    // expect(intToRoman3(-1)).toBe('');
  });
})