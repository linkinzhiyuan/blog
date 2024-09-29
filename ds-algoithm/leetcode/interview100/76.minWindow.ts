/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode.cn/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (45.89%)
 * Likes:    3006
 * Dislikes: 0
 * Total Accepted:    644.1K
 * Total Submissions: 1.4M
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 * 。
 * 
 * 
 * 
 * 注意：
 * 
 * 
 * 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "a", t = "a"
 * 输出："a"
 * 解释：整个字符串 s 是最小覆盖子串。
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * ^m == s.length
 * ^n == t.length
 * 1 <= m, n <= 10^5
 * s 和 t 由英文字母组成
 * 
 * 
 * 
 * 进阶：你能设计一个在 o(m+n) 时间内解决此问题的算法吗？
 */

// @lc code=start
/**
 * 滑动窗口
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
export const minWindow = function(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return "";

  // 记录 t 中每个字符的出现次数
  const need: Record<string, number> = {};
  for (const char of t) {
    need[char] = (need[char] || 0) + 1;
  }

  const window: Record<string, number> = {};
  let left = 0, right = 0;
  let valid = 0; // 记录窗口中满足 need 条件的字符个数
  let start = 0, minLen = Infinity;

  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s[right];
    right++;

    // 进行窗口内数据的一系列更新
    if (need[c] !== undefined) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid === Object.keys(need).length) {
      // 更新最小覆盖子串
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      // d 是将移出窗口的字符
      const d = s[left];
      left++;

      // 进行窗口内数据的一系列更新
      if (need[d] !== undefined) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  // 返回最小覆盖子串
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
};

/**
 * 优化滑动窗口
 */
export const minWindowRefactor = function(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return "";

  const need: Record<string, number> = {};
  for (const char of t) {
    need[char] = (need[char] || 0) + 1;
  }

  const window: Record<string, number> = {};
  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;

  // 仅处理 t 中出现的字符
  const filteredS = s.split('').map((char, index) => ({ char, index })).filter(item => need[item.char] !== undefined);

  for (const { char, index } of filteredS) {
    right = index;
    
    if (need[char] !== undefined) {
      window[char] = (window[char] || 0) + 1;
      if (window[char] === need[char]) {
        valid++;
      }
    }

    while (valid === Object.keys(need).length) {
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need[d] !== undefined) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);  
}
// @lc code=end

