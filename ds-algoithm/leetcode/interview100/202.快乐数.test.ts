import { isHappy } from './202.快乐数';

describe('isHappy function', () => {
  it('should return true for happy numbers', () => {
    expect(isHappy(19)).toBe(true);
    expect(isHappy(7)).toBe(true);
  });

  it('should return false for unhappy numbers', () => {
    expect(isHappy(2)).toBe(false);
    expect(isHappy(4)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isHappy(0)).toBe(false);
    expect(isHappy(1)).toBe(true);
    expect(isHappy(-1)).toBe(false);
  });
});


import { isHappyPointer } from './202.快乐数';

describe('isHappyPointer function', () => {
  it('should return true for happy numbers', () => {
    expect(isHappyPointer(19)).toBe(true);
    expect(isHappyPointer(7)).toBe(true);
  });

  it('should return false for unhappy numbers', () => {
    expect(isHappyPointer(2)).toBe(false);
    expect(isHappyPointer(4)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isHappyPointer(0)).toBe(false);
    expect(isHappyPointer(1)).toBe(true);
    expect(isHappyPointer(-1)).toBe(false);
  });
});
