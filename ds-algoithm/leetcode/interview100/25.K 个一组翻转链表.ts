/*
 * @lc app=leetcode.cn id=25 lang=typescript
 * @lcpr version=20003
 *
 * [25] K 个一组翻转链表
 *
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/description/
 *
 * algorithms
 * Hard (68.72%)
 * Likes:    2435
 * Dislikes: 0
 * Total Accepted:    694.9K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * 
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 * 
 * 示例 2：
 * 
 * 输入：head = [1,2,3,4,5], k = 3
 * 输出：[3,2,1,4,5]
 * 
 * 提示：
 * 
 * 链表中的节点数目为 n
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 * 
 * 进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？
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
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

/**
 * 思路：
 * 1. 遍历链表，每k个一组，反转链表
 * 2. 反转链表后，将反转后的链表连接到原链表上
 * 3. 返回反转后的链表
 * @param head 
 * @param k 
 * @returns ListNode | null
 */
export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || k === 1) return head;

    // Create dummy node
    let dummy = new ListNode(0, head);
    let prev = dummy;

    // 计算长度
    let cur: ListNode = head;
    let len = 0;
    while (cur) {
        len++;
        cur = cur.next!;
    }

    cur = head;
    while(len >= k) {
      let next: ListNode | null = cur?.next!;

      for(let i = 0; i < k - 1; i++) {
        cur.next = next?.next!;
        next.next = prev.next;
        prev.next = next;
        next = cur.next;
      }
      prev = cur;
      cur = cur.next!;
      len -= k;
    }

    return dummy.next;
}

// @lc code=end

