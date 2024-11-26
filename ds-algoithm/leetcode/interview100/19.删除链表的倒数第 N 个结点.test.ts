import { removeNthFromEnd, ListNode } from './19.删除链表的倒数第 N 个结点';

describe('removeNthFromEnd', () => {
  it('should return null for an empty list', () => {
    const head: ListNode | null = null;
    const n = 1;
    expect(removeNthFromEnd(head, n)).toBeNull();
  });

  it('should return null for a list with one node and n = 1', () => {
    const head = new ListNode(1);
    const n = 1;
    expect(removeNthFromEnd(head, n)).toBeNull();
  });

  it('should remove the first node from a list', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const n = 3;
    const expected = new ListNode(2, new ListNode(3));
    expect(removeNthFromEnd(head, n)).toEqual(expected);
  });

  it('should remove the last node from a list', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const n = 1;
    const expected = new ListNode(1, new ListNode(2));
    expect(removeNthFromEnd(head, n)).toEqual(expected);
  });

  it('should remove a node from a list with multiple nodes', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
    const n = 2;
    const expected = new ListNode(1, new ListNode(2, new ListNode(4)));
    expect(removeNthFromEnd(head, n)).toEqual(expected);
  });

  it('should return the original list if n is greater than the length of the list', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const n = 4;
    expect(removeNthFromEnd(head, n)).toEqual(head);
  });
});

import { removeNthFromEndPoint } from './19.删除链表的倒数第 N 个结点'


describe('removeNthFromEndPoint', () => {
  it('should return null for an empty list', () => {
    const head: ListNode | null = null;
    const n = 1;
    expect(removeNthFromEndPoint(head, n)).toBeNull();
  });

  it('should return null for a list with one node and n = 1', () => {
    const head = new ListNode(1);
    const n = 1;
    expect(removeNthFromEndPoint(head, n)).toBeNull();
  });

  it('should remove the first node from a list', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const n = 3;
    const expected = new ListNode(2, new ListNode(3));
    expect(removeNthFromEndPoint(head, n)).toEqual(expected);
  });

  it('should remove the last node from a list', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    const n = 1;
    const expected = new ListNode(1, new ListNode(2));
    expect(removeNthFromEndPoint(head, n)).toEqual(expected);
  });

  it('should remove a node from a list with multiple nodes', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
    const n = 2;
    const expected = new ListNode(1, new ListNode(2, new ListNode(4)));
    expect(removeNthFromEndPoint(head, n)).toEqual(expected);
  });

  // it('should return the original list if n is greater than the length of the list', () => {
  //   const head = new ListNode(1, new ListNode(2, new ListNode(3)));
  //   const n = 4;
  //   expect(removeNthFromEndPoint(head, n)).toEqual(head);
  // });
});
