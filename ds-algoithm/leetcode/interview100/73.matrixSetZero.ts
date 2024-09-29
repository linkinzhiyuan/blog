/*
 * @lc app=leetcode.cn id=73 lang=javascript
 *
 * [73] 矩阵置零
 *
 * https://leetcode.cn/problems/set-matrix-zeroes/description/
 *
 * algorithms
 * Medium (67.07%)
 * Likes:    1105
 * Dislikes: 0
 * Total Accepted:    431.4K
 * Total Submissions: 631.6K
 * Testcase Example:  '[[1,1,1],[1,0,1],[1,1,1]]'
 *
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：[[1,0,1],[0,0,0],[1,0,1]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == matrix.length
 * n == matrix[0].length
 * 1 <= m, n <= 200
 * -2^31 <= matrix[i][j] <= 2^31 - 1
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 你能想出一个仅使用常量空间的解决方案吗？
 * 
 * 
 */

// @lc code=start
/**
 * 找出0的位置，记录坐标，然后将对应的行和列全部置为0
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
export const setZeroes = function(matrix: number[][]): void {
  if(matrix.length === 0 || matrix[0].length === 0) return;
  const row = matrix.length, col = matrix[0].length;
  const zeroRow: number[] = [], zeroCol: number[] = [];
  for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
      if(matrix[i][j] === 0){
        zeroRow.push(i);
        zeroCol.push(j);
      }
    }
  }
  for(let i = 0; i < zeroRow.length; i++){
    matrix[zeroRow[i]] = matrix[zeroRow[i]].map(() => 0);
  }
  for(let i = 0; i < zeroCol.length; i++){
    for(let j = 0; j < row; j++){
      matrix[j][zeroCol[i]] = 0;
    }
  }
};

/**
 * 时间复杂度：O(mn)
 * 空间复杂度：O(1)
 * 原地置零，不需要额外空间
 * 判断第一行和第一列是否需要置零，如果需要，将第一行和第一列记录为flag为true,最后再处理
 * 循环其他的元素，如果需要置零，把第一行和第一列置零记录下来
 * 循环第一行和第一列元素，存在0，则当前行或列全部置为0
 * 看第一行第一列的flag是否为true，是则置零
 * param {number[][]} matrix
 * return {void} Do not return anything, modify matrix in-place instead.
 */
export const setZeroesConstant = function(matrix: number[][]): void {
  if(matrix.length === 0 || matrix[0].length === 0) return;
  const row = matrix.length, col = matrix[0].length;
  let firstRowZero = false, firstColZero = false;
  // 找出第一行和第一列是否需要置零
  for(let i = 0; i < row; i++){
    if(matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }
  for(let i = 0; i < col; i++){
    if(matrix[0][i] === 0) {
      firstRowZero = true;
      break;
    }
  }

  // 处理其他元素，如果需要置零，把第一行和第一列置零位置记录下来
  for(let i = 1; i < row; i++){
    for(let j= 1; j < col; j++){
      if(matrix[i][j] === 0){
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // 循环第一行和第一列元素，存在0，则当前行或列全部置为0
  for(let i = 1; i < row; i++){
    for(let j = 1; j < col; j++){
      if(matrix[i][0] === 0 || matrix[0][j] === 0){
        matrix[i][j] = 0;
      }
    }
  }

  // 看第一行第一列的flag是否为true，是则置零
  if(firstRowZero){
    for(let i = 0; i < col; i++){
      matrix[0][i] = 0;
    }
  }
  if(firstColZero){
    for(let i = 0; i < row; i++){
      matrix[i][0] = 0;
    }
  }
}
// @lc code=end

