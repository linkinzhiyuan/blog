
##### 伴鱼

1.输出顺序
```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(data => {
    console.log(3);
  });
});
new Promise((resolve) => {
  resolve()
  console.log(4)
}).then(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  });
}).then(() => console.log(7))
console.log(8); 
//1 4 8 5 7 2 3 6 
```


2.打印出的内容
```javascript
console.log(fish1,fish2,fish3);
// undefined undefined undefined   
var fish1 = function(){
  console.log('welcome to Palfish-1')
}

var fish1,fish2,fish3;

function fish2(){
  console.log('welcome to Palfish-2')
}
var fish3 = 'welcome to Palfish-3'
var fish1,fish2,fish3;
console.log(fish1,fish2,fish3);    
f1() f2() 'welcome to Palfish-3'
```

3.代码输出
```javascript
var nickname = "LiLei";
function Person(name){
  this.nickname = name;
  this.sayHi = function() {
    console.log(this.nickname);
    setTimeout(function(){
      console.log(this.nickname);
    }, 1000);
  }
}
var Male = {
  nickname: 'xiaofang',
  sayHi: () => {
    console.log(this.nickname);
  }
}
var person = new (Person.bind(Male, 'XiaoHong'))();   
person.sayHi(); // ==> XiaoHong LiLei
```



4.代码输出: 形参 实参 引用传递，值传递
```javascript
let object = {a:0};
function fun(obj) {
    obj.a=1;
    obj={a:2};
    obj.b=2;
}
fun(object);
console.log(object);  // ==> 输出：{a:1}
```
5.实现一个LazyMan，可以按照以下方式调用:
```javascript
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

```

6.找出二叉树中某两个节点的第一个共同祖先，不得将其他的节点存储在另外的数据结构中。
```javascript
3
/ \
5   1
/ \ / \
6  2 0  8
/ \
7   4
// 示例 1:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 所有节点的值都是唯一的
// p、q 为不同节点且均存在于给定的二叉树中。
// 二叉树数据结构:
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
  }
// your code here:
```

7.实现一个流程控制函数，使得若干任务按照顺序执行，且每个任务的返回结果都讲传给下一个任务。
```javascript
// 如果中途出错，后面的任务则不会执行，并返回当前执行的结果
/**
 * 
 * @param {*} tasks Array 一组要运行的异步函数，每个函数可接受若干参和一个callback函数，每个函数的执行结构都会传递给下一个函数
 * @param {*} callback function 回调函数，参数列表（err,[results]）,返回最后执行任务完毕的结果
 */
function waterfall(tasks,[callback]){

}
eg:waterfall(
    [
        function(callback){
            callback(null,'one','two')
        },
        function (arg1,arg2,callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
            callback(null,'three')
            // callback('err'.'three'); => 结果：‘err’,'three'
        },
        function(arg1,callback){
            // arg1 now equals 'three'
            callback(null,'done')
        }
    ],
    function(err,results){
        // results now equals 'done'
    }
)
```

8.两数之和 可以假设每种输入只会对应一个答案，但是 数组中同一个元素不能使用两遍

##### haoweilai

1.
```javascript
typeof []
typeof function () {}
```
2.实现tokenize 输入只包含有效的非负整数 + - * / () 和空格，忽略空格，方法返回Generator对象
```javascript
const tokens = tokenize('1*(30 - 300)')
for(let token of tokens){
    console.log(token) // '1','*','(','30','-','300',')'
}
function tokenize(params) {
    
}
```
3.实现Array.prototype.map

4.反转二叉树 
```javascript
type Node = null | {
    value:Number
    left:Node
    right:Node
}
function invert(node) {
    
}
```
5.str 'o' 'x'的数量是否一样
```javascript
function XO(str){
    let a = 0,o = 0
    for(let i = 0;i<str.length;i++){
        if(str[i].toLowerCase() === 'o') a++
        if(str[i].toLowerCase() === 'x') o++
    }
    return a === o
    // const xa = str.split('').filter(item => item.toLowerCase() === 'x')
    // const oa = str.split('').filter(item => item.toLowerCase() === 'o')
    // console.log(xa,oa)
    // return oa.length === xa.length
}

console.log(XO('ooxx'))
console.log(XO('oxoxoxx'))
console.log(XO('ozpzpz'))
```


#### meituan

1.讲一个比较好的项目

2.封装组件的细节，怎么封装的table

3.图片导出功能？收藏专辑是怎么？

4.项目大概有多少页面，项目周期

4.首屏代码拆分怎么操作？

5.长表单解决什么问题

6.了解hooks hooks有什么优势

7.react17.0版本了解吗

8.react的类型是数组，对象？API?

9.Tabs组件 子组件tab 构建组件？React.Children()的结构是什么？怎么遍历？

10.React源码看过吗，有哪些？

11.原型链问题

12.两个有序数组合并后成为一个有序数据

13.离职原因

14.自身的优势：1.责任感 2.交流 3.耐心

15.对我的评价，工作经历有关技术深度欠缺，思维清晰性格稳重

16.方向：项目构建，打包，上线部署


##### meituan

1.基础数据类型，判断的方式有哪几种？
2.Array.isArray() 实现
3.
```javascript
function Company (){
  var instance = {
    name: 'a1',
    getName() {
      console.log(this.name);
    },
    getName1: () => {
      console.log(this.name);
    }
  };
  this.name = 'a2';
  this.getName2 = function () {
    console.log(this.name);
  }
  return instance;
}
Company.prototype.name = 'a3';
var company1 = new Company();
company1.getName(); // a1
company1.getName1(); // a2
company1.getName2();
```
4.
```javascript
var promise = new Promise(resolve => {
  console.log(1); 
  resolve();
})
setTimeout(() => { console.log(2); }, 0)
promise.then(() => { console.log(3); })
var promise2 = getPromise();
async function getPromise() {
  console.log(5);
  await promise;
  console.log(6);
}
console.log(8) // 1,5,8,3,6,2
```

5.
```javascript
function foo(){
  console.log(a);
}
function bar(fn){
  var a = 3;
  console.log(this.a + a);
  fn();
}
var a = 2;
bar(foo);
bar.call({a: 4},foo)  // NaN 2 7 2 node环境   浏览器环境 5 2 7 2
```

6.实现一个函数 完成测试用例

```javascript
function get(obj,str) {
    
}
const obj = {a:{b:1}}
get(obj,'a.b.c') === undefined
get(obj,'a.b') === 1
get(obj,'a') === { b:1 }
```
7.Function.prototype.bind



##### 58

1.react vue的使用上差异，哪个更适用自己
2.循环的时候为什么要写key？可以去掉key吗 程序上逻辑上有问题？
3.diff了解？key可以是对象吗？会带来什么问题？为什么是字符串？react diff key是怎么处理的
4.hooks 为什么要use开头？
5.useState 返回的函数执行后，函数组件会重新从头执行一次吗？定义的变量重新执行后保持上一次的值，hooks的核心
6.为什么是这么输出的？

```javascript
promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
})

setTimeout(() => {
  console.log(3)
}, 0)

promise.then(() => {
  console.log(4);
})

setTimeout(() => {
  console.log(5)
}, 0)

console.log(6);

promise.then(() => {
  console.log(7);
})
```

7.aynsc await 打包之后 在不同的浏览器能够执行？await 在浏览器打一个断点看一下？
8.生成器实现两个while死循环并行？
9.用户在编辑器自己写代码 分享给其他用户这个网址，会有什么问题？不太安全？
iframe,沙箱属性，父子组件通信比较麻烦；拦截用户的一些请求，黑白名单机制，限制一些函数调用执行 eg:cookie localStorage；





##### 小来

- 项目中的难点
- 小程序的登录流程
- 1px问题 和UI图差距1px
- 屏幕适配 meta解决
- 不需要缩放 initile-scale:1
- stict
- HOC?应用
- 节流防抖问题 手写
- 字符串转化成大写

