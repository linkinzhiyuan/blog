/*
 * @lc app=leetcode.cn id=199 lang=typescript
 * @lcpr version=20004
 *
 * [199] 二叉树的右视图
 *
 * https://leetcode.cn/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (68.22%)
 * Likes:    1145
 * Dislikes: 0
 * Total Accepted:    513.8K
 * Total Submissions: 751.3K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3,null,5,null,4]
 *     1            <---
   / \
  2   3         <---
   \   \
    5   4       <---
 * 输出：[1,3,4]
 * 
 * 解释：
 * 示例 2：
 * 输入：root = [1,2,3,4,null,null,null,5]
 *     1            <---
      / \
     2   3         <---
    /   
   4         <---
  /
 5       <---
 * 输出：[1,3,4,5]
 * 
 * 解释：
 * 示例 3：
 * 输入：root = [1,null,3]
 * 
 * 输出：[1,3]
 * 
 * 示例 4：
 * 输入：root = []
 * 
 * 输出：[]
 * 
 * 提示:
 * 
 * 二叉树的节点个数的范围是 [0,100]
 * -100 <= Node.val <= 100 
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
 */
function rightSideView(root: TreeNode | null): number[] {
  console.time('rightSideView')
  if(!root) return []
  const queue: Array<TreeNode> = [root]
  const result: Array<number> = []

  while (queue.length) {
    const levelSize = queue.length

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      if( i === levelSize - 1) {
        result.push(node?.val!)
      }

      if(node?.left) queue.push(node.left)
      if(node?.right) queue.push(node.right)
    }
  }
  console.timeEnd('rightSideView')
  return result
};

/**
 * DFS: 每一层第一个访问的节点就是，优先从右子树开始
 */
function rightSideViewDFS(root: TreeNode | null): Array<number> {
  if(!root) return []
  const result: Array<number> = []
  const dfs = (node: TreeNode | null, level: number): void => {
    if(!node) return;

    // 确保每一层第一个被方位的节点就是右侧能看到的
    if(result.length === level) {
      result.push(node.val)
    }

    // 优先右子树
    dfs(node.right, level + 1)
    dfs(node.left, level + 1)
  }

  dfs(root, 0)
  return result
}
// @lc code=end


describe('rightSideView', () => {
  it('should return empty array for empty tree', () => {
    expect(rightSideView(null)).toEqual([]);
  });

  it('should return single node value for tree with one node', () => {
    const root = new TreeNode(1);
    expect(rightSideView(root)).toEqual([1]);
  });

  it('should return right side view for tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(4);
    expect(rightSideView(root)).toEqual([1, 3, 4]);
  });

  it('should return right side view for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(rightSideView(root)).toEqual([1, 2, 3]);
  });

  it('should return right side view for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(rightSideView(root)).toEqual([1, 2, 3]);
  });

  it('leetcode case 2', () => {
    // [1,2,3,4,null,null,null,5]
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.left.left = new TreeNode(5);
    expect(rightSideView(root)).toEqual([1, 3, 4, 5]);
  });
});


describe('rightSideViewDFS', () => {
  it('should return empty array for empty tree', () => {
    expect(rightSideViewDFS(null)).toEqual([]);
  });

  it('should return single node value for tree with one node', () => {
    const root = new TreeNode(1);
    expect(rightSideViewDFS(root)).toEqual([1]);
  });

  it('should return right side view for tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(4);
    expect(rightSideViewDFS(root)).toEqual([1, 3, 4]);
  });

  it('should return right side view for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(rightSideViewDFS(root)).toEqual([1, 2, 3]);
  });

  it('should return right side view for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(rightSideViewDFS(root)).toEqual([1, 2, 3]);
  });

  it('leetcode case 2', () => {
    // [1,2,3,4,null,null,null,5]
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.left.left = new TreeNode(5);
    expect(rightSideViewDFS(root)).toEqual([1, 3, 4, 5]);
  });
});
