
/**
 * 创建一个Node类
 */

class Node {
    constructor(element,next){
        this.element = element
        this.next = next
    }
}


/**
 * 单向链表
 */

class SingleLinedList {

    constructor(){
        this.first = null // 头部节点
        this.size = 0 // 链表长度
    }

    // 清空链表
    clear () {
        this.size = 0
        this.first = null
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

        // 删除头部
        let current = this.first
        if(index === 0){ 
            this.first = current.next
        } else { // 删除中间位置和最后节点
            // 取当前index的前一个节点
            let prev = this.getNode(index - 1),
            current = prev.next // 更新当前节点
            prev.next = current.next
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
        
        // 如果是空链表 或者是从头部添加
        if(this.first === null || index === 0){ 
            this.first = new Node(element,this.first)
        } else if(index === this.size || index === undefined) { // 从最后面追加 或者 不输入index的情况默认从最后面追加
            const last = this.getNode(this.size - 1)
            last.next = new Node(element,null)
        } else { // 中间位置添加
            const prev = this.getNode(index - 1) // 获取index的前一个节点
            prev.next = new Node(element,prev.next)
        }
        this.size ++
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
            if(current.next === null){
                res.push(`${current.element}_${current.next}`)
            } else {
                res.push(`${current.element}_${current.next.element}`)
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

let testLinked = new SingleLinedList()
testLinked.add(10)
testLinked.add(20)
testLinked.add(30)
testLinked.add(40)

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
