/*
 * @lc app=leetcode.cn id=117 lang=typescript
 * @lcpr version=20004
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 *
 * https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/description/
 *
 * algorithms
 * Medium (70.50%)
 * Likes:    885
 * Dislikes: 0
 * Total Accepted:    291.7K
 * Total Submissions: 413.1K
 * Testcase Example:  '[1,2,3,4,5,null,7]'
 *
 * 给定一个二叉树：
 * 
 * struct Node {
 * ⁠ int val;
 * ⁠ Node *left;
 * ⁠ Node *right;
 * ⁠ Node *next;
 * }
 * 
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。
 * 初始状态下，所有 next 指针都被设置为 NULL 。
 * 
 * 示例 1：
 * 
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next
 * 指针连接），'#' 表示每层的末尾。
 * 
 * 示例 2：
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 提示：
 * 
 * 树中的节点数在范围 [0, 6000] 内
 * -100 <= Node.val <= 100
 * 
 * 进阶：
 * 
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序的隐式栈空间不计入额外空间复杂度。
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 * 
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export class _Node {
  val: number
  left: _Node | null
  right: _Node | null
  next: _Node | null

  constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
    this.next = (next===undefined ? null : next)
  }
}

/**
 * BFS
 * @param root 
 */
function connect(root: _Node | null): _Node | null {
  if(!root) return null
  const queue: Array<_Node | null> = [root]

  while(queue.length) {
    const len = queue.length
    for(let i = 0; i < len; i ++) {
      const node = queue.shift()!
      
      if(i < len - 1) {
        node.next = queue[0]
      }

      if(node?.left) queue.push(node?.left)
      if(node?.right) queue.push(node?.right)
    }
  }
  return root
};

function connectLink(root: _Node | null): _Node | null {
  if(!root) return null
  let cur: _Node | null = root; // 当前层节点
  while(cur) {
    const dummy = new _Node(0); // 用于连接下一层
    let tail = dummy; // 下一层的链表尾部指针

    while(cur) {
      if(cur.left) {
        tail.next = cur.left // 连接左子节点
        tail = tail.next
      }
      if(cur.right) {
        tail.next = cur.right;
        tail = tail.next
      }
      cur = cur.next
    }

    cur = dummy.next
  }
  return root
}
// @lc code=end

describe('connect function', () => {
  it('should return null for empty tree', () => {
    expect(connect(null)).toBeNull();
  });

  it('should return the root node for tree with one node', () => {
    const root = new _Node(1);
    expect(connect(root)).toBe(root);
  });

  it('should connect nodes correctly for tree with multiple nodes and levels', () => {
    const root = new _Node(1);
    root.left = new _Node(2);
    root.right = new _Node(3);
    root.left.left = new _Node(4);
    root.left.right = new _Node(5);
    root.right.left = new _Node(6);
    root.right.right = new _Node(7);
    connect(root);
    expect(root.left.next).toBe(root.right);
    expect(root.left.left.next).toBe(root.left.right);
    expect(root.left.right.next).toBe(root.right.left);
    expect(root.right.left.next).toBe(root.right.right);
  });

  it('should connect nodes correctly for tree with nodes having only left child', () => {
    const root = new _Node(1);
    root.left = new _Node(2);
    root.left.left = new _Node(3);
    connect(root);
    expect(root.left.next).toBeNull();
    expect(root.left.left.next).toBeNull();
  });

  it('should connect nodes correctly for tree with nodes having only right child', () => {
    const root = new _Node(1);
    root.right = new _Node(2);
    root.right.right = new _Node(3);
    connect(root);
    expect(root.right.next).toBeNull();
    expect(root.right.right.next).toBeNull();
  });
});

describe('connectLink function', () => {
  it('should return null for empty tree', () => {
    expect(connectLink(null)).toBeNull();
  });

  it('should return the root node for tree with one node', () => {
    const root = new _Node(1);
    expect(connectLink(root)).toBe(root);
  });

  it('should connectLink nodes correctly for tree with multiple nodes and levels', () => {
    const root = new _Node(1);
    root.left = new _Node(2);
    root.right = new _Node(3);
    root.left.left = new _Node(4);
    root.left.right = new _Node(5);
    root.right.left = new _Node(6);
    root.right.right = new _Node(7);
    connectLink(root);
    expect(root.left.next).toBe(root.right);
    expect(root.left.left.next).toBe(root.left.right);
    expect(root.left.right.next).toBe(root.right.left);
    expect(root.right.left.next).toBe(root.right.right);
  });

  it('should connectLink nodes correctly for tree with nodes having only left child', () => {
    const root = new _Node(1);
    root.left = new _Node(2);
    root.left.left = new _Node(3);
    connectLink(root);
    expect(root.left.next).toBeNull();
    expect(root.left.left.next).toBeNull();
  });

  it('should connectLink nodes correctly for tree with nodes having only right child', () => {
    const root = new _Node(1);
    root.right = new _Node(2);
    root.right.right = new _Node(3);
    connectLink(root);
    expect(root.right.next).toBeNull();
    expect(root.right.right.next).toBeNull();
  });
});
