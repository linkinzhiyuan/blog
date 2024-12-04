/*
 * @lc app=leetcode.cn id=112 lang=typescript
 * @lcpr version=20004
 *
 * [112] 路径总和
 *
 * https://leetcode.cn/problems/path-sum/description/
 *
 * algorithms
 * Easy (54.80%)
 * Likes:    1403
 * Dislikes: 0
 * Total Accepted:    751.6K
 * Total Submissions: 1.4M
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22'
 *
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点
 * 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。
 * 
 * 叶子节点 是指没有子节点的节点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
 * 输出：true
 * 解释：等于目标和的根节点到叶节点路径如上图所示。
 * 
 * 
 * 示例 2：
 * 
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：false
 * 解释：树中存在两条根节点到叶子节点的路径：
 * (1 --> 2): 和为 3
 * (1 --> 3): 和为 4
 * 不存在 sum = 5 的根节点到叶子节点的路径。
 * 
 * 示例 3：
 * 
 * 输入：root = [], targetSum = 0
 * 输出：false
 * 解释：由于树是空的，所以不存在根节点到叶子节点的路径。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点的数目在范围 [0, 5000] 内
 * -1000 <= Node.val <= 1000
 * -1000 <= targetSum <= 1000
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
 * DFS
 * @param root 
 * @param targetSum 
 * @returns 
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if(!root) return false;
  if(!root.left && !root.right) {
    return targetSum === root.val
  }
  return hasPathSum(root.left, targetSum - root.val) || 
    hasPathSum(root.right, targetSum - root.val)
};

/**
 * BFS
 */
function hasPathSumBFS(root: TreeNode | null, targetSum: number): boolean {
  if(!root) return false
  const currentNodes: Array<TreeNode> = [root]
  const currentSums: Array<number> = [root.val]

  while (currentNodes.length) {
    const currentNode = currentNodes.shift()
    const currentSum = currentSums.shift()!

    if(!currentNode?.left && !currentNode?.right && currentSum === targetSum) {
      return true
    }

    if(currentNode?.left) {
      currentNodes.push(currentNode.left)
      currentSums.push(currentSum + currentNode.left.val)
    }

    if(currentNode?.right) {
      currentNodes.push(currentNode.right)
      currentSums.push(currentSum + currentNode.right.val)
    }
  }

  return false
}
// @lc code=end

describe('hasPathSum function', () => {
  it('should return false for empty tree', () => {
    expect(hasPathSum(null, 10)).toBe(false);
  });

  it('should return true for tree with one node and target sum found', () => {
    const root = new TreeNode(10);
    expect(hasPathSum(root, 10)).toBe(true);
  });

  it('should return false for tree with one node and target sum not found', () => {
    const root = new TreeNode(10);
    expect(hasPathSum(root, 20)).toBe(false);
  });

  it('should return true for tree with multiple nodes and target sum found', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    expect(hasPathSum(root, 22)).toBe(true);
  });

  it('should return false for tree with multiple nodes and target sum not found', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    expect(hasPathSum(root, 30)).toBe(false);
  });

  it('should return true for tree with negative numbers and target sum found', () => {
    const root = new TreeNode(-2);
    root.left = new TreeNode(-3);
    expect(hasPathSum(root, -5)).toBe(true);
  });

  it('should return true for tree with zero and target sum found', () => {
    const root = new TreeNode(0);
    expect(hasPathSum(root, 0)).toBe(true);
  });
});

describe('hasPathSumBFS function', () => {
  it('should return false for empty tree', () => {
    expect(hasPathSumBFS(null, 10)).toBe(false);
  });

  it('should return true for tree with one node and target sum found', () => {
    const root = new TreeNode(10);
    expect(hasPathSumBFS(root, 10)).toBe(true);
  });

  it('should return false for tree with one node and target sum not found', () => {
    const root = new TreeNode(10);
    expect(hasPathSumBFS(root, 20)).toBe(false);
  });

  it('should return true for tree with multiple nodes and target sum found', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    expect(hasPathSumBFS(root, 22)).toBe(true);
  });

  it('should return false for tree with multiple nodes and target sum not found', () => {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    expect(hasPathSumBFS(root, 30)).toBe(false);
  });

  it('should return true for tree with negative numbers and target sum found', () => {
    const root = new TreeNode(-2);
    root.left = new TreeNode(-3);
    expect(hasPathSumBFS(root, -5)).toBe(true);
  });

  it('should return true for tree with zero and target sum found', () => {
    const root = new TreeNode(0);
    expect(hasPathSumBFS(root, 0)).toBe(true);
  });
});
