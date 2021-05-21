/**
 * 快速排序 任意取一个数，循环一次大于的放在右边，小于的放在左边，然后递归
 * @param {Array} arr
 * @return {Array}
 */
let quickSort = function(arr){
    let quickFn = (arr)=>{
        if(arr.length < 2){
            return arr
        }else{
            let flag = arr[0],left = [],right = [];
            for(let i = 1;i < arr.length;i++){
                if(arr[i] > arr[0]){
                    right.push(arr[i])
                }else{
                    left.push(arr[i])
                }
            }
            return quickFn(left).concat(flag,quickFn(right))
        }
    }
    return quickFn(arr);
}


let quickarr = function(a){
    const fn = arr => {
        const len = arr.length
        if(len < 2){
            return arr
        } else {
            let center = arr[0],left = [],right = []
            arr.slice(1).forEach(item => {
                item > center ? right.push(item) : left.push(item)
            })
            return fn(left).concat(center,fn(right))
        }
    }
    return fn(a)
}


/**
 * 快速排序优化解：in-place算法 让内存不再增加，利用交换 不会造成递归内存增加
 * 筛选出比目标元素小的在左边，然后目标元素和左边的最后一位交换位置，从而达到目标元素左边全是比他小的右边全是比他大的
 * 然后递归
 * @param {Array number} arr 
 * @return {Array}
 */
let quickSort1 = function(arr){
    // 数值交换
    const changeNum = (arr,i,j)=>{
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    // 找到目标元素的位置
    const findCenter = (arr,flag,len)=>{
        let idx = flag + 1; // 循环的起始位置 也是交换位置的起始
        for (let i = idx; i < len; i++) {
            if(arr[i] < arr[flag]){ // 找到小的开始交换
                changeNum(arr,idx,i);
                idx ++; // 能交换的位置向右移动一位
            }
        }
        // 最后目标元素和比他小的一边的最后一位交换位置，达到左边是比他全部小的右边是全部比他大的
        changeNum(arr,flag,idx-1); 
        return idx - 1; // 目标元素的位置
    }
    // 递归 找到目标元素后左右两边排序
    const allSort = (arr,left,right)=>{
        if(left < right){ // 执行递归的条件
            const flag = findCenter(arr,left,right);
            allSort(arr,left,flag); // 左边从起始位置到目标元素位置
            allSort(arr,flag + 1,right); // 右边从目标元素位置到结尾
        }
    }
    allSort(arr,0,arr.length);
    return arr
}
const testSort1 = [92,2,5,4,120,45,1,500,23,100,6,12]

console.log('快速排序：',quickarr(testSort1))
