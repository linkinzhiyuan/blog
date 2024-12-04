/*
 * @lc app=leetcode.cn id=129 lang=typescript
 * @lcpr version=20004
 *
 * [129] 求根节点到叶节点数字之和
 *
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/description/
 *
 * algorithms
 * Medium (71.09%)
 * Likes:    773
 * Dislikes: 0
 * Total Accepted:    303.4K
 * Total Submissions: 426.4K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 
 * 每条从根节点到叶节点的路径都代表一个数字：
 * 
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 
 * 计算从根节点到叶节点生成的 所有数字之和 。
 * 
 * 叶节点 是指没有子节点的节点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3]
 * 输出：25
 * 解释：
 * 从根到叶子节点路径 1->2 代表数字 12
 * 从根到叶子节点路径 1->3 代表数字 13
 * 因此，数字总和 = 12 + 13 = 25
 * 
 * 示例 2：
 * 
 * 输入：root = [4,9,0,5,1]
 * 输出：1026
 * 解释：
 * 从根到叶子节点路径 4->9->5 代表数字 495
 * 从根到叶子节点路径 4->9->1 代表数字 491
 * 从根到叶子节点路径 4->0 代表数字 40
 * 因此，数字总和 = 495 + 491 + 40 = 1026
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点的数目在范围 [1, 1000] 内
 * 0 <= Node.val <= 9
 * 树的深度不超过 10
 * 
 * 
 * 
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
function sumNumbers(root: TreeNode | null): number {
  if(!root) return 0

  let sum = 0;
  const numQueue: Array<number> = [root.val]
  const nodeQueue: Array<TreeNode> = [root]

  while(nodeQueue.length) {
    const current = nodeQueue.shift()
    const num = numQueue.shift()!

    if(!current?.left && !current?.right) {
      sum += num;
      continue;
    }

    if(current?.left) {
      nodeQueue.push(current.left)
      numQueue.push(num * 10 + current.left.val)
    }

    if(current?.right) {
      nodeQueue.push(current.right)
      numQueue.push(num * 10 + current.right.val)
    }
  }

  return sum
};

/**
 * DFS: 计算当前节点开始的路径和
 * 
 */
function sumNumbersDFS(root: TreeNode | null): number {
  if(!root) return 0
  const dfs = (node: TreeNode | null, num: number): number => {
    if(!node) return 0 // 节点为空返回空

    const currentSum = num * 10 + node.val
    if(!node?.left && !node.right) {
      return currentSum
    }

    return dfs(node.left, currentSum!) + dfs(node.right, currentSum)

  }
  return dfs(root, 0)
}
// @lc code=end

describe('sumNumbers', () => {
  it('should return 0 for an empty tree', () => {
    expect(sumNumbers(null)).toBe(0);
  });

  it('should return the value of the single node for a single node tree', () => {
    const root = new TreeNode(1);
    expect(sumNumbers(root)).toBe(1);
  });

  it('should return the sum of the left subtree for a tree with only left child', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    expect(sumNumbers(root)).toBe(12);
  });

  it('should return the sum of the right subtree for a tree with only right child', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    expect(sumNumbers(root)).toBe(12);
  });

  it('should return the sum of both left and right subtrees for a tree with both children', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(sumNumbers(root)).toBe(25); // 12 + 13
  });

  it('should return the sum of all numbers in the tree for a tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    expect(sumNumbers(root)).toBe(262); // 124 + 125 + 13
  });
});

describe('sumNumbersDFS', () => {
  it('should return 0 for an empty tree', () => {
    expect(sumNumbersDFS(null)).toBe(0);
  });

  it('should return the value of the single node for a single node tree', () => {
    const root = new TreeNode(1);
    expect(sumNumbersDFS(root)).toBe(1);
  });

  it('should return the sum of the left subtree for a tree with only left child', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    expect(sumNumbersDFS(root)).toBe(12);
  });

  it('should return the sum of the right subtree for a tree with only right child', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    expect(sumNumbersDFS(root)).toBe(12);
  });

  it('should return the sum of both left and right subtrees for a tree with both children', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(sumNumbersDFS(root)).toBe(25); // 12 + 13
  });

  it('should return the sum of all numbers in the tree for a tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    expect(sumNumbersDFS(root)).toBe(262); // 124 + 125 + 13
  });
});
