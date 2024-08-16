/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 *
 * https://leetcode.cn/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (75.81%)
 * Likes:    1811
 * Dislikes: 0
 * Total Accepted:    473.1K
 * Total Submissions: 623.5K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 * 示例 1:
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 * 
 * 示例 2:
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 * 提示：
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
export const productExceptSelf = function(nums: number[]) {
  const n = nums.length;
  const output = new Array(n).fill(1);
  
  // Calculate left products
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
      output[i] = leftProduct;
      leftProduct *= nums[i];
  }
  
  // Calculate right products and multiply with left products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
      output[i] *= rightProduct;
      rightProduct *= nums[i];
  }
  
  return output;
};

export const productExceptSelf2 = function(nums: number[]) {
  const n = nums.length;
  const output = new Array(n).fill(1);
  const leftProduct = new Array(n).fill(1);
  const rightProduct = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
      leftProduct[i] = leftProduct[i - 1] * nums[i - 1];
  }

  for (let i = n - 2; i >= 0; i--) {
      rightProduct[i] = rightProduct[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < n; i++) {
      output[i] = leftProduct[i] * rightProduct[i];
  }

  return output;
}

// @lc code=end

