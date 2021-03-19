/**
 * Set 数据结构：类似于数组，所有成员都是唯一的，没有重复的值。本身是一个构造函数
 * 可以接受一个数组（或者具备iterable接口的其他数据结构）作为参数，用于初始化
 * Set 内部判断两个值是否一致，类似===，但是认为NaN === NaN，两个对象总不相等
 * 
 * 属性：Set.prototype.constructor 构造函数，默认是Set函数
 * Set.prototype.size 返回Set实例的长度
 * 
 * 操作方法：
 * Set.prototype.add(value) 添加某个值，返回Set结构本身
 * Set.prototype.delete(value) 删除某个值，返回boolean
 * Set.prototype.has(value) 表示该值是否为Set的成员，boolean
 * Set.prototype.clear() 清除所有的成员，没有返回值
 *
 * 遍历方法 遍历的顺序就是插入的顺序
 * Set.prototype.keys() 返回键名的遍历器
 * Set.prototype.values() 返回键值的遍历器 默认的iterable
 * Set.prototype.entries() 返回键值对的遍历器
 * Set.prototype.forEach() 使用回调函数遍历每个成员
 */

const set = new Set()

const arr = [2,3,4,5,6,2,3,4]
arr.forEach(ele => s.add(ele));

for(let i of s){
    console.log(i) // 2,3,4,5,6
}

// 可以接受一个数组（或者具备iterable接口的其他数据结构）作为参数，用于初始化
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
// const set = new Set(document.querySelectorAll('div'));
// set.size // 56

// 去重的方法
const a = [...new Set([1, 2, 3, 4, 5, 5, 5, 5])]
const s = [...new Set('ababbc')].join('') //'abc'

function dedupe(array) {
    return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]


let a1 = new Set([1, 2, 3]);
let a2 = new Set([4, 3, 2]);

// 并集
let union = new Set([...a1, ...a2]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a1].filter(x => a2.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a1].filter(x => !a2.has(x)));
// Set {1}


/**
 * 对象的本质是键值对的集合，键只能使用字符串
 * Map 数据结构 类似对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值(包括对象)可以当做键
 * 属性：size 返回Map构造的成员总数
 * 
 * 操作方法：
 * Map.prototype.set(key,value) 返回整个Map结构，由于返回值是当前Map对象，可以使用链式写法，如果key已经存在则键值被更新，否则新生成该键
 * Map.prototype.get(key)  读取key对应的键值，找不到返回undefined
 * Map.protptype.has(key)   返回Boolean，表示是否存在Map对象中
 * Map.prototype.delete(key) 返回Boolean
 * Map.prototype.clear()   清除所有成员，没有返回值
 * 
 * 遍历方法 遍历的顺序就是插入的顺序
 * Map.prototype.keys() 返回键名的遍历器
 * Map.prototype.values() 返回键值的遍历器 
 * Map.prototype.entries() 返回所有成员的遍历器 默认的iterator
 * Map.prototype.forEach() 遍历Map所有成员
 */