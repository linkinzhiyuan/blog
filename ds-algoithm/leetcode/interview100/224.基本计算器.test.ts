import { calculate } from './224.基本计算器';

describe('calculate function', () => {
  it('should return 0 for empty string', () => {
    expect(calculate('')).toBe(0);
  });

  it('should return single number', () => {
    expect(calculate('5')).toBe(5);
  });

  it('should handle simple addition and subtraction', () => {
    expect(calculate('1 + 1')).toBe(2);
    expect(calculate('2 - 1')).toBe(1);
  });

  it('should handle parentheses with addition and subtraction', () => {
    expect(calculate('(1 + 1)')).toBe(2);
    expect(calculate('(2 - 1)')).toBe(1);
  });

  it('should handle multiple parentheses with addition and subtraction', () => {
    expect(calculate('(1 + (2 - 1))')).toBe(2);
    expect(calculate('(2 - (1 + 1))')).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(calculate('-1')).toBe(-1);
    expect(calculate('(-1)')).toBe(-1);
  });

  it('should handle edge cases', () => {
    expect(calculate('(-1 + 1)')).toBe(0);
    expect(calculate('(1 - (-1))')).toBe(2);
  });
});
