import { reverseList, ListNode } from './206.反转链表';

describe('reverseList', () => {
  it('should return null for empty list', () => {
    expect(reverseList(null)).toBeNull();
  });

  it('should reverse a single node', () => {
    const head = new ListNode(1);
    const reversed = reverseList(head);
    expect(reversed?.val).toBe(1);
    expect(reversed?.next).toBeNull();
  });

  it('should reverse a list of two nodes', () => {
    const head = new ListNode(1, new ListNode(2));
    const reversed = reverseList(head);
    expect(reversed?.val).toBe(2);
    expect(reversed?.next?.val).toBe(1);
    expect(reversed?.next?.next).toBeNull();
  });

  it('should reverse a list of three nodes', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const reversed = reverseList(head);
    expect(reversed?.val).toBe(3);
    expect(reversed?.next?.val).toBe(2);
    expect(reversed?.next?.next?.val).toBe(1);
    expect(reversed?.next?.next?.next).toBeNull();
  });
});
