/*
 * @lc app=leetcode.cn id=230 lang=typescript
 * @lcpr version=20004
 *
 * [230] 二叉搜索树中第 K 小的元素
 *
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/
 *
 * algorithms
 * Medium (78.38%)
 * Likes:    932
 * Dislikes: 0
 * Total Accepted:    447.3K
 * Total Submissions: 570.1K
 * Testcase Example:  '[3,1,4,null,2]\n1'
 *
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。
 * 
 * 示例 1：
 * 
 * 输入：root = [3,1,4,null,2], k = 1
 * 输出：1
 * 
 * 示例 2：
 * 
 * 输入：root = [5,3,6,2,4,null,null,1], k = 3
 * 输出：3
 * 
 * 提示：
 * 
 * 树中的节点数为 n 。
 * 1 <= k <= n <= 10^4
 * 0 <= Node.val <= 10^4
 * 
 * 进阶：如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？
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
 * 利用二叉搜索树的特性： 左节点一定小于跟，右节点一定大于根，栈迭代遍历
 * @param root 
 * @param k 
 */
function kthSmallest(root: TreeNode | null, k: number): number {
  if(!root) return 0;
  
  const stack: TreeNode[] = []
  let current: TreeNode | null = root
  let kVal: number = 0
  let count: number = 0
  while(current || stack.length) {
    // 先左子树
    while(current) {
      stack.push(current)
      current = current.left
    }

    count++
    current = stack.pop()!
    if(count === k) {
      kVal = current.val
    }

    // 右子树
    current = current.right
  }

  return kVal
};

describe('kthSmallest', () => {
  it('should return 0 for an empty tree', () => {
    expect(kthSmallest(null, 1)).toBe(0);
  });

  it('should return the only node value for a tree with one node', () => {
    const root = new TreeNode(1);
    expect(kthSmallest(root, 1)).toBe(1);
  });

  it('should return the smallest node value for a tree with multiple nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(4);
    root.left.right = new TreeNode(2);
    expect(kthSmallest(root, 1)).toBe(1);
  });

  it('should return the kth smallest node value for a tree with multiple nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(4);
    root.left.right = new TreeNode(2);
    expect(kthSmallest(root, 2)).toBe(2);
  });

  it('should return the largest node value for a tree with multiple nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(4);
    root.left.right = new TreeNode(2);
    expect(kthSmallest(root, 4)).toBe(4);
  });

  it('should return 0 for k larger than the number of nodes', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(4);
    root.left.right = new TreeNode(2);
    expect(kthSmallest(root, 5)).toBe(0);
  });

  it('should return the correct value for a tree with duplicate values', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(2);
    expect(kthSmallest(root, 2)).toBe(2);
  });
});

/**
 * 实际应用场景：排名系统
 */
class TreeNodeWithCount {
  val: number;
  left: TreeNodeWithCount | null;
  right: TreeNodeWithCount | null;
  leftCount: number; // 左子树节点数量
  
  constructor(val?: number) {
      this.val = val ?? 0;
      this.left = null;
      this.right = null;
      this.leftCount = 0;
  }
}

class RankingSystem {
  private root: TreeNodeWithCount | null;
  
  constructor() {
      this.root = null;
  }
  
  insert(score: number): void {
      this.root = this.insertNode(this.root, score);
  }
  
  getRank(k: number): number {
      return kthSmallest(this.root, k);
  }
  
  private insertNode(node: TreeNodeWithCount | null, val: number): TreeNodeWithCount {
      if (!node) {
          return new TreeNodeWithCount(val);
      }
      
      if (val < node.val) {
          node.leftCount++;
          node.left = this.insertNode(node.left, val);
      } else {
          node.right = this.insertNode(node.right, val);
      }
      
      return node;
  }
}

/**
 * 成绩查询系统
 */
interface Student {
  id: number;
  score: number;
}

class ScoreSystem {
  private scoreTree: TreeNodeWithCount | null;
  
  constructor() {
      this.scoreTree = null;
  }
  
  addScore(student: Student): void {
      this.scoreTree = this.insertNode(this.scoreTree, student.score);
  }
  
  getTopK(k: number): number {
      const totalCount = this.getCount(this.scoreTree);
      return kthSmallest(this.scoreTree, totalCount - k + 1);
  }
  
  private getCount(node: TreeNodeWithCount | null): number {
      if (!node) return 0;
      return node.leftCount + 1 + this.getCount(node.right);
  }

  private insertNode(node: TreeNodeWithCount | null, val: number): TreeNodeWithCount {
    if (!node) {
        return new TreeNodeWithCount(val);
    }
    
    if (val < node.val) {
        node.leftCount++;
        node.left = this.insertNode(node.left, val);
    } else {
        node.right = this.insertNode(node.right, val);
    }
    
    return node;
  }
}

/**
 * 数据流中位数
 */
class MedianFinder {
  private bst: TreeNodeWithCount | null;
  private count: number;
  
  constructor() {
      this.bst = null;
      this.count = 0;
  }
  
  addNum(num: number): void {
      this.bst = this.insertNode(this.bst, num);
      this.count++;
  }
  
  findMedian(): number {
      if (this.count % 2 === 0) {
          const left = kthSmallest(this.bst, this.count / 2);
          const right = kthSmallest(this.bst, this.count / 2 + 1);
          return (left + right) / 2;
      } else {
          return kthSmallest(this.bst, Math.ceil(this.count / 2));
      }
  }

  private insertNode(node: TreeNodeWithCount | null, val: number): TreeNodeWithCount {
    if (!node) {
        return new TreeNodeWithCount(val);
    }
    
    if (val < node.val) {
        node.leftCount++;
        node.left = this.insertNode(node.left, val);
    } else {
        node.right = this.insertNode(node.right, val);
    }
    
    return node;
  }
}



// @lc code=end
