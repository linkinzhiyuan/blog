/*
 * @lc app=leetcode.cn id=124 lang=typescript
 * @lcpr version=20004
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (46.09%)
 * Likes:    2318
 * Dislikes: 0
 * Total Accepted:    479.1K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3]'
 *
 * 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个
 * 节点，且不一定经过根节点。
 * 路径和 是路径中各节点值的总和。
 * 给你一个二叉树的根节点 root ，返回其 最大路径和 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 * 
 * 示例 2：
 * 
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 * 
 * 提示：
 * 
 * 树中节点数目范围是 [1, 3 * 10^4]
 * -1000 <= Node.val <= 1000
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

function maxPathSum(root: TreeNode | null): number {
    // 初始化最大路径和为最小安全整数
    let maxSum = Number.MIN_SAFE_INTEGER;
    
    // 辅助函数：计算从当前节点出发的最大贡献值
    function maxGain(node: TreeNode | null): number {
        if (!node) return 0;
        
        // 递归计算左右子树的最大贡献值
        // 只有在最大贡献值大于 0 时，才会选取对应子节点
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        // 节点的最大路径和取决于该节点的值与该节点的左右子树的最大贡献值
        const priceNewPath = node.val + leftGain + rightGain;
        
        // 更新答案
        maxSum = Math.max(maxSum, priceNewPath);
        
        // 返回节点的最大贡献值
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
};
// @lc code=end

describe('maxPathSum', () => {
  it('should return the value of the single node for a tree with one node', () => {
    const root = new TreeNode(5);
    expect(maxPathSum(root)).toBe(5);
  });

  it('should return the maximum path sum for a tree with multiple nodes and positive values', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(maxPathSum(root)).toBe(6);
  });

  it('should return the maximum path sum for a tree with multiple nodes and negative values', () => {
    const root = new TreeNode(-1);
    root.left = new TreeNode(-2);
    root.right = new TreeNode(-3);
    expect(maxPathSum(root)).toBe(-1);
  });

  it('should return the maximum path sum for a tree with multiple nodes and mixed positive and negative values', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(-2);
    root.right = new TreeNode(3);
    expect(maxPathSum(root)).toBe(4);
  });
});
