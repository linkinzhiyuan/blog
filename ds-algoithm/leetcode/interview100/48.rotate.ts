/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 *
 * https://leetcode.cn/problems/rotate-image/description/
 *
 * algorithms
 * Medium (76.38%)
 * Likes:    1942
 * Dislikes: 0
 * Total Accepted:    643.2K
 * Total Submissions: 834.7K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 * 示例 2：
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * 提示：
 * 
 * 
 * n == matrix.length == matrix[i].length
 * 1 <= n <= 20
 * -1000 <= matrix[i][j] <= 1000
 */

// @lc code=start
/**
 * 原来的矩阵，将矩阵的x行翻转，将变成(n-1)-x列,即第一行成为最后一列，第二行成为倒数第二列，最后一行成为第一列
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
export const rotateMatrixImage = function(matrix: number[][]): void {
  const n = matrix.length;
  // 注意浅拷贝的问题
  const _matrix = matrix.map(row => [...row]);;
  for(let row = 0; row < n; row++){
    for(let col = 0; col < n; col++){
      matrix[col][n - 1 - row] = _matrix[row][col];
    }
  }
};

/**
 * 沿正对角线交换位置，然后再反转每一行
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
export const rotateMatrixReverse = function(matrix: number[][]): void {
  const n = matrix.length;
  for(let i = 0; i < n; i++){
    for(let j = i; j < n; j++){
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for(let i = 0; i < n; i++){
    matrix[i].reverse();
  }
};
// @lc code=end

