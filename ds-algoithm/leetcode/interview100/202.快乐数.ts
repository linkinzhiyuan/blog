/*
 * @lc app=leetcode.cn id=202 lang=typescript
 * @lcpr version=20003
 *
 * [202] 快乐数
 *
 * https://leetcode.cn/problems/happy-number/description/
 *
 * algorithms
 * Easy (65.13%)
 * Likes:    1627
 * Dislikes: 0
 * Total Accepted:    582K
 * Total Submissions: 893.2K
 * Testcase Example:  '19'
 *
 * 编写一个算法来判断一个数 n 是不是快乐数。
 * 
 * 「快乐数」 定义为：
 * 
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * 如果这个过程 结果为 1，那么这个数就是快乐数。
 * 
 * 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 * 
 * 示例 1：
 * 
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 1^2 + 9^2 = 82
 * 8^2 + 2^2 = 68
 * 6^2 + 8^2 = 100
 * 1^2 + 0^2 + 0^2 = 1
 * 
 * 示例 2：
 * 
 * 输入：n = 2
 * 输出：false
 * 
 * 提示：
 * 
 * 1 <= n <= 2^31 - 1
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 关键点在于如何判断是一个死循环，哈希表记录出现过和的数字则是死循环，就不是快乐数
 * 取余数做 n % 10，二次方做累加
 * 向下取整做 n = Math.floor(n / 10) 作为下一次的 n
 * @param n 
 * @returns boolean
 */
const getNext = (n: number) => {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10; // 取余
    sum += digit * digit;
    n = Math.floor(n / 10); // 向下取整
  }
  return sum;
}

export function isHappy(n: number): boolean {
  const hash = new Set();  
  while (n !== 1 && !hash.has(n)) {
    hash.add(n);
    n = getNext(n);
  }
  return n === 1
};

/**
 * 快慢指针
 * 快指针一次走两步，慢指针一次走一步，快指针会追上慢指针，那么就是死循环
 * @param n
 * @returns boolean
 */
export function isHappyPointer(n: number): boolean {
  let slow = n;
  let fast = getNext(n);
  while (slow !== fast && fast !== 1) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1
}
// @lc code=end


