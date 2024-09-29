/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (39.90%)
 * Likes:    10333
 * Dislikes: 0
 * Total Accepted:    3.1M
 * Total Submissions: 7.6M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= s.length <= 5 * 10^4
 * s 由英文字母、数字、符号和空格组成
 * 
 * 
 */

// @lc code=start
/**
 * 滑动窗口
 * 最长无重复字符的子串map，和最长length
 * 双指针 left right，right指针不断右移，left指针不断左移，当出现重复字符时，收缩左侧指针，更新最大长度
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstring = function(s: string): number {
  if (s.length === 0) return 0
  const map = new Map()
  let maxLen = 0
  let left = 0
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1)
    }
    map.set(s[right], right)
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
};

/**
 * 利用ASCII码 -》 26 个字符，判断是否重复, 记录出现的位置，如果重复，移动左侧指针
 * 同样利用的是滑动窗口
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstringAscii = function(s: string): number {
  if (s.length === 0) return 0
  const charIndex = new Array(128).fill(-1)
  let maxLen = 0
  let left = 0
  for (let right = 0; right < s.length; right++) {
    /**
     * charCodeAt() 方法可返回指定位置的字符的 UTF-16 代码
     * const str = "Hello, World!";
     * const code = str.charCodeAt(0); // 返回 72，对应字符 'H'
     * console.log(code); // 72
     */
    const charCode = s.charCodeAt(right); // 获取ASCII码 
    if (charIndex[charCode] >= left) {
      left = charIndex[charCode] + 1;
    }
    charIndex[charCode] = right;
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen
};
// @lc code=end

