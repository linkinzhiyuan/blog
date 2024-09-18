/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode.cn/problems/3sum/description/
 *
 * algorithms
 * Medium (38.08%)
 * Likes:    7051
 * Dislikes: 0
 * Total Accepted:    2M
 * Total Submissions: 5.1M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
 * k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 * 
 * 
 */

// @lc code=start
/**
 * 先递增排序，如果第一个数是大于等于0，则不存在
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
export const threeSum = function(nums:number[]): number[][] {
  const numsSort = nums.sort((a,b) => a - b);
  if(numsSort[0] > 0) return [];
  const result: number[][] = [];
  for(let i = 0;i < numsSort.length;i++){
    if(numsSort[i] > 0) break;
    if(i > 0 && numsSort[i] === numsSort[i-1]) continue;
    let left = i + 1;
    let right = numsSort.length - 1;
    const target = -numsSort[i];
    // 双指针
    while(left < right){
      if(numsSort[left] + numsSort[right] === target){
        const [one,two,three] = [numsSort[i],numsSort[left],numsSort[right]];
        [one,two,three].sort((a,b) => a - b);
        result.push([one,two,three]);
        while(left < right && numsSort[left] === numsSort[left+1]) left++;
        while(left < right && numsSort[right] === numsSort[right-1]) right--;
        left++;
        right--;
      } else if(numsSort[left] + numsSort[right] > target){
        right--;
      } else {
        left++;
      }
    }
  }

  return result;
};

/**
 * 二分查找
 * @param {number[]} nums
 * @return {number[][]}
 */
export const threeSumBinarySearch = function(nums:number[]): number[][] {
  nums.sort((a,b) => a - b);
  if(nums[0] > 0) return [];
  const res: number[][] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 二分查找
    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      const result = - (nums[i] + nums[j]);
      let left = j + 1;
      let right = nums.length - 1;

      while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === result) {
          res.push([nums[i], nums[j], nums[mid]].sort((a, b) => a - b));
          // 跳过重复的左指针数
          while (left <= right && nums[mid] === nums[mid + 1]) {
            mid++;
          }
          break;
        } else if (nums[mid] < result) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
  }
  return res;
}
// @lc code=end

