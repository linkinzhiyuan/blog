/**
 * 用栈实现队列: 两个栈实现inStack,outStack，
 * inStack入栈使用，当出栈时inStack的全部入栈到outStack，再次出栈
 * 再次入栈进入inStack,出栈是判断outStack是否为空，为空则inStack全部到OutStack,不为空继续从顶部出栈
 * https://leetcode-cn.com/problems/implement-queue-using-stacks/
 */
const MyQueue = function() {
    // 新建两个栈
    this.inStack = []
    this.outStack = []
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.inStack.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this.inToout()
    return this.outStack.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    this.inToout()
    return this.outStack[this.outStack.length - 1]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.inStack.length === 0 && this.outStack.length === 0
};

MyQueue.prototype.inToout = function(){
    // 当outStack为空的情况
    if(!this.outStack.length){
        while(this.inStack.length){
            this.outStack.push(this.inStack.pop())
        }
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */