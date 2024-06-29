import { maxProfit, maxProfitDynamic } from './_121_max_profit';

describe('121. 买卖股票的最佳时机', () => {
  it('情况一：', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });
  it('情况二：', () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
  it('情况三：', () => {
    expect(maxProfit([2, 4, 1])).toBe(2);
  });
  it('情况四：', () => {
    expect(maxProfit([3, 2, 6, 5, 0, 3])).toBe(4);
  });
})

describe('121. 买卖股票的最佳时机：动态规划', () => {
  it('情况一：', () => {
    expect(maxProfitDynamic([7, 1, 5, 3, 6, 4])).toBe(5);
  });
  it('情况二：', () => {
    expect(maxProfitDynamic([7, 6, 4, 3, 1])).toBe(0);
  });
  it('情况三：', () => {
    expect(maxProfitDynamic([2, 4, 1])).toBe(2);
  });
  it('情况四：', () => {
    expect(maxProfitDynamic([3, 2, 6, 5, 0, 3])).toBe(4);
  });
})