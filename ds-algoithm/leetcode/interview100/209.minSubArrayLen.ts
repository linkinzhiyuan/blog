/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode.cn/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (46.47%)
 * Likes:    2227
 * Dislikes: 0
 * Total Accepted:    855.7K
 * Total Submissions: 1.8M
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 
 * 找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= target <= 10^9
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 * 
 * 
 */

// @lc code=start
/**
 * 双指针 left right
 * 定义两个指针：使用 left 和 right 指针来表示当前子数组的范围。
 * 扩展右指针：不断增加 right 指针，直到当前子数组的和大于或等于 s。
 * 收缩左指针：一旦满足条件，尝试移动 left 指针来缩小子数组的长度，同时更新最小长度。
 * 继续遍历：重复上述步骤，直到遍历完整个数组。
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
export const minSubArrayLenLeftRight = function(target: number, nums: number[]): number {
  let left = 0;
  let right = 0;
  let sum = 0;
  let min = Infinity;
  while(right < nums.length){
    sum += nums[right];
    while(sum >= target){
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }
  return min === Infinity ? 0 : min;
};

/**
 * 前缀 + 二分查找
 * 计算前缀和：创建一个前缀和数组 prefix，其中 prefix[i] 表示从数组开头到索引 i 的元素和。
 * 遍历前缀和：对于每个前缀和 prefix[j]，我们要找到最小的 i 使得 prefix[j] - prefix[i] >= s，即 prefix[i] <= prefix[j] - s。
 * 使用二分查找：在前缀和数组中使用二分查找来找到满足条件的最小 i。
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
export const minSubArrayLenBinary = function(target: number, nums: number[]): number {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
      prefix[i + 1] = prefix[i] + nums[i];
  }
  let minLength = Infinity;
  for (let j = 1; j < prefix.length; j++) {
    const result = prefix[j] - target;
      // 使用二分查找找到满足条件的最小 i
      let left = 0, right = j - 1;
      while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (prefix[mid] <= result) {
              left = mid + 1; // 找到更大的 i
          } else {
              right = mid - 1; // 找到更小的 i
          }
      }

      if (left > 0) {
          minLength = Math.min(minLength, j - left + 1); // 更新最小长度
      }
  }
  return minLength === Infinity ? 0 : minLength;
}

// @lc code=end

