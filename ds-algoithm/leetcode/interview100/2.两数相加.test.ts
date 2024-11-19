import { addTwoNumbers, ListNode } from './2.两数相加';

describe('addTwoNumbers function', () => {
  it('should add two non-empty linked lists with no carry', () => {
    const l1 = new ListNode(1, new ListNode(2, new ListNode(3)));
    const l2 = new ListNode(4, new ListNode(5, new ListNode(6)));
    const result = addTwoNumbers(l1, l2); // [5, 7, 9]
    expect(result!.val).toBe(5);
    expect(result!.next!.val).toBe(7);
    expect(result!.next!.next!.val).toBe(9);
  });

  it('should add two non-empty linked lists with carry', () => {
    const l1 = new ListNode(9, new ListNode(9, new ListNode(9)));
    const l2 = new ListNode(1);
    const result = addTwoNumbers(l1, l2);
    expect(result!.val).toBe(0);
    expect(result!.next!.val).toBe(0);
    expect(result!.next!.next!.val).toBe(0);
    expect(result!.next!.next!.next!.val).toBe(1);
  });

  it('should add one empty linked list and one non-empty linked list', () => {
    const l1 = new ListNode(1, new ListNode(2, new ListNode(3)));
    const l2: ListNode | null = null;
    const result = addTwoNumbers(l1, l2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
  });

  it('should add two empty linked lists', () => {
    const l1: ListNode | null = null;
    const l2: ListNode | null = null;
    const result = addTwoNumbers(l1, l2);
    expect(result!.val).toBe(0);
    expect(result!.next).toBeNull();
  });

  it('should add linked lists with different lengths', () => {
    const l1 = new ListNode(1, new ListNode(2));
    const l2 = new ListNode(3, new ListNode(4, new ListNode(5)));
    const result = addTwoNumbers(l1, l2);
    expect(result!.val).toBe(4);
    expect(result!.next!.val).toBe(6);
    expect(result!.next!.next!.val).toBe(5);
  });
});
