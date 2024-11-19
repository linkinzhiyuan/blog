import { mergeTwoLists, ListNode } from './21.合并两个有序链表';

describe('mergeTwoLists function', () => {
  it('should merge two non-empty linked lists with distinct values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2 = new ListNode(2, new ListNode(4, new ListNode(6)));
    const result = mergeTwoLists(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(4);
    expect(result!.next!.next!.next!.next!.val).toBe(5);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(6);
  });

  it('should merge two non-empty linked lists with duplicate values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(3)));
    const list2 = new ListNode(2, new ListNode(3, new ListNode(4)));
    const result = mergeTwoLists(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(4);
  });

  it('should merge one empty linked list and one non-empty linked list', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2: ListNode | null = null;
    const result = mergeTwoLists(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(3);
    expect(result!.next!.next!.val).toBe(5);
  });

  it('should merge two empty linked lists', () => {
    const list1: ListNode | null = null;
    const list2: ListNode | null = null;
    const result = mergeTwoLists(list1, list2);
    expect(result).toBe(null);
  });
});

import { mergeTwoListsRecursion } from './21.合并两个有序链表';


describe('mergeTwoListsRecursion function', () => {
  it('should merge two non-empty linked lists with distinct values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2 = new ListNode(2, new ListNode(4, new ListNode(6)));
    const result = mergeTwoListsRecursion(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(4);
    expect(result!.next!.next!.next!.next!.val).toBe(5);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(6);
  });

  it('should merge two non-empty linked lists with duplicate values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(3)));
    const list2 = new ListNode(2, new ListNode(3, new ListNode(4)));
    const result = mergeTwoListsRecursion(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(4);
  });

  it('should merge one empty linked list and one non-empty linked list', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2: ListNode | null = null;
    const result = mergeTwoListsRecursion(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(3);
    expect(result!.next!.next!.val).toBe(5);
  });

  it('should merge two empty linked lists', () => {
    const list1: ListNode | null = null;
    const list2: ListNode | null = null;
    const result = mergeTwoListsRecursion(list1, list2);
    expect(result).toBe(null);
  });
});

import { mergeTwoListsRefactor } from './21.合并两个有序链表';


describe('mergeTwoListsRefactor function', () => {
  it('should merge two non-empty linked lists with distinct values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2 = new ListNode(2, new ListNode(4, new ListNode(6)));
    const result = mergeTwoListsRefactor(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(4);
    expect(result!.next!.next!.next!.next!.val).toBe(5);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(6);
  });

  it('should merge two non-empty linked lists with duplicate values', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(3)));
    const list2 = new ListNode(2, new ListNode(3, new ListNode(4)));
    const result = mergeTwoListsRefactor(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(2);
    expect(result!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.val).toBe(3);
    expect(result!.next!.next!.next!.next!.next!.val).toBe(4);
  });

  it('should merge one empty linked list and one non-empty linked list', () => {
    const list1 = new ListNode(1, new ListNode(3, new ListNode(5)));
    const list2: ListNode | null = null;
    const result = mergeTwoListsRefactor(list1, list2);
    expect(result!.val).toBe(1);
    expect(result!.next!.val).toBe(3);
    expect(result!.next!.next!.val).toBe(5);
  });

  it('should merge two empty linked lists', () => {
    const list1: ListNode | null = null;
    const list2: ListNode | null = null;
    const result = mergeTwoListsRefactor(list1, list2);
    expect(result).toBe(null);
  });
});
