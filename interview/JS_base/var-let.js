/**
 * var let const的区别
 * 1.var是ES5语法，存在变量提升，let/const 是ES6不会变量提升
 * 2.let const有块作用域，var没有
 * 3.var let定义的是变量可以修改，const定义的是常量，不能修改
 */
// 状态提升
console.log(a) //undefined
var a = 100

console.log(b) //报错，b未定义
let b = 200

// 块作用域
for(var i = 0;i<10;i++){
    var j = i
}
console.log(i,j) //10 10

for(var c = 0;c<10;c++){
    var d = c
}
console.log(c,d) //c d 未定义

/**
 * typeof 识别哪些类型
 * 值类型：number string boolean undefined symbol
 * 引用类型：object (typeof null==='object')
 * function
 */

 /**
  * 列举强制类型和隐式类型转换
  * 强制：parseInt parseFloat toString
  * 隐式: if 逻辑运算 == +拼接字符
  */


