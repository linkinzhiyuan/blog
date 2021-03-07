
/**
 * 创建一个Node类
 */

class Node {
    constructor(prev,element,next){
        this.prev = prev
        this.element = element
        this.next = next
    }
}


/**
 * 双向链表
 */

class TwoLinedList {

    constructor(){
        this.first = this.last = null // 头部节点
        this.size = 0 // 链表长度
    }

    // 清空链表
    clear () {
        this.size = 0
        this.first = this.last = null
    }

    // 获取某个节点元素
    get (index) {
        this.rangeCheck(index)

        return this.getNode(index).element
    }

    // 删除某个位置index节点元素 返回当前节点ele
    remove (index) {
        // 边界问题
        this.rangeCheck(index)

        let current = this.getNode(index),
        prev = current.prev,   // 前一个节点
        next = current.next   // 后一个节点

        if(prev === null){ // 删除头部
            this.first = next  // 后节点成为头节点
        } else {
           prev.next = next     // 前一个和后一个节点连接
        }

        if(next === null) { // 删除最后一个
            this.last = prev    
        } else {
            next.prev = prev    // 后一个的prev指向前一个节点
        }

        this.size --

        return current.element
    }

    // 删除某个节点ele 返回删除节点的位置index
    removeEle (ele) {
        // 查看是否有这个ele
        const index = this.indexOf(ele)
        if(index !== -1){
            this.remove(index)
        }

        return index
    }

    // 添加节点
    add (element,index) {
        this.rangeCheckForAdd(index)

        // size=0,index=0 往后面追加 或者空链表
        if(index === this.size ){
            const oldLast = this.last
            this.last = new Node(oldLast,element,null)

            if(oldLast === null){ // 空链表
                this.first = this.last
            } else {
                oldLast.next = this.last
            }
        } else { // 中间位置和头部
            const next = this.getNode(index)
            const prev = next.prev
            const current = new Node(prev,element,next)
            next.prev = current

            if(index === 0){ // 头部添加
                this.first = current
            } else {
                prev.next = current
            }
        }

        this.size ++
    }

    // 尾部追加
    push (element) {
        this.add(element,this.size)
    }

    // 获取index位置的对应的节点对象
    getNode (index) {
        this.rangeCheck(index)

        let node = this.first
        for(let i = 0; i < index; i++){
            node = node.next
        }
        return node
    }

    // 查找节点的位置
    indexOf (ele) {
        let current = this.first,i = 0
        while(current){
            if(current.element === ele) return i
            i++
            current = current.next
        }
        return -1
    }

    // 边界控制
    rangeCheck (index) {
        if(index < 0 || index >= this.size){
            throw new Error(`index is out of bounds! index:${index} size:${this.size}`)
        }
    }
    // 边界控制 添加节点，index可以是size
    rangeCheckForAdd (index) {
        if(index < 0 || index > this.size){
            throw new Error(`index is out of bounds! index:${index} size:${this.size}`)
        }
    }

    // 输出数组格式 从头部节点循环输出
    to_Array () {
        const res = []
        let current = this.first
        while(current){
            if(current.prev === null){
                res.push(`${current.prev}_${current.element}_${current.next.element}`)
            } else if(current.next === null){
                res.push(`${current.prev.element}_${current.element}_${current.next}`)
            } else {
                res.push(`${current.prev.element}_${current.element}_${current.next.element}`)
            }
            
            current = current.next
        }
        return res
    }
    toArray () {
        const res = []
        let current = this.first
        while(current){
            res.push(current.element)
            current = current.next
        }
        return res
    }

    // 输出其他的格式
    toString () {
        return this.toArray().join(',')
    }
}

let testLinked = new TwoLinedList()
testLinked.push(10)
testLinked.push(20)
testLinked.push(30)
testLinked.push(40)

testLinked.add(33,2) // [10,20,33,30,40]
testLinked.add(44,5) // [10,20,33,30,40,44]
testLinked.add(11,0) // [11,10,20,33,30,40,44]
testLinked.add(55,3) // [11,10,20,55,33,30,40,44]
// console.log(testLinked.toArray())
// console.log(testLinked.size)

// 删除位置节点
// testLinked.remove(0)
// testLinked.remove(2)
// testLinked.remove(6)
// testLinked.remove(5)

// 删除目标节点
// console.log(testLinked.removeEle(11))
// console.log(testLinked.removeEle(44))
// console.log(testLinked.removeEle(23))

// 获取位置节点
// console.log(testLinked.get(0),testLinked.get(1),testLinked.get(5))
// console.log(testLinked.get(7))

// 查找
// console.log(testLinked.indexOf(10))
// console.log(testLinked.indexOf(55))
// console.log(testLinked.indexOf(11))
// console.log(testLinked.indexOf(1))


// testLinked.clear() // 清空
console.log(testLinked.toArray())
console.log(testLinked.to_Array())
// console.log(testLinked.toString())
