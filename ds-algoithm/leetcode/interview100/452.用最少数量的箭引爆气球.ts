/*
 * @lc app=leetcode.cn id=452 lang=typescript
 * @lcpr version=20003
 *
 * [452] 用最少数量的箭引爆气球
 *
 * https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/
 *
 * algorithms
 * Medium (52.20%)
 * Likes:    1025
 * Dislikes: 0
 * Total Accepted:    319K
 * Total Submissions: 610.7K
 * Testcase Example:  '[[10,16],[2,8],[1,6],[7,12]]'
 *
 * 有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，其中points[i] = [xstart, xend]
 * 表示水平直径在 xstart 和 xend之间的气球。你不知道气球的确切 y 坐标。
 * 
 * 一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足
 * xstart ≤ x ≤ xend，则该气球会被 引爆 。可以射出的弓箭的数量 没有限制 。 弓箭一旦被射出之后，可以无限地前进。
 * 
 * 给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数 。
 * 
 * 
 * 示例 1：
 * 
 * 输入：points = [[10,16],[2,8],[1,6],[7,12]]
 * 输出：2
 * 解释：气球可以用2支箭来爆破:
 * -在x = 6处射出箭，击破气球[2,8]和[1,6]。
 * -在x = 11处发射箭，击破气球[10,16]和[7,12]。
 * 
 * 示例 2：
 * 
 * 输入：points = [[1,2],[3,4],[5,6],[7,8]]
 * 输出：4
 * 解释：每个气球需要射出一支箭，总共需要4支箭。
 * 
 * 示例 3：
 * 
 * 输入：points = [[1,2],[2,3],[3,4],[4,5]]
 * 输出：2
 * 解释：气球可以用2支箭来爆破:
 * - 在x = 2处发射箭，击破气球[1,2]和[2,3]。
 * - 在x = 4处射出箭，击破气球[3,4]和[4,5]。
 * 
 * 提示:
 * 
 * 1 <= points.length <= 10^5
 * points[i].length == 2
 * -2^31 <= xstart < xend <= 2^31 - 1
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 如果 points 为空，返回0。
 * 按照每个区间的结束位置对 points 进行排序。
 * 初始化箭的数量 arrowCount 为1，并设置第一个箭的射击位置为第一个区间的结束位置。
 * 遍历排序后的区间：
 * 如果当前区间的起始位置大于箭的射击位置，说明需要一支新的箭。增加 arrowCount 并更新射击位置为当前区间的结束位置。
 * 返回箭的数量 arrowCount
 * @param points 
 * @returns number
 */
export function findMinArrowShots(points: number[][]): number {
  if(points.length === 0) return 0
  let res = 1;
  points.sort((a,b) => a[1] - b[1])
  let arrow = points[0][1]
  for(let i = 1; i < points.length; i++) {
    if(points[i][0] > arrow) {
      res++
      arrow = points[i][1]
    }
  }
  return res
};
// @lc code=end

