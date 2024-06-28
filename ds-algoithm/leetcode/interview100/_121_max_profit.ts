/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 *
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
 *
 * algorithms
 * Easy (57.83%)
 * Likes:    3514
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 2.5M
 * Testcase Example:  '[7,1,5,3,6,4]'
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 * 示例 1：
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * ⁠    注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 示例 2：
 * 
 * 
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 */

// @lc code=start
/**
 * 思路：快慢指针求两个数的最大差
 * @param {number[]} prices
 * @return {number}
 */
export const maxProfit = function(prices: number[]): number {
  let max = 0, slow = 0, fast = 1;
  while(fast < prices.length){
    const diff = prices[fast] - prices[slow]
    if(diff > max) max = diff
    if(prices[fast] < prices[slow]) slow = fast // 核心代码，只有后面日期还比当前低的时候才有机会超过之前的利润
    fast++  
  }
  return max > 0 ? max : 0
};
// @lc code=end

