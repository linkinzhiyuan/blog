/*
 * @lc app=leetcode.cn id=530 lang=typescript
 * @lcpr version=20004
 *
 * [530] 二叉搜索树的最小绝对差
 *
 * https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/
 *
 * algorithms
 * Easy (62.87%)
 * Likes:    595
 * Dislikes: 0
 * Total Accepted:    289.9K
 * Total Submissions: 460.9K
 * Testcase Example:  '[4,2,6,1,3]'
 *
 * 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
 * 
 * 差值是一个正数，其数值等于两值之差的绝对值。
 * 
 * 示例 1：
 * 
 * 输入：root = [4,2,6,1,3]
 * 输出：1
 * 
 * 示例 2：
 * 
 * 输入：root = [1,0,48,null,null,12,49]
 * 输出：1
 * 
 * 提示：
 * 
 * 树中节点的数目范围是 [2, 10^4]
 * 0 <= Node.val <= 10^5
 * 
 * 注意：本题与 783
 * https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/ 相同
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
 * binary search tree minimum difference: 意味着左子树的所有节点值都小于根节点，右子树的所有节点值都大于根节点
 * 所有节点的值都是唯一的，所以可以用中序遍历的方式找到所有节点，然后计算差值
 * @param root 
 * @returns 
 */
function getMinimumDifference(root: TreeNode | null): number {
  if(!root) return 0;
  // const stack: Array<TreeNode> = [root]
  // const visited: Array<number> = []
  let minDiff = Infinity

  // while(stack.length) {
  //   const node = stack.pop()
  //   visited.push(node?.val!)

  //   if(node?.left) stack.push(node.left)
  //   if(node?.right) stack.push(node.right)
  // }

  // visited.sort((a, b) => a - b)

  // 递归实现中序遍历获得一个升序的数组
  const result: Array<number> = []
  const inorder = (node: TreeNode | null):void => {
    if(!node) return;

    inorder(node.left)
    result.push(node.val)
    inorder(node.right)
  }
  inorder(root)

  for(let i = 1; i < result.length; i++) {
    minDiff = Math.min(minDiff, result[i] - result[i - 1])
  }

  return minDiff
};

// test
describe('getMinimumDifference', () => {
  it('should return 0 for an empty tree', () => {
    expect(getMinimumDifference(null)).toBe(0);
  });

  it('should return the difference for a tree with two nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    expect(getMinimumDifference(root)).toBe(1);
  });

  it('should return the minimum difference for a tree with multiple nodes', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    expect(getMinimumDifference(root)).toBe(1);
  });

  it('should handle trees with varying differences', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    expect(getMinimumDifference(root)).toBe(1);
  });

  it('should handle trees with duplicate values (should not occur due to problem constraints)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(1);
    expect(getMinimumDifference(root)).toBe(0);
  });
});

/**
 * 二叉搜索树的特性：左子树小于根，右子树一定大于根，根据中序遍历可以得到一个有序的数组，然后比较相邻的两个数值的差即可
 */
function getMinimumDifferenceInorder(root: TreeNode | null):number {
  if(!root) return 0

  let minDiff = Infinity;
  let pre: number | null = null;

  const inorder = (node: TreeNode | null): void => {
    if(!node) return;

    inorder(node.left)

    if(pre !== null) {
      minDiff = Math.min(minDiff, Math.abs(node.val - pre))
    }

    pre = node.val // 0

    inorder(node.right) // 5
  }

  inorder(root)
  return minDiff
}

describe('getMinimumDifferenceInorder', () => {
  it('should return 0 for an empty tree', () => {
    expect(getMinimumDifferenceInorder(null)).toBe(0);
  });

  it('should return the difference for a tree with two nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    expect(getMinimumDifferenceInorder(root)).toBe(1);
  });

  it('should return the minimum difference for a tree with multiple nodes', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    expect(getMinimumDifferenceInorder(root)).toBe(1);
  });

  it('should handle trees with varying differences', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    expect(getMinimumDifferenceInorder(root)).toBe(1);
  });

  it('should handle trees with duplicate values (should not occur due to problem constraints)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(1);
    expect(getMinimumDifferenceInorder(root)).toBe(0);
  });
});

/**
 * 使用栈迭代实现中序排序
 * @param root 
 * @returns 
 */
function getMinimumDifferenceInorderRefactor(root: TreeNode | null):number {
  if(!root) return 0

  let prevVal: number | null = null
  const stack: TreeNode[] = []
  let current = root
  let minDiff = Infinity

  while(current || stack.length) {
    // 遍历到最左节点
    while(current) {
      stack.push(current)
      current = current.left!
    }

    // 处理当前节点
    current = stack.pop()!
    // result.push(current.val)
    if(prevVal !== null) {
      minDiff = Math.min(minDiff, Math.abs(current.val - prevVal))
    }
    prevVal = current.val

    // 移动到右子树
    current = current.right!
  }

  return minDiff;
}

describe('getMinimumDifferenceInorderRefactor', () => {
  it('should return 0 for an empty tree', () => {
    expect(getMinimumDifferenceInorderRefactor(null)).toBe(0);
  });

  it('should return the difference for a tree with two nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    expect(getMinimumDifferenceInorderRefactor(root)).toBe(1);
  });

  it('should return the minimum difference for a tree with multiple nodes', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    expect(getMinimumDifferenceInorderRefactor(root)).toBe(1);
  });

  it('should handle trees with varying differences', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    expect(getMinimumDifferenceInorderRefactor(root)).toBe(1);
  });

  it('should handle trees with duplicate values (should not occur due to problem constraints)', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(1);
    expect(getMinimumDifferenceInorderRefactor(root)).toBe(0);
  });
});
// @lc code=end

