/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 *
 * https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * algorithms
 * Medium (60.19%)
 * Likes:    1237
 * Dislikes: 0
 * Total Accepted:    733.3K
 * Total Submissions: 1.2M
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target
 * 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <=
 * numbers.length 。
 * 
 * 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
 * 
 * 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。
 * 
 * 你所设计的解决方案必须只使用常量级的额外空间。
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：numbers = [2,7,11,15], target = 9
 * 输出：[1,2]
 * 解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
 * 
 * 示例 2：
 * 
 * 
 * 输入：numbers = [2,3,4], target = 6
 * 输出：[1,3]
 * 解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
 * 
 * 示例 3：
 * 
 * 
 * 输入：numbers = [-1,0], target = -1
 * 输出：[1,2]
 * 解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= numbers.length <= 3 * 10^4
 * -1000 <= numbers[i] <= 1000
 * numbers 按 非递减顺序 排列
 * -1000 <= target <= 1000
 * 仅存在一个有效答案
 * 
 * 
 */

// @lc code=start
/**
 * target - numbers[i] 的结果在剩余数组中查找 indexOf
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
export const twoSumIndexOf = function(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const result = target - numbers[i];
    const index = numbers.indexOf(result, i + 1); // 从 i + 1 开始查找
    if (index !== -1) {
      return [i + 1, index + 1];
    }
  }

  return [];
};

/**
 * 双端指针，左指针从 0 开始，右指针从 numbers.length - 1 开始
 * 累加，如果累加和小于 target，则左指针向右移动，如果累加和大于 target，则右指针向左移动
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

export const twoSumTwoPointers = function(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if(sum < target) {
      left++;
    } else if(sum > target) {
      right--;
    } else {
      return [left + 1, right + 1];
    }
  }

  return [];
}

/**
 * 二分查找，查找 target - numbers[i] 的结果在剩余数组中查找
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

export const twoSumBinarySearch = function(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    let left = i + 1;
    let right = numbers.length - 1;
    const result = target - numbers[i];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (numbers[mid] === result) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < result) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return [];
}
// @lc code=end

