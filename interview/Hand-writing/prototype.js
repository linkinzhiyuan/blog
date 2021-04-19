

/**
 * 继承：原型链继承，构造函数继承，组合继承（盗用构造函数），寄生式继承，class继承
 */

// 原型链继承: 只要父类中有引用类型的数据，其中一个实例更改则影响其他的实例
function P() {
    this.arr = [1,2,3,4]
    this.name = 'tony'
}
P.prototype.toArr = function(){
    console.log(this.arr)
}
function Child(){}

Child.prototype = new P()

const child1 = new Child()
const child2 = new Child()
child1.arr.push(5)
child1.name = 'danny'

// console.log(child1.name,child2.name)

// 构造函数继承:执行两遍P1；实例原型上的构造函数是P1，应该是Child1
function P1(){
    this.arr = [1,2,3,4]
}
function Child1(){
    P1.call(this)
}
Child1.prototype = new P1()

const child3 = new Child1()

// console.log(child3.__proto__.constructor === P1) // true


// 组合继承：并不会创建一个新的对象关联到Child2.prototype，而是直接引用P2.prototype，修改Child2.prototype的方法直接影响父类的原型
function P2(){
    this.name = 'tony'
}
function Child2(){
    P2.call(this)
}

Child2.prototype = P2.prototype
Child2.prototype.constructor = Child2

const child4 = new Child2()

// console.log('child4',child4.__proto__.constructor === P2)  // false
// console.log('child4',child4.__proto__.constructor === Child2)  // true
// console.log('child4',child4 instanceof P2)  // false
// console.log('child4',child4 instanceof Child2)  // true

// 寄生继承 最优解

function P3(){
    this.name = 'tony'
}
function Child3(){
    P3.call(this)
}

//通过创建原型链的方式，把Child3.prototype.__proto__ === P3.prototype
Child3.prototype = Object.create(P3.prototype)
// 或者使用ES6的新语法
// Object.setPrototypeOf(Child5.prototype,Parent5.prototype);
Child3.prototype.constructor = Child3

const child5 = new Child3()

// console.log('child5',child5.__proto__.constructor === P3)  // false
// console.log('child5',child5.__proto__.constructor === Child3)  // true
// console.log('child5',child5 instanceof P3)  // false
// console.log('child5',child5 instanceof Child3)  // true

function Foo(a) {this.a = a};
var foo = new Foo("hello world");
// console.log(foo.__proto__ === Foo.prototype);
// console.log(Foo.__proto__ === Function.prototype);
// console.log(Foo.prototype.__proto__ === Object.prototype);
// console.log(Function.__proto__ === Function.prototype === Object.__proto__);
// console.log(Object.__proto__ === Function.prototype);
Function.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ = null




// 声明对象的方式
var o1 = {name:'o1'}
var o2 = new Object({name:'o2'})
// 构造函数
var M = function(name){this.name = name;}
var o3 = new M('o3')
// Object.create() 通过创建原型链的方式，把o4.__proto__ === p
var p = {name:'o4'}
var o4 = Object.create(p)

M.prototype.say = function(){
    console.log('say')
}
// 模拟new运算符的过程
const newFun = function(F){
    const o = Object.create(F.prototype);
    //转化this执行上下文
    const k = F.apply(o);
    // console.log('k',k)
    // console.log('o',o)
    if(typeof k === 'object'){
        return k
    }else{
        return o
    }
}

// Object.create的polyfill
// if(!Object.create){
//     Object.create = funciton(o){
//         function F(){}
//         F.prototype = o
//         return new F()
//     }
// }