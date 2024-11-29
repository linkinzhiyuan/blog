/*
 * @lc app=leetcode.cn id=100 lang=typescript
 * @lcpr version=20003
 *
 * [100] 相同的树
 *
 * https://leetcode.cn/problems/same-tree/description/
 *
 * algorithms
 * Easy (62.34%)
 * Likes:    1186
 * Dislikes: 0
 * Total Accepted:    632.4K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3]\n[1,2,3]'
 *
 * 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
 * 
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 * 
 * 示例 1：
 * 
 * 输入：p = [1,2,3], q = [1,2,3]
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：p = [1,2], q = [1,null,2]
 * 输出：false
 * 
 * 示例 3：
 * 
 * 输入：p = [1,2,1], q = [1,1,2]
 * 输出：false
 * 
 * 提示：
 * 
 * 两棵树上的节点数目都在范围 [0, 100] 内
 * -10^4 <= Node.val <= 10^4
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
 * Checks if two binary trees are the same or not.
 * @param p - The first tree.
 * @param q - The second tree.
 * @returns true if the two trees are the same, false otherwise.
 */
function isSameTreeDFS(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true
  if (!p || !q || p.val !== q.val) return false
  return isSameTreeDFS(p.left, q.left) && isSameTreeDFS(p.right, q.right)
};

function isSameTreeBFS(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;

  const queueP: (TreeNode | null)[] = [p];
  const queueQ: (TreeNode | null)[] = [q];

  while (queueP.length && queueQ.length) {
    const nodeP = queueP.shift();
    const nodeQ = queueQ.shift();

    if (!nodeP && !nodeQ) continue;
    if (!nodeP || !nodeQ || nodeP.val !== nodeQ.val) return false;

    queueP.push(nodeP.left);
    queueP.push(nodeP.right);
    queueQ.push(nodeQ.left);
    queueQ.push(nodeQ.right);
  }

  return queueP.length === queueQ.length;
}
// @lc code=end

describe('isSameTreeDFS function', () => {
  it('should return true for both trees being null', () => {
    expect(isSameTreeDFS(null, null)).toBe(true);
  });

  it('should return false for one tree being null and the other not', () => {
    const tree = new TreeNode(1);
    expect(isSameTreeDFS(tree, null)).toBe(false);
    expect(isSameTreeDFS(null, tree)).toBe(false);
  });

  it('should return true for both trees having the same structure and values', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.right = new TreeNode(3);

    expect(isSameTreeDFS(tree1,tree2)).toBe(true);
  });

  it('should return false for both trees having the same structure but different values', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.right = new TreeNode(4);

    expect(isSameTreeDFS(tree1, tree2)).toBe(false);
  });

  it('should return false for both trees having different structures', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.left.left = new TreeNode(3);

    expect(isSameTreeDFS(tree1, tree2)).toBe(false);
  });
});



describe('isSameTreeBFS function', () => {
  it('should return true for both trees being null', () => {
    expect(isSameTreeBFS(null, null)).toBe(true);
  });

  it('should return false for one tree being null and the other not', () => {
    const tree = new TreeNode(1);
    expect(isSameTreeBFS(tree, null)).toBe(false);
    expect(isSameTreeBFS(null, tree)).toBe(false);
  });

  it('should return false for one left tree being null', () => {
    const tree1 = new TreeNode(1);
    tree1.right = new TreeNode(2);
    console.log("🚀 ROCKET LLP ~ it ~ tree1: ", tree1)

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(undefined);
    tree2.right = new TreeNode(2);
    console.log("🚀 ROCKET LLP ~ it ~ tree2: ", tree2)

    expect(isSameTreeBFS(tree1,tree2)).toBe(false);
  });

  it('should return true for both trees having the same structure and values', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.right = new TreeNode(3);

    expect(isSameTreeBFS(tree1,tree2)).toBe(true);
  });

  it('should return false for both trees having the same structure but different values', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.right = new TreeNode(4);

    expect(isSameTreeBFS(tree1, tree2)).toBe(false);
  });

  it('should return false for both trees having different structures', () => {
    const tree1 = new TreeNode(1);
    tree1.left = new TreeNode(2);
    tree1.right = new TreeNode(3);

    const tree2 = new TreeNode(1);
    tree2.left = new TreeNode(2);
    tree2.left.left = new TreeNode(3);

    expect(isSameTreeBFS(tree1, tree2)).toBe(false);
  });
});
