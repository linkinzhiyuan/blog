/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 找出字符串中第一个匹配项的下标
 *
 * https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/
 *
 * algorithms
 * Easy (43.81%)
 * Likes:    2278
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2.6M
 * Testcase Example:  '"sadbutsad"\n"sad"'
 *
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0
 * 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。
 * 
 * 示例 1：
 * 
 * 输入：haystack = "sadbutsad", needle = "sad"
 * 输出：0
 * 解释："sad" 在下标 0 和 6 处匹配。
 * 第一个匹配项的下标是 0 ，所以返回 0 。
 * 
 * 示例 2：
 * 输入：haystack = "leetcode", needle = "leeto"
 * 输出：-1
 * 解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 * 
 * 提示：
 * 
 * 1 <= haystack.length, needle.length <= 10^4
 * haystack 和 needle 仅由小写英文字符组成
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
export const findStrIndexOf = function(haystack: string, needle: string): number {
  return haystack.indexOf(needle)
};

export const findStrIndexSlice = function(haystack: string, needle: string): number {
  const needleLen = needle.length
  const haystackLen = haystack.length

  for (let i = 0; i < haystackLen - needleLen + 1; i++) {
    if (haystack.slice(i, i + needleLen) === needle) {
      return i
    }
  }

  return -1
};

export const findStrIndexFlag = function(haystack: string, needle: string): number {
  const needleLen = needle.length
  const haystackLen = haystack.length

  for (let i = 0; i < haystackLen - needleLen + 1; i++) {
    for (let j = 0; j < needleLen; j++) {
      if (haystack[i + j] !== needle[j]) {
        break
      }

      if (j === needleLen - 1) {
        return i
      }
    }
  }

  return -1
}
// @lc code=end

