import { ListNode, reverseKGroup } from './25.K 个一组翻转链表';

describe('reverseKGroup', () => {
  it('should reverse nodes in k-group', () => {
    // Test case 1: k = 2
    let head1 = new ListNode(1);
    head1.next = new ListNode(2);
    head1.next.next = new ListNode(3);
    head1.next.next.next = new ListNode(4);
    head1.next.next.next.next = new ListNode(5);
    
    let result1 = reverseKGroup(head1, 2);
    expect(result1?.val).toBe(2);
    expect(result1?.next?.val).toBe(1);
    expect(result1?.next?.next?.val).toBe(4);
    expect(result1?.next?.next?.next?.val).toBe(3);
    expect(result1?.next?.next?.next?.next?.val).toBe(5);

    // Test case 2: k = 3
    let head2 = new ListNode(1);
    head2.next = new ListNode(2);
    head2.next.next = new ListNode(3);
    head2.next.next.next = new ListNode(4);
    head2.next.next.next.next = new ListNode(5);

    let result2 = reverseKGroup(head2, 3);
    expect(result2?.val).toBe(3);
    expect(result2?.next?.val).toBe(2);
    expect(result2?.next?.next?.val).toBe(1);
    expect(result2?.next?.next?.next?.val).toBe(4);
    expect(result2?.next?.next?.next?.next?.val).toBe(5);

    // Test case 3: k = 1 (no reversal needed)
    let head3 = new ListNode(1);
    head3.next = new ListNode(2);
    head3.next.next = new ListNode(3);

    let result3 = reverseKGroup(head3, 1);
    expect(result3?.val).toBe(1);
    expect(result3?.next?.val).toBe(2);
    expect(result3?.next?.next?.val).toBe(3);

    // Test case 4: empty list
    expect(reverseKGroup(null, 2)).toBeNull();

    // Test case 5: k > list length
    let head5 = new ListNode(1);
    head5.next = new ListNode(2);

    let result5 = reverseKGroup(head5, 3);
    expect(result5?.val).toBe(1);
    expect(result5?.next?.val).toBe(2);
  });
});
