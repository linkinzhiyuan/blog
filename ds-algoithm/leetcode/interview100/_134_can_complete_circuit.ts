/*
 * @lc app=leetcode.cn id=134 lang=javascript
 *
 * [134] 加油站
 *
 * https://leetcode.cn/problems/gas-station/description/
 *
 * algorithms
 * Medium (47.54%)
 * Likes:    1661
 * Dislikes: 0
 * Total Accepted:    396.8K
 * Total Submissions: 838.2K
 * Testcase Example:  '[1,2,3,4,5]\n[3,4,5,1,2]'
 *
 * 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
 * 
 * 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
 * 
 * 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一
 * 的。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * 输出: 3
 * 解释:
 * 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
 * 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
 * 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
 * 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
 * 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
 * 因此，3 可为起始索引。
 * 
 * 示例 2:
 * 
 * 
 * 输入: gas = [2,3,4], cost = [3,4,3]
 * 输出: -1
 * 解释:
 * 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
 * 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
 * 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
 * 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
 * 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
 * 因此，无论怎样，你都不可能绕环路行驶一周。
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * gas.length == n
 * cost.length == n
 * 1 <= n <= 10^5
 * 0 <= gas[i], cost[i] <= 10^4
 * 
 * 
 */

/**
 * @param {number[]} gas - Array of gas stations' fuel quantity
 * @param {number[]} cost - Array of cost of visiting each gas station
 * @return {number} - Index of the starting gas station where you can start the journey
 *                    to travel around the circuit without running out of gas, or -1
 *                    if there is no such starting index.
 */
export const canCompleteCircuit = function(gas: number[], cost: number[]): number {
  /**
   * We maintain two variables:
   * - start: index of the starting gas station
   * - total: total fuel in the tank (including the fuel gained from the current station)
   *
   * We iterate through the gas stations and:
   * - Add the fuel gained from the current station (gas[i] - cost[i]) to total.
   * - If the fuel in the tank after visiting the current station is less than 0,
   *   set start to the index of the next station and reset total to 0.
   *
   * After iterating through all the gas stations, if the total fuel is more than 0,
   * there is a solution and we return start. Otherwise, there is no solution and we return -1.
   */

  let start = 0; // index of the starting gas station
  let total = 0; // total fuel in the tank
  let cur = 0; // fuel in the tank after visiting the current station

  for (let i = 0; i < gas.length; i++) {
    // Add the fuel gained from the current station to total
    cur += gas[i] - cost[i];
    total += gas[i] - cost[i];

    // If the fuel in the tank is less than 0, set start to the index of the next station and reset total to 0
    if (cur < 0) {
      start = i + 1;
      cur = 0;
    }
  }

  // If the total fuel is more than 0, there is a solution and we return start
  // Otherwise, there is no solution and we return -1
  return total >= 0 ? start : -1;
};


export const canCompleteCircuitDp = function(gas: number[], cost: number[]): number {
    const n = gas.length;
    // 相当于图像中的坐标点和最低点
    let sum = 0, minSum = 0;
    let start = 0;
    for (let i = 0; i < n; i++) {
        sum += gas[i] - cost[i];
        if (sum < minSum) {
            // 经过第 i 个站点后，使 sum 到达新低
            // 所以站点 i + 1 就是最低点（起点）
            start = i + 1;
            minSum = sum;
        }
    }
    if (sum < 0) {
        // 总油量小于总的消耗，无解
        return -1;
    }
    // 环形数组特性
    return start === n ? 0 : start;
}
// @lc code=end
