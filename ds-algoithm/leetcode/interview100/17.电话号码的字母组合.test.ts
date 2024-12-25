/*
 * @lc app=leetcode.cn id=17 lang=typescript
 * @lcpr version=20004
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (60.86%)
 * Likes:    2971
 * Dislikes: 0
 * Total Accepted:    999.4K
 * Total Submissions: 1.6M
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 1：''
 * 2：abc
 * 3：def
 * 4：ghi
 * 5：jkl
 * 6：mno
 * 7：pqrs
 * 8：tuv
 * 9：wxyz
 * 
 * 
 * 示例 1：
 * 
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 
 * 示例 2：
 * 
 * 输入：digits = ""
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 * 
 * 示例 4：
 * 
 * 输入：digits = "239" 3*3*4
 * 输出：["adw","adx","ady","adz","aew","aex","aez","afw","afx","afz","bdw","bdx","bdy","bdz","bew","bex","bez","bfw","bfx","bfz","cdw","cdx","cdy","cdz","cew","cex","cez","cfw","cfx","cfz"]
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= digits.length <= 4
 * digits[i] 是范围 ['2', '9'] 的一个数字。
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 回溯算法
 * @param digits 
 */

function letterCombinations(digits: string): string[] {
  if(!digits) return [];
  const result: string[] = [];
  // 电话号码的字母映射
  const map: Map<string, string> = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ]);
  /**
   * 回溯算法
   * @param digits
   * @param index
   * @param path
   */
  const backTrack = (digits: string, index: number, path: string) => {
    if(index === digits.length) {
      result.push(path);
      return;
    }
    const digit = digits[index];
    const letters = map.get(digit)!;
    for (const letter of letters) {
      backTrack(digits, index + 1, path + letter);
    }
  }

  backTrack(digits, 0, '');
  return result;
};

/**
 * 使用迭代方法
 */
function letterCombinationsForEach(digits: string): string[] {
  if(!digits) return [];
  let result: string[] = [''];
  // 电话号码的字母映射
  const map: Map<string, string> = new Map([
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6','mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ]);

  for (const digit of digits) {
    const letters = map.get(digit)!;
    const temp: string[] = [];

    for (const current of result) {
      for (const letter of letters) {
        temp.push(current + letter);
      }
    }
    result = temp;
  }
  return result;
}
// @lc code=end

describe('letterCombinations', () => {
  beforeEach(() => {
    // 重置全局变量
    global.navigator = {} as any;
    global.document = {} as any;
    global.window = {} as any;
  });

  test('should return an empty array when digits is empty', () => {
    expect(letterCombinations('')).toEqual([]);
  });

  test('should return correct combinations for a single digit', () => {
    expect(letterCombinations('2')).toEqual(['a', 'b', 'c']);
  });

  test('should return correct combinations for multiple digits', () => {
    expect(letterCombinations('23')).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
  });
});

