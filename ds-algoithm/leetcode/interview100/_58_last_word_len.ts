/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 *
 * https://leetcode.cn/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (45.90%)
 * Likes:    718
 * Dislikes: 0
 * Total Accepted:    613.4K
 * Total Submissions: 1.3M
 * Testcase Example:  '"Hello World"'
 *
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
 * 
 * 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "Hello World"
 * 输出：5
 * 解释：最后一个单词是“World”，长度为 5。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "   fly me   to   the moon  "
 * 输出：4
 * 解释：最后一个单词是“moon”，长度为 4。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "luffy is still joyboy"
 * 输出：6
 * 解释：最后一个单词是长度为 6 的“joyboy”。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 10^4
 * s 仅有英文字母和空格 ' ' 组成
 * s 中至少存在一个单词
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLastWordPop = function(s: string): number {
  const lastWord = s.trim().split(' ').pop()
  return lastWord ? lastWord.length : 0
};

export const lengthOfLastWordStep = function(s: string): number {
  // 从最后一个单词的最后一个字符开始，向前查找空格字符
  let len = 0
  for( let i = s.trimEnd().length - 1; i >= 0; i--) {
    if(s[i] === ' ') {
      break
    }
    len ++
  }
  return len
}

export const lengthOfLastWord = function(s: string): number {
  // 从最后一个单词的最后一个字符开始，向前查找空格字符
  const len = s.trimEnd().length
  let i = len - 1
  for( i; i >= 0; i--) {
    if(s[i] === ' ') {
      break
    }
  }
  return len - i - 1
}

export const lengthOfLastWordSkipLastSpace = function(s: string): number {
  let i = s.length - 1
  let step = 0

  while(i >= 0 && s[i] === ' ') {
    i--
  }

  while(i >= 0 && s[i] !== ' ') {
    step ++
    i--
  }

  return step
}
// @lc code=end

