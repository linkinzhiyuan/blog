/*
 * @lc app=leetcode.cn id=289 lang=typescript
 * @lcpr version=20003
 *
 * [289] 生命游戏
 *
 * https://leetcode.cn/problems/game-of-life/description/
 *
 * algorithms
 * Medium (76.76%)
 * Likes:    641
 * Dislikes: 0
 * Total Accepted:    129.3K
 * Total Submissions: 168.5K
 * Testcase Example:  '[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]'
 *
 * 根据 百度百科 ， 生命游戏 ，简称为 生命 ，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。
 * 
 * 给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： 1 即为 活细胞 （live），或 0 即为
 * 死细胞 （dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：
 * 
 * 
 * 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
 * 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
 * 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
 * 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
 * 
 * 
 * 下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。给你 m x n 网格面板 board
 * 的当前状态，返回下一个状态。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * 输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 * 
 * 
 * 示例 2：
 * 
 * 输入：board = [[1,1],[1,0]]
 * 输出：[[1,1],[1,1]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 25
 * board[i][j] 为 0 或 1
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。
 * 本题中，我们使用二维数组来表示面板。原则上，面板是无限的，但当活细胞侵占了面板边界时会造成问题。你将如何解决这些问题？
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */

/**
 * 1.增加两个状态 2是复活，-1是死亡，0是原死亡，1是原活细胞
 * 2.计算当前细胞的周围有多少个活细胞
 * 3.根据当前细胞的周围有多少个活细胞，判断当前细胞的状态
 * 4.把2 和 -1 去除，重置
 * @param board 
 */
export function gameOfLife(board: number[][]): void {
  const row = board.length; // 行
  const col = board[0].length; // 列
  // 计算当前细胞的周围有多少个活细胞函数(r,c)
  const getCurrentLiveCount = (r: number, c: number): number => {
    let count: number = 0;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(i === 0 && j === 0) continue;
        const newR = r + i;
        const newC = c + j;
        // Math.abs(board[newR][newC]) === 1 是正确的判断原来是活细胞，因为 board[newR][newC] 可能是 -1但它之前是活细胞
        if(newR >= 0 && newR < row && newC >= 0 && newC < col && Math.abs(board[newR][newC]) === 1){
          count++
        }
      }
    }
    return count
  }

  // 两层循环，根据当前细胞的周围有多少个活细胞，判断当前细胞的状态
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const count = getCurrentLiveCount(i, j);
      if (board[i][j] === 1) {
        if (count < 2 || count > 3) {
          board[i][j] = -1;
        }
      } else {
        if (count === 3) {
          board[i][j] = 2;
        }
      }
    }
  }

  // 更新状态
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 1;
      } else if (board[i][j] === -1) {
        board[i][j] = 0;
      }
    }
  }

};
// @lc code=end



/*
// @lcpr case=start
// [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,1],[1,0]]\n
// @lcpr case=end

 */

