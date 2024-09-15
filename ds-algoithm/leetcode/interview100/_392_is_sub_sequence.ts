/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 *
 * https://leetcode.cn/problems/is-subsequence/description/
 *
 * algorithms
 * Easy (52.52%)
 * Likes:    1086
 * Dislikes: 0
 * Total Accepted:    481.7K
 * Total Submissions: 915K
 * Testcase Example:  '"abc"\n"ahbgdc"'
 *
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 
 * 
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * 
 * 进阶：
 * 
 * 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T
 * 的子序列。在这种情况下，你会怎样改变代码？
 * 
 * 致谢：
 * 
 * 特别感谢 @pbrother 添加此问题并且创建所有测试用例。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 
 * 0 
 * 两个字符串都只由小写字符组成。
 * 
 * 
 */

// @lc code=start
/**
 * 双重指针
 * 如果s.length > t.length，直接返回 false
 * 都从0开始，i = 0，j = 0 i<s.length，j<t.length
 * 如果相等，i++,j++
 * 如果不相等，i不变，j++
 * 如果j = t.length，i < s.length，返回false，否则返回true
 * 如果i = s.length，j <= t.length，返回true
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export const isSubsequence = function(s: string, t: string): boolean {
  if (s.length > t.length) return false
  let i = 0
  let j = 0
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) i++
    j++
  }
  return i === s.length
};

/**
 * 递归
 * s.length === 0，返回true
 * t.length === 0，返回false
 * s[0] === t[0]，返回isSubsequence(s.slice(1), t.slice(1))
 * 返回isSubsequence(s, t.slice(1))
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

export const isSubsequenceRecursive = function(s: string, t: string): boolean {
  if (s.length === 0) return true
  if (t.length === 0) return false
  if (s[0] === t[0]) return isSubsequenceRecursive(s.slice(1), t.slice(1))
  return isSubsequenceRecursive(s, t.slice(1))
}

/**
 * 利用indexof 方法，遍历s, t.indexOf(s[i], 0) === -1，返回false，否则返回true
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

export const isSubsequenceIndexOf = function(s: string, t: string): boolean {
  let index = -1
  for(let char of s) {
    index = t.indexOf(char, index + 1)
    if (index === -1) return false
  }
  return true
}
// @lc code=end

