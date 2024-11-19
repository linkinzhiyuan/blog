import { ListNode ,hasCycle, hasCycleSet } from './141.环形链表';

describe('hasCycle', () => {
  it('should return false for an empty linked list', () => {
    expect(hasCycle(null)).toBe(false);
  });

  it('should return false for a linked list with no cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    expect(hasCycle(head)).toBe(false);
  });

  it('should return true for a linked list with a cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = head.next; // create a cycle
    expect(hasCycle(head)).toBe(true);
  });

  it('should return true for a linked list with a single node and a cycle', () => {
    const head = new ListNode(1);
    head.next = head; // create a cycle
    expect(hasCycle(head)).toBe(true);
  });

  it('should return true for a linked list with two nodes and a cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = head; // create a cycle
    expect(hasCycle(head)).toBe(true);
  });
});

describe('hasCycleSet', () => {
  it('should return false for an empty linked list', () => {
    expect(hasCycleSet(null)).toBe(false);
  });

  it('should return false for a linked list with no cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    expect(hasCycleSet(head)).toBe(false);
  });

  it('should return true for a linked list with a cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = head.next; // create a cycle
    expect(hasCycleSet(head)).toBe(true);
  });

  it('should return true for a linked list with a single node and a cycle', () => {
    const head = new ListNode(1);
    head.next = head; // create a cycle
    expect(hasCycleSet(head)).toBe(true);
  });

  it('should return true for a linked list with two nodes and a cycle', () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = head; // create a cycle
    expect(hasCycleSet(head)).toBe(true);
  });
});
