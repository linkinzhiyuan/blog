/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 *
 * https://leetcode.cn/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (47.21%)
 * Likes:    762
 * Dislikes: 0
 * Total Accepted:    640.6K
 * Total Submissions: 1.3M
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 * 
 * 字母和数字都属于字母数字字符。
 * 
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 * 解释："amanaplanacanalpanama" 是回文串。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "race a car"
 * 输出：false
 * 解释："raceacar" 不是回文串。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = " "
 * 输出：true
 * 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
 * 由于空字符串正着反着读都一样，所以是回文串。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 2 * 10^5
 * s 仅由可打印的 ASCII 字符组成
 * 
 * 
 */

// @lc code=start
/**
 * 左右双指针
 * 如果非字母，则直接跳过
 * 如果是字母则转化成小写，比较是否相等，相等则继续向中间移动，不相等则返回 false
 * 
 * @param {string} s
 * @return {boolean}
 */
export const isPalindrome = function(s: string): boolean {
  const len = s.length
  let left = 0, right = len - 1

  while(left < right){
    const leftChar = s[left].toLowerCase()
    const rightChar = s[right].toLowerCase()

    if(!isChar(leftChar)){
      left++
      continue
    }
    if(!isChar(rightChar)){
      right--
      continue
    }

    if(leftChar !== rightChar){
      return false
    }

    left++
    right--
  }

  return true
  function isChar(char: string){
    // return char >= 'a' && char <= 'z' || char >= '0' && char <= '9'
    return /[a-z0-9]/.test(char)
  }
};

/**
 * 递归
 * @param {string} s
 * @return {boolean}
 */

export const isPalindromeRecursion = function(s: string): boolean {
  // 移除非字母数字字符
  s = s.replace(/[^0-9a-z]/gi, '').toLowerCase()
  // 定义递归函数
  const isPalindrome = (left: number, right: number): boolean => {
    if(left >= right) return true
    if(s[left] !== s[right]) return false
    return isPalindrome(left + 1, right - 1)
  }
  return isPalindrome(0, s.length - 1)
}

/**
 * 栈：后进先出
 * @param {string} s
 * @return {boolean}
 */

export const isPalindromeStack = function(s: string): boolean {
  // 移除非字母数字字符
  s = s.replace(/[^0-9a-z]/gi, '').toLowerCase()
  // 定义栈
  const stack: string[] = []
  // 推入一半数据进栈
  for(let i = 0; i < s.length / 2; i++){
    stack.push(s[i])
  }
  // 如果是奇数 则跳过中间元素
  const middle = s.length % 2 === 1 ? (s.length - 1) / 2 : s.length / 2
  // 依次出栈 和剩余的开始比较
  for(let i = middle; i < s.length; i++){
    if(s[i] !== stack.pop()){
      return false
    }
  }
  return true
}
// @lc code=end

