import { trapDoublePointer, trapDynamicProgramming } from './_42_trap';

describe('trap function', () => {
  it('should return 0 for empty array', () => {
    expect(trapDoublePointer([])).toBe(0);
  });

  it('should return 0 for single element array', () => {
    expect(trapDoublePointer([1])).toBe(0);
  });

  it('should return 0 for array with no trapped water', () => {
    expect(trapDoublePointer([1, 2, 3])).toBe(0);
  });

  it('should return correct trapped water for simple case', () => {
    expect(trapDoublePointer([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('should return correct trapped water for multiple trapped water', () => {
    expect(trapDoublePointer([4, 2, 0, 3, 2, 5])).toBe(9);
  });

  it('should return correct trapped water for multiple trapped water', () => {
    expect(trapDoublePointer([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('should return correct trapped water for multiple trapped water', () => {
    expect(trapDoublePointer([4, 2, 3])).toBe(1);
  });
});


describe('trap function', () => {
  it('should return 0 for empty array', () => {
    expect(trapDynamicProgramming([])).toBe(0);
  });

  it('should return 0 for single element array', () => {
    expect(trapDynamicProgramming([1])).toBe(0);
  });

  it('should return 0 for array with no trapped water', () => {
    expect(trapDynamicProgramming([1, 2, 3])).toBe(0);
  });

  it('should return correct trapped water for simple case', () => {
    expect(trapDynamicProgramming([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('should return correct trapped water for multiple trapped water', () => {
    expect(trapDynamicProgramming([4, 2, 0, 3, 2, 5])).toBe(9);
  });

  it('should return correct trapped water for multiple trapped water', () => {  
    expect(trapDynamicProgramming([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
  });

  it('should return correct trapped water for multiple trapped water', () => {
    expect(trapDynamicProgramming([4, 2, 3])).toBe(1);
  });
})