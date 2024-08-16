/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 *
 * https://leetcode.cn/problems/h-index/description/
 *
 * algorithms
 * Medium (46.25%)
 * Likes:    504
 * Dislikes: 0
 * Total Accepted:    199.4K
 * Total Submissions: 431.1K
 * Testcase Example:  '[3,0,6,1,5]'
 *
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * 
 * 根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h
 * 篇论文被引用次数大于等于 h 。如果 h 有多种可能的值，h 指数 是其中最大的那个。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：citations = [3,0,6,1,5]
 * 输出：3 
 * 解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
 * 由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
 * 
 * 示例 2：
 * 
 * 
 * 输入：citations = [1,3,1]
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == citations.length
 * 1 <= n <= 5000
 * 0 <= citations[i] <= 1000
 * 
 * 
 */

// @lc code=start
/** 个人解法： 找出最多大于等于某个值的数，从小到大排序之后，中间位置即为h指数
 * @param {number[]} citations
 * @return {number}
 * 不通过
 */
// export const hIndex = function(citations: number[]): number {
//   // citations = [3,0,6,1,5] 3 [0,1,3,5,6]
//   // citations = [1,3,1] 1 [1,1,3]
//   citations.sort((a, b) => a - b)
//   const len = citations.length
//   let center = 0
//   if(len === 2){
//     center = Math.min(...citations) > 0 ? Math.min(...citations) : Math.max(...citations)
//   } else {
//     center = citations[Math.floor(citations.length / 2)]
//   }
//   return Math.min(center, len)
// };

/**
 * 从小到大排序之后，从前遍历，找到第一个大于等于len - i，即为len - i 为h指数，否则返回 0
 * @param citations 
 * @returns 
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 */
export const hIndex = function(citations: number[]): number {
  citations.sort((a, b) => a - b)
  const len = citations.length
  for(let i = 0; i < len; i++){
    if(citations[i] >= len - i) return len - i
  }
  return 0
};

/**
 * 利用二分查找，找索引值
 * @param citations
 * @returns numbers
 * 时间复杂度：O(logn)
 * 空间复杂度：O(1)
 */

export const hIndexBinarySearch = function(citations: number[]): number {
  citations.sort((a, b) => a - b);
  let left = 0, right = citations.length - 1;
  const len = citations.length;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (citations[mid] >= len - mid) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return len - left;
}

/**
 * 桶排序方法
 * 初始化桶：首先，创建一个长度为n+1的数组（桶），其中n是论文数量。这个数组用于记录每个引用次数对应的论文数量。之所以长度为n+1是因为对于任何一个研究者而言，H指数不可能超过其发表的论文总数。
 * 填充桶：遍历给定的引用次数数组，对于数组中的每个元素，如果引用次数大于等于n，则将n桶的计数加一，因为H指数不会超过论文总数。如果引用次数小于n，则对应引用次数的桶的计数加一。
 * 计算H指数：从后向前遍历桶数组，累加当前桶及之后桶中的论文数量。当累加的数量第一次大于或等于桶的索引时，该索引即为H指数。这是因为H指数的定义是一个研究者有H篇论文分别被引用了至少H次。遍历的方向确保我们找到的是最大的H值。
 * 时间复杂度：O(n) 空间复杂度：O(n)
 */

export const hIndexBucketSort = function(citations: number[]): number {
  const len = citations.length;
  const bucket = new Array(len + 1).fill(0);
  for (let c of citations) {
    if (c >= len) {
      bucket[len]++;
    } else {
      bucket[c]++;
    }
  }
  let count = 0;
  for (let i = len; i >= 0; i--) {
    count += bucket[i];
    if (count >= i) {
      return i;
    }
  }
  return 0;
}
// @lc code=end

