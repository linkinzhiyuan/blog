/*
 * @lc app=leetcode.cn id=104 lang=typescript
 * @lcpr version=20003
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (78.08%)
 * Likes:    1896
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 1.9M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树 root ，返回其最大深度。
 * 
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 示例 1：
 * 
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：3
 * 
 * 示例 2：
 * 
 * 输入：root = [1,null,2]
 * 输出：2
 * 
 * 提示：
 * 
 * 树中节点的数量在 [0, 10^4] 区间内。
 * -100 <= Node.val <= 100
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}
/**
 * Returns the maximum depth of a given binary tree.
 *
 * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * @param root - The root of the binary tree.
 * @returns The maximum depth of the binary tree, or 0 if the tree is empty.
 */
function maxDepthDFS(root: TreeNode | null): number {
  if (!root) return 0;
  return Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right)) + 1;
};

function maxDepthBFS(root: TreeNode | null): number {
  if (!root) return 0;
  let depth = 0;
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    depth += 1;
  }

  return depth;
}

// @lc code=end
describe('maxDepthDFS function', () => {
  it('should return 0 for empty tree', () => {
    expect(maxDepthDFS(null)).toBe(0);
  });

  it('should return 1 for tree with one node', () => {
    const root = new TreeNode(1);
    expect(maxDepthDFS(root)).toBe(1);
  });

  it('should return correct depth for balanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    expect(maxDepthDFS(root)).toBe(3);
  });

  it('should return correct depth for unbalanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    expect(maxDepthDFS(root)).toBe(4);
  });

  it('should return correct depth for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(maxDepthDFS(root)).toBe(3);
  });

  it('should return correct depth for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(maxDepthDFS(root)).toBe(3);
  });
});

describe('maxDepthBFS function', () => {
  it('should return 0 for empty tree', () => {
    expect(maxDepthBFS(null)).toBe(0);
  });

  it('should return 1 for tree with one node', () => {
    const root = new TreeNode(1);
    expect(maxDepthBFS(root)).toBe(1);
  });

  it('should return correct depth for balanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    expect(maxDepthBFS(root)).toBe(3);
  });

  it('should return correct depth for unbalanced tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    expect(maxDepthBFS(root)).toBe(4);
  });

  it('should return correct depth for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(maxDepthBFS(root)).toBe(3);
  });

  it('should return correct depth for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(maxDepthBFS(root)).toBe(3);
  });
});
