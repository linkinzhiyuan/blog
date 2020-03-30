let arr = [10,20,30,40]
// pop 从后面取出最后一个 返回这个值
const popres = arr.pop();
console.log('pop',popres,arr)

// push 从后面追加一个值 返回之后原数组的长度
const pushres = arr.push(50) // 5
console.log('push',pushres,arr)

// shift 从前面取出一个值 返回这个值 
const shiftres = arr.shift() //10
console.log('shift',shiftres,arr)

// unshift 从前面添加一个值 返回成功之后原数组的长度
const unshiftres = arr.unshift(9);
console.log('unshift',unshiftres,arr)

// 纯函数 1. 不改变源数组（没有副作用）；2. 返回一个数组
const array = [1,2,3,4,5];
// concat
let arr1 = array.concat([6,7,8])
console.log('concat',arr1)
// map
let arr2 = array.map(item => item*10)
console.log('map',arr2)
//filter
let arr3 = array.filter(item => item > 3)
console.log('filter',arr3)
//slice
let arr4 = array.slice()
console.log('slice',arr4)


// 非纯函数

// pop push shift unshift
// foreach  没有返回值，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。第二个参数是绑定内部thi变量
// some every 返回一个布尔值，表示判断数组成员是否符合某种条件。
// 接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。还可以接受第二个参数，用来绑定参数函数内部的this变量
// some 只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
// every 所有成员的返回值都是true，整个every方法才返回true，否则返回false。
// reduce reduceRight(方向相反)依次处理数组的每个成员，最终累计为一个值。它们的差别是，reduce是从左到右处理（从第一个成员到最后一个成员）
// join 不改变原数组，但返回一个字符串
// reverse 方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。
// sort 方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
// indexOf()，lastIndexOf()返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1

/**
 * slice和splice的区别
 * 1.功能区别，slice切片，splice剪接
 * 2.参数和返回值
 * 3.是否是纯函数
 */
// arr.slice(start, end); 用于提取目标数组的一部分，返回一个新数组，原数组不变。
// 参数是负数，则表示倒数计算的位置。
// 如果第一个参数小于原数组的长度，或者第二个参数小于第一个参数 则返回空数组
let sliceArr = [1,2,3,4,5]
const slice1 = sliceArr.slice(1,3) //[2,3]
const slice2 = sliceArr.slice(2) //[3,4,5]
const slice3 = sliceArr.slice(-2) //[4,5]
const slice4 = sliceArr.slice(6) //[]
const slice5 = sliceArr.slice(2,1) //[]
//slice()方法的一个重要应用，是将类似数组的对象转为真正的数组。
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

// Array.prototype.slice.call(document.querySelectorAll("div"));
// Array.prototype.slice.call(arguments);

// splice 用于删除数组的一部分，然后在删除的位置添加数组的新成员，返回被删除的那部分，改变原数组
// arr.splice(start, count, addElement1, addElement2, ...);
// 起始位置如果是负数，就表示从倒数位置开始删除。
// 单纯地插入元素，splice方法的第二个参数可以设为0。
// 只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
let spliceArr = [10,20,30,40,50]
// const splice1 = spliceArr.splice(1,3,'a','b','c') //[20,30,40] 原数组 [10,'a','b','c',50]
// const splice2 = spliceArr.splice(-4,2,'a','b','c') //[20,30] 原数组 [10,'a','b','c',40,50]
// const splice3 = spliceArr.splice(1,0,'a') //[] 原数组 [10,'a',20,30,40,50]
const splice4 = spliceArr.splice(1) //[10] 原数组 [20,30,40,50]


 /**
  * [10,20,30].map(parseInt) 返回值
  * map的参数和返回值
  * parseInt的参数和返回值 parseInt(string, radix) 可解析一个字符串，并返回一个整数。radix(2-36)
  */
 const resMap = [10,20,30].map(parseInt); //[10,NaN,NaN]

//  拆解等同于
const resMapEqual = [10,20,30].map((num,index)=>{
    return parseInt(num,index)
})
// parseInt(10,0) //10
// parseInt(20,1) //NaN
// parseInt(30,2) //NaN

/**
 * get和post的不同
 * 1.get用于查询操作，post用户提交操作
 * 2.get参数拼接在url上，post放在请求体内
 * 3.安全性：post易于防止CSRF，get暴露在url上，不能传递敏感信息
 * 4.get浏览器回退是无害的，post回退会再次发起请求
 * 5.get产生的url可以被收藏，post的不可以
 * 6.get的请求会被浏览器主动缓存，post的不可以，除非手动设置
 * 7.get参数只能进行url编码，post支持多种编码
 * 8.get参数会被完整的保留到浏览器历史记录，post的参数不会被保留
 * 9.get参数有长度限制，不同的浏览器限制不同,ie限制是2kb+35post没有
 */