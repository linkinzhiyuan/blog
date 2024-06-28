/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
export const removeElement = function(nums: number[], val: number): number {
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[index] = nums[i];
      index++;
    }
  }
  return index;
};

/*
* 快慢指针
* 由于题目要求删除数组中等于 val 的元素，因此输出数组的长度一定小于等于输入数组的长度，我们可以把输出的数组直接写在输入数组上。可以使用双指针：右指针 right 指向当前将要处理的元素，左指针 left 指向下一个将要赋值的位置。
* 如果右指针指向的元素不等于 val，它一定是输出数组的一个元素，我们就将右指针指向的元素复制到左指针位置，然后将左右指针同时右移；
* 如果右指针指向的元素等于 val，它不能在输出数组里，此时左指针不动，右指针右移一位。
* 整个过程保持不变的性质是：区间 [0,left) 中的元素都不等于 val。当左右指针遍历完输入数组以后，left 的值就是输出数组的长度。
* 这样的算法在最坏情况下（输入数组中没有元素等于 val），左右指针各遍历了数组一次。
* 时间复杂度 O(n) ，在没有的情况下快慢指针各循环一次，最多是2n
* 空间复杂度 O(1)
*/
export const removeElementFastSlow = function(nums:number[],val:number){
  let fast = 0, slow = 0;
  while(fast < nums.length){
    if(nums[fast] !== val){
      nums[slow++] = nums[fast]
    }
    fast ++;
  }
  return slow;
}

/**
 * * 一次遍历
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 * @url https://leetcode-cn.com/problems/remove-element/
 * * 思路
 * 由于 「元素的顺序可以改变」，不考虑最后数组的顺序
 * 快慢指针优化，首尾双指针，向中间移动遍历该序列，letf 从 0 开始，right 从 nums.length - 1 开始
 * 当left === val 时，把right 指向的值赋值给left,然后right 向左移动一位，left 向右移动一位，直到left 不等于val为止
 * 当left === right 时，循环结束
 * 这个优化在序列中 val 元素的数量较少时非常有效
 * * 时间复杂度 O(n)
 * * 空间复杂度 O(1)
 */

export const removeElementFastSlowRefactor  = function(nums:number[],val:number){
  let left = 0,right = nums.length;
  while(left < right){
      if(nums[left] === val){
      nums[left] = nums[right-1];
        right--;
      }else{
        left++;
      }
  }
  return left;
}

console.log(removeElementFastSlowRefactor([3,3],3))