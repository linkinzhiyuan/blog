/**
 * 双端队列：对头队尾都能添加和删除
 */
const TwoLinkedList = require('../linked-list/TwoLinkedList')

class Deque {
    constructor(){
        this.list = new TwoLinkedList()
    }
    // 长度
    size(){
        return this.list.size
    }
    // 清空
    clear(){
        this.list.clear()
    }
    // 是否为空
    isEmpty(){
        return this.list.size === 0
    }
    // 队头添加
    unshift(element){
        this.list.add(element,0)
    }
    // 队头删除 返回删除项
    shift(){
        return this.list.remove(0)
    }

    // 队尾添加
    push(element){
        this.list.push(element)
    }
    // 队尾删除 返回删除元素
    pop(){
        return this.list.remove(this.size() - 1)
    }

    // 取出队头元素
    getFirst(){
        return this.list.getNode(0)
    }

    // 取出队尾元素
    getLast(){
        return this.list.getNode(this.size() - 1)
    }
}

const testQueue = new Deque()
testQueue.unshift(11)
testQueue.unshift(22)
testQueue.push(33)
testQueue.push(44) // [22,11,33,44]

console.log(testQueue.size())
console.log(testQueue.getFirst())
console.log(testQueue.getLast())
console.log('pop',testQueue.pop())
console.log('shift',testQueue.shift())
console.log(testQueue.getFirst())
console.log(testQueue.getLast())
console.log(testQueue.isEmpty())
console.log(testQueue.size())