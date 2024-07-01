/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 *
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/
 *
 * algorithms
 * Hard (60.76%)
 * Likes:    1708
 * Dislikes: 0
 * Total Accepted:    346.6K
 * Total Submissions: 570.3K
 * Testcase Example:  '[3,3,5,0,0,3,1,4]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入：prices = [3,3,5,0,0,3,1,4]
 * 输出：6
 * 解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
 * 随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
 * 
 * 示例 2：
 * 
 * 
 * 输入：prices = [1,2,3,4,5]
 * 输出：4
 * 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4
 * 。   
 * 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
 * 因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：prices = [7,6,4,3,1] 
 * 输出：0 
 * 解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
 * 示例 4：
 * 输入：prices = [1]
 * 输出：0
 */

// @lc code=start
/**
 * 有了k次交易，每次交易都有两个状态：持有股票，不持有股票。
 * 所以变成一个二维数组，dp[i][k][j] 表示第 i 天，第 k 次交易，j = 1 代表持有股票，j = 0 代表不持有股票。
 * dp[i][k][0] = max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i - 1][k][1], dp[i - 1][k-1][0] - prices[i])
 * @param {number[]} prices
 * @return {number}
 */
export const  maxProfitIII = function(prices: number[]): number {
  let len = prices.length, max_k = 2;
  let dp = new Array(len).fill(0).map(() => new Array(max_k + 1).fill(0).map(() => new Array(2).fill(0)));
  for(let i = 0; i < len; i++) {
    for(let k = 1; k <= max_k; k++) {
      if(i === 0) {
        dp[i][k][0] = 0
        dp[i][k][1] = -prices[i]
        continue
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }
  // 穷举了 n × max_k × 2 个状态，正确。
  return dp[len - 1][max_k][0]
};
// @lc code=end

// 抄袭别人的贪心算法思路，目前还没想通
export const maxProfitIIDynamic = function(prices: number[]): number {
  let n = prices.length, i = 0, min = prices[0], max = prices[n - 1];
  let dp0 = Array(n), dp1 = 0, r = 0, t
  while (++i < n) (t = prices[i] - min) < 0 ? min = prices[i] : dp0[i] = t
  while (i-- > 1) {
    (t = max - prices[i]) < 0 ? max = prices[i] : t > dp1 && (dp1 = t);
    (t = dp0[i] + dp1) > r && (r = t) // ][ 或 )( 相邻，分号不能省略
  }
  return r
}