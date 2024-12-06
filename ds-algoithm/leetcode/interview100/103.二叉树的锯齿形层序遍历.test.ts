/*
 * @lc app=leetcode.cn id=103 lang=typescript
 * @lcpr version=20004
 *
 * [103] 二叉树的锯齿形层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/
 *
 * algorithms
 * Medium (59.58%)
 * Likes:    931
 * Dislikes: 0
 * Total Accepted:    415.5K
 * Total Submissions: 696.7K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 * 
 * 示例 1：
 * 
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 * 
 * 示例 2：
 * 
 * 输入：root = [1]
 * 输出：[[1]]
 * 
 * 示例 3：
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 提示：
 * 
 * 树中节点数目在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
 * 
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
 * @returns 
 */
// 示例 1：
//     3
//    / \
//   9  20
//      /  \
//     15   7

// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[20,9],[15,7]]
// 解释：
// 第 0 层：从左向右，[3]
// 第 1 层：从右向左，[20,9]
// 第 2 层：从左向右，[15,7]

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if(!root) return []
  const result: number[][] = []
  const queue: Array<TreeNode | null> = [root]
  let isRight = false

  while (queue.length) {
    const levelSize = queue.length
    const levelRes: number[] = []

    for(let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      levelRes.push(node?.val!)

      if(node?.right) queue.push(node.right)
      if(node?.left) queue.push(node.left)
    }
    result.push(isRight ? levelRes : levelRes.reverse())
    isRight = !isRight
  }
  return result
};

describe('zigzagLevelOrder', () => {
  it('should return empty array for empty tree', () => {
    const root: TreeNode | null = null;
    expect(zigzagLevelOrder(root)).toEqual([]);
  });

  it('should return single node for tree with one node', () => {
    const root: TreeNode = new TreeNode(1);
    expect(zigzagLevelOrder(root)).toEqual([[1]]);
  });

  it('should return correct zigzag order for tree with multiple levels', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(zigzagLevelOrder(root)).toEqual([[1], [3, 2], [4, 5, 6, 7]]);
  });

  it('should return correct zigzag order for tree with zigzag pattern', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(zigzagLevelOrder(root)).toEqual([[1], [3, 2], [4, 5, 6, 7], [9, 8]]);
  });
});

/**
 * DFS
 */
function zigzagLevelOrderDFS(root: TreeNode | null): number[][] {
  if(!root) return []
  const result: number[][] = []

  const dfs = (node: TreeNode | null, level: number):void => {
    if(!node) return;

    if(result.length === level) {
      result[level] = []
    }
    if(level % 2) {
      result[level].push(node.val)
    } else {
      result[level].unshift(node.val)
    }

    dfs(node.right, level + 1)
    dfs(node.left, level + 1)
  }

  dfs(root, 0)
  return result
}


describe('zigzagLevelOrderDFS', () => {
  it('should return empty array for empty tree', () => {
    const root: TreeNode | null = null;
    expect(zigzagLevelOrderDFS(root)).toEqual([]);
  });

  it('should return single node for tree with one node', () => {
    const root: TreeNode = new TreeNode(1);
    expect(zigzagLevelOrderDFS(root)).toEqual([[1]]);
  });

  it('should return correct zigzag order for tree with multiple levels', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(zigzagLevelOrderDFS(root)).toEqual([[1], [3, 2], [4, 5, 6, 7]]);
  });

  it('should return correct zigzag order for tree with zigzag pattern', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(zigzagLevelOrderDFS(root)).toEqual([[1], [3, 2], [4, 5, 6, 7], [9, 8]]);
  });
});
// @lc code=end

