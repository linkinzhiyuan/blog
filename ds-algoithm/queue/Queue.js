/**
 * 队列
 * 队尾加入，队头出队，先进先出，后进后出
 * 用处：
 */
const TwoLinkedList = require('../linked-list/TwoLinkedList')
// 基于双向链表结构
class Queue {
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

    // 队尾入队
    enQueue(element){
        this.list.push(element)
    }

    // 对头出队
    deQueue(){
        return this.list.remove()
    }

    // 输出对头
    front(){
        return this.list.getNode(0)
    }
}


const testQueue = new Queue()
testQueue.enQueue(11)
testQueue.enQueue(22)
testQueue.enQueue(33)
testQueue.enQueue(44)
testQueue.enQueue(55)

console.log(testQueue.front())
console.log(testQueue.size())
console.log(testQueue.deQueue())
console.log(testQueue.front())
console.log(testQueue.size())
console.log(testQueue.deQueue())
console.log(testQueue.front())
console.log(testQueue.size())
console.log(testQueue.clear())
console.log(testQueue.size())

