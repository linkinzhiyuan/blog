/*
 * @lc app=leetcode.cn id=236 lang=typescript
 * @lcpr version=20004
 *
 * [236] 二叉树的最近公共祖先
 *
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (72.34%)
 * Likes:    2851
 * Dislikes: 0
 * Total Accepted:    830.8K
 * Total Submissions: 1.1M
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1'
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x
 * 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 
 * 示例 1：
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
 * 
 * 示例 2：
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 示例 3：
 * 
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 * 提示：
 * 树中节点数目在范围 [2, 10^5] 内。
 * -10^9 <= Node.val <= 10^9
 * 所有 Node.val 互不相同 。
 * p != q
 * p 和 q 均存在于给定的二叉树中。
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
 * 1.如果当前节点是 p 或 q 中的任意一个，那么该节点就是最近公共祖先
   2.如果左子树和右子树分别包含 p 和 q，那么当前节点就是最近公共祖先
   3.如果只有一个子树包含 p 或 q，则返回那个子树的结果
   应用场景
    文件系统：
    查找两个文件或目录的最近公共父目录
    组织架构：
    查找两个员工的最近公共上级
    网络拓扑：
    查找网络中两个节点的最近公共路由器
 * @param root 
 * @param p 
 * @param q 
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
   if (!root || root === p || root === q) return root;

    // 递归搜索左右子树
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // 如果左右子树都找到了结果，说明当前节点就是LCA
    if (left && right) return root;

    // 如果只有一边找到了结果，返回那一边的结果
    return left ? left : right;
};

//      3
//    /  \
//   5    1
//  / \  / \
// 6  2  0  8
//   / \
//  7   4
// 第一层（根节点3）：
// - 检查左子树（5为根）
// - 检查右子树（1为根）

// 第二层（节点5）：
// - 是p节点
// - 继续检查左子树（6为根）
// - 继续检查右子树（2为根）

// 第三层（节点2）：
// - 检查左子树（7为根）
// - 检查右子树（4为根，是q节点）

// - 节点4被找到，返回节点4
// - 节点7未找到目标，返回null
// - 节点2得到右子树的结果（4），返回4
// - 节点5是p节点，且子树中找到了q，所以节点5是LCA

function lowestCommonAncestorPath(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  const pathP: Array<TreeNode> = []
  const pathQ: Array<TreeNode> = []

  const findPath = (node: TreeNode | null, target: TreeNode, path: Array<TreeNode>) => {
    if(!node) return false
  
    path.push(node)

    if(node === target) return true

    if(findPath(node.left, target, path) || findPath(node.right, target, path)) {
      return true
    }

    // 这条路径上没有找到的情况，删除这个父节点
    path.pop()
    return false
  }

  findPath(root, p, pathP)
  findPath(root, q, pathQ) // pathQ []

  let result: TreeNode | null = null;
  let i = 0
  while (i < pathP.length && i < pathQ.length && pathP[i] === pathQ[i]) {
    result = pathP[i]
    i++
  }

  return result
}

/**
 * Map 结构 父节点映射
 * 
 */

function lowestCommonAncestorMapParent(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if(!root) return null
  // 创建一个Map来存储每个节点的父节点
  const parent = new Map<TreeNode, TreeNode>()

  // dfs 存储所有的父节点
  const dfs = (node: TreeNode) => {
    if(!node) return;
    // 左节点
    if(node.left) {
      parent.set(node.left, node)
      dfs(node.left)
    }

    // 右节点
    if(node.right) {
      parent.set(node.right,node)
      dfs(node.right)
    }
  }

  // 查询所有的父节点
  dfs(root)

  // 使用set结构 存储p所有祖父节点
  const ancestor = new Set<TreeNode>()
  while (p) {
    ancestor.add(p)
    p = parent.get(p)!
  }
  // 从q节点开始，检查第一个在p的祖先集合中出现的节点

  while (q) {
    if(ancestor.has(q)){
      return q
    }
    q = parent.get(q)!
  }

  return null
}
// @lc code=end

describe('lowestCommonAncestor', () => {
  it('should return the root node if it is p or q', () => {
    const root = new TreeNode(3);
    const p = root;
    const q = root;
    const result = lowestCommonAncestor(root, p, q);
    expect(result).toBe(root);
  });

  it('should return the root node if it is null', () => {
    const root: TreeNode | null = null;
    const p = new TreeNode(1);
    const q = new TreeNode(2);
    const result = lowestCommonAncestor(root, p, q);
    expect(result).toBeNull();
  });

  it('should return the correct LCA when p and q are in different subtrees', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);
    const p = root.left;
    const q = root.left.right.right;
    const result = lowestCommonAncestor(root, p, q);
    expect(result).toBe(root.left);
  });

  it('should return the correct LCA when p and q are in the same subtree', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    const p = root.left;
    const q = root.left.right;
    const result = lowestCommonAncestor(root, p, q);
    expect(result).toBe(root.left);
  });
});

// 通过路径查找
describe('lowestCommonAncestorPath', () => {
  it('should return the root node if it is p or q', () => {
    const root = new TreeNode(3);
    const p = root;
    const q = root;
    const result = lowestCommonAncestorPath(root, p, q);
    expect(result).toBe(root);
  });

  it('should return the root node if it is null', () => {
    const root: TreeNode | null = null;
    const p = new TreeNode(1);
    const q = new TreeNode(2);
    const result = lowestCommonAncestorPath(root, p, q);
    expect(result).toBeNull();
  });

  it('should return the correct LCA when p and q are in different subtrees', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);
    const p = root.left;
    const q = root.left.right.right;
    const result = lowestCommonAncestorPath(root, p, q);
    expect(result).toBe(root.left);
  });

  it('should return the correct LCA when p and q are in the same subtree', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    const p = root.left;
    const q = root.left.right;
    const result = lowestCommonAncestorPath(root, p, q);
    expect(result).toBe(root.left);
  });
});

// 通过父节点映射关系查找
describe('lowestCommonAncestorMapParent', () => {
  it('should return the root node if it is p or q', () => {
    const root = new TreeNode(3);
    const p = root;
    const q = root;
    const result = lowestCommonAncestorMapParent(root, p, q);
    expect(result).toBe(root);
  });

  it('should return the root node if it is null', () => {
    const root: TreeNode | null = null;
    const p = new TreeNode(1);
    const q = new TreeNode(2);
    const result = lowestCommonAncestorMapParent(root, p, q);
    expect(result).toBeNull();
  });

  it('should return the correct LCA when p and q are in different subtrees', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);
    const p = root.left;
    const q = root.left.right.right;
    const result = lowestCommonAncestorMapParent(root, p, q);
    expect(result).toBe(root.left);
  });

  it('should return the correct LCA when p and q are in the same subtree', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    const p = root.left;
    const q = root.left.right;
    const result = lowestCommonAncestorMapParent(root, p, q);
    expect(result).toBe(root.left);
  });
});
