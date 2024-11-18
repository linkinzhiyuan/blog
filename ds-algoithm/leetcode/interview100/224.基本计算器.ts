/*
 * @lc app=leetcode.cn id=224 lang=typescript
 * @lcpr version=20003
 *
 * [224] 基本计算器
 *
 * https://leetcode.cn/problems/basic-calculator/description/
 *
 * algorithms
 * Hard (43.09%)
 * Likes:    1081
 * Dislikes: 0
 * Total Accepted:    162.5K
 * Total Submissions: 377K
 * Testcase Example:  '"1 + 1"'
 *
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 * 
 * 注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
 * 
 * 示例 1：
 * 
 * 输入：s = "1 + 1"
 * 输出：2
 * 
 * 示例 2：
 * 
 * 输入：s = " 2-1 + 2 "
 * 输出：3
 * 
 * 示例 3：
 * 
 * 输入：s = "(1+(4+5+2)-3)+(6+8)"
 * 输出：23
 * 
 * 提示：
 * 
 * 1 <= s.length <= 3 * 10^5
 * s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
 * s 表示一个有效的表达式
 * '+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
 * '-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
 * 输入中不存在两个连续的操作符
 * 每个数字和运行的计算将适合于一个有符号的 32位 整数
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 栈的思路
 * 数字：如果当前字符是数字，继续读取直到数字结束，并将其转换为一个整数。
 * 加号 +：将当前的 number 加到 result 中，然后重置 number 为0，并设置 sign 为1。
 * 减号 -：将当前的 number 减去（通过 sign 控制）到 result 中，然后重置 number 为0，并设置 sign 为-1。
 * 左括号 (：将当前的 result 和 sign 压入栈中，重置 result 为0，sign 为1，以准备计算括号内的表达式。
 * 右括号 )：将当前的 number 和 sign 计算到 result 中，然后从栈中弹出 sign 和之前的 result，更新当前 result。
 * 空格：忽略。
 * 如果遍历结束后 number 不为0，将最后一个数字加到 result 中
 * @param s 
 * @returns number
 */
// export function calculate(s: string): number {
//   let stack: number[] = []; // 缓存括号前面的结果
//   let result = 0; // 用于保存当前计算的结果
//   let number = 0; // 用于保存当前完整的数字 '123'
//   let sign = 1; // 1 表示正，-1 表示负

//   for (let i = 0; i < s.length; i++) {
//     const char = s[i];
//     if (char === ' ') continue;

//     if (char >= '0' && char <= '9') {
//       // 构建完整的数字， 有可能是一个大数，123
//       number = number * 10 + (char.charCodeAt(0) - '0'.charCodeAt(0));
//     } else if (char === '+' || char === '-') {
//       // 将当前数字加入结果
//       result += sign * number;
//       number = 0;
//       sign = char === '+' ? 1 : -1;
//     } else if (char === '(') {
//       // 保存当前结果和符号
//       stack.push(result);
//       stack.push(sign);
//       result = 0;
//       sign = 1;
//     } else if (char === ')') {
//       // 计算括号内的结果
//       result += sign * number;
//       number = 0;
//       result *= stack.pop()!; // 恢复之前的符号
//       result += stack.pop()!; // 恢复之前的结果
//     }
//   }

//   return result + sign * number;  
// };

/**
 * 栈的思路: stack 缓存括号前面的结果， result 用于保存当前计算的结果, num 用于保存当前完整的数字 '123', sign 用于保存当前符号 1 表示正，-1 表示负
 * 如果是数字的话，累加的方式，得出一个完整的数字
 * 如果是符号的话，计算结果，然后重置 num 为 0，sign 为当前符号
 * 如果是(括号的话，将结果和符号缓存到栈中，重置 result 为 0，sign 为 1，用于计算括号内的表达式
 * 如果是)括号的话，计算括号内的结果，然后从栈中弹出符号和之前的结果，更新当前结果
 * @param s
 * @returns number
 */
export function calculate(s: string): number {
  const stack: number[] = []; // 缓存括号前面的结果
  let result = 0; // 用于保存当前计算的结果
  let num = 0; // 用于保存当前完整的数字 '123'
  let sign = 1; // 1 表示正，-1 表示负
  for (const char of s) {
    if (char === ' ') continue;
    if (char >= '0' && char <= '9') {
      num = num * 10 + (char.charCodeAt(0) - '0'.charCodeAt(0));
    } else if (char === '+' || char === '-') {
      result += sign * num;
      num = 0;
      sign = char === '+' ? 1 : -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop()!; // 乘以原来的符号
      result += stack.pop()!; // 累加之前的结果
    }
  }

  return result + sign * num;
}

// @lc code=end


