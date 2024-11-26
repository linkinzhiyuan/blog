/*
 * @lc app=leetcode.cn id=19 lang=typescript
 * @lcpr version=20003
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (49.62%)
 * Likes:    2975
 * Dislikes: 0
 * Total Accepted:    1.6M
 * Total Submissions: 3.2M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,4,5], n = 2 一共5个，正向是第 5-2 = 3
 * 输出：[1,2,3,5]
 * 
 * 示例 2：
 * 
 * 输入：head = [1], n = 1 1
 * 输出：[]
 * 
 * 示例 3：
 * 
 * 输入：head = [1,2], n = 1 2-1 = 1
 * 输出：[1]
 * 
 * 提示：
 * 
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 */

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
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

/**
 * 思路：统计一共多少个节点，从正向删除的第几位（len-n+1）, 两次循环
 * @param head 
 * @param n 
 */
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head)
  let cur = dummy.next
  let len = 0 // 链表总长度
  while(cur) {
    len += 1
    cur = cur.next
  }

  if(n > len) return dummy.next

  cur = dummy // 从-1位置开始
  const target = len - n // 从删除的前一位的next跳过
  let i = 0
  while(i <= target) {
    if(i === target) {
      cur.next = cur?.next?.next!
      break
    } else {
      i += 1
      cur = cur?.next!
    }
  }

  // for(let i = 0; i < target; i++) {
  //   cur = cur?.next!
  // }

  // cur.next = cur?.next?.next!
  return dummy.next
};

/**
 * 思路： 一次循环, 双指针, 快慢指针, 快指针先走 n+1 步, 然后快慢指针同时移动，直到快指针到达末尾, 删除目标节点
 * @param head
 * @param n
 * @returns
 */
export function removeNthFromEndPoint(head: ListNode | null, n: number): ListNode | null {
  if(!head) return head
  // 创建一个虚拟节点，方便处理边界情况
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;

  // 让 fast 指针先移动 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast!.next;
  }

  // 同时移动 fast 和 slow，直到 fast 到达链表末尾
  while (fast !== null) {
    fast = fast.next;
    slow = slow!.next;
  }

  // 删除目标节点
  slow!.next = slow!.next!.next;

  return dummy.next;
}
// @lc code=end


