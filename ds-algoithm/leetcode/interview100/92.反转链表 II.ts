/*
 * @lc app=leetcode.cn id=92 lang=typescript
 * @lcpr version=20003
 *
 * [92] 反转链表 II
 *
 * https://leetcode.cn/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (56.87%)
 * Likes:    1878
 * Dislikes: 0
 * Total Accepted:    574.3K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right
 * 的链表节点，返回 反转后的链表 。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 * 
 * 示例 2：
 * 
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 * 
 * 提示：
 * 
 * 链表中节点数目为 n
 * 1 <= n <= 500
 * -500 <= Node.val <= 500
 * 1 <= left <= right <= n
 * 
 * 进阶： 你可以使用一趟扫描完成反转吗？
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
/**
 * 定位到反转的起始点：使用prev指向left-1的节点,使用cur指向left节点
 * 反转指定区间的节点：使用next指向cur的下一个节点，cur.next = prev，prev = cur，cur = next
 * 连接反转后的节点：使用cur指向right+1的节点，prev.next = cur
 * @param head 
 * @param left 
 * @param right
 * @returns ListNode | null 
 */
export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if(!head || left === right) return head;
  // [1,2,3,4,5] left = 2 right = 4 => [1,4,3,2,5]
  const dummy = new ListNode(0, head);
  let prev = dummy; // 找到left-1
  for(let i = 0; i < left - 1; i++){
    prev = prev.next!;
  }
  // prev = 1
  let cur = prev.next!; // cur = 2 // 起点
  let next: ListNode | null = null; // next = null
  for(let j = 0; j < right - left; j++) { // 反转指定区间的节点 // 关键点：prev = 1 // cur = 2 不变
    next = cur.next;  // next = 3 // next = 4
    cur.next = next!.next; // 2.next = 4 // 2.next = 5
    next!.next = prev!.next; // 3.next = 2 // 4.next = 3
    prev!.next = next; // 1.next = 3 [1,3,2,4,5] // 1.next = 4 [1,4,3,2,5]
  }
  // [0,1,4,3,2,5]
  return dummy.next;
};


const reverseLinkedList = (head: ListNode | null) => {
  let pre: ListNode | null = null;
  let cur = head; // 1
  // [1,2,3,4] => [4,3,2,1]
  while (cur) {
    const next = cur.next; // next = 2 // next -> 3 // next -> 4 // next -> null
    cur.next = pre; // 1.next = null // 2.next = 1 // 3.next = 2 // 4.next = 3
    pre = cur; // pre = 1 // pre = 2 // pre = 3 // pre = 4
    cur = next; // cur = 2 // cur = 3  // cur = 4 // cur = null
  }
  // [4,3,2,1]
}

export function reverseBetween2(head: ListNode | null, left: number, right: number): ListNode | null {
  if(!head || left === right) return head;
  // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
  const dummyNode = new ListNode(-1, head);

  let pre: ListNode | null = dummyNode;
  // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
  // 建议写在 for 循环里，语义清晰
  for (let i = 0; i < left - 1; i++) {
      pre = pre.next!;
  }

  // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
      rightNode = rightNode.next!;
  }

  // 第 3 步：切断出一个子链表（截取链表）
  let leftNode: ListNode | null = pre.next;
  let curr = rightNode.next;

  // 注意：切断链接
  pre.next = null;
  rightNode.next = null;

  // 第 4 步：同第 206 题，反转链表的子区间
  reverseLinkedList(leftNode);

  // 第 5 步：接回到原来的链表中
  pre.next = rightNode;
  leftNode!.next = curr;
  
  return dummyNode.next;
}


// @lc code=end


