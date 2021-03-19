/**
 * 关于0.1 + 0.2 = 0.3的问题
 * https://mp.weixin.qq.com/s/I6uOfr9ybx3-Q4nwdWJvTw
 * https://juejin.cn/post/6844903680362151950
 * 0.1+0.2 不等于 0.3 ，因为在 0.1+0.2 的计算过程中发生了两次精度丢失。
 * 第一次是在 0.1 和 0.2 转成双精度二进制浮点数时，由于二进制浮点数的小数位只能存储52位，导致小数点后第53位的数要进行为1则进1为0则舍去的操作，从而造成一次精度丢失。
 * 第二次在 0.1 和 0.2 转成二进制浮点数后，二进制浮点数相加的过程中，小数位相加导致小数位多出了一位，又要让第53位
 * 解决办法：
 * 1.可以这样回答：“可以用Math.js数学计算库来解决，或者用toFixed()给计算结果四舍五入，但是toFixed()在chrome或者火狐浏览器下四舍五入也有精度误差。
 * 可以用Math.round来解决精度误差，比如要把 2.55 四舍五入保留 1 位小数，先把 2.55∗10 得到 25.5 ，
 * 再用Math.round取整25.5 ，会得到25，再把 25÷10 得到 2.5 ，就这样间接实现了四舍五入。
 * 可以用Math.pow来做个简单的封装Math.round(Math.pow(10, m) * number) / Math.pow(10, m)，其中number是要四舍五入的数，m是保留几位小数。
 * 2.使用最小
 * 
 */

function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
 






/**
 * Number.isFinte() -> boolean 检查数值是否为有限的,即不是Infinity,参数不是数值的就返回false
 * Number.isNaN() -> boolean 判断是否为NaN,不是NaN全部返回false，全局函数isNaN先用Number()转化成数值，再判断
 * 以上两种方法和全局方法不同的是 全局的现把非数值的转化成数字再判断，而新方法只对数值类型的有效
 */
isFinite('25') // true
Number.isFinite('25') // false
Number.isFinite(15) // true
Number.isFinite(NaN) // false
Number.isFinite(Infinity) //false
Number.isFinite(-Infinity) // false
Number.isFinite('foo') // false
Number.isFinite(true) // false

isNaN(NaN) // true
isNaN('NaN') // true
Number.isNaN('NaN') // false
Number.isNaN(NaN) // true
Number.isNaN(14) // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true'/0) // true
Number.isNaN('true'/'true') //true

/**
 * 判断NaN的其他方式
 * 1.利用NaN是唯一一个不等与自身的特点
 * 2.ES6的Object.is()
 */
function SelfIsNaN(n){
    return n !== n
}
// 全等的缺点是 NaN不等于自身，-0等于+0
// 通过ES5部署Object.is()
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
      if (x === y) {
        // 针对+0 不等于 -0的情况
        return x !== 0 || 1 / x === 1 / y;
      }
      // 针对NaN的情况
      return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
console.log(Object.is('a',NaN))

/**
 * Number.isInteger() - 判断一个数值是否为整数，参数不是数值的返回false,精度超出范围的会做出误判，所以对精度要求过高的不适合使用
 */
Number.isInteger(24) // true
Number.isInteger(24.0) // true
Number.isInteger(3.0000000000000002) // false 精度缺失
Number.isInteger(5E-325) // false


/**
 * Number.EPSILON 是一个极小的常量，是js能够表示的最小精度，如果误差小于这个值，则认为不存在误差
 */

function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true

/**
 * 安全数值常量：最大值 -> Number.MAX_SAFE_INTEGER  最小值 -> Number.MIN_SAFE_INTEGER
 * 安全范围：-2^53 ~ 2^53
 * Number.isSafeInteger(): 判断一个整数是否在安全范围内
 */

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

// 实现
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}

