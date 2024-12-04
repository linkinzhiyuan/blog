/*
 * @lc app=leetcode.cn id=173 lang=typescript
 * @lcpr version=20004
 *
 * [173] 二叉搜索树迭代器
 *
 * https://leetcode.cn/problems/binary-search-tree-iterator/description/
 *
 * algorithms
 * Medium (82.38%)
 * Likes:    785
 * Dislikes: 0
 * Total Accepted:    151.5K
 * Total Submissions: 183.8K
 * Testcase Example:  '["BSTIterator","next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]\n' +
  '[[[7,3,15,null,null,9,20]],[],[],[],[],[],[],[],[],[]]'
 *
 * 实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：
 * 
 * BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root
 * 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
 * boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
 * int next()将指针向右移动，然后返回指针处的数字。
 * 
 * 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。
 * 
 * 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。
 * 
 * 示例：
 * 
 * 输入
 * ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next",
 * "hasNext", "next", "hasNext"]
 * [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
 * 输出
 * [null, 3, 7, true, 9, true, 15, true, 20, false]
 * 
 * 解释
 * BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
 * bSTIterator.next();    // 返回 3
 * bSTIterator.next();    // 返回 7
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 9
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 15
 * bSTIterator.hasNext(); // 返回 True
 * bSTIterator.next();    // 返回 20
 * bSTIterator.hasNext(); // 返回 False
 * 
 * 提示：
 * 
 * 树中节点的数目在范围 [1, 10^5] 内
 * 0 <= Node.val <= 10^6
 * 最多调用 10^5 次 hasNext 和 next 操作
 * 
 * 进阶：
 * 
 * 你可以设计一个满足下述条件的解决方案吗？next() 和 hasNext() 操作均摊时间复杂度为 O(1) ，并使用 O(h) 内存。其中 h
 * 是树的高度。
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

class BSTIterator {
    private stack: Array<number>
    constructor(root: TreeNode | null) {
        this.stack = []
        this.inorder(root)
    }

    private inorder(node: TreeNode | null): void {
        if(!node) return;
        this.inorder(node.left)
        this.stack.push(node.val)
        this.inorder(node.right)
    }

    next(): number {
        return this.stack.shift()!
    }

    hasNext(): boolean {
        return !!this.stack.length
    }
}

class BSTIteratorRefactor {
    private stack: Array<TreeNode | null>

    constructor(root: TreeNode | null){
        this.stack = []
        this.leftInorder(root)
    }

    private leftInorder(node: TreeNode | null):void {
        let cur = node
        while(cur) {
            this.stack.push(cur)
            cur = cur.left
        }
    }

    next(): number {
        // 取出pop值
        const popNode = this.stack.pop()
        if(popNode?.right) {
            this.leftInorder(popNode.right)
        } 
        return popNode?.val!
    }

    hasNext(): boolean {
        return !!this.stack.length
    }
}

describe('BSTIterator', () => {
    it('should work', () => {
        const root = new TreeNode(7)
        root.left = new TreeNode(3)
        root.right = new TreeNode(15)
        root.right.left = new TreeNode(9)
        root.right.right = new TreeNode(20)

        const iterator = new BSTIterator(root)
        expect(iterator.next()).toBe(3)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(7)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(9)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(15)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(20)
        expect(iterator.hasNext()).toBe(false)
    })
})

describe('BSTIteratorRefactor', () => {
    it('should work', () => {
        const root = new TreeNode(7)
        root.left = new TreeNode(3)
        root.right = new TreeNode(15)
        root.right.left = new TreeNode(9)
        root.right.right = new TreeNode(20)

        const iterator = new BSTIteratorRefactor(root)
        expect(iterator.next()).toBe(3)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(7)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(9)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(15)
        expect(iterator.hasNext()).toBe(true)
        expect(iterator.next()).toBe(20)
        expect(iterator.hasNext()).toBe(false)
    })
})

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end




