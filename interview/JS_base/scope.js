// 闭包的两种表现形式

// 作为返回值
// function Fn(){
//     var a = 100;
//     return function(){
//         console.log(a)
//     }
// }
// var a = 200;
// let f = Fn();
// f(); //100

// 作为参数传递
// function Fn(f){
//     let a = 100;
//     f();
// }
// let a = 200;
// function f(){
//     console.log(a)
// }
// Fn(f); //200

// 闭包的用处

//隐藏变量 只提供API
function createCache(){
    let data = {};
    return {
        set:function(key,val){
            data[key] = val
        },
        get:function(key){
            return data[key]
        }
    }
}
let c = createCache()
c.set('a','createCache')
// console.log(c.get('a'))

// 模拟bind
Function.prototype.bindCustom = function(){
    // 将参数转化为数组
    const args = Array.prototype.slice.call(arguments);
    // 参数截取 第一个参数是需要绑定的对象，剩余的是参数
    let obj = args.shift();
    // console.log(obj,args)

    // fn1.bind(...) 中的 fn1
    const self = this
    
    // 返回一个函数
    return ()=>{
        return this.apply(obj,args)
    }
}

function fn1(a,b,c){
    console.log(a,b,c)
    return 'bind success'
}
const obj = {x:100}
const fn2 = fn1.bindCustom(obj,10,20,30)
const res = fn2()
console.log(res)