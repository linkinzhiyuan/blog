/*
 * @lc app=leetcode.cn id=20 lang=typescript
 * @lcpr version=20003
 *
 * [20] 有效的括号
 *
 * https://leetcode.cn/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (44.32%)
 * Likes:    4589
 * Dislikes: 0
 * Total Accepted:    2M
 * Total Submissions: 4.5M
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 * 
 * 示例 1：
 * 
 * 输入：s = "()"
 * 
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：s = "()[]{}"
 * 
 * 输出：true
 * 
 * 示例 3：
 * 
 * 输入：s = "(]"
 * 
 * 输出：false
 * 
 * 示例 4：
 * 
 * 输入：s = "([])"
 * 
 * 输出：true
 * 
 * 提示：
 * 
 * 1 <= s.length <= 10^4
 * s 仅由括号 '()[]{}' 组成
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
export function isValid(s: string): boolean {
  const stack: string[] = []
  const map: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const len = s.length
  for(let i = 0; i < len; i++) {
    if(s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i])
    } else {
      if(map[stack.pop() as string] !== s[i]) return false
    }
  }

  return stack.length === 0
};
// @lc code=end

