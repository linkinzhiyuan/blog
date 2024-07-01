import { maxProfitII } from "./_122_max_profit_II";


describe('121. 买卖股票最佳时机II：贪心', () => {
  it('情况一：', () => {
    expect(maxProfitII([7,1,5,3,6,4])).toBe(7);
  });
  it('情况二：', () => {
    expect(maxProfitII([1,2,3,4,5])).toBe(4);
  });
  it('情况三: 0利润', () => {
    expect(maxProfitII([7,6,4,3,1])).toBe(0);
  });
  it('情况四：', () => {
    expect(maxProfitII([1,5,8,9,5])).toBe(8);
  });
})

describe('121. 买卖股票最佳时机II：动态规划', () => {
  it('情况一：', () => {
    expect(maxProfitII([7,1,5,3,6,4])).toBe(7);
  });
  it('情况二：', () => {
    expect(maxProfitII([1,2,3,4,5])).toBe(4);
  });
  it('情况三: 0利润', () => {
    expect(maxProfitII([7,6,4,3,1])).toBe(0);
  });
  it('情况四：', () => {
    expect(maxProfitII([1,5,8,9,5])).toBe(8);
  });
})
