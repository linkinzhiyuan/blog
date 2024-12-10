/*
 * @lc app=leetcode.cn id=98 lang=typescript
 * @lcpr version=20004
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode.cn/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (38.58%)
 * Likes:    2460
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2.7M
 * Testcase Example:  '[2,1,3]'
 *
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 
 * 有效 二叉搜索树定义如下：
 * 
 * 
 * 节点的左子树只包含 小于 当前节点的数。
 * 节点的右子树只包含 大于 当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * 
 * 示例 1：
 * 
 * 输入：root = [2,1,3]
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：root = [5,1,4,null,null,3,6]
 * 输出：false
 * 解释：根节点的值是 5 ，但是右子节点的值是 4 。
 * 
 * 提示：
 * 
 * 树中节点数目范围在[1, 10^4] 内
 * -2^31 <= Node.val <= 2^31 - 1
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
 * 中序遍历 栈迭代遍历 当前的值一定大于前一个值
 * @param root 
 */
function isValidBST(root: TreeNode | null): boolean {
  if(!root) return false;
  let prev: TreeNode | null = null
  let current: TreeNode | null = root
  let stack: TreeNode[] = []

  while (current || stack.length) {
    // 先找到最左子节点
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()!
    if(prev) {
      if(prev?.val >= current.val) return false
    }

    prev = current

    current = current.right
  }

  return true
};

describe('isValidBST', () => {
  it('should return false for an empty tree', () => {
    expect(isValidBST(null)).toBe(false);
  });

  it('should return true for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(isValidBST(root)).toBe(true);
  });

  it('should return true for a tree with multiple nodes in valid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    expect(isValidBST(root)).toBe(true);
  });

  it('should return false for a tree with multiple nodes in invalid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(3);
    root.right = new TreeNode(1);
    expect(isValidBST(root)).toBe(false);
  });

  it('should return false for a tree with duplicate values', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isValidBST(root)).toBe(false);
  });
});

/**
 * 递归 中序遍历
 * @param root 
 */
function isValidBSTInorder(root: TreeNode | null): boolean {
  if(!root) return false
  let res: boolean = true
  let prev: TreeNode | null = null

  const inorder = (node: TreeNode | null):void => {
    if(!node) return;

    inorder(node.left)

    if(prev) {
      if(node.val <= prev.val) {
        res = false
        return;
      }
    }
    prev = node

    inorder(node.right)
  }

  inorder(root)
  return res
}


describe('isValidBSTInorder', () => {
  it('should return false for an empty tree', () => {
    expect(isValidBSTInorder(null)).toBe(false);
  });

  it('should return true for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(isValidBSTInorder(root)).toBe(true);
  });

  it('should return true for a tree with multiple nodes in valid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    expect(isValidBSTInorder(root)).toBe(true);
  });

  it('should return false for a tree with multiple nodes in invalid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(3);
    root.right = new TreeNode(1);
    expect(isValidBSTInorder(root)).toBe(false);
  });

  it('should return false for a tree with duplicate values', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isValidBSTInorder(root)).toBe(false);
  });
});

function isValidBSTBoundary(root: TreeNode | null): boolean {
  if(!root) return false

  const boundary = (node: TreeNode | null, lower: number, upper: number): boolean => {
    if(!node) return true;

    if(lower && node.val<= lower || upper && node.val >= upper) return false
    return boundary(node.left, lower, node.val) && boundary(node.right, node.val, upper)
  }

  return boundary(root, -Infinity, Infinity)
}


describe('isValidBSTBoundary', () => {
  it('should return false for an empty tree', () => {
    expect(isValidBSTBoundary(null)).toBe(false);
  });

  it('should return true for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(isValidBSTBoundary(root)).toBe(true);
  });

  it('should return true for a tree with multiple nodes in valid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    expect(isValidBSTBoundary(root)).toBe(true);
  });

  it('should return false for a tree with multiple nodes in invalid BST order', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(3);
    root.right = new TreeNode(1);
    expect(isValidBSTBoundary(root)).toBe(false);
  });

  it('should return false for a tree with duplicate values', () => {
    const root = new TreeNode(2);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isValidBSTBoundary(root)).toBe(false);
  });
});
// @lc code=end


