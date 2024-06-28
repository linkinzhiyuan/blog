/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * 快慢指针的思路
 * slow 指针从 0 开始，fast 指针从 1 开始,
 * fast和slow相同，fast + 1,slow不变，
 * 不同时候，slow+1赋值成fast,fast+1
 * @param {number[]} nums
 * @return {number}
 * @url https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
 * 时间复杂度 O(n) 空间复杂度 O(1)
 */
export const removeDuplicates = function(nums: number[]): number {
  if(nums.length < 2) return nums.length
  let slow = 0, fast = 1;
  while(fast < nums.length){
    if(nums[slow] !== nums[fast]){
      nums[++slow] = nums[fast];
    }
    fast++;
  }
  return slow + 1
};
// @lc code=end

/**
 * 思路：对比slow前一个数是否等于fast，不相等的slow直接赋值fast,然后slow ++,fast一直++
 * @param nums 
 * @returns 
 */
export const removeDuplicatesRefactor = function(nums: number[]): number {
  let len = nums.length;
  if(len <= 1) return len
  let slow = 1, fast = 1;
  while(fast < len){
    if(nums[slow - 1] !== nums[fast]){
      nums[slow++] = nums[fast];
    }
    fast++;
  }
  return slow
};

