// this指向的误解 - this指向函数本身
// function foo(num){
//     console.log('foo:',num)
//     this.count++;
//     // foo.count++; // 利用变量foo的词法作用域
// }
// foo.count = 0;

// for(var i = 0;i<10;i++){
//     if(i>5){
//         // foo(i)
//         foo.call(foo,i); // 使用call确保this的指向是对象foo本身
//     }
// }

// console.log(foo)
// console.log(foo.count) //0
// console.log(count)

// this的指向误解 - 指向函数的作用域：有些情况是正确的，有些情况是错误的
// this在任何情况都不指向函数的词法作用域，作用域对象存在于Javascript引擎内部


/**
 * this到底是什么
 * 1.this是在运行时绑定的，并不是在编写时绑定的
 * 2.它的上下文取决于函数调用时的各种条件，只取决于函数的调用方式
 * 3.函数调用时会创建一个执行上下文，这里包含在哪里被调用（调用栈），函数的调用方式，传入的参数等
 */

//  function baz(){
//     bar();
//  }
//  function bar(){
//     foo();
//  }
//  function foo(){
//     console.log('foo')
//  }
//  baz();

/**
 * this绑定规则
 * 1.默认绑定->独立函数调用 绑定到全局  严格模式下this会被绑定到undefined
 * 2.隐式绑定->一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）绑定到这个对象上
 * 隐式绑定会出现隐式丢失，把对象中的函数重新赋值给一个新的变量，这个变量执行时绑定的就是全局；
 * 或者是传入回调函数中，也相当于重新赋值
 * 3.显示绑定->call apply
 * 4.new 绑定->创建一个全新的对象；这个新的对象会被执行[[prototype]]（也就是__proto__）链接；这个新对象会绑定到函数调用的this；
 * 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，则new表达式中的函数返回这个新的对象
 */
// 实现new 实现
// https://juejin.im/post/5bde7c926fb9a049f66b8b52
function myNew(F){
    let o = Object.create(F.prototype);
    const k = F.apply(o);
    if(typeof k === 'object'){
        return k
    }else{
        return o
    }
}

/**
 * this绑定优先级
 * 显示绑定 > 隐式
 * new 隐式
 * 显示 new
 */

//  显示 > 隐式
function foo1(){
    console.log(this.a)
}
const obj1 = { a:2,foo:foo1 },obj2 = { a:3,foo:foo1 };
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

// new > 隐式
function foo2(something){
    this.a = something;
}
const obj3 = { foo:foo2 },obj4 = {};
obj3.foo(2); 
console.log(obj3.a); // 2

obj3.foo.call(obj4,3);
console.log(obj4.a); // 3

var bar = new obj3.foo(4);
console.log(bar,obj3)
console.log(obj3.a); // 2
console.log(bar.a); // 4

// var baa = foo2.bind(obj4);
// baa(2)
// console.log(baa)
// console.log(obj4)


const obj = {
    fn1(){
        console.log("this1",this) // obj
        const fn = () => {console.log("this1",this)}
        fn()  // obj
        fn.call(this) // obj call 无效
    },
    fn2: () => {
        console.log('this2',this) // window
        function fn (){console.log("this2",this)}
        fn() // window
        fn.call(this) // window
    },
    fn3(){
        console.log('this3',this) // obj
        function fn (){console.log("this3",this)}
        fn() // window
        fn.call(this) // obj
    }
}

obj.fn1();
obj.fn2();
obj.fn3();

function fn3(){
    console.log('this3',this) // window
    function fn (){console.log("this3",this)}
    fn() // window
    fn.call(this) // window
}

fn3()


class Foo {
    f1(){console.log('this1',this)}
    f2 = () => console.log('this2',this)
    f3 = () => console.log('this3',this)
    static f4() { console.log('this4',this)}
}

const f = new Foo()
f.f1(); // f
f.f2(); // f
f.f3.call(this) // f
Foo.f4() // Foo

/**
 * 判断this
 * 1.函数是否在new中调用，如果是的话绑定的就是新创建的对象
 * 2.函数是否通过call,apply绑定调用，是的话绑定的是指定的对象
 * 3.函数是否在某个上下文对象中调用 隐式绑定
 * 4.如果都不是，则是默认绑定，严格模式下是绑定undefined，否则是全局对象
 */