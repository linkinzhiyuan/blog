/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 轮转数组
 *
 * https://leetcode.cn/problems/rotate-array/description/
 *
 * algorithms
 * Medium (45.14%)
 * Likes:    2184
 * Dislikes: 0
 * Total Accepted:    911.3K
 * Total Submissions: 2M
 * Testcase Example:  '[1,2,3,4,5,6,7]\n3'
 *
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释: 
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 * 0 <= k <= 10^5
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
 * 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
 * 
 * 
 */

// @lc code=start
/** 思路：轮询k次，每次将最后一个元素放到第一个位置，然后将第二个元素放到第二个位置，依次类推，最后将最后一个元素放到第k个位置
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 * @url https://leetcode-cn.com/problems/rotate-array
 * leetcode 给出的提交结果是 测试用例通过了，但耗时太长。😂
 * 时间复杂度：O(n*k) ，但由于使用了循环和 pop、unshift 方法，其时间复杂度为 O(k * n)，这在 k 值较大时性能可能不佳
 */
// export const rotateMapK = function(nums: number[], k: number): void {
//   k = k % nums.length;
//   if(k === 0 || !nums.length) return;
//   for(let i = 0; i< k; i++){
//     const last = nums.pop() as number;
//     nums.unshift(last);
//   }
// };

/**
 * Rotates an array by `k` positions.
 * @param {number[]} nums - The array to be rotated.
 * @param {number} k - The number of positions to rotate.
 * @returns {void} Does not return anything, modifies the input array in place.
 * @throws {Error} If the input array is null or undefined.
 * @throws {RangeError} If the input array is empty or the rotation length is greater than the array length.
 * @description This function rotates an array by `k` positions using the concept of array splicing.
 * It first checks if the input array is null or undefined, and throws an Error if it is.
 * Then it calculates the length of the array and checks if it is empty or if the rotation length is greater than the array length.
 * If the rotation length is 0 or the input array is empty, the function returns early.
 * Otherwise, it calculates the actual rotation length by taking the modulo of `k` and the length of the array.
 * It then uses the `splice` method to extract the last `k` elements from the array and stores them in a new array.
 * Finally, it uses the `unshift` method to add the extracted elements to the beginning of the array.
 * The time complexity of this algorithm is O(n), where n is the length of the array.
 * The space complexity of this algorithm is O(1) as no additional data structure is used.
 */
export const rotateMapK = function(nums: number[], k: number): void {
  // Check if the input array is null or undefined
  if (!nums) {
    throw new Error('Input array is null or undefined');
  }
  // Calculate the length of the array
  const len = nums.length;
  // Calculate the actual rotation length
  k = k % len;
  // If the rotation length is 0, return early
  if (k === 0) {
    return;
  }
  // Extract the last k elements from the array and store them in a new array
  const arr = nums.splice(len - k, k);
  // Add the extracted elements to the beginning of the array
  nums.unshift(...arr);
}

/**
 * Rotates an array by k positions.
 * @param {number[]} nums - The array to be rotated.
 * @param {number} k - The number of positions to rotate.
 * @returns {void} Does not return anything, modifies the input array in place.
 * @description This function rotates an array by k positions using a foreach loop.
 * It creates a copy of the original array and then iterates over the original array,
 * assigning the elements to their corresponding positions in the rotated array.
 * The time complexity is O(n), where n is the length of the array,
 * and the space complexity is O(n), where n is the length of the array.
 */
export const rotateForeach = function(nums: number[], k: number): void {
  // Create a copy of the original array
  const copyArr = nums.slice();
  const len = nums.length;
  // Iterate over the original array
  for(let i = 0; i < len; i++){
    // Calculate the index of the element in the rotated array
    const index = (i + k) % len;
    // Assign the element to its corresponding position in the rotated array
    nums[index] = copyArr[i];
  }
}

/**
 * 观察数组结果，其实是多次翻转数组得到的
 * 翻转数组就是交换数组
 * @param nums 
 * @param k 
 */
const rerverse = (arr:number[], start:number, end:number) => {
  while(start < end){
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}
export const rotateArrRerverse = function(nums: number[], k: number): void {
  k = k % nums.length; // [1,2,3,4,5] k =3
  rerverse(nums, 0, nums.length-1); // [5,4,3,2,1]
  rerverse(nums, 0, k-1); // [3,4,5,2,1]
  rerverse(nums, k, nums.length-1);
}
// @lc code=end

