/*
 * @lc app=leetcode.cn id=222 lang=typescript
 * @lcpr version=20004
 *
 * [222] 完全二叉树的节点个数
 *
 * https://leetcode.cn/problems/count-complete-tree-nodes/description/
 *
 * algorithms
 * Easy (82.13%)
 * Likes:    1200
 * Dislikes: 0
 * Total Accepted:    452.3K
 * Total Submissions: 550.4K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
 * 
 * 完全二叉树
 * 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h
 * 层，则该层包含 1~ 2^h 个节点。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3,4,5,6]
 * 输出：6
 * 
 * 示例 2：
 * 
 * 输入：root = []
 * 输出：0
 * 
 * 示例 3：
 * 
 * 输入：root = [1]
 * 输出：1
 * 
 * 提示：
 * 
 * 树中节点的数目范围是[0, 5 * 10^4]
 * 0 <= Node.val <= 5 * 10^4
 * 题目数据保证输入的树是 完全二叉树
 * 
 * 进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
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
function countNodes(root: TreeNode | null): number {
  if(!root) return 0
  const dfs = (node: TreeNode | null, sum: number): number => {
    if(!node) return 0

    sum += 1
    if(!node.left && !node.right) {
      return sum
    }

    if(node.left) {
      sum = dfs(node.left, sum)
    }

    if(node.right) {
      sum = dfs(node.right, sum)
    }

    return sum
  }

  return dfs(root, 0)
};

function countNodesNormal(root: TreeNode | null): number {
  if(!root) return 0
  return 1 + countNodesNormal(root.left) + countNodesNormal(root.right)
}



function countNodesBFS(root: TreeNode | null): number {
  if(!root) return 0

  let sum: number = 1
  const queue: Array<TreeNode> = [root]

  while(queue.length){
    const cur = queue.pop();
    if(cur?.left) {
      queue.push(cur.left)
      sum += 1
    }

    if(cur?.right) {
      queue.push(cur.right)
      sum += 1
    }
  }

  return sum
}

/**
 * 完全二叉树的一个重要特征是： 除了最后一层外，其他的层都是满的
 * @param root 
 * @returns number
 */
function countNodesRefactor(root: TreeNode | null): number {
  if (!root) return 0;
    
    // 计算左右子树的高度
    const leftHeight = getLeftHeight(root);
    const rightHeight = getRightHeight(root);
    
    // 如果左右子树高度相同，说明左子树是满二叉树
    if (leftHeight === rightHeight) {
        // 2^h - 1 是满二叉树的节点数
        return (1 << leftHeight) - 1;
    }
    
    // 否则递归计算
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// 计算左子树高度
function getLeftHeight(node: TreeNode | null): number {
  let height = 0;
  while (node) {
      height++;
      node = node.left;
  }
  return height;
}

// 计算右子树高度
function getRightHeight(node: TreeNode | null): number {
  let height = 0;
  while (node) {
      height++;
      node = node.right;
  }
  return height;
}

// @lc code=end

describe('countNodes', () => {
  it('should return 0 for an empty tree', () => {
    expect(countNodesNormal(null)).toBe(0);
  });

  it('should return 1 for a single node tree', () => {
    const root = new TreeNode(1);
    expect(countNodesNormal(root)).toBe(1);
  });

  it('should return the correct count for a balanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(countNodesNormal(root)).toBe(7);
  });

  it('should return the correct count for an unbalanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    expect(countNodesNormal(root)).toBe(6);
  });

  it('should return the correct count for a tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(countNodesNormal(root)).toBe(9);
  });
});

describe('countNodesBFS', () => {
  it('should return 0 for an empty tree', () => {
    expect(countNodesBFS(null)).toBe(0);
  });

  it('should return 1 for a single node tree', () => {
    const root = new TreeNode(1);
    expect(countNodesBFS(root)).toBe(1);
  });

  it('should return the correct count for a balanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(countNodesBFS(root)).toBe(7);
  });

  it('should return the correct count for an unbalanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    expect(countNodesBFS(root)).toBe(6);
  });

  it('should return the correct count for a tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(countNodesBFS(root)).toBe(9);
  });
});

describe('countNodesRefactor', () => {
  it('should return 0 for an empty tree', () => {
    expect(countNodesRefactor(null)).toBe(0);
  });

  it('should return 1 for a single node tree', () => {
    const root = new TreeNode(1);
    expect(countNodesRefactor(root)).toBe(1);
  });

  it('should return the correct count for a balanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(countNodesRefactor(root)).toBe(7);
  });

  it('should return the correct count for an unbalanced binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    expect(countNodesRefactor(root)).toBe(6);
  });

  it('should return the correct count for a tree with multiple levels', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(countNodesRefactor(root)).toBe(9);
  });
});
