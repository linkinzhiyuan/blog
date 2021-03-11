/**
 * 栈：先进后出，后进先出，只能顶部出栈顶部入栈
 * 用处：浏览器的前进和后退 使用两个栈 一个用来记录历史，便于回退；第二个用于后退后再次入另外一个栈用于前进
 */

class Stack {

    constructor(){
        this.list = []
    }
    
    // 清空栈
    clear () {
        this.list = []
    }

    // 栈的长度size
    size (){
        return this.list.length
    }

    // 栈是否为空
    isEmpty (){
        return this.list.length
    }

    // 顶部入栈
    topPush (element){
        this.list.push(element)
    }

    // 顶部出栈
    topPop (){
        return this.list.pop()
    }

    // 输出顶部元素
    top (){
        return this.list[this.size() - 1]
    }

    // 打印
    toString (){
        return this.list.toString()
    }
}


// const testStack = new Stack()
// testStack.topPush(0)
// testStack.topPush(1)
// testStack.topPush(2)
// testStack.topPush(3)

// // 出栈
// testStack.topPop()
// testStack.topPop()

// console.log(testStack.top())

// console.log(testStack.toString())


