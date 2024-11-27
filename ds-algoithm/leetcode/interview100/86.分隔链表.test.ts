/*
 * @lc app=leetcode.cn id=86 lang=typescript
 * @lcpr version=20003
 *
 * [86] 分隔链表
 *
 * https://leetcode.cn/problems/partition-list/description/
 *
 * algorithms
 * Medium (65.20%)
 * Likes:    870
 * Dislikes: 0
 * Total Accepted:    317.3K
 * Total Submissions: 486.5K
 * Testcase Example:  '[1,4,3,2,5,2]\n3'
 *
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 * 
 * 你应当 保留 两个分区中每个节点的初始相对位置。
 * 
 * 示例 1：
 * 
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 * 
 * 示例 2：
 * 
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 * 
 * 提示：
 * 
 * 链表中节点的数目在范围 [0, 200] 内
 * -100 <= Node.val <= 100
 * -200 <= x <= 200
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
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
/**
 * 思路：小于的节点一个组，大于或等于的节点一个组，最后小于的连接大于等于的节点，返回小于的节点
 * @param head 
 * @param x 
 */
function partition(head: ListNode | null, x: number): ListNode | null {
  let smallHead: ListNode | null = null;
  let smallTail: ListNode | null = null;
  let bigHead: ListNode | null = null;
  let bigTail: ListNode | null = null;

  let cur = head;
  while (cur) {
    if(cur.val < x) {
      if(!smallHead) {
        smallHead = cur;
        smallTail = cur;
      } else {
        // 存在小节点组的情况下，使用
        smallTail!.next = cur;
        smallTail = cur;
      }
    } else {
      if(!bigHead) {
        bigHead = cur;
        bigTail = cur;
      } else {
        bigTail!.next = cur;
        bigTail = cur;
      }
    }

    cur = cur.next;
  }

  if(smallHead) {
    smallTail!.next = bigHead;
  } else {
    smallHead = bigHead;
  }

  if(bigTail) {
    bigTail.next = null;
  }
  
  return smallHead;
};

function partitionRefactor(head: ListNode | null, x: number): ListNode | null {
  if(!head) return null;
  const smallHead = new ListNode(0);
  const bigHead = new ListNode(0);
  let smallCur = smallHead;
  let bigCur = bigHead;
  let cur = head;
  while (cur) {
    if(cur.val < x) {
      smallCur.next = cur;
      smallCur = cur;
    } else {
      bigCur.next = cur;
      bigCur = cur;
    }
    cur = cur.next!;
  }

  bigCur.next = null;
  smallCur.next = bigHead.next;
  return smallHead.next;
}

/**
 * 思路：小于前移，大于后移
 * @param head 
 * @param x
 */
// function partitionPoint(head: ListNode | null, x: number): ListNode | null {
//   let cur = head;
//   let prev: ListNode | null = null;
//   let next: ListNode | null = null;
//   while (cur) {
//     next = cur.next;
//     if(cur.val < x) {
//       if(prev) {
//         prev.next = next;
//         cur.next = head;
//         head = cur;
//       }
//     } else {
//       prev = cur;
//     }
//     cur = next;
//   }

//   return head;
// };

function partitionPoint(head: ListNode | null, x: number): ListNode | null {
  if (!head || !head.next) return head;
  const dummy = new ListNode(0, head);
  let prevSlow = dummy;
  let slow = head;
  let prevFast = head;
  let fast = head.next;
  while (fast) {
    if (slow.val < x) {
      prevSlow = slow;
      slow = slow.next!;
      prevFast = fast;
    } else if (fast.val < x) {
      prevFast.next = fast.next;
      prevSlow.next = fast;
      fast.next = slow;
      prevSlow = fast;
    } else {
      prevFast = fast;
    }
    fast = prevFast.next!;
  }
  return dummy.next;
}

function partitionPointRefactor(head: ListNode | null, x: number): ListNode | null {
  if (head === null) return null
  let p = new ListNode(0), fast = head.next
  let slow = p
  slow.next = head
  while (fast) {
    if (slow!.next!.val < x) {
        slow = slow.next!
        head = fast
    } else if (fast.val < x) {
        head.next = fast.next
        fast.next = slow.next
        slow = slow.next = fast
    } else head = fast
    fast = head.next
  }
  return p.next
}

function partitionFiber(head: ListNode | null, x: number): ListNode | null {
  let p = new ListNode(0,head), pTag = new ListNode(0)
  let prev = p
  let tag = pTag
  while (head) {
    if (head.val >= x) {
        prev.next = head.next
        tag = tag.next = head
    } else prev = head
    head = head.next
  }
  tag.next = null
  prev.next = pTag.next
  return p.next
}
// @lc code=end



describe('partition', () => {
  it('should return null if the input is null', () => {
    const result = partition(null, 3);
    expect(result).toBeNull();
  });

  it('should return the same list if the list has only one element', () => {
    const head = new ListNode(1);
    const result = partition(head, 3);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  it('should partition the list correctly when all elements are smaller than x', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const result = partition(head, 4);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partition the list correctly when all elements are greater than or equal to x', () => {
    const head = new ListNode(3, new ListNode(4, new ListNode(5)));
    const result = partition(head, 2);
    expect(result).toBe(head);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partition the list correctly when elements are both smaller and greater than or equal to x', () => {
    const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5)))));
    const result = partition(head, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(4);
    expect(result?.next?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });
});

describe('partitionRefactor', () => {
  it('should return null if the input is null', () => {
    const result = partitionRefactor(null, 3);
    expect(result).toBeNull();
  });

  it('should return the same list if the list has only one element', () => {
    const head = new ListNode(1);
    const result = partitionRefactor(head, 3);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  it('should partitionRefactor the list correctly when all elements are smaller than x', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const result = partitionRefactor(head, 4);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionRefactor the list correctly when all elements are greater than or equal to x', () => {
    const head = new ListNode(3, new ListNode(4, new ListNode(5)));
    const result = partitionRefactor(head, 2);
    expect(result).toBe(head);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionRefactor the list correctly when elements are both smaller and greater than or equal to x', () => {
    const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5)))));
    const result = partitionRefactor(head, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(4);
    expect(result?.next?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });
});

describe('partitionPoint', () => {
  it('should return null if the input is null', () => {
    const result = partitionPoint(null, 3);
    expect(result).toBeNull();
  });

  it('should return the same list if the list has only one element', () => {
    const head = new ListNode(1);
    const result = partitionPoint(head, 3);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  it('should partitionPoint the list correctly when all elements are smaller than x', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const result = partitionPoint(head, 4);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionPoint the list correctly when all elements are greater than or equal to x', () => {
    const head = new ListNode(3, new ListNode(4, new ListNode(5)));
    const result = partitionPoint(head, 2);
    expect(result).toBe(head);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionPoint the list correctly when elements are both smaller and greater than or equal to x', () => {
    const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5)))));
    const result = partitionPoint(head, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(4);
    expect(result?.next?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });
});

describe('partitionFiber', () => {
  it('should return null if the input is null', () => {
    const result = partitionFiber(null, 3);
    expect(result).toBeNull();
  });

  it('should return the same list if the list has only one element', () => {
    const head = new ListNode(1);
    const result = partitionFiber(head, 3);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  it('should partitionFiber the list correctly when all elements are smaller than x', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const result = partitionFiber(head, 4);
    expect(result).toBe(head);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionFiber the list correctly when all elements are greater than or equal to x', () => {
    const head = new ListNode(3, new ListNode(4, new ListNode(5)));
    const result = partitionFiber(head, 2);
    expect(result).toBe(head);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next).toBeNull();
  });

  it('should partitionFiber the list correctly when elements are both smaller and greater than or equal to x', () => {
    const head = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5)))));
    const result = partitionFiber(head, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(4);
    expect(result?.next?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.next?.val).toBe(5);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });
});
