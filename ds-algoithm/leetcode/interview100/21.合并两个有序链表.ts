/*
 * @lc app=leetcode.cn id=21 lang=typescript
 * @lcpr version=20003
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode.cn/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (67.18%)
 * Likes:    3636
 * Dislikes: 0
 * Total Accepted:    1.9M
 * Total Submissions: 2.8M
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例 1：
 * 
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 * 
 * 示例 2：
 * 
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 
 * 示例 3：
 * 
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 * 
 * 提示：
 * 
 * 两个链表的节点数目范围是 [0, 50]
 * -100 <= Node.val <= 100
 * l1 和 l2 均按 非递减顺序 排列
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

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if(list1 === null && list2 === null) return null
  if(list1 === null) return list2
  if(list2 === null) return list1
  const result = new ListNode();
  let current = result;
  while (list1 && list2) {
    if(list1.val < list2.val) {
      current.val = list1.val;
      list1 = list1.next
    } else {
      current.val = list2.val;
      list2 = list2.next
    }
    current.next = new ListNode(0);
    current = current.next;
  }

  if(list1) {
    current.val = list1.val;
    current.next = list1.next;
  } else if(list2) {
    current.val = list2.val;
    current.next = list2.next;
  }

  return result
};

/**
 * 递归
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
export function mergeTwoListsRecursion(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if(list1 === null && list2 === null) return null
  if(!list1) {
    return list2
  } else if(!list2) {
    return list1
  } else if (list1.val < list2.val) {
    list1.next = mergeTwoListsRecursion(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoListsRecursion(list1, list2.next)
    return list2
  }
}

export function mergeTwoListsRefactor(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const result = new ListNode();
  let current = result;
  while (list1 && list2) {
    if(list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next
    } else {
      current.next = list2;
      list2 = list2.next
    }
    current = current.next;
  }

  current.next = list1 || list2;
  return result.next
}
// @lc code=end
