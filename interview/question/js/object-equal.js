// 深度比较两个对象是否值相等

// 判断是否是对象类型
function isObject(obj){
    return typeof obj === 'object' && obj !== null
}
function isEqual(obj1,obj2){
    // 如果两个其中一个不是对象
    if(!isObject(obj1) || !isObject(obj2)){
        return obj1 === obj2
    }
    // 如果两个相等 则直接返回true
    if(obj1 === obj2){ 
        return true
    }
    // 如果两个对象的属性的长度不一致 直接返回false
    const obj1Keys = Object.keys(obj1),obj2Keys = Object.keys(obj2);
    if(obj1Keys.length !== obj2Keys.length){
        return false
    }
    // 以obj1为基准 循环 递归比较属性值
    for(let key in obj1){
        const res = isEqual(obj1[key],obj2[key])
        if(!res){ 
            return false;
        }
    }
    // 如果全部是true
    return true
}

// 测试
const obj1 = {
    a: 00,
    b: {
        x: 100,
        y: 200
    }
}
const obj2 = {
    a: 100,
    b: {
        x: 100,
        y: 200
    }
}
// console.log( obj1 === obj2 )
console.log( isEqual(obj1, obj2) )