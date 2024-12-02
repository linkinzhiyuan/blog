/*
 * @lc app=leetcode.cn id=106 lang=typescript
 * @lcpr version=20004
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (72.54%)
 * Likes:    1287
 * Dislikes: 0
 * Total Accepted:    431.6K
 * Total Submissions: 594.9K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder
 * 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 * 
 * 示例 1:
 * 
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *     3
      / \
      9  20
        /  \
      15   7
 * 
 * 示例 2:
 * 
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 * 
 * 提示:
 * 
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
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
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

/**
 * 思路：中序遍历： 左子树->根->右子树，后序遍历：左子树->右子树->根
 * 根据后序遍历的最后一个，切断中序遍历前后左子树的size和右子树size，根据左子树的length截取后序遍历的左子树和右子树, 递归完成
 * @param inorder 
 * @param postorder 
 */
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  if(!inorder.length || !postorder.length) return null
  const rootVal = postorder[postorder.length - 1] // 根节点
  const root = new TreeNode(rootVal)

  const rootValIndex = inorder.indexOf(rootVal); // 根节点在中序的位置
  const inorderLeft = inorder.slice(0, rootValIndex) // 中序中的左子树
  const inorderRight = inorder.slice(rootValIndex + 1) // 中序中的右子树

  const postorderLeft = postorder.slice(0, inorderLeft.length)
  const postorderRight = postorder.slice(inorderLeft.length, inorderLeft.length + inorderRight.length)

  root.left = buildTree(inorderLeft, postorderLeft)
  root.right = buildTree(inorderRight, postorderRight)

  return root
};

function buildTreeRefactor(inorder: number[], postorder: number[]): TreeNode | null {
  if(!inorder.length || !postorder.length) return null

  const inorderMap = new Map<number, number>()
  inorder.forEach((item,idx) => inorderMap.set(item,idx))

  const build = (inorderStart: number, inorderEnd: number, postorderStart: number, postorderEnd: number): TreeNode | null => {
    if(inorderStart > inorderEnd || postorderStart > postorderEnd) return null

    const rootVal = postorder[postorderEnd] // 根节点
    const root = new TreeNode(rootVal)

    const idx = inorderMap.get(rootVal) as number
    const leftSize = idx - inorderStart


    root.left = build(inorderStart, idx - 1, postorderStart, postorderStart + leftSize - 1)
    root.right = build(idx + 1, inorderEnd, postorderStart + leftSize, postorderEnd - 1)

    return root
  }
  return build(0, inorder.length - 1, 0, postorder.length - 1)
}

function buildMapFaster(inorder: number[], postorder: number[]): TreeNode | null {
  let postIdx = postorder.length - 1;
  const idxMap = new Map()
  inorder.forEach((val, idx) => {
      idxMap.set(val, idx)
  })

  const build = (in_left: number, in_right: number): TreeNode | null => {
    if (in_left > in_right) {
        return null
    }
    const rootVal = postorder[postIdx]
    const root = new TreeNode(rootVal)
    const index = idxMap.get(rootVal)
    postIdx--
    root.right = build(index + 1, in_right)
    root.left = build(in_left, index - 1)
    return root
  }

  return build(0, inorder.length - 1)
}

// @lc code=end

describe('buildTree', () => {
  it('should return null for empty input arrays', () => {
    expect(buildTree([], [])).toBeNull();
  });

  it('should return a single node for single-element input arrays', () => {
    const inorder = [1];
    const postorder = [1];
    const result = buildTree(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.left).toBeNull();
    expect(result?.right).toBeNull();
  });

  it('should build a balanced binary tree', () => {
    const inorder = [1, 2, 3, 4, 5];
    const postorder = [1, 3, 2, 5, 4];
    const result = buildTree(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(5);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
  });

  it('should build an unbalanced binary tree (left-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [1, 2, 3, 4];
    const result = buildTree(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(3);
    expect(result?.left?.left?.val).toBe(2);
    expect(result?.left?.left?.left?.val).toBe(1);
  });

  it('should build an unbalanced binary tree (right-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [4, 3, 2, 1];
    const result = buildTree(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.right?.val).toBe(2);
    expect(result?.right?.right?.val).toBe(3);
    expect(result?.right?.right?.right?.val).toBe(4);
  });

  it('should build a large binary tree', () => {
    const inorder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const postorder = [1, 3, 2, 5, 7, 9, 8, 6, 4];
    const result = buildTree(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(6);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
    expect(result?.right?.left?.val).toBe(5);
    expect(result?.right?.right?.val).toBe(8);
    expect(result?.right?.right?.left?.val).toBe(7);
    expect(result?.right?.right?.right?.val).toBe(9);
  });
});


describe('buildTreeRefactor', () => {
  it('should return null for empty input arrays', () => {
    expect(buildTreeRefactor([], [])).toBeNull();
  });

  it('should return a single node for single-element input arrays', () => {
    const inorder = [1];
    const postorder = [1];
    const result = buildTreeRefactor(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.left).toBeNull();
    expect(result?.right).toBeNull();
  });

  it('should build a balanced binary tree', () => {
    const inorder = [1, 2, 3, 4, 5];
    const postorder = [1, 3, 2, 5, 4];
    const result = buildTreeRefactor(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(5);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
  });

  it('should build an unbalanced binary tree (left-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [1, 2, 3, 4];
    const result = buildTreeRefactor(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(3);
    expect(result?.left?.left?.val).toBe(2);
    expect(result?.left?.left?.left?.val).toBe(1);
  });

  it('should build an unbalanced binary tree (right-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [4, 3, 2, 1];
    const result = buildTreeRefactor(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.right?.val).toBe(2);
    expect(result?.right?.right?.val).toBe(3);
    expect(result?.right?.right?.right?.val).toBe(4);
  });

  it('should build a large binary tree', () => {
    const inorder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const postorder = [1, 3, 2, 5, 7, 9, 8, 6, 4];
    const result = buildTreeRefactor(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(6);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
    expect(result?.right?.left?.val).toBe(5);
    expect(result?.right?.right?.val).toBe(8);
    expect(result?.right?.right?.left?.val).toBe(7);
    expect(result?.right?.right?.right?.val).toBe(9);
  });
});

describe('buildMapFaster', () => {
  it('should return null for empty input arrays', () => {
    expect(buildMapFaster([], [])).toBeNull();
  });

  it('should return a single node for single-element input arrays', () => {
    const inorder = [1];
    const postorder = [1];
    const result = buildMapFaster(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.left).toBeNull();
    expect(result?.right).toBeNull();
  });

  it('should build a balanced binary tree', () => {
    const inorder = [1, 2, 3, 4, 5];
    const postorder = [1, 3, 2, 5, 4];
    const result = buildMapFaster(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(5);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
  });

  it('should build an unbalanced binary tree (left-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [1, 2, 3, 4];
    const result = buildMapFaster(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(3);
    expect(result?.left?.left?.val).toBe(2);
    expect(result?.left?.left?.left?.val).toBe(1);
  });

  it('should build an unbalanced binary tree (right-heavy)', () => {
    const inorder = [1, 2, 3, 4];
    const postorder = [4, 3, 2, 1];
    const result = buildMapFaster(inorder, postorder);
    expect(result?.val).toBe(1);
    expect(result?.right?.val).toBe(2);
    expect(result?.right?.right?.val).toBe(3);
    expect(result?.right?.right?.right?.val).toBe(4);
  });

  it('should build a large binary tree', () => {
    const inorder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const postorder = [1, 3, 2, 5, 7, 9, 8, 6, 4];
    const result = buildMapFaster(inorder, postorder);
    expect(result?.val).toBe(4);
    expect(result?.left?.val).toBe(2);
    expect(result?.right?.val).toBe(6);
    expect(result?.left?.left?.val).toBe(1);
    expect(result?.left?.right?.val).toBe(3);
    expect(result?.right?.left?.val).toBe(5);
    expect(result?.right?.right?.val).toBe(8);
    expect(result?.right?.right?.left?.val).toBe(7);
    expect(result?.right?.right?.right?.val).toBe(9);
  });
});
