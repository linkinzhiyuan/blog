/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 *
 * https://leetcode.cn/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (52.96%)
 * Likes:    2373
 * Dislikes: 0
 * Total Accepted:    717.9K
 * Total Submissions: 1.3M
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * 
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 * 
 * 
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 * 
 * 请你实现这个将字符串进行指定行数变换的函数：
 * 
 * 
 * string convert(string s, int numRows);
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N  
 * A   L S  I G
 * Y A   H R
 * P     I
 * 
 * 00(0) 01    02    03(6) 04     05     06(12)
 * 10(1) 11    12(5) 13(7) 14     15(11) 16(13)
 * 20(2) 21(4) 22    23(8) 24(10) 25     26
 * 30(3) 31    32    33(9) 34     35     36 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "A", numRows = 1
 * 输出："A"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1 
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
export const convert = function(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s
  const strArr = new Array(numRows).fill('')

  let down = false
  let row = 0
  for (const char of s) {
    strArr[row] += char

    if (row === 0 || row === numRows - 1) down = !down
    row += down ? 1 : -1
  }

  return strArr.join('')
};
// @lc code=end

