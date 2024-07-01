/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 *
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 *
 * algorithms
 * Medium (73.75%)
 * Likes:    2502
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 1.5M
 * Testcase Example:  '[7,1,5,3,6,4]'
 *
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 
 * 返回 你能获得的 最大 利润 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：prices = [7,1,5,3,6,4]
 * 输出：7
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
 * 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3。
 * 最大总利润为 4 + 3 = 7 。
 * 
 * 示例 2：
 * 
 * 
 * 输入：prices = [1,2,3,4,5]
 * 输出：4
 * 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
 * 最大总利润为 4 。
 * 
 * 示例 3：
 * 
 * 
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= prices.length <= 3 * 10^4
 * 0 <= prices[i] <= 10^4
 * 
 * 
 */

// @lc code=start
/**
 * 思路：贪心算法，只要第二天比第一天高，就卖出
 * @param {number[]} prices
 * @return {number}
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
export const maxProfitII = function(prices: number[]): number {
  let i = 0, max = 0;
  while(i < prices.length-1) {
    if(prices[i] < prices[i + 1]){
      max += prices[i + 1] - prices[i]
    }
    i ++;
  }
  return max
};

/**
 * 动态规划：枚举当天的所有可能，dp[i][0]表示第i天不持有股票的最大利润，dp[i][1]表示第i天持有股票的最大利润
 * i 表示天数，j 表示是否持有股票 0 表示不持有，1 表示持有 k 表示截止到当天的交易次数
 * 因为这道题的k没有上限，所以k = 0和k = +infinity 是一样的，所以可以用二维数组
 * @param prices number[]
 * @returns number
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
export const maxProfitIIDynamic = function(prices: number[]): number {
  const n = prices.length;
  let dp = Array.from(Array(n), () => Array(2).fill(0));
  for (let i = 0; i < n; i++) {
      if (!i) {
          // base case
          dp[i][0] = 0;
          dp[i][1] = -prices[i];
          continue;
      }
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[n - 1][0];
}
// @lc code=end

