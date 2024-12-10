/*
 * @lc app=leetcode.cn id=783 lang=typescript
 * @lcpr version=20004
 *
 * [783] 二叉搜索树节点最小距离
 *
 * https://leetcode.cn/problems/minimum-distance-between-bst-nodes/description/
 *
 * algorithms
 * Easy (60.47%)
 * Likes:    287
 * Dislikes: 0
 * Total Accepted:    94.5K
 * Total Submissions: 156.2K
 * Testcase Example:  '[4,2,6,1,3]'
 *
 * 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
 * 
 * 差值是一个正数，其数值等于两值之差的绝对值。
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：root = [4,2,6,1,3]
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 输入：root = [1,0,48,null,null,12,49]
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点的数目范围是 [2, 100]
 * 0 <= Node.val <= 10^5
 * 
 * 
 * 
 * 
 * 注意：本题与
 * 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/
 * 相同
 * 
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
function minDiffInBST(root: TreeNode | null): number {
  if(!root) return 0

  // 使用栈迭代 中序遍历，比较相邻两个数的最小差距
  let minDiff = Infinity;
  const stack: Array<TreeNode> = []
  let current: TreeNode = root
  let prev: number | null = null
  
  while (current || stack.length) {
    // 先找到最左子树
    while(current) {
      stack.push(current)
      current = current.left!
    }

    // 处理当前的节点
    current = stack.pop()!
    if(prev !== null) {
      minDiff = Math.min(minDiff, Math.abs(current.val - prev))
    }
    prev = current.val

    current = current.right!
  }

  return minDiff
};

describe('minDiffInBST', () => {
  it('should return 0 for an empty tree', () => {
    expect(minDiffInBST(null)).toBe(0);
  });

  it('should return the difference for a tree with two nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    expect(minDiffInBST(root)).toBe(1);
  });

  it('should return the minimum difference for a tree with multiple nodes', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    expect(minDiffInBST(root)).toBe(1);
  });

  it('should handle trees with varying differences', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    expect(minDiffInBST(root)).toBe(1);
  });

  it('should handle trees with duplicate values (should not occur due to problem constraints)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(1);
    expect(minDiffInBST(root)).toBe(0);
  });
});
// @lc code=end

