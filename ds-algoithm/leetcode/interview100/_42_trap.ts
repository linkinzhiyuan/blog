/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode.cn/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (63.72%)
 * Likes:    5268
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 1.6M
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
 * [0,0,1,1,2,2,0,0,1,0,0]
 * 
 * 示例 2：
 * 
 * 
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 * 
 *  
 * 
 * 
 * 提示：
 * 
 * 
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 * 
 * 
 */

// @lc code=start
// 双指针
export const trapDoublePointer = (height: number[]): number => {
    const len = height.length
    let left = 0, right = len - 1;
    let leftMax = 0, rightMax = 0; // 记录左右两侧的最大值

    let water = 0 // 雨水总量

    while(left < right) {
        // 左侧小于右侧，向右移动，更新最大值
        if(height[left] < height[right]) {
            if(height[left] >= leftMax) {
                leftMax = height[left]
            } else {
                water += leftMax - height[left]
            }
            left++
        } else {
            // 右侧小于左侧，向左移动，更新最大值
            if(height[right] >= rightMax) {
                rightMax = height[right]
            } else {
                water += rightMax - height[right]
            }
            right--
        }
    }

    return water
}

export const trapDynamicProgramming = (height: number[]): number => {
    const len = height.length
    let leftMaxArr = new Array(len).fill(0), rightMaxArr = new Array(len).fill(0)
    let water = 0;

    leftMaxArr[0] = height[0]
    for(let i = 1; i < len; i++) {
        leftMaxArr[i] = Math.max(height[i], leftMaxArr[i - 1])
    }

    rightMaxArr[len - 1] = height[len - 1]
    for(let i = len - 2; i >= 0; i--) {
        rightMaxArr[i] = Math.max(height[i], rightMaxArr[i + 1])
    }

    for(let i = 0; i < len; i++) {
        water += Math.min(leftMaxArr[i], rightMaxArr[i]) - height[i]
    }

    return water
}

// @lc code=end

