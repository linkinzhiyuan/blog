/*
 * @lc app=leetcode.cn id=77 lang=typescript
 * @lcpr version=20004
 *
 * [77] 组合
 *
 * https://leetcode.cn/problems/combinations/description/
 *
 * algorithms
 * Medium (77.40%)
 * Likes:    1711
 * Dislikes: 0
 * Total Accepted:    812.5K
 * Total Submissions: 1M
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 
 * 你可以按 任何顺序 返回答案。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：n = 4, k = 2
 * 输出：
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 * 
 * 示例 2：
 * 
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 20
 * 1 <= k <= n
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
// 回溯函数 n = 4, k = 2
function combine(n: number, k: number): number[][] {
  const result: number[][] = [];

  const backTrack = (start:number, current: number[]) => {
    if(current.length === k) {
      result.push([...current]);
      return;
    }

    for(let i = start; i <= n; i++) {
      current.push(i);
      backTrack(i + 1, current);
      current.pop();
    }
  }
  backTrack(1, []);
  return result;
};

function combineRefactor(n: number, k: number): number[][] {
  const result: number[][] = [];

  const backTrack = (start:number, current: number[]) => {
    if(current.length + (n - start + 1) < k) return; // 剪枝, 当前剩余的数不够k个
    if(current.length === k) {
      result.push([...current]);
      return;
    }
    const end = n - (k - current.length) + 1; // 剪枝, 当前剩余的数不够k个
    for(let i = start; i <= end; i++) {
      current.push(i);
      backTrack(i + 1, current);
      current.pop();
    }
  }
  backTrack(1, []);
  return result;
}

function combineEach(n: number, k: number): number[][] {
  const result: number[][] = [];
  const nums: number[] = Array(k).fill(0);
  let i = 0;
  
  while (i >= 0) {
      nums[i]++;
      if (nums[i] > n - k + i + 1) {
          i--;
      } else if (i === k - 1) {
          result.push([...nums]);
      } else {
          i++;
          nums[i] = nums[i - 1];
      }
  }
  
  return result;
}

// @lc code=end

describe('combineRefactor function', () => {
  it('should return combinations for valid input', () => {
    const result = combineRefactor(4, 2);
    expect(result).toEqual([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]);
  });

  it('should return single combination for edge case', () => {
    const result = combineRefactor(1, 1);
    expect(result).toEqual([[1]]);
  });

  it('should return empty array when k is greater than n', () => {
    const result = combineRefactor(2, 3);
    expect(result).toEqual([]);
  });
});
