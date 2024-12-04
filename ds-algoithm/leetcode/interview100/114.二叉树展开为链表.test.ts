/*
 * @lc app=leetcode.cn id=114 lang=typescript
 * @lcpr version=20004
 *
 * [114] 二叉树展开为链表
 *
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/
 *
 * algorithms
 * Medium (74.60%)
 * Likes:    1757
 * Dislikes: 0
 * Total Accepted:    551.8K
 * Total Submissions: 738.9K
 * Testcase Example:  '[1,2,5,3,4,null,6]'
 *
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 * 
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
 * 
 * 示例 2：
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 示例 3：
 * 
 * 输入：root = [0]
 * 输出：[0]
 * 
 * 提示：
 * 
 * 树中结点数在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
 * 
 * 进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
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
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  if(!root) return;

  const nodes: Array<TreeNode> = [];
  const preOrder = (node: TreeNode | null): void => {
    if(!node) return;
    nodes.push(node)
    preOrder(node.left)
    preOrder(node.right)
  }

  preOrder(root) // 前序遍历所有的顺序

  let len = nodes.length
  for(let i = 0; i < len - 1; i++ ) {
    nodes[i].left = null
    nodes[i].right = nodes[i + 1]
  }

  if(nodes.length > 0) {
    nodes[len - 1].left = null
    nodes[len - 1].right = null
  }
};

/**
 * 原地更改，遍历cur.right,存在left的情况下，找到cur.left.right最后一个节点，把cur.left.right = cur.right, cur.right = cur.left cur.left = null
 * cur = cur.right
 * @param root 
 */
function flattenNoSpace(root: TreeNode | null): void {
  if(!root) return;

  let cur = root
  while (cur) {
    if(cur.left) {

      let lastLeftRigt = cur.left
      while (lastLeftRigt.right) {
        lastLeftRigt = lastLeftRigt.right
      }

      lastLeftRigt.right = cur.right
      cur.right = cur.left
      cur.left = null
    }

    cur = cur.right!
  }
}

/**
 * 递归优先顺序右->左->根
 * 最先处理是最后一个root.right = null 的情况
 * 1.
 * node = 6
    prev = null
    6.right = null
    6.left = null
    prev = 6
 * 2.
    node = 5
    5.right = 6
    5.left = null
    prev = 5
    3.
    node = 4
    4.right = 5
    4.left = null
    prev = 4
    4.
    node = 3
    3.right = 4
    3.left = null
    prev = 3
 * @param root 
 * @returns 
 */
function flattenPostOrder(root: TreeNode | null): void {
  if(!root) return;

  let pre: TreeNode | null = null
  const postOrder = (node: TreeNode | null) => {
    if(!node) return;
    // 先处理右子树
    postOrder(node?.right)
    // 再处理左子树
    postOrder(node?.left)

    // 右节点指向前一个
    node.right = pre;
    // 左节点为null
    node.left = null;
    // 重新赋值
    pre = node
  }

  postOrder(root)
}
// @lc code=end
describe('flatten', () => {
  it('should flatten a binary tree into a linked list', () => {
    const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, null, new TreeNode(6)));
    flatten(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right?.val).toBe(3);
    expect(root.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.val).toBe(4);
    expect(root.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.val).toBe(5);
    expect(root.right?.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.right?.val).toBe(6);
    expect(root.right?.right?.right?.right?.right?.left).toBeNull();
  });

  it('should handle an empty tree', () => {
    flatten(null);
    expect(true).toBe(true); // This test is just to make sure the function doesn't throw an error
  });

  it('should handle a tree with only one node', () => {
    const root = new TreeNode(1);
    flatten(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it('should handle a tree with only two nodes', () => {
    const root = new TreeNode(1, new TreeNode(2), null);
    flatten(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right).toBeNull();
  });
});

describe('flattenNoSpace', () => {
  it('should flattenNoSpace a binary tree into a linked list', () => {
    const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, null, new TreeNode(6)));
    flattenNoSpace(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right?.val).toBe(3);
    expect(root.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.val).toBe(4);
    expect(root.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.val).toBe(5);
    expect(root.right?.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.right?.val).toBe(6);
    expect(root.right?.right?.right?.right?.right?.left).toBeNull();
  });

  it('should handle an empty tree', () => {
    flattenNoSpace(null);
    expect(true).toBe(true); // This test is just to make sure the function doesn't throw an error
  });

  it('should handle a tree with only one node', () => {
    const root = new TreeNode(1);
    flattenNoSpace(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it('should handle a tree with only two nodes', () => {
    const root = new TreeNode(1, new TreeNode(2), null);
    flattenNoSpace(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right).toBeNull();
  });
});

describe('flattenPostOrder', () => {
  it('should flattenPostOrder a binary tree into a linked list', () => {
    const root = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, null, new TreeNode(6)));
    flattenPostOrder(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right?.val).toBe(3);
    expect(root.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.val).toBe(4);
    expect(root.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.val).toBe(5);
    expect(root.right?.right?.right?.right?.left).toBeNull();
    expect(root.right?.right?.right?.right?.right?.val).toBe(6);
    expect(root.right?.right?.right?.right?.right?.left).toBeNull();
  });

  it('should handle an empty tree', () => {
    flattenPostOrder(null);
    expect(true).toBe(true); // This test is just to make sure the function doesn't throw an error
  });

  it('should handle a tree with only one node', () => {
    const root = new TreeNode(1);
    flattenPostOrder(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it('should handle a tree with only two nodes', () => {
    const root = new TreeNode(1, new TreeNode(2), null);
    flattenPostOrder(root);
    expect(root.val).toBe(1);
    expect(root.left).toBeNull();
    expect(root.right?.val).toBe(2);
    expect(root.right?.left).toBeNull();
    expect(root.right?.right).toBeNull();
  });
});
