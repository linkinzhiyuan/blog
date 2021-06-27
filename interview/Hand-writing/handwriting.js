/**
 * 判断数据类型：原始类型：undefined,number,string,boolean,null,symbol,bigint
 * 对象类型object,function,Array、RegExp、Math、Map、Set,Date全部归为object
 * typeof: 只能判断undefiend,number,string,boolean,symbol,function,其他全部归为object
 * instanceof: 内部通过原型链的方式来判断是否为构建函数的实例，常用于判断具体的对象类型,比较一个对象是否为某一个构造函数的实例
 * Object.prototype.toString.call()
 * Array.isArray(),Number.isNaN()
 */

function newTypeof(obj) {
    let res = Object.prototype.toString.call(obj).split(' ')[1] // [object Number] -> Number]
    return res.substring(0,res.length-1).toLowerCase()  //  Number] -> number
}
// console.log(newTypeof(null),newTypeof('2222'),newTypeof(new Date),newTypeof(function(){}),newTypeof([]))

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


// 数组元素是对象 根据键值去重
const objUniq = (arr, key) => {

  // var result = [],obj = {};
  // for (var i = 0; i < arr.length; i++) {
  //   if (!obj[arr[i].key]) {
  //     result.push(arr[i]);
  //     obj[arr[i].key] = true;
  //   }
  // }

  // var result = [];
  // for (var i = 0; i < arr.length; i++) {
  //   var flag = true;
  //   for (var j = 0; j < result.length; j++) {
  //     if (arr[i].key === result[j].key) {
  //       flag = false;
  //     }
  //   }
  //   if (flag) {
  //     result.push(arr[i]);
  //   }
  // }
  
  // for (var i = 0; i < arr.length; i++) {
  //   for (var j = i + 1; j < arr.length; j++) {
  //     if (arr[i].key === arr[j].key) {
  //       arr.splice(j, 1);
  //       j = j - 1;
  //     }
  //   }
  // }

  var obj = {};
  arr = arr.reduce(function (item, next) {
    obj[next[key]] ? '' : obj[next[key]] = true && item.push(next);
    return item;
  }, []);
  return arr
}


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


/**
 * new 
 * 1、新建一个空对象，obj.__proto__ === 构造函数的prototype
 * 2、执行构造函数，改变this的指向，看看是否存在返回值
 * return 构造函数有返回值对象 优先返回，如果是字符串 则返回空对象；没有返回值则返回开头新建的对象
 */
// function _new() {
//   const constructor = [].shift.call(arguments);
//   let obj = Object.create(constructor.prototype)
//   let result = constructor.apply(obj, arguments);
//   console.log(obj,result)
//   // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
//   return typeof result === 'object' ? result || obj : obj;
// };

function _new(){
  const constructor = Array.prototype.shift.call(arguments)
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj,arguments)
  return typeof result === 'object' ? result || obj : obj
}
function Person(name, age) {
  this.name = name
  this.age = age
  // return {} / '12312'
}
// let p = _new(Person, '布兰', 12)
// console.log(p)  // { name: '布兰', age: 12 }


/**
 * Object.create()
 * 接收一个对象作为参数，以它为原型，返回一个实例对象，该实例完全继承原型对象的属性
 */
if(typeof Object.create !== 'function'){
  Object.create = function(obj){
    function Fn(){}
    Fn.prototype = obj
    return new Fn()
  }
}

/**
 * call,apply,bind
 */
Function.prototype.call2 = function(target,...args){
  if( typeof this !== 'function'){
    throw new Error('this is not a function')
  }
  const context = target || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.apply2 = function(target,arr){
  if(typeof this !== 'function'){
    throw new Error('this is not a function')
  }
  if(!Array.isArray(arr)){
    throw new Error('arr not an array')
  }
  const context = target || window
  context.fn = this
  const result = context.fn(...arr)
  delete context.fn
  return result
}

/**
 * bind2
 * 除了this之外，还可以传入多个参数
 * bind创建的新函数可以传入多个参数
 * 新函数可能被当做构造函数调用
 * 函数有可能有返回值
 * @param {*} target 
 * @param  {...any} args 
 */
Function.prototype.bind2 = function(target){
  if( typeof this !== 'function'){
    throw new Error('this is not a function')
  }
  const args = [].slice.call(arguments,1) // 原函数的参数
  const self = this
  const fn = function(){} // 构建一个新的函数，保存原函数的原型
  let bound = function(){ // 绑定函数
    // this instanceof fn 判断是否使用new调用bound
    // new 调用的话 this的指向是实例
    // 不是new 调用的话，改变this指向指定的对象target
    return self.apply(
      this instanceof fn ? this : target,
      args.concat([].slice.call(arguments)) // 新函数的参数
    )
  }
  // 箭头函数没有prototype this永远指向当前所在的作用域
  if(this.prototype){
    fn.prototype = this.prototype
  }
  // 修改绑定函数的原型指向
  bound.prototype = new fn()
  return bound
}

// let obj = { name: 123 }
function foo(x,y,z) {
  console.log(this.name, arguments)
  console.log(x,y,z)
}
// foo.call2(obj, '111', '222','333')
// foo.apply2(obj, [1,2,3])
// const s = foo.bind2(obj,'111','222')
// s(222)



const p = new Promise((resolve,reject)=>{
  // console.log('2222')
  // resolve('hello')
  return 'promise'
})

// p.then(res => {
//   console.log(res + 'then')
// })

// console.log(p)

function curry(fn){
  let judge = (...args) => {
    if(args.length === fn.length) return fn(...args)
    return (...arg) => judge(...args,...arg)
  }
  return judge
}



var name = 'window'
let obj = {
  name:'obj',
  props:{
    name:'props',
    getName:function(){
      setTimeout(function(){
        console.log('settime:',this.name)
      },0)
      return this.name
    }
  }
}

// console.log(obj.props.getName())

// let fn = obj.props.getName
// console.log(fn())
for (let index = 0; index < 10; index++) {
  console.log(index)
  for (let j = 10; j < 20; j++) {
    console.log(j)
    if(index === 6 && j === 15) continue
  }
  
}

