/*
 * @lc app=leetcode.cn id=101 lang=typescript
 * @lcpr version=20003
 *
 * [101] 对称二叉树
 *
 * https://leetcode.cn/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (61.28%)
 * Likes:    2836
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 2M
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
 * 
 * 提示：
 * 
 * 树中节点数目在范围 [1, 1000] 内
 * -100 <= Node.val <= 100
 * 
 * 进阶：你可以运用递归和迭代两种方法解决这个问题吗？
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
 * Checks if a binary tree is symmetric or not.
 * @param root - The root of the binary tree.
 * @returns true if the tree is symmetric, false otherwise.
 */
function isSymmetric(root: TreeNode | null): boolean {
  const dfs = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (!left && !right)  return true;
    if (!left || !right) return false;
    return left.val === right.val && dfs(left.left, right.right) && dfs(left.right, right.left);
  }
  return !root || dfs(root.left, root.right);    
};

function isSymmetricBFS(root: TreeNode | null): boolean {
  if (!root) return true; 
  
  const queue = [root.left, root.right]

  while (queue.length && queue.length % 2 === 0) {
    const len = queue.length / 2
    for (let i = 0; i < len; i ++) {
      const left = queue.shift();
      const right = queue.pop();
  
      if(left?.val !== right?.val) return false
      if((left?.left && !right?.right) || (!left?.left && right?.right) || (left?.right && !right?.left) || (!left?.right && right?.left)) return false

      if(left?.right) queue.unshift(left.right)
      if(left?.left) queue.unshift(left.left)
      if(right?.left) queue.push(right.left)
      if(right?.right) queue.push(right.right)
    }
  }

  return !queue.length
}

function isSymmetricBFSRefactor(root: TreeNode | null) : boolean {
  if(!root) return true

  const queue: Array<(TreeNode | null)> = [root.left, root.right]

  while(queue.length) {
    const left = queue.shift();
    const right = queue.shift();

    if(!left && !right) continue;
    if(!left || !right) return false;
    if(left.val !== right.val) return false

    queue.push(left.left, right.right)
    queue.push(left.right, right.left)
  }

  return true
}
// @lc code=end

describe('isSymmetric function', () => {
  it('should return true for empty tree', () => {
    expect(isSymmetric(null)).toBe(true);
  });

  it('should return true for single node tree', () => {
    const root = new TreeNode(1);
    expect(isSymmetric(root)).toBe(true);
  });

  it('should return true for symmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);
    expect(isSymmetric(root)).toBe(true);
  });

  it('should return false for asymmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isSymmetric(root)).toBe(false);
  });

  it('should return true for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(isSymmetric(root)).toBe(false);
  });

  it('should return true for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(isSymmetric(root)).toBe(false);
  });
});


describe('isSymmetricBFS function', () => {
  it('should return true for empty tree', () => {
    expect(isSymmetricBFS(null)).toBe(true);
  });

  it('should return true for single node tree', () => {
    const root = new TreeNode(1);
    expect(isSymmetricBFS(root)).toBe(true);
  });

  it('should return true for symmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);
    expect(isSymmetricBFS(root)).toBe(true);
  });

  it('should return false for asymmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isSymmetricBFS(root)).toBe(false);
  });

  it('should return true for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(isSymmetricBFS(root)).toBe(false);
  });

  it('should return true for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(isSymmetricBFS(root)).toBe(false);
  });

  it('should return false for two left is null', () => {
    const root = new TreeNode(1)
    root.left = new TreeNode(2)
    root.right = new TreeNode(2)
    root.left.left = null
    root.left.right = new TreeNode(3)
    root.right.left = null
    root.right.right = new TreeNode(3)
    console.log(root)
    expect(isSymmetricBFS(root)).toBe(false)
  })
});

describe('isSymmetricBFSRefactor function', () => {
  it('should return true for empty tree', () => {
    expect(isSymmetricBFSRefactor(null)).toBe(true);
  });

  it('should return true for single node tree', () => {
    const root = new TreeNode(1);
    expect(isSymmetricBFSRefactor(root)).toBe(true);
  });

  it('should return true for symmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);
    expect(isSymmetricBFSRefactor(root)).toBe(true);
  });

  it('should return false for asymmetric tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    expect(isSymmetricBFSRefactor(root)).toBe(false);
  });

  it('should return true for tree with only left child nodes', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    expect(isSymmetricBFSRefactor(root)).toBe(false);
  });

  it('should return true for tree with only right child nodes', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    expect(isSymmetricBFSRefactor(root)).toBe(false);
  });

  it('should return false for two left is null', () => {
    const root = new TreeNode(1)
    root.left = new TreeNode(2)
    root.right = new TreeNode(2)
    root.left.left = null
    root.left.right = new TreeNode(3)
    root.right.left = null
    root.right.right = new TreeNode(3)
    console.log(root)
    expect(isSymmetricBFSRefactor(root)).toBe(false)
  })
});
