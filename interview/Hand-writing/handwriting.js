/**
 * 判断数据类型：原始类型：undefined,number,string,boolean,null,symbol,bigint
 * 对象类型object,function,Array、RegExp、Math、Map、Set,Date全部归为object
 * typeof: 只能判断undefiend,number,string,boolean,symbol,function,其他全部归为object
 * instanceof: 内部通过原型链的方式来判断是否为构建函数的实例，常用于判断具体的对象类型,比较一个对象是否为某一个构造函数的实例
 * Object.prototype.toString()
 * Array.isArray(),Number.isNaN()
 */

function newTypeof(obj) {
    let res = Object.prototype.toString.call(obj).split(' ')[1] // [object Number] -> Number]
    return res.substring(0,res.length-1).toLowerCase()  //  Number] -> number
}
console.log(newTypeof(null),newTypeof('2222'),newTypeof(new Date),newTypeof(function(){}),newTypeof([]))

function myInstanceof(left,right){ 
    // 如果是基础类型直接返回false 
    if(typeof left !== 'object' || left == null) return false;
    // Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）
    let proto = Object.getPrototypeOf(left); // L.__proto__
    while(true){
      if(proto == right.prototype) return true;
        proto =  Object.getPrototypeOf(proto);
    }
}

function newinstanceof(L, R) { //L是表达式左边，R是表达式右边
    if(typeof L !== 'object' || L === null) return false
    const R_proto = R.prototype;
    let L_proto = L.__proto__; // Object.getPrototypeof(L)
    while(L_proto){
        if(L_proto === R_proto) return true
        L_proto === L_proto.__proto__
    }
    return false
}

function instanceOf2(left, right) {
    let proto = left.__proto__
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) {
            return true
        }
        proto = proto.__proto__
    }
}


// console.log(instanceOf2(2, Number))
// console.log(2 instanceof Number)

/**
 * 数组去重
 * Array.filter()
 * Set数据结构
 */

function unique(arr){
    // return [...new Set(arr)] // ES6

    // return Array.from(new Set(arr)) // ES6 Array.from()

    // return arr.filter((item,index,arr) => arr.indexOf(item) === index)

    // for (let index = 0; index < arr.length; index++) {
    //     if(arr.indexOf(arr[index]) !== index){
    //         arr.splice(index,1) // 遇到相同的元素删除后，数组的长度减1.数组的下标也要减一
    //         index--
    //     }
    // }
    // return arr

    return arr.reduce((ar,cur) => {
        if(!ar.includes(cur)){
            ar.push(cur)
        }
        return ar
    },[])
}

// console.log('unique',unique([1,2,1,2,3,4,5,2,3]))


/**
 * 数组扁平化
 * ES5实现 递归
 * ES6 flat() 变成一维数组，返回新的数组，加上参数number表示拉平多少层嵌套
 */
function flatten(arr){
    // let res = []
    // for (let i = 0; i < arr.length; i++) {
    //     if(Array.isArray(arr[i])){
    //         res = res.concat(flatten(arr[i]))
    //     } else {
    //         res.push(arr[i])
    //     }
    // }
    // return res

    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

// Object.defineProperty(Array.prototype, 'flat', {
//     value: function(depth = 1) {
//       return this.reduce(function (flat, toFlatten) {
//         return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
//       }, []);
//     }
// });

// console.log(flatten([1,[2,3,[4,5],[6,7,[19,20]],8]]))


// 伴鱼

// 1.输出顺序
// console.log(1);
// setTimeout(() => {
//   console.log(2);
//   Promise.resolve().then(data => {
//     console.log(3);
//   });
// });
// new Promise((resolve) => {
//   resolve()
//   console.log(4)
// }).then(() => {
//   console.log(5);
//   setTimeout(() => {
//     console.log(6);
//   });
// }).then(() => console.log(7))
// console.log(8);

//输出 1 4 8 5 7 2 3 6  


// 2.打印出的内容
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
// f1() f2() 'welcome to Palfish-3'


// 3.代码输出
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




// 4.代码输出
let object = {a:0};
function fun(obj) {
    obj.a=1;
    obj={a:2};
    obj.b=2;
}
fun(object);
console.log(object);  // ==> 输出：{a:1}
 
// 5.实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// 以此类推。

// 6.找出二叉树中某两个节点的第一个共同祖先，不得将其他的节点存储在另外的数据结构中。

// 3
// / \
// 5   1
// / \ / \
// 6  2 0  8
// / \
// 7   4
// 示例 1:
// 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出: 3
// 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

// 所有节点的值都是唯一的
// p、q 为不同节点且均存在于给定的二叉树中。
// 二叉树数据结构:
// function TreeNode(val) {
//     this.val = val;
//     this.left = this.right = null;
//   }
// your code here:


// 7.实现一个流程控制函数，使得若干任务按照顺序执行，且每个任务的返回结果都讲传给下一个任务。
// 如果中途出错，后面的任务则不会执行，并返回当前执行的结果
/**
 * 
 * @param {*} tasks Array 一组要运行的异步函数，每个函数可接受若干参和一个callback函数，每个函数的执行结构都会传递给下一个函数
 * @param {*} callback function 回调函数，参数列表（err,[results]）,返回最后执行任务完毕的结果
 */
function waterfall(tasks,[callback]){

}

// eg:waterfall(
//     [
//         function(callback){
//             callback(null,'one','two')
//         },
//         function (arg1,arg2,callback) {
//             // arg1 now equals 'one' and arg2 now equals 'two'
//             callback(null,'three')
//             // callback('err'.'three'); => 结果：‘err’,'three'
//         },
//         function(arg1,callback){
//             // arg1 now equals 'three'
//             callback(null,'done')
//         }
//     ],
//     function(err,results){
//         // results now equals 'done'
//     }
// )

// 8.两数之和 可以假设每种输入只会对应一个答案，但是 数组中同一个元素不能使用两遍



// 好未来
// 1.typeof []
// typeof function () {}

// 2.实现tokenize 输入只包含有效的非负整数 + - * / () 和空格，忽略空格，方法返回Generator对象
// const tokens = tokenize('1*(30 - 300)')
// for(let token of tokens){
//     console.log(token) // '1','*','(','30','-','300',')'
// }
// function tokenize(params) {
    
// }

// 3.实现Array.prototype.map

// 4.反转二叉树 

// type Node = null | {
//     value:Number
//     left:Node
//     right:Node
// }
function invert(node) {
    
}

// str 'o' 'x'的数量是否一样
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

// console.log(XO('ooxx'))
// console.log(XO('oxoxoxx'))
// console.log(XO('ozpzpz'))

// 职位规划：时间 目的 方法 实现手段

// 简历三突出原则：主要项目最能改变成绩 0-1的项目   项目突出主要成绩

// 逻辑感，怎么做的顺序，你做出的成绩

// 面试强输出的过程，展示优势

