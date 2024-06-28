/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
/**
 * 思路：快慢指针，加上次数，相同的次数超过2，就不要了
 * @param {number[]} nums
 * @return {number}
 */
export const removeDuplicates = function(nums: number[]): number {
  const len = nums.length
  if(len <= 2) return len
  let slow = 0, fast = 0, count = 0;
  while(fast < len){
    if(nums[slow] !== nums[fast] || (count < 2 && slow < fast)){
      slow++
      nums[slow] = nums[fast]
    }
    count++;
    fast++;
    if(nums[fast] !== nums[fast - 1]) {
      count = 0
    }
  }
  return slow + 1
};

/**
 * 思路：最低要求是 2，所以直接快慢指针从2开始，检查slow-2是否等于fast,不相等的slow直接赋值fast,然后slow ++,fast一直++
 * @param nums 
 * @returns 
 */
export const removeDuplicatesRefactor = function(nums: number[]): number {
  const len = nums.length
  if(len <= 2) return len
  let slow = 2, fast = 2;
  while(fast < len){
    if(nums[slow - 2] !== nums[fast]){
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow;
}
// @lc code=end

