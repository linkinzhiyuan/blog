/*
 * @lc app=leetcode.cn id=135 lang=javascript
 *
 * [135] 分发糖果
 *
 * https://leetcode.cn/problems/candy/description/
 *
 * algorithms
 * Hard (48.85%)
 * Likes:    1548
 * Dislikes: 0
 * Total Accepted:    343.6K
 * Total Submissions: 704.1K
 * Testcase Example:  '[1,0,2]'
 *
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
 * 
 * 你需要按照以下要求，给这些孩子分发糖果：
 * 
 * 
 * 每个孩子至少分配到 1 个糖果。
 * 相邻两个孩子评分更高的孩子会获得更多的糖果。
 * 
 * 
 * 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：ratings = [1,0,2]
 * 输出：5
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：ratings = [1,2,2] [1,2,1]
 * 输出：4
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
 * ⁠    第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 * 
 * 示例 3:
 * 输入:ratings = [1,2,87,85,83] [1,2,3,1,1]
 * 输出:9
 * 解释:给第一个孩子分发 1，第二个孩子分发 2，第三个孩子分发 3，第四个孩子分发 2 ，第五个孩子分发 1 ，总共需要 9 颗糖果。
 * 
 * 
 * 示例 4: [3,2,87,87,87] [2,1,2,1,1]
 * 
 * 
 * 提示：
 * 
 * 
 * n == ratings.length
 * 1 <= n <= 2 * 10^4
 * 0 <= ratings[i] <= 2 * 10^4
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
export const candy = function(ratings: number[]): number {
  const len = ratings.length
  const leastSum = new Array(len).fill(1) 
  // 从左到右遍历
  for(let i = 1; i < len; i++){
    if(ratings[i] > ratings[i - 1]){
      leastSum[i] = leastSum[i - 1] + 1
    }
  }

  // 从右到左遍历
  for(let i = len - 2; i >= 0; i--){
    if(ratings[i] > ratings[i + 1]){
      leastSum[i] = Math.max(leastSum[i + 1] + 1, leastSum[i])
    }
  }

  return leastSum.reduce((a,b) => a + b, 0)
};

/**
 * 贪心规则
 * @param {number[]} ratings
 * @return {number}
 */
export const candy2 = function(ratings: number[]): number {
  const len = ratings.length
  const left = new Array(len).fill(1)
  const right = new Array(len).fill(1)

  for(let i = 1; i < len; i++){
    if(ratings[i] > ratings[i - 1]){
      left[i] = left[i - 1] + 1
    }
  }

  for(let i = len - 2; i >= 0; i--){
    if(ratings[i] > ratings[i + 1]){
      right[i] = right[i + 1] + 1
    }
  }

  let sum = 0

  for(let i = 0; i < len; i++){
    sum += Math.max(left[i], right[i])
  }

  return sum
}
// @lc code=end

