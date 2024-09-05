/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 *
 * https://leetcode.cn/problems/integer-to-roman/description/
 *
 * algorithms
 * Medium (67.30%)
 * Likes:    1322
 * Dislikes: 0
 * Total Accepted:    503.3K
 * Total Submissions: 743.3K
 * Testcase Example:  '3749'
 *
 * 七个不同的符号代表罗马数字，其值如下：
 * 
 * 符号
 * 值
 * 
 * I:1
 * V:5
 * X:10
 * L:50
 * C:100
 * D:500
 * M:1000
 * 
 * 罗马数字是通过添加从最高到最低的小数位值的转换而形成的。将小数位值转换为罗马数字有以下规则：
 * 
 * 
 * 如果该值不是以 4 或 9 开头，请选择可以从输入中减去的最大值的符号，将该符号附加到结果，减去其值，然后将其余部分转换为罗马数字。
 * 如果该值以 4 或 9 开头，使用 减法形式，表示从以下符号中减去一个符号，例如 4 是 5 (V) 减 1 (I): IV ，9 是 10 (X) 减
 * 1 (I)：IX。仅使用以下减法形式：4 (IV)，9 (IX)，40 (XL)，90 (XC)，400 (CD) 和 900 (CM)。
 * 只有 10 的次方（I, X, C, M）最多可以连续附加 3 次以代表 10 的倍数。你不能多次附加 5 (V)，50 (L) 或 500
 * (D)。如果需要将符号附加4次，请使用 减法形式。
 * 
 * 
 * 给定一个整数，将其转换为罗马数字。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：num = 3749
 * 
 * 输出： "MMMDCCXLIX"
 * 
 * 解释：
 * 
 * 
 * 3000 = MMM 由于 1000 (M) + 1000 (M) + 1000 (M)
 * ⁠700 = DCC 由于 500 (D) + 100 (C) + 100 (C)
 * ⁠ 40 = XL 由于 50 (L) 减 10 (X)
 * ⁠  9 = IX 由于 10 (X) 减 1 (I)
 * 注意：49 不是 50 (L) 减 1 (I) 因为转换是基于小数位
 * 
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：num = 58
 * 
 * 输出："LVIII"
 * 
 * 解释：
 * 
 * 
 * 50 = L
 * ⁠8 = VIII
 * 
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：num = 1994
 * 
 * 输出："MCMXCIV"
 * 
 * 解释：
 * 
 * 
 * 1000 = M
 * ⁠900 = CM
 * ⁠ 90 = XC
 * ⁠  4 = IV
 * 
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= num <= 3999
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
const romanMap = new Map([
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
])

/**
 * 贪心算法 时间复杂度 O(n)，空间复杂度 O(1)
 * 使用贪心算法从大的罗马数字开始，尽可能多地减去该数字对应的整数值，直到转换完成
 * 将所有的罗马字符及其对应的整数值按降序排列。
 * 对输入的整数进行遍历，将当前最大的罗马字符加到结果字符串中，并减去该罗马字符对应的整数值，直到整数变为 0。
 * @param num 
 * @returns 
 */
export const intToRoman = function(num: number): string {
  let result = ''
  for (const [key, value] of romanMap) {
    while (num >= value) {
      result += key
      num -= value
    }
  }  
  return result
};

/** 
 * 硬编码法 枚举 3999 场景下所有可能的罗马数字
 * @param num
 * @returns string
*/
export const intToRoman2 = function(num: number): string {
  const romanAll = {
    'thousand': ['', 'M', 'MM', 'MMM'],
    'hundred': ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
    'ten': ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
    'one': ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  }

  return romanAll.thousand[num / 1000 | 0] + romanAll.hundred[(num % 1000) / 100 | 0] + romanAll.ten[(num % 100) / 10 | 0] + romanAll.one[num % 10]
}

export const intToRoman3 = function(num: number): string {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  
  let result = '';
  
  for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
          num -= values[i];
          result += symbols[i];
      }
  }
  
  return result;
}

// @lc code=end

