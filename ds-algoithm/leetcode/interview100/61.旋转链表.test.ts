/*
 * @lc app=leetcode.cn id=61 lang=typescript
 * @lcpr version=20003
 *
 * [61] 旋转链表
 *
 * https://leetcode.cn/problems/rotate-list/description/
 *
 * algorithms
 * Medium (41.46%)
 * Likes:    1102
 * Dislikes: 0
 * Total Accepted:    422.9K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 * 
 * 示例 2：
 * 
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
 * 
 * 提示：
 * 
 * 链表中节点的数目在范围 [0, 500] 内
 * -100 <= Node.val <= 100
 * 0 <= k <= 2 * 10^9
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
// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val === undefined ? 0 : val)
//         this.next = (next === undefined ? null : next)
//     }
// }
/**
 * 思路：找到长度，先闭环，再找到新的头部断开
 * @param head 
 * @param k 
 * @returns 
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if(!head || k === 0 || !head.next) return head
  let cur = head;
  let len = 1; // 链表长度
  while(cur.next) {
    cur = cur.next;
    len++;
  }
  cur.next = head; // 闭环

  const step = len - k % len;
  if(step === len) {
    cur.next = null; // 断开闭环
    return head;
  }

  let newTail = head;
  for(let i = 0; i < step - 1; i++) {
    newTail = newTail.next!;
  }
  // 新头部
  const newHead = newTail.next!;
  newTail.next = null; // 断开闭环

  return newHead
};
// @lc code=end


