/*
 * @lc app=leetcode.cn id=200 lang=typescript
 * @lcpr version=20004
 *
 * [200] 岛屿数量
 *
 * https://leetcode.cn/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (61.59%)
 * Likes:    2648
 * Dislikes: 0
 * Total Accepted:    961.5K
 * Total Submissions: 1.6M
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 
 * 此外，你可以假设该网格的四条边均被水包围。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：grid = [
 * ⁠ ["1","1","1","1","0"],
 * ⁠ ["1","1","0","1","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","0","0","0"]
 * ]
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 输入：grid = [
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","1","0","0"],
 * ⁠ ["0","0","0","1","1"]
 * ]
 * 输出：3
 * 
 * 提示：
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 300
 * grid[i][j] 的值为 '0' 或 '1'
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 深度遍历 DFS
 * @param grid 
 */
function numIslands(grid: string[][]): number {
  if(!grid.length) return 0;
  const cols = grid.length
  const rows = grid[0].length
  
  const dfs = (col: number, row: number): void => {
    if(col < 0 || col >= cols || row < 0 || row >= rows || grid[col][row] === '0' ) return;

    grid[col][row] = '0'

    dfs(col, row - 1)
    dfs(col, row + 1)
    dfs(col - 1, row)
    dfs(col + 1, row)
  }

  let count = 0
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      if(grid[i][j] === '1') {
        count++
        dfs(i,j)
      }
    }
  }
  return count
};


describe('numIslands', () => {
  it('should return 0 for an empty grid', () => {
    const grid: string[][] = [];
    expect(numIslands(grid)).toBe(0);
  });

  it('should return 0 for a grid with no islands', () => {
    const grid: string[][] = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    expect(numIslands(grid)).toBe(0);
  });

  it('should return 1 for a grid with one island', () => {
    const grid: string[][] = [
      ['1', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('should return 2 for a grid with multiple islands', () => {
    const grid: string[][] = [
      ['1', '0', '1'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    expect(numIslands(grid)).toBe(2);
  });

  it('should return 1 for a grid with islands connected horizontally', () => {
    const grid: string[][] = [
      ['1', '1', '1'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('should return 1 for a grid with islands connected vertically', () => {
    const grid: string[][] = [
      ['1', '0', '0'],
      ['1', '0', '0'],
      ['1', '0', '0'],
    ];
    expect(numIslands(grid)).toBe(1);
  });

  it('should not count islands connected diagonally as connected', () => {
    const grid: string[][] = [
      ['1', '0', '1'],
      ['0', '1', '0'],
      ['1', '0', '1'],
    ];
    expect(numIslands(grid)).toBe(5);
  });
});
// @lc code=end


