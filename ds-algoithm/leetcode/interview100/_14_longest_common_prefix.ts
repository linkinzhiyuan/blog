/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode.cn/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (44.11%)
 * Likes:    3170
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 3.1M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 * 
 * 
 */

// @lc code=start
/**
 * 横向扫描
 * @param {string[]} strs
 * @return {string}
 */
export const longestCommonPrefixRow = function(strs: string[]): string {
  if (strs.length === 0) return ''
  let commonPre = strs[0]
  for (let i = 1; i < strs.length; i++) {
    // 从左到右，对比每个字符串和commonPre，找出公共前缀
    for (let j = 0; j < commonPre.length; j++) {
      if (strs[i][j] !== commonPre[j]) {
        commonPre = commonPre.slice(0, j)
        break
      }
    }
  }
  return commonPre
};

/**
 * 纵向扫描
 * @param {string[]} strs
 * @return {string}
 */
export const longestCommonPrefixColumn = function(strs: string[]): string {
  if (strs.length === 0) return ''
  let commonPre = strs[0]
  for (let i = 0; i < commonPre.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== commonPre[i]) {
        commonPre = commonPre.slice(0, i)
        break
      }
    }
  }
  return commonPre
}

/**
 * 二分查找
 * @param {string[]} strs
 * @return {string}
 */
export const longestCommonPrefixBinarySearch = function(strs: string[]): string {
  if (strs.length === 0) return ''
  const minLen = Math.min(...strs.map(item => item.length))

  let low = 0, high = minLen
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const commonPre = strs[0].slice(0, mid)
    if (strs.every(item => item.startsWith(commonPre))) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  
  return strs[0].slice(0, Math.floor((low + high) / 2))
}

// @lc code=end

