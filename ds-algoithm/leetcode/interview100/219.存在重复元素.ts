/*
 * @lc app=leetcode.cn id=219 lang=typescript
 * @lcpr version=20003
 *
 * [219] 存在重复元素 II
 *
 * https://leetcode.cn/problems/contains-duplicate-ii/description/
 *
 * algorithms
 * Easy (47.91%)
 * Likes:    741
 * Dislikes: 0
 * Total Accepted:    342.6K
 * Total Submissions: 714.6K
 * Testcase Example:  '[1,2,3,1]\n3'
 *
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且
 * abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
 * 
 * 示例 1：
 * 
 * 输入：nums = [1,2,3,1], k = 3
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：nums = [1,0,1,1], k = 1
 * 输出：true
 * 
 * 示例 3：
 * 
 * 输入：nums = [1,2,3,1,2,3], k = 2
 * 输出：false
 * 
 * 提示：
 * 
 * 1 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * 0 <= k <= 10^5
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 遍历，记录每个元素出现的索引，存在就做差，小于k的就返回true
 * 否则更新nums[i] 的索引
 * @param nums 
 * @param k 
 * @returns 
 */
export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  if(nums.length < 2) return false
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      if(i - map.get(nums[i])! <= k) return true
    }
    map.set(nums[i], i)
  }
  return false
};

/**
 * 滑动窗口
 * @param nums 
 * @param k
 * @returns
 */
export function containsNearbyDuplicateSet(nums: number[], k: number): boolean {
  if(nums.length < 2) return false
  const set: Set<number> = new Set();
  for (let i = 0; i < nums.length; i++) {
    if(i > k) set.delete(nums[i - k - 1])
    if (set.has(nums[i])) {
      return true
    }
    set.add(nums[i])
  }
  return false
}
// @lc code=end


