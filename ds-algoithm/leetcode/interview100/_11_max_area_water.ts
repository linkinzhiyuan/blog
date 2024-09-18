/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode.cn/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (60.26%)
 * Likes:    5106
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 2.3M
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 
 * 返回容器可以储存的最大水量。
 * 
 * 说明：你不能倾斜容器。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49 
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 
 * 示例 2：
 * 
 * 
 * 输入：height = [1,1]
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == height.length
 * 2 <= n <= 10^5
 * 0 <= height[i] <= 10^4
 * 
 * 
 */

// @lc code=start
/**
 * 双端指针，左侧指针从 0 开始，右侧指针从数组末尾开始
 * max = Max(max, min((左侧指针值，右侧指针值) * (右侧指针下标 - 左侧指针下标)))
 * @param {number[]} height
 * @return {number}
 */
export const maxAreaTwoPointers = function(height: number[]): number {
  let left = 0, right = height.length - 1, max = 0
  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left))

    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return max
};

/**
 * 优化双指针
 * @param {number[]} height
 * @return {number}
 */
export const maxAreaTwoPointerRefactor = function(height: number[]): number {
  let left = 0, right = height.length - 1, rightMax = height[right], leftMax = height[left], max = 0

  while (left < right) {
    if(height[left] < height[right]) {
      if(height[left] >= leftMax) {
        leftMax = height[left]
        max = Math.max(max, leftMax * (right - left))
      }
      left++
    } else {
      if(height[right] >= rightMax) {
        rightMax = height[right]
        max = Math.max(max, rightMax * (right - left))
      }
      right--
    }
  }

  return max
}
// @lc code=end

