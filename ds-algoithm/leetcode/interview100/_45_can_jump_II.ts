/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 *
 * https://leetcode.cn/problems/jump-game-ii/description/
 *
 * algorithms
 * Medium (44.41%)
 * Likes:    2540
 * Dislikes: 0
 * Total Accepted:    732.4K
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,3,1,1,4]'
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j]处:
 * 0 <= j <= nums[i] 
 * i + j < n
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 * 示例 1:
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 * 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 * 示例 2:
 * 输入: nums = [2,3,0,1,4]
 * 输出: 2
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
export const canJumpII = function(nums: number[]): number {
  const len = nums.length;
  let end = 0, farthest = 0, i = 0, step = 0;
  while(i < len - 1){
    farthest = Math.max(farthest, i + nums[i])
    if(end === i){
      end = farthest;
      step++;
    }
    i++;
  }
  return step;
};
// @lc code=end

