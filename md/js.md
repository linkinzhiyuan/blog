#### 1.null 和 undefined 区别
- `null` 表示一个无的对象，该出不应该有值，`undefined`表示未定义
- 转化成数字的结果不同，`Number(null) === 0` 而 `Number(undefined) === NaN`

使用场景上：

`null`: 
- 可以作为函数的参数，表示该函数的参数不是对象
- 作为对象原型链的终点

`undefined`:
- 变量被声明了，但没有赋值时，就等于`undefined`
- 调用函数时，应该提供的参数没有提供，改参数就是`undefined`
- 对象没有赋值属性，该属性的值为`undefined`
- 函数没有返回值时，默认返回`undefined`


#### 2.Event loop的理解

微任务 Microtask：`Promise.then()/.catch()`,`Node独有的process.nextTick`,`MutaionObserver`,`Promise为基础开发的技术，fetch API,V8的垃圾回收过程`,

宏任务 Macrotask：`script`,`setTimeout`,`setInterval`,`setImmediate`,`I/O`,`UI rendering`

##### 1.Event loop 执行顺序：
- 一开始整个脚本作为一个宏任务执行
- 执行的过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
- 当前宏任务执行完出队，检查微任务列表，有的话则一次执行，直到全部执行完毕
- 执行浏览器的UI线程的渲染工作
- 检查是否有`Web Worker`任务，有则执行
- 执行完本轮的宏任务，则回到2进行下一轮的宏任务

[45道Promise面试题](https://juejin.cn/post/6844904077537574919#heading-11)
[原生JS灵魂之问(下), 冲刺🚀进阶最后一公里](https://juejin.cn/post/6844904004007247880)
```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 1-7-6-8 -2-4-3-5  9-11-10-12
```

##### 2.setTimeout Promise Async/Await 的区别
##### 3.什么是上下文执行栈，Event Loop

