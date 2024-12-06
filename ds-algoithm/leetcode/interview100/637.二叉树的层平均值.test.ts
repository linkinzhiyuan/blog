/*
 * @lc app=leetcode.cn id=637 lang=typescript
 * @lcpr version=20004
 *
 * [637] 二叉树的层平均值
 *
 * https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/
 *
 * algorithms
 * Easy (71.31%)
 * Likes:    507
 * Dislikes: 0
 * Total Accepted:    230.7K
 * Total Submissions: 323.2K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10^-5 以内的答案可以被接受。
 * 
 * 示例 1：
 * 
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[3.00000,14.50000,11.00000]
 * 解释：第 0 层的平均值为 3,第 1 层的平均值为 14.5,第 2 层的平均值为 11 。
 * 因此返回 [3, 14.5, 11] 。
 * 
 * 示例 2:
 * 
 * 输入：root = [3,9,20,15,7]
 * 输出：[3.00000,14.50000,11.00000]
 * 
 * 提示：
 * 
 * 树中节点数量在 [1, 10^4] 范围内
 * -2^31 <= Node.val <= 2^31 - 1
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for a binary tree node.
 */

export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

/**
 * BFS
 * @param root 
 * @return number[]
 */
function averageOfLevels(root: TreeNode | null): number[] {
  if(!root) return []
  const result: Array<number> = []
  const queue: Array<TreeNode> = [root]

  while (queue.length) {
    const levelSize = queue.length
    let sum = 0
    for(let i = 0; i < levelSize; i++) {
      const node = queue.shift()!
      sum += node.val;
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }
    result.push(Number((sum/levelSize).toFixed(5)))
  }
  return result
};

/**
 * DFS: 两个数组，一个是每层的总和，一个是每层的个数
 */
function averageOfLevelsDFS(root: TreeNode | null): number[] {
  if(!root) return []
  const sums: Array<number> = []
  const counts: Array<number> = []

  const dfs = (node: TreeNode | null, level: number):void => {
    if(!node) return;

    if(counts.length === level) {
      sums[level] = 0
      counts[level] = 0
    }

    sums[level] += node.val
    counts[level] ++

    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }

  dfs(root, 0)
  return sums.map((item: number,idx: number) => Number((item / counts[idx]).toFixed(5)))
}
// @lc code=end
describe('averageOfLevels', () => {
  it('should return empty array for empty tree', () => {
    expect(averageOfLevels(null)).toEqual([]);
  });

  it('should return single level tree average', () => {
    const root = new TreeNode(1);
    expect(averageOfLevels(root)).toEqual([1]);
  });

  it('should return average of multiple levels tree', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    // root.left.left = new TreeNode(3);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    expect(averageOfLevels(root)).toEqual([3.00000,14.50000,11.00000]);
  });

  it('should return average of multiple levels tree with even number of nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.left.left = new TreeNode(15);
    root.left.right = new TreeNode(7);
    // root.right.left = new TreeNode(6);
    // root.right.right = new TreeNode(7);
    expect(averageOfLevels(root)).toEqual([3.00000,14.50000,11.00000]);
  });
});


describe('averageOfLevelsDFS', () => {
  it('should return empty array for empty tree', () => {
    expect(averageOfLevelsDFS(null)).toEqual([]);
  });

  it('should return single level tree average', () => {
    const root = new TreeNode(1);
    expect(averageOfLevelsDFS(root)).toEqual([1]);
  });

  it('should return average of multiple levels tree', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    // root.left.left = new TreeNode(3);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    expect(averageOfLevelsDFS(root)).toEqual([3.00000,14.50000,11.00000]);
  });

  it('should return average of multiple levels tree with even number of nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.left.left = new TreeNode(15);
    root.left.right = new TreeNode(7);
    // root.right.left = new TreeNode(6);
    // root.right.right = new TreeNode(7);
    expect(averageOfLevelsDFS(root)).toEqual([3.00000,14.50000,11.00000]);
  });
});
