/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 *
 * https://leetcode.cn/problems/jump-game/description/
 *
 * algorithms
 * Medium (43.34%)
 * Likes:    2788
 * Dislikes: 0
 * Total Accepted:    988.6K
 * Total Submissions: 2.3M
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 示例 2：
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 */

// @lc code=start
/**
 * 思路：累加可到达的数组的之间元素的最大值之后总和，大于数组长度则返回 true，否则返回 false
 * 自己的思路总有不通过的用例
 * @param {number[]} nums
 * @return {boolean}
 */
export const canJump = function(nums: number[]): boolean {
  const len = nums.length;
  // [1,1,2,2,0,1,1]
  if(nums[0] >= len - 1) return true;
  let step = 1, i = 0;
  while(i < len){
    let max = nums[i];
    if( i + 1 < len && i + nums[i] >= i ) {
      max = Math.max(...nums.slice(i + 1, i + nums[i] + 1));
      console.log("🚀 ROCKET LLP ~ max: ", nums, nums.slice(i + 1, i + nums[i] + 1), max,i,step)
    }
    step += max;
    console.log("🚀 ROCKET LLP ~ step: ", step)
    
    if(step >= len - 1) return true;
    if(max === 0) return false;
    i += max;
  }
  return step >= len - 1;
};

/**
 * 贪心算法：遍历数组，记录当前位置可以到达的最远距离，如果当前位置可以到达的最远距离大于数组长度，返回 true，否则返回 false
 * @param nums 
 * @returns 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * eg: [2, 3, 1, 1, 4] [3, 2, 1, 0, 4]
 */
export const  canJump2 = function(nums: number[]): boolean {
  const len = nums.length;
  let step = 0;
  for(let i = 0;i < len-1;i++){
    step = Math.max(step, nums[i] + i);
    if(step <= i) return false;
  }
  return step >= len - 1;
}

/**
 * 动态规划：遍历数组，记录当前位置可以到达的最远距离，如果当前位置可以到达的最远距离大于数组长度，返回 true，否则返回 false
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * eg: [2, 3, 1, 1, 4] [3, 2, 1, 0, 4]
 */

export const canJumpDp = function(nums: number[]): boolean {
  let end = nums.length - 1;
  for(let i = nums.length - 2;i >= 0;i--){
    if(i + nums[i] >= end) end = i;
  }
  return end === 0;
}
// @lc code=end

