/*
 * @lc app=leetcode.cn id=128 lang=typescript
 * @lcpr version=20003
 *
 * [128] 最长连续序列
 *
 * https://leetcode.cn/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Medium (51.39%)
 * Likes:    2264
 * Dislikes: 0
 * Total Accepted:    823.7K
 * Total Submissions: 1.6M
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 * 
 * 示例 1：
 * 
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 * 
 * 示例 2：
 * 
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 * 
 * 提示：
 * 
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 最长连续序列：哈希表
 * @param nums 
 * @return number
 */
export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums); // 去重之后的数组
  let max = 0;
  for (let num of set) {
    if(set.has(num - 1)) continue; // 存在比当前数小的数 说明不是起始数字
    let count = 1;
    while(set.has(num + 1)) { // 继续查找num + 1的连续序列
      num += 1;
      count += 1;
    }
    max = Math.max(max, count); // 更新最大值
  }
  return max
};

/**
 * 最长连续序列：排序 去重
 * @param nums 
 * @return number
 */
export function longestConsecutiveSort(nums: number[]): number {
  if(!nums.length) return 0

  const arr = Array.from(new Set(nums.sort((a, b) => a - b))); // 去重之后的排序数组

  let max = 1;
  let currentMax = 1;

  for(let i = 1; i < arr.length; i++){
    if(arr[i] === arr[i-1] + 1) {
      currentMax += 1
    } else {
      max = Math.max(max, currentMax)
      currentMax = 1
    }
  }
  return Math.max(max, currentMax)
}

// @lc code=end

