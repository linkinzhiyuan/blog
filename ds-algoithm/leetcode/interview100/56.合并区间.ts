/*
 * @lc app=leetcode.cn id=56 lang=typescript
 * @lcpr version=20003
 *
 * [56] 合并区间
 *
 * https://leetcode.cn/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (50.69%)
 * Likes:    2458
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2M
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 
 * 示例 1：
 * 
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 示例 2：
 * 
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * 
 * 提示：
 * 
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 如果 intervals 为空，直接返回空列表。
 * 按照每个区间的起始位置对 intervals 进行排序。
 * 初始化一个结果列表 merged，将第一个区间添加进去。遍历排序后的区间：
 * 如果当前区间的起始位置大于结果列表中最后一个区间的结束位置，则没有重叠，直接将当前区间添加到结果列表。
 * 否则，有重叠，更新结果列表中最后一个区间的结束位置为当前区间结束位置和结果列表中最后一个区间结束位置的最大值。
 * 返回结果列表 merged。
 * @param intervals number[][]
 * @returns number[][]
 */
export function merge(intervals: number[][]): number[][] {
  if(intervals.length === 0) return []
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

// @lc code=end

