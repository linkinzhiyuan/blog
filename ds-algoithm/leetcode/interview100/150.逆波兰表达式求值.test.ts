import { evalRPN } from './150.逆波兰表达式求值';

describe('evalRPN', () => {
  it('should return 0 for empty input array', () => {
    expect(evalRPN([])).toBe(0);
  });

  it('should return single number for single number input', () => {
    expect(evalRPN(['10'])).toBe(10);
  });

  it('should evaluate simple arithmetic operations', () => {
    expect(evalRPN(['2', '1', '+'])).toBe(3);
    expect(evalRPN(['2', '1', '-'])).toBe(1);
    expect(evalRPN(['2', '1', '*'])).toBe(2);
    expect(evalRPN(['2', '1', '/'])).toBe(2);
  });

  it('leetcode case 1', () => {
    expect(evalRPN(["2","1","+","3","*"])).toBe(9);
  });

  it('leetcode case 2', () => {
    expect(evalRPN(["4","13","5","/","+"])).toBe(6);
  });

  it('leetcode case 3', () => {
    expect(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])).toBe(22);
  });
});
