/*
 * @lc app=leetcode.cn id=212 lang=typescript
 * @lcpr version=20004
 *
 * [212] 单词搜索 II
 *
 * https://leetcode.cn/problems/word-search-ii/description/
 *
 * algorithms
 * Hard (43.12%)
 * Likes:    920
 * Dislikes: 0
 * Total Accepted:    117.7K
 * Total Submissions: 273K
 * Testcase Example:  '[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]\n' +
  '["oath","pea","eat","rain"]'
 *
 * 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词 。
 * 
 * 单词必须按照字母顺序，通过 相邻的单元格
 * 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：board =
 * [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
 * words = ["oath","pea","eat","rain"]
 * 输出：["eat","oath"]
 * 
 * 
 * 示例 2：
 * 
 * 输入：board = [["a","b"],["c","d"]], words = ["abcb"]
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] 是一个小写英文字母
 * 1 <= words.length <= 3 * 10^4
 * 1 <= words[i].length <= 10
 * words[i] 由小写英文字母组成
 * words 中的所有字符串互不相同
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start

class TrieNode {
  word: string | null;
  children: Map<string, TrieNode>;
  constructor() {
    this.word = null;
    this.children = new Map();
  }
}
function findWords(board: string[][], words: string[]): string[] {
  // 构建字典树
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if(!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.word = word;
  }

  // 结果
  const result: string[] = [];
  const m = board.length, n = board[0].length;

  const dfs = (row: number, col: number, node: TrieNode) => {
    if (row < 0 || row >= m || col < 0 || col >= n) return;
    // 当前字符
    const char = board[row][col];
    // 当前节点不存在或者当前节点已经访问过
    if (!node.children.has(char) || board[row][col] === '#') return;

    // 当前节点
    const curNode = node.children.get(char)!;
    // 如果找到了单词 将单词加入结果集
    if (curNode.word) {
      result.push(curNode.word);
      curNode.word = null;
    }
    // 标记已访问
    board[row][col] = '#';

    // 上下左右
    dfs(row - 1, col, curNode);
    dfs(row + 1, col, curNode);
    dfs(row, col - 1, curNode);
    dfs(row, col + 1, curNode);

    // 恢复
    board[row][col] = char;
  }
  // 遍历查询
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, root);
    }
  }

  return result;
};
// @lc code=end

describe('findWords', () => {
  test('should return ["eat","oath"] for the first example', () => {
    const board = [
      ["o","a","a","n"],
      ["e","t","a","e"],
      ["i","h","k","r"],
      ["i","f","l","v"]
    ];
    const words = ["oath","pea","eat","rain"];
    const result = findWords(board, words);
    expect(result).toEqual(["oath","eat"]);
  });

  test('should return [] for the second example', () => {
    const board = [["a","b"],["c","d"]];
    const words = ["abcb"];
    const result = findWords(board, words);
    expect(result).toEqual([]);
  });

  test('should return ["abc","def","ghi"] for the custom example', () => {
    const board = [
      ["a","b","c"],
      ["d","e","f"],
      ["g","h","i"]
    ];
    const words = ["abc","def","ghi"];
    const result = findWords(board, words);
    expect(result).toEqual(["abc","def","ghi"]);
  });
});
