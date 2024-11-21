import { _Node,copyRandomList } from './138.随机链表的复制';

describe('copyRandomList', () => {
  it('should return null if head is null', () => {
    expect(copyRandomList(null)).toBeNull();
  });

  it('should return a copy of a single node list', () => {
    const head = new _Node(1);
    const copy = copyRandomList(head);
    expect(copy).not.toBeNull();
    expect(copy?.val).toBe(1);
    expect(copy?.next).toBeNull();
  });

  it('should return a copy of a list with multiple nodes', () => {
    const head = new _Node(1);
    head.next = new _Node(2);
    head.next.next = new _Node(3);
    const copy = copyRandomList(head);
    expect(copy).not.toBeNull();
    expect(copy?.val).toBe(1);
    expect(copy?.next).not.toBeNull();
    expect(copy?.next?.val).toBe(2);
    expect(copy?.next?.next).not.toBeNull();
    expect(copy?.next?.next?.val).toBe(3);
    expect(copy?.next?.next?.next).toBeNull();
  });

  it('should correctly copy the random pointers', () => {
    const head = new _Node(1);
    const node2 = new _Node(2);
    const node3 = new _Node(3);
    head.next = node2;
    node2.next = node3;
    head.random = node3;
    node2.random = node2;
    node3.random = head;
    const copy = copyRandomList(head);
    expect(copy).not.toBeNull();
    expect(copy?.random).toBe(copy?.next?.next);
    expect(copy?.next?.random).toBe(copy?.next);
    expect(copy?.next?.next?.random).toBe(copy);
  });
});

import { copyRandomListRecursion } from './138.随机链表的复制';

describe('copyRandomListRecursion', () => {
  it('should return null if head is null', () => {
    expect(copyRandomListRecursion(null)).toBeNull();
  });

  it('should return a copy of a single node list', () => {
    const head = new _Node(1);
    const copy = copyRandomListRecursion(head);
    expect(copy).not.toBeNull();
    expect(copy?.val).toBe(1);
    expect(copy?.next).toBeNull();
  });

  it('should return a copy of a list with multiple nodes', () => {
    const head = new _Node(1);
    head.next = new _Node(2);
    head.next.next = new _Node(3);
    const copy = copyRandomListRecursion(head);
    expect(copy).not.toBeNull();
    expect(copy?.val).toBe(1);
    expect(copy?.next).not.toBeNull();
    expect(copy?.next?.val).toBe(2);
    expect(copy?.next?.next).not.toBeNull();
    expect(copy?.next?.next?.val).toBe(3);
    expect(copy?.next?.next?.next).toBeNull();
  });

  it('should correctly copy the random pointers', () => {
    const head = new _Node(1);
    const node2 = new _Node(2);
    const node3 = new _Node(3);
    head.next = node2;
    node2.next = node3;
    head.random = node3;
    node2.random = node2;
    node3.random = head;
    const copy = copyRandomListRecursion(head);
    expect(copy).not.toBeNull();
    expect(copy?.random).toBe(copy?.next?.next);
    expect(copy?.next?.random).toBe(copy?.next);
    expect(copy?.next?.next?.random).toBe(copy);
  });
});

