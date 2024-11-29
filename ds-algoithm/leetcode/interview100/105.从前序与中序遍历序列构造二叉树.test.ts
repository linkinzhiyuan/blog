/*
 * @lc app=leetcode.cn id=105 lang=typescript
 * @lcpr version=20003
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (72.17%)
 * Likes:    2418
 * Dislikes: 0
 * Total Accepted:    741.9K
 * Total Submissions: 1M
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 * 
 * 示例 1:
  返回二叉树：
      3
    / \
    9  20
      /  \
    15   7
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 * 
 * 示例 2:
 * 
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 * 
 * 提示:
 * 
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
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
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
/**
 * 前序是根节点 左子树，右子树； 中序是左子树，根节点，右子树
 * @param preorder 
 * @param inorder 
 * @returns 
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if(!preorder.length || !inorder.length) return null
  const rootVal = preorder[0]
  const root = new TreeNode(rootVal)

  const rootIndex = inorder.indexOf(rootVal) // 在中序排序中的位置

  const leftInorder = inorder.slice(0, rootIndex) // 中序遍历中的左子树
  const rightInorder = inorder.slice(rootIndex + 1) // 中序遍历中的右子树

  const leftPreorder = preorder.slice(1, 1 + leftInorder.length) // 前序中的左子树
  const rightPreorder = preorder.slice(1 + leftInorder.length) // 前序中的右子树

  root.left = buildTree(leftPreorder, leftInorder)
  root.right = buildTree(rightPreorder, rightInorder)

  return root
};

function buildTreeHash(preorder: number[], inorder: number[]): TreeNode | null {
  const inorderMap = new Map<number, number>()
  inorder.forEach((val:number, index:number) => inorderMap.set(val, index))

  const build = (preStart: number, preEnd: number, inStart:number, inEnd: number): TreeNode | null => {
    if(preStart > preEnd || inStart > inEnd) return null;

    const rootVal = preorder[preStart]
    const root = new TreeNode(rootVal)
    const rootIndex = inorderMap.get(rootVal) as number

    const leftSize = rootIndex - inStart

    // 递归左右子树
    root.left = build(preStart + 1, preStart + leftSize, inStart, rootIndex - 1)
    root.right = build(preStart + leftSize + 1, preEnd, rootIndex + 1, inEnd)

    return root
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1)
};
// @lc code=end

describe('buildTree', () => {
  it('should return null for empty input arrays', () => {
    expect(buildTree([], [])).toBeNull();
  });

  it('should construct a single-node tree for single-element input arrays', () => {
    const preorder = [1];
    const inorder = [1];
    const expected = new TreeNode(1);
    expect(buildTree(preorder, inorder)).toEqual(expected);
  });

  it('should construct a balanced binary tree', () => {
    const preorder = [3, 9, 20, 15, 7];
    const inorder = [9, 3, 15, 20, 7];
    const expected = new TreeNode(3);
    expected.left = new TreeNode(9);
    expected.right = new TreeNode(20);
    expected.right.left = new TreeNode(15);
    expected.right.right = new TreeNode(7);
    expect(buildTree(preorder, inorder)).toEqual(expected);
  });
});


describe('buildTreeHash', () => {
  it('should return null for empty input arrays', () => {
    expect(buildTreeHash([], [])).toBeNull();
  });

  it('should construct a single-node tree for single-element input arrays', () => {
    const preorder = [1];
    const inorder = [1];
    const expected = new TreeNode(1);
    expect(buildTreeHash(preorder, inorder)).toEqual(expected);
  });

  it('should construct a balanced binary tree', () => {
    const preorder = [3, 9, 20, 15, 7];
    const inorder = [9, 3, 15, 20, 7];
    const expected = new TreeNode(3);
    expected.left = new TreeNode(9);
    expected.right = new TreeNode(20);
    expected.right.left = new TreeNode(15);
    expected.right.right = new TreeNode(7);
    expect(buildTreeHash(preorder, inorder)).toEqual(expected);
  });
});
