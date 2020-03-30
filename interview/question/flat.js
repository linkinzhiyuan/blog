// 扁平化数组  [1,2,3,[4,5,[6,7]],8,9] => [1,2,3,4,5,6,7,8,9]
function flatArray(arr){
    // 判断数组元素里面有没有数组
    const isDeep = arr.some(item=> item instanceof Array)
    // 如果已经是扁平化的数组则直接返回结果
    if(!isDeep) {
        return arr
    }
    const res = Array.prototype.concat.apply([],arr);
    // 递归
    return flatArray(res)
}
let res = flatArray([1,2,3,[4,5,[6,7]],8,9])