import { maxProfitIII, maxProfitIIDynamic } from './_123_max_profit_III';

describe('123. 买卖股票的最佳时机 III', () => {
  it('示例 1', () => {
    expect(maxProfitIII([3, 3, 5, 0, 0, 3, 1, 4])).toBe(6);
  });
  it('示例 2', () => {
    expect(maxProfitIII([1, 2, 3, 4, 5])).toBe(4);
  });
  it('示例 3', () => {
    expect(maxProfitIII([7, 6, 4, 3, 1])).toBe(0);
  });
});

describe('123. 买卖股票的最佳时机 III：动态规划', () => {
  it('示例 1', () => {
    expect(maxProfitIIDynamic([3, 3, 5, 0, 0, 3, 1, 4])).toBe(6);
  });
  it('示例 2', () => {
    expect(maxProfitIIDynamic([1, 2, 3, 4, 5])).toBe(4);
  });
  it('示例 3', () => {
    expect(maxProfitIIDynamic([7, 6, 4, 3, 1])).toBe(0);
  });
})