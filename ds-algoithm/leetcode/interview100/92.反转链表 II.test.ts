import { ListNode, reverseBetween } from './92.反转链表 II';

describe('reverseBetween', () => {
  it('should reverse a single node', () => {
    const head = new ListNode(1);
    const result = reverseBetween(head, 1, 1);
    expect(result?.val).toBe(1);
  });

  it('should reverse multiple nodes', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    const result = reverseBetween(head, 1, 3);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(1);
  });

  it('should reverse nodes at the beginning of the list', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    const result = reverseBetween(head, 1, 2);
    expect(result?.val).toBe(2);
    expect(result?.next?.val).toBe(1);
    expect(result?.next?.next?.val).toBe(3);
  });

  it('should reverse nodes at the end of the list', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    const result = reverseBetween(head, 2, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(3);
    expect(result?.next?.next?.val).toBe(2);
  });

  it('should reverse nodes in the middle of the list', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    const result = reverseBetween(head, 2, 3);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(3);
    expect(result?.next?.next?.val).toBe(2);
    expect(result?.next?.next?.next?.val).toBe(4);
  });

  it('should handle edge case where left and right are equal', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    const result = reverseBetween(head, 2, 2);
    expect(result?.val).toBe(1);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(3);
  });

  it('should handle edge case where left is 1', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    const result = reverseBetween(head, 1, 3);
    expect(result?.val).toBe(3);
    expect(result?.next?.val).toBe(2);
    expect(result?.next?.next?.val).toBe(1);
  });
});
