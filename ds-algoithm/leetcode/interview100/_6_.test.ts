import { convert } from './_6_convert';

describe('convert', () => {
  it('should return empty string for empty input', () => {
    expect(convert('', 1)).toBe('');
  });

  it('should return a single character for single character input', () => {
    expect(convert('', 1)).toBe('');
  });

  it('should return original string for single row', () => {
    expect(convert('hello', 1)).toBe('hello');
  });

  it('should return zigzag pattern for multiple rows', () => {
    expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR');
  });

  it('should return original string for string length equal to number of rows', () => {
    expect(convert('abcdef', 6)).toBe('abcdef');
  });

  it('should return zigzag pattern for string length greater than number of rows', () => {
    expect(convert('abcdefghij', 4)).toBe('agbfhceidj');
  });

  it('should return zigzag pattern for multiple rows with odd number of rows', () => {
    expect(convert('PAYPALISHIRING', 4)).toBe('PINALSIGYAHRPI');
  });
});