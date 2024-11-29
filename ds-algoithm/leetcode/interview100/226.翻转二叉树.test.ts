/*
 * @lc app=leetcode.cn id=226 lang=typescript
 * @lcpr version=20003
 *
 * [226] 翻转二叉树
 *
 * https://leetcode.cn/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (81.20%)
 * Likes:    1889
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 1.3M
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 * 
 * 示例 1：
 * 
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
 * 
 * 示例 2：
 * 
 * 输入：root = [2,1,3]
 * 输出：[2,3,1]
 * 
 * 示例 3：
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 提示：
 * 
 * 树中节点数目范围在 [0, 100] 内
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
 * Given the root of a binary tree, invert the tree, and return its root.
 * 
 * The function works by performing a depth-first search on the tree, 
 * swapping the left and right children of each node as it goes.
 * 
 * @param root - the root of the binary tree to invert
 * @returns the root of the inverted binary tree
 */
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null
  }
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  root.left = right
  root.right = left
  
  return root
};

/**
 * Given the root of a binary tree, invert the tree, and return its root.
 * 
 * This function uses a breadth-first search to traverse the tree, 
 * swapping the left and right children of each node as it goes.
 * 
 * @param root - the root of the binary tree to invert
 * @returns the root of the inverted binary tree
 */
function invertTreeBFS(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null
  }

  const queue = [root]
  while (queue.length) {
    const node = queue.shift()!
    const left = node?.left
    const right = node?.right
    node.left = right
    node.right = left

    if(left) {
      queue.push(left)
    }

    if(right) {
      queue.push(right)
    }
  }

  return root
}

// @lc code=end


describe('invertTree function', () => {
  it('should return null for empty tree', () => {
    expect(invertTree(null)).toBeNull();
  });

  it('should return the same tree for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(invertTree(root)).toBe(root);
  });

  it('should invert a tree with two nodes (one left child)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    const inverted = invertTree(root);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.left).toBeNull();
  });

  it('should invert a tree with two nodes (one right child)', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    const inverted = invertTree(root);
    expect(inverted?.left).not.toBeNull();
    expect(inverted?.left!.val).toBe(2);
    expect(inverted?.right).toBeNull();
  });

  it('should invert a balanced tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    const inverted = invertTree(root);
    expect(inverted?.left).not.toBeNull();
    expect(inverted?.left!.val).toBe(3);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.left!.left).not.toBeNull();
    expect(inverted?.left!.left!.val).toBe(7);
    expect(inverted?.left!.right).not.toBeNull();
    expect(inverted?.left!.right!.val).toBe(6);
    expect(inverted?.right!.left).not.toBeNull();
    expect(inverted?.right!.left!.val).toBe(5);
    expect(inverted?.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.val).toBe(4);
  });

  it('should invert an unbalanced tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    const inverted = invertTree(root);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.val).toBe(3);
    expect(inverted?.right!.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.right!.val).toBe(4);
  });
});

describe('invertTreeBFS function', () => {
  it('should return null for empty tree', () => {
    expect(invertTreeBFS(null)).toBeNull();
  });

  it('should return the same tree for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(invertTreeBFS(root)).toBe(root);
  });

  it('should invert a tree with two nodes (one left child)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    const inverted = invertTreeBFS(root);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.left).toBeNull();
  });

  it('should invert a tree with two nodes (one right child)', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    const inverted = invertTreeBFS(root);
    expect(inverted?.left).not.toBeNull();
    expect(inverted?.left!.val).toBe(2);
    expect(inverted?.right).toBeNull();
  });

  it('should invert a balanced tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    const inverted = invertTreeBFS(root);
    expect(inverted?.left).not.toBeNull();
    expect(inverted?.left!.val).toBe(3);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.left!.left).not.toBeNull();
    expect(inverted?.left!.left!.val).toBe(7);
    expect(inverted?.left!.right).not.toBeNull();
    expect(inverted?.left!.right!.val).toBe(6);
    expect(inverted?.right!.left).not.toBeNull();
    expect(inverted?.right!.left!.val).toBe(5);
    expect(inverted?.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.val).toBe(4);
  });

  it('should invert an unbalanced tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    const inverted = invertTreeBFS(root);
    expect(inverted?.right).not.toBeNull();
    expect(inverted?.right!.val).toBe(2);
    expect(inverted?.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.val).toBe(3);
    expect(inverted?.right!.right!.right).not.toBeNull();
    expect(inverted?.right!.right!.right!.val).toBe(4);
  });
});
