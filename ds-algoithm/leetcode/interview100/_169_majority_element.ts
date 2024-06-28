/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * 思路：选定第一个为参照，后面相同的则计数加一，不同则减一
 * 当计数为0，将参照修改为下一个，依次循环整个数组
 * 思路来源：正负粒子混合的过程中，整体的带电性可能在正负间波动，但最终的结果一定是正电
 * 也叫众数 Boyer-Moore 摩尔投票算法
 * @param {number[]} nums
 * @return {number}
 * @url https://leetcode-cn.com/problems/majority-element
 * 时间复杂度：O(n) ，空间复杂度：O(1)
 */
export const majorityElement = function(nums: number[]): number {
  const len = nums.length;
  if(len === 1) return nums[0];
  let i = 1, flag = nums[0], count = 1;
  while(i < len){
    if(flag === nums[i]){
      count++;
    } else {
      count--;
      if(count === 0){
        flag = nums[i];
        count = 1;
      }
    }
    i++;
  }
  return flag;
};

/**
 * 利用哈希映射（HashMap），统计每个元素出现的次数，输出出现次数最多的元素
 * 时间复杂度：O(n) 空间复杂度：O(n)
 */
export const majorityElementHash = function(nums: number[]): number {
  const len = nums.length;
  if(len === 1) return nums[0];
  const map = new Map();
  for(let i = 0;i < len; i++){
    if(map.has(nums[i])){
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }
  }
  let max = 0;
  let res = 0;
  map.forEach((value,key)=>{
    if(value > max){
      max = value;
      res = key;
    }
  })
  return res
}

/**
 * 排序之后 取中间值一定是众数,适用于当前题目的众数一定是多数元素 多于n/2的情况
 */
export const majorityElementSort = function(nums: number[]): number {
  const len = nums.length;
  if(len === 1) return nums[0];
  nums.sort((a,b) => a - b);
  return nums[Math.floor(len / 2)]
}
// @lc code=end

