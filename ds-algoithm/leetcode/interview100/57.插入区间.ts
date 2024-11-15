/*
 * @lc app=leetcode.cn id=57 lang=typescript
 * @lcpr version=20003
 *
 * [57] 插入区间
 *
 * https://leetcode.cn/problems/insert-interval/description/
 *
 * algorithms
 * Medium (42.70%)
 * Likes:    939
 * Dislikes: 0
 * Total Accepted:    237K
 * Total Submissions: 554.8K
 * Testcase Example:  '[[1,3],[6,9]]\n[2,5]'
 *
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表 intervals，其中 intervals[i] = [starti, endi] 表示第 i
 * 个区间的开始和结束，并且 intervals 按照 starti 升序排列。同样给定一个区间 newInterval = [start, end]
 * 表示另一个区间的开始和结束。
 * 
 * 在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti
 * 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。
 * 
 * 返回插入之后的 intervals。
 * 
 * 注意 你不需要原地修改 intervals。你可以创建一个新数组然后返回它。
 * 
 * 示例 1：
 * 
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
 * 
 * 示例 2：
 * 
 * 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出：[[1,2],[3,10],[12,16]]
 * 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 * 
 * 提示：
 * 
 * 
 * 0 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^5
 * intervals 根据 starti 按 升序 排列
 * newInterval.length == 2
 * 0 <= start <= end <= 10^5
 * 
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 先插入，然后合并
 * @param intervals 
 * @param newInterval 
 */
export function insert(intervals: number[][], newInterval: number[]): number[][] {
  if(intervals.length === 0) return [newInterval]
  intervals.push(newInterval)
  intervals.sort((a, b) => a[0] - b[0])
  const merge = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]
    const last = merge[merge.length - 1]
    if(last[1] < current[0]) {
      merge.push(current)
    } else {
      last[1] = Math.max(last[1], current[1])
    }
  }
  return merge
};

/**
 * 初始化一个结果列表 result。
 * 遍历 intervals：
 *  如果当前区间在新区间的左侧且不重叠，直接将当前区间添加到结果中。
 *  如果当前区间在新区间的右侧且不重叠，且尚未插入 newInterval，先将 newInterval添加到结果中，然后将当前区间添加到结果中。
 *  如果当前区间与新区间重叠，更新 newInterval 为合并后的区间。
 * 如果 newInterval 尚未插入，将其添加到结果中。
 * 返回结果列表。
 * @param intervals 
 * @param newInterval 
 */
export function insert2(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = []

  for (let i = 0; i < intervals.length; i++) {
    // 四种情况：
    // 1. 当前的最后位小于newInterval的第一位 压入当前
    // 2. 当前的第一位大于newInterval的最后一位 
    // 3. 当前的最后位大于newInterval的第一位，当前的第一位小于newInterval的最后一位
    // 4. 当前的最后位大于newInterval的第一位，当前的第一位大于newInterval的最后一位
    const current = intervals[i]
    if(current[1] < newInterval[0]) { // 当前的最后位小于newInterval的第一位
      result.push(current)
    } else if(current[0] > newInterval[1]) { // 当前的第一位大于newInterval的最后一位
      if(result.length === 0 || result[result.length - 1][1] < newInterval[0]) { // 如果结果为空或者结果的最后一位小于newInterval的第一位
        result.push(newInterval)
      }
      result.push(current) // 将当前区间添加到结果中
    } else {
      newInterval = [Math.min(current[0], newInterval[0]), Math.max(current[1], newInterval[1])] // 合并
    }
  }

  if(result.length === 0 || result[result.length - 1][1] < newInterval[0]) { // 如果结果为空或者结果的最后一位小于newInterval的第一位
    result.push(newInterval)
  }

  return result
}
// @lc code=end

