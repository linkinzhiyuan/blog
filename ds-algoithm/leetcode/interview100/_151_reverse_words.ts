/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 反转字符串中的单词
 *
 * https://leetcode.cn/problems/reverse-words-in-a-string/description/
 *
 * algorithms
 * Medium (55.63%)
 * Likes:    1199
 * Dislikes: 0
 * Total Accepted:    627.5K
 * Total Submissions: 1.1M
 * Testcase Example:  '"the sky is blue"'
 *
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 * 
 * 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 * 
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 * 
 * 注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "the sky is blue"
 * 输出："blue is sky the"
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "  hello world  "
 * 输出："world hello"
 * 解释：反转后的字符串中不能存在前导空格和尾随空格。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "a good   example"
 * 输出："example good a"
 * 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
 * 
 * 提示：
 * 
 * 1 <= s.length <= 10^4
 * s 包含英文大小写字母、数字和空格 ' '
 * s 中 至少存在一个 单词
 * 
 * 进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。
 * 
 */

// @lc code=start
/**
 * [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)
 * 判断是否为空，直接拼接字符串的方式
 * @param {string} s
 * @return {string}
 */
export const reverseWords = function(s: string): string {
  const words = s.trim()
  let reverseWord:string = '';
  let singleWord = ''
  for (let i = words.length - 1; i >= 0; i--) {
    // 是字母的时候，直接拼接
    // 是空格时，1. 查看上一个单词是否为空，上一个为空则跳出循环，
    // 2.不为空 直接拼接的单词单词 + ' ', 并清空拼接的单词
    if(words[i] !== ' ') {
      singleWord = words[i] + singleWord
    } else {
      if(singleWord === '') continue
      reverseWord += singleWord + ' '
      singleWord = ''
      continue
    }
  }
  reverseWord += singleWord
  return reverseWord
};

export const reverseWordsSplit = function(s: string): string {
  return s.trim().split(/\s+/).reverse().join(' ')
}

/**
 * 双指针, 类似自己写的循环方法 reverseWords
 */
export const reverseWordsDoublePointer = function(s: string): string {
  let res = '';
  let i = s.length - 1;
  while(i >= 0) {
    while(i >= 0 && s[i] === ' ') i--;
    
    if(i < 0) break;
    let end = i;
    while(i >= 0 && s[i] !== ' ') i--;
    let start = i + 1;
    res += s.substring(start, end + 1) + ' ';
  }

  return res.trim();
}

/**
 * 栈 找到一个完整的单词push到数组中，然后再拼接
 */
export const reverseWordsStack = function(s: string): string {
  let stack: string[] = [];
  let i = 0;
  while(i < s.length) {
    if(s[i] !== ' ') {
      let j = i;
      while(j < s.length && s[j] !== ' ') j++;
      stack.push(s.substring(i, j))
      i = j
    } else {
      i++;
    }
  }
  return stack.reverse().join(' ')
}

export const reverseWordsStack2 = function(s: string): string {
  let stack: string[] = [];
  let i = 0;
  let n = s.length;

  while (i < n) {
      // 跳过空格
      while (i < n && s[i] === ' ') i++;

      let start = i;
      // 找到单词
      while (i < n && s[i] !== ' ') i++;

      if (start < i) {
          stack.push(s.substring(start, i));
      }
  }

  return stack.reverse().join(' ');
}

// @lc code=end

