/*
 * @lc app=leetcode.cn id=130 lang=typescript
 * @lcpr version=20004
 *
 * [130] 被围绕的区域
 *
 * https://leetcode.cn/problems/surrounded-regions/description/
 *
 * algorithms
 * Medium (46.81%)
 * Likes:    1169
 * Dislikes: 0
 * Total Accepted:    310.6K
 * Total Submissions: 663.1K
 * Testcase Example:  '[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]'
 *
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' 组成，捕获 所有 被围绕的区域：
 * 
 * 
 * 连接：一个单元格与水平或垂直方向上相邻的单元格连接。
 * 区域：连接所有 'O' 的单元格来形成一个区域。
 * 围绕：如果您可以用 'X' 单元格 连接这个区域，并且区域中没有任何单元格位于 board 边缘，则该区域被 'X' 单元格围绕。
 * 
 * 
 * 通过将输入矩阵 board 中的所有 'O' 替换为 'X' 来 捕获被围绕的区域。
 * 
 * 示例 1：
 * 
 * 输入：board =
 * [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 
 * 解释：
 * 
 * 在上图中，底部的区域没有被捕获，因为它在 board 的边缘并且不能被围绕。
 * 
 * 示例 2：
 * 
 * 输入：board = [["X"]]
 * 
 * 输出：[["X"]]
 * 
 * 提示：
 * 
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 200
 * board[i][j] 为 'X' 或 'O'
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Do not return anything, modify board in-place instead.
 * dfs 深层递归，先把边缘的'0'替换成无关字符'*'，再遍历整个矩阵，将未标记的‘0’替换成’X‘，并将’*‘标记为’0‘
 */
function solve(board: string[][]): void {
  const rows = board.length
  if(!rows) return;
  const cols = board[0].length

  const dfs = (row: number, col: number):void => {
    if(row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== 'O') return;

    board[row][col] = '*'

    dfs(row - 1, col) // 上
    dfs(row + 1, col) // 下
    dfs(row, col + 1) // 右
    dfs(row, col - 1) // 左
  }

  // 先处理边界
  for(let i = 0; i < rows; i++) {
    dfs(i, 0)
    dfs(i, cols - 1)
  }
  // 先处理边界
  for(let j = 0; j < cols; j++) {
    dfs(0, j)
    dfs(rows - 1, j)
  }

  // 遍历整个矩阵，修改值
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (board[i][j] === 'O') {
            board[i][j] = 'X'; // 被包围的 'O' 替换为 'X'
        } else if (board[i][j] === '*') {
            board[i][j] = 'O'; // 恢复未被包围的 'O'
        }
    }
  }
};


describe('solve function', () => {
  it('should handle empty board', () => {
    const board: string[][] = [];
    solve(board);
    expect(board).toEqual([]);
  });

  it('should handle board with no O cells', () => {
    const board: string[][] = [
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X']
    ];
    solve(board);
    expect(board).toEqual([
      ['X', 'X', 'X'],
      ['X', 'X', 'X'],
      ['X', 'X', 'X']
    ]);
  });

  it('should handle board with all O cells', () => {
    const board: string[][] = [
      ['O', 'O', 'O'],
      ['O', 'O', 'O'],
      ['O', 'O', 'O']
    ];
    solve(board);
    expect(board).toEqual([
      ['O', 'O', 'O'],
      ['O', 'O', 'O'],
      ['O', 'O', 'O']
    ]);
  });

  it('should handle board with O cells surrounded by X cells', () => {
    const board: string[][] = [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X']
    ];
    solve(board);
    expect(board).toEqual([
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'X', 'X']
    ]);
  });

  it('should handle board with O cells not surrounded by X cells', () => {
    const board: string[][] = [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'O'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X']
    ];
    solve(board);
    expect(board).toEqual([
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'O'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X']
    ]);
  });

  it('should handle board with multiple regions of O cells', () => {
    const board: string[][] = [
      ['X', 'O', 'X', 'O'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['O', 'X', 'X', 'O']
    ];
    solve(board);
    expect(board).toEqual([
      ['X', 'O', 'X', 'O'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['O', 'X', 'X', 'O']
    ]);
  });
});

// /**
//  * 广度优先搜索
//  * @param board 
//  */
// function solveBFS(board: string[][]):void {
//   const rows = board.length;
//   if (rows === 0) return;
//   const cols = board[0].length;

//   // 广度优先搜索函数
//     function bfs(row: number, col: number): void {
//         const queue: [number, number][] = [];
//         queue.push([row, col]);
//         board[row][col] = '#'; // 标记为特殊字符

//         while (queue.length > 0) {
//             const [curRow, curCol] = queue.shift()!;

//             // 遍历四个方向
//             for (const [dRow, dCol] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
//                 const newRow = curRow + dRow;
//                 const newCol = curCol + dCol;

//                 // 如果新位置在网格范围内，且是 'O'
//                 if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === 'O') {
//                     board[newRow][newCol] = '#'; // 标记为特殊字符
//                     queue.push([newRow, newCol]);
//                 }
//             }
//         }
//     }

//     // 遍历边界，标记与边界相连的 'O'
//     for (let i = 0; i < rows; i++) {
//         bfs(i, 0); // 左边界
//         bfs(i, cols - 1); // 右边界
//     }
//     for (let j = 0; j < cols; j++) {
//         bfs(0, j); // 上边界
//         bfs(rows - 1, j); // 下边界
//     }

//     // 遍历整个矩阵，修改值
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (board[i][j] === 'O') {
//                 board[i][j] = 'X'; // 被包围的 'O' 替换为 'X'
//             } else if (board[i][j] === '#') {
//                 board[i][j] = 'O'; // 恢复未被包围的 'O'
//             }
//         }
//     }
// }


// describe('solveBFS function', () => {
//   it('should handle empty board', () => {
//     const board: string[][] = [];
//     solveBFS(board);
//     expect(board).toEqual([]);
//   });

//   it('should handle board with no O cells', () => {
//     const board: string[][] = [
//       ['X', 'X', 'X'],
//       ['X', 'X', 'X'],
//       ['X', 'X', 'X']
//     ];
//     solveBFS(board);
//     expect(board).toEqual([
//       ['X', 'X', 'X'],
//       ['X', 'X', 'X'],
//       ['X', 'X', 'X']
//     ]);
//   });

//   it('should handle board with all O cells', () => {
//     const board: string[][] = [
//       ['O', 'O', 'O'],
//       ['O', 'O', 'O'],
//       ['O', 'O', 'O']
//     ];
//     solveBFS(board);
//     expect(board).toEqual([
//       ['O', 'O', 'O'],
//       ['O', 'O', 'O'],
//       ['O', 'O', 'O']
//     ]);
//   });

//   it('should handle board with O cells surrounded by X cells', () => {
//     const board: string[][] = [
//       ['X', 'X', 'X', 'X'],
//       ['X', 'O', 'O', 'X'],
//       ['X', 'X', 'O', 'X'],
//       ['X', 'O', 'X', 'X']
//     ];
//     solveBFS(board);
//     expect(board).toEqual([
//       ['X', 'X', 'X', 'X'],
//       ['X', 'X', 'X', 'X'],
//       ['X', 'X', 'X', 'X'],
//       ['X', 'O', 'X', 'X']
//     ]);
//   });

//   it('should handle board with O cells not surrounded by X cells', () => {
//     const board: string[][] = [
//       ['X', 'X', 'X', 'X'],
//       ['X', 'O', 'O', 'O'],
//       ['X', 'X', 'O', 'X'],
//       ['X', 'O', 'X', 'X']
//     ];
//     solveBFS(board);
//     expect(board).toEqual([
//       ['X', 'X', 'X', 'X'],
//       ['X', 'O', 'O', 'O'],
//       ['X', 'X', 'O', 'X'],
//       ['X', 'O', 'X', 'X']
//     ]);
//   });

//   it('should handle board with multiple regions of O cells', () => {
//     const board: string[][] = [
//       ['X', 'O', 'X', 'O'],
//       ['X', 'O', 'O', 'X'],
//       ['X', 'X', 'O', 'X'],
//       ['O', 'X', 'X', 'O']
//     ];
//     solve(board);
//     expect(board).toEqual([
//       ['X', 'O', 'X', 'O'],
//       ['X', 'O', 'O', 'X'],
//       ['X', 'X', 'O', 'X'],
//       ['O', 'X', 'X', 'O']
//     ]);
//   });
// });

// @lc code=end


