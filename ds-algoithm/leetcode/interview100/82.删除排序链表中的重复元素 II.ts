/*
 * @lc app=leetcode.cn id=82 lang=typescript
 * @lcpr version=20003
 *
 * [82] 删除排序链表中的重复元素 II
 *
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/
 *
 * algorithms
 * Medium (54.70%)
 * Likes:    1332
 * Dislikes: 0
 * Total Accepted:    488.3K
 * Total Submissions: 892.6K
 * Testcase Example:  '[1,2,3,3,4,4,5]'
 *
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,3,4,4,5]
 * 输出：[1,2,5]
 * 
 * 示例 2：
 * 
 * 输入：head = [1,1,1,2,3]
 * 输出：[2,3]
 * 
 * 提示：
 * 
 * 链表中节点数目在范围 [0, 300] 内
 * -100 <= Node.val <= 100
 * 题目数据保证链表已经按升序 排列
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
 * 遍历：cur 和 cur.next 对比，如果相同，cur.next = cur.next.next，否则 cur = cur.next
 * @param head 
 * @returns ListNode | null
 */
export function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);

  let cur = dummy;
  while(cur.next) {
    let next = cur.next;
    if(next.next && next.val === next.next.val) {
      while(next.next && next.val === next.next.val) {
        next = next.next;
      }
      cur.next = next.next;
      // next.next = null;
    } else {
      cur = cur?.next!;
    }
  }

  return dummy.next
};

export function deleteDuplicates2(head: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(-101);
  dummyHead.next = head;

  let prev: ListNode | null;
  let node = dummyHead;
  while(node !== null) {
      
      // 是否有删除后面重复节点的操作
      let deleteFlag = false
      while(node.next !== null && node.next.val === node.val) {
          deleteFlag = true;
          // 删除重复节点
          node.next = node.next.next;
      }

      // 如果有删除重复节点的操作，那也要删除当前节点
      if (deleteFlag) {
          prev!.next = node?.next;
      } else {
          prev = node;
      }
      node = node?.next!
  }
  return dummyHead.next;
}
// @lc code=end

