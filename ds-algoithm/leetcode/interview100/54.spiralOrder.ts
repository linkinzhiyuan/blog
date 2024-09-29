/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (51.09%)
 * Likes:    1767
 * Dislikes: 0
 * Total Accepted:    598.9K
 * Total Submissions: 1.2M
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 
 * -100 
 * 
 * 
 */

// @lc code=start
/**
 * 设置上下，左右边界，遍历
 * @param {number[][]} matrix
 * @return {number[]}
 */
export const spiralOrder = function(matrix: number[][]): number[] {
  if (!matrix.length) return [];
  const result: number[] = [];
  const row = matrix.length;
  const col = matrix[0].length;
  let top = 0, bottom = row - 1, left = 0, right = col - 1;
  while(top <= bottom && left <= right){
    // 遍历上边界
    for(let i = left; i <= right; i++){
      result.push(matrix[top][i]);
    }
    top += 1;

    // 遍历右边界
    for(let i = top; i <= bottom; i++){
      result.push(matrix[i][right]);
    }
    right -= 1;

    // 遍历下边界
    if(top <= bottom){
      for(let i = right; i >= left; i--){
        result.push(matrix[bottom][i]);
      }
      bottom -= 1;
    }

    // 遍历左边界
    if(left <= right){
      for(let i = bottom; i >= top; i--){
        result.push(matrix[i][left]);
      }
      left += 1;
    }
  }

  return result;
};

/**
 * 递归解法
 * @param {number[][]} matrix
 * @return {number[]}
 */
export const spiralOrderRecursive = function(matrix: number[][]): number[] {
  if (!matrix.length) return [];
  const result: number[] = [];
  dfs(matrix, 0, matrix.length-1, 0,matrix[0].length-1, result);
  return result;
};
function dfs(matrix: number[][], top:number,bottom: number,left:number,right:number, result: number[]) {
  if(top > bottom || left > right) return;
  for(let i = left; i <= right; i++){
    result.push(matrix[top][i]);
  }
  top += 1;

  for(let i = top; i <= bottom; i++){
    result.push(matrix[i][right]);
  }
  right -= 1;

  if(top <= bottom){
    for(let i = right; i >= left; i--){
      result.push(matrix[bottom][i]);
    }
    bottom -= 1;
  }

  if(left <= right){
    for(let i = bottom; i >= top; i--){
      result.push(matrix[i][left]);
    }
    left += 1;
  }
  dfs(matrix, top, bottom, left, right, result);
}
// @lc code=end

