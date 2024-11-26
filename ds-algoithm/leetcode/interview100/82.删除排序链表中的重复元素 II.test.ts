import { deleteDuplicates, ListNode } from './82.删除排序链表中的重复元素 II';

describe('deleteDuplicates', () => {
  it('should return null for empty linked list', () => {
    expect(deleteDuplicates(null)).toBeNull();
  });

  it('should return original linked list with no duplicates', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    expect(deleteDuplicates(head)).toEqual(head);
  });

  it('should remove consecutive duplicates', () => {
    const head = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3))));
    const expected = new ListNode(2, new ListNode(3));
    expect(deleteDuplicates(head)).toEqual(expected);
  });

  it('should not remove non-consecutive duplicates', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(3))));
    const expected = new ListNode(1, new ListNode(3));
    expect(deleteDuplicates(head)).toEqual(expected);
  });

  it('should return null for linked list with all duplicates', () => {
    const head = new ListNode(1, new ListNode(1, new ListNode(1)));
    expect(deleteDuplicates(head)).toBeNull();
  });
});


import { deleteDuplicates2 } from './82.删除排序链表中的重复元素 II';

describe('deleteDuplicates2', () => {
  it('should return null for empty linked list', () => {
    expect(deleteDuplicates2(null)).toBeNull();
  });

  it('should return original linked list with no duplicates', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3)));
    expect(deleteDuplicates2(head)).toEqual(head);
  });

  it('should remove consecutive duplicates', () => {
    const head = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3))));
    const expected = new ListNode(2, new ListNode(3));
    expect(deleteDuplicates2(head)).toEqual(expected);
  });

  it('should not remove non-consecutive duplicates', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(3))));
    const expected = new ListNode(1, new ListNode(3));
    expect(deleteDuplicates2(head)).toEqual(expected);
  });

  it('should return null for linked list with all duplicates', () => {
    const head = new ListNode(1, new ListNode(1, new ListNode(1)));
    expect(deleteDuplicates2(head)).toBeNull();
  });
});
