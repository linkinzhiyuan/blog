
const obj1 = {
    age:23,address:'beijing',
    arr:['a','b','c'],
    name:{
        first:'chen',last:'zy'
    }
}
// 浅拷贝
// let obj2 = obj1;
// obj2.age = 24;
// console.log(obj1.age)

/**
 * 深拷贝实现
 */
function deepclone(obj = {}){
    // obj不是对象，数组，函数，或者是null
    if(typeof obj !== 'object' || obj == null){
        return obj
    }
    let result;
    // 初始化结果
    if(obj instanceof Array){
        result = []
    }else{
        result = {}
    }
    for(let key in obj){
        // 保证key不是原型的属性
        if(obj.hasOwnProperty(key)){
            // 递归
            result[key] = deepclone(obj[key])
        }
    }
    return result
}
let obj3 = deepclone(obj1);
obj3.address = 'shanghai';
console.log(obj1,obj3)

const NULL = undefined;
console.log(NULL==null) // 相当于 NULL === null || NULL === undefined 

// 以下是falsely变量，其他的都是truly变量
!!0===false
!!Nan === false
!!'' === false
!!null === false
!!undefined === false
!!false === false