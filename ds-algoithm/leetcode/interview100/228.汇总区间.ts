/*
 * @lc app=leetcode.cn id=228 lang=typescript
 * @lcpr version=20003
 *
 * [228] 汇总区间
 *
 * https://leetcode.cn/problems/summary-ranges/description/
 *
 * algorithms
 * Easy (54.84%)
 * Likes:    411
 * Dislikes: 0
 * Total Accepted:    190.1K
 * Total Submissions: 346.5K
 * Testcase Example:  '[0,1,2,4,5,7]'
 *
 * 给定一个  无重复元素 的 有序 整数数组 nums 。
 * 
 * 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于
 * nums 的数字 x 。
 * 
 * 列表中的每个区间范围 [a,b] 应该按如下格式输出：
 * 
 * "a->b" ，如果 a != b
 * "a" ，如果 a == b
 * 
 * 示例 1：
 * 
 * 输入：nums = [0,1,2,4,5,7]
 * 输出：["0->2","4->5","7"]
 * 解释：区间范围是：
 * [0,2] --> "0->2"
 * [4,5] --> "4->5"
 * [7,7] --> "7"
 * 
 * 示例 2：
 * 
 * 输入：nums = [0,2,3,4,6,8,9]
 * 输出：["0","2->4","6","8->9"]
 * 解释：区间范围是：
 * [0,0] --> "0"
 * [2,4] --> "2->4"
 * [6,6] --> "6"
 * [8,9] --> "8->9"
 * 
 * 提示：
 * 
 * 0 <= nums.length <= 20
 * -2^31 <= nums[i] <= 2^31 - 1
 * nums 中的所有值都 互不相同
 * nums 按升序排列
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param nums 
 * @returns 
 */
export function summaryRanges(nums: number[]): string[] {
  const result:string[] = []
  let start = nums[0], end = nums[0];
  for(let i = 1; i <= nums.length; i++) {
    if(i < nums.length && nums[i] === end + 1){
      end = nums[i]
    } else {

      if(start === end) {
        result.push(`${start}`)
      } else {
        result.push(`${start}->${end}`)
      }

      if(i < nums.length) {
        start = nums[i]
        end = nums[i]
      }
    }
  }
  
  return result
};

/**
 * 双指针
 * @param nums
 * @returns
 */
export function summaryRangesPoint(nums: number[]): string[] {
  const result: string[] = []
  const len = nums.length
  let start = 0;
  for(let end = 0; end < len; end++){
    if(end === len - 1 || nums[end] + 1 !== nums[end + 1]){
      if(start === end) {
        result.push(`${nums[start]}`)
      } else {
        result.push(`${nums[start]}->${nums[end]}`)
      }
      start = end + 1
    }
  }
  return result
}


// @lc code=end

