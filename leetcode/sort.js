/**
 * 冒泡排序
 * @param {Array} arr
 * @return {Array} 
 */

//冒泡排序 第一层循环是循环的次数 第二层是比较相邻两个数的大小，前一个比后一个大则交换顺序，反之顺序不变
const testSort1 = [92,2,5,4,120,45,1,500,23,100,6,12]

let bubblingSort = function(arr){
    const l = arr.length;
    for(let i = l - 1; i > 0;i--){
        for(let j = 0;j < i;j++){
            // tmp = arr[j]
            if(arr[j] > arr[j+1]){ // 前一个值比后面的大，则交换位置 大数向后面排
                // arr[j] = arr[j+1];
                // arr[j+1] = arr[j];
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    }
    return arr
}
console.log('冒泡排序：',bubblingSort(testSort1))

// 选择排序 两次循环，第一次依次取值，第二次比较值后面的数，取最小的交换位置
let selectSort = function(arr){
    const l = arr.length;
    for(let i = 0,min;i < l;i++){
        min = arr[i];
        for(let j = i+1;j < l;j++){
            if(arr[j] < arr[i]){ // 后面的数小于前面的数，则交换位置，小数向前移动
                const c = min;
                min = arr[j];
                arr[j] = c;
            }
        }
        arr[i] = min
    }
    return arr
}
console.log('选择排序：',selectSort(testSort1))

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
// console.log('快速排序：',quickSort1([4,1,2,0,10,9,8]))

/**
 * 奇偶排序
 * @param {Array} arr 
 * @return {Array}
 * @url https://leetcode-cn.com/problems/sort-array-by-parity-ii/
 */
const testSort2 = [1,3,5,7,2,4,6,8]
let oddEvenSort = function(arr){
    // const l = arr.length;
    // let res = [],i = 0,j = 1;
    // if(l%2 !== 0 ) return false;
    // // 先排序 再循环，判断奇数还是偶数，然后依次推进数组中
    // arr.forEach((item)=>{
    //     if(item % 2 === 0){ // 偶数
    //         res[i] = item;
    //         i += 2
    //     }else{
    //         res[j] = item;
    //         j += 2;
    //     }
    // })
    // return res;
    let i = 0,
        j = 1;
    for(; i < arr.length; i += 2){
        // 当arr[i]为偶数 i也是偶数则跳出当前循环，继续下次循环操作
        // 当arr[i]为奇数时 会到下面的while循环看j
        if( arr[i] % 2 === 0 ) continue; 
        while( arr[j] % 2 === 1 ){ // 会一直寻找 直到不是奇数才往下执行
            j += 2;
        }
        [ arr[i],arr[j] ] = [ arr[j],arr[i] ]; //ES6在引入了数组解构的概念，值互换会变得更加方便
    }
    return arr;
}
// console.log(oddEvenSort(testSort2))

/**
 * 数组中的第K个最大元素
 * @param {Array} nums
 * @param {Number} k
 * @return {Number}
 * @url https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 */
let findKthLargest1 = function(nums,k){
    return nums.sort((a,b) => b-a )[k-1];
}
// 优化版本 冒泡排序
let findKthLargest2 = function(nums,k){
    // 利用冒泡排序的原理，每次排序都是选出最大的数右移到最后，这次只需要排序k次就能拿到
    // 冒泡原理：确定每次循环时对比的次数，第一次是全部
    const l = nums.length;
    for(let i = l - 1,tmp;i > l-1-k;i--){
        for(let j = 0;j < i;j++){
            if(nums[j] > nums[j+1]){
                [nums[j],nums[j+1]] = [nums[j+1],nums[j]]
            }
        }
    }
    return nums[l-k]
}
// console.log('奇偶排序：',findKthLargest2([3,2,1,5,6,4],2)) // 5
// console.log('奇偶排序：',findKthLargest2([3,2,3,1,2,4,5,5,6],4)) // 4 

/**
 * 最大间距的算法 
 * @param {Array} nums
 * @return {Number}
 * @url https://leetcode-cn.com/problems/maximum-gap/
 */
let maximumGap = function(nums){
    const l = nums.length;
    if(l < 2){return 0;}
    nums.sort((a,b)=> a-b)
    let maximum = nums[1] - nums[0];
    for(let i = 0;i < l-1;i++){
        if(nums[i+1] + nums[i] > maximum){
            maximum = nums[i+1] - nums[i]
        }
    }
    return maximum
}
// 优化版 冒泡排序
let maximumGap1 = function(nums){
    const l = nums.length;
    let maximum = 0 
    if(l < 2) return maximum;
    // 冒泡排序优化
    for(let i = l-1;i > 0;i--){
        for(let j = 0;j < i;j++){
            if(nums[j+1] < nums[j]){
                [nums[j],nums[j+1]] = [nums[j+1],nums[j]];
            }
        }
        if(i<l-1){
            if(nums[i+1] - nums[i] > maximum){
                maximum = nums[i+1] - nums[i]
            }
        }
    }
    return Math.max(maximum,nums[1]-nums[0])
    
}
// console.log('最大间距：',maximumGap1([1,13,16,19]))

/**
 * 缺失的第一个正数
 * @param {number []} nums
 * @return {number}
 * @url https://leetcode-cn.com/problems/first-missing-positive/
 */
let firstMissingPositive = function(nums){
    const arr = nums.filter(item => item > 0);
    const l = arr.length;
    if(l){
        arr.sort((a,b)=> a-b); 
        for(let i = 0; i<l; i++){
            if(arr[i] > 1 && (!(arr[i-1] > 0) || i === 0)) return 1;
            if(arr[i] - arr[i-1] > 1 && arr[i-1] > 0){
                return arr[i-1]+1
            }else if( i === l-1){
                return arr.pop() + 1
            }
        }
    }else{
        return 1
    }
}
// 优化 选择排序 选择最小的
let firstMissingPositive1 = function(nums){
    // 筛选 去除小于1的数字
    nums = nums.filter(item => item > 0);
    // 选择排序，选出最小的数字
    for(let i = 0,len = nums.length;i < len;i++){
        for(let j = i + 1;j < len;j++){
            if(nums[j] < nums[i]){
                [nums[i],nums[j]] = [nums[j],nums[i]]
            }
        }
        // 在循环的第二轮进行比较
        if(i > 0){
            if(nums[i] - nums[i-1] > 1){
                return nums[i-1] + 1
            }
        }else{
            if(nums[0] > 1) return 1 
        }
    }
    // 如果不存在的情况则输出最后一个数字 + 1 数组为空的情况返回1
    return nums.length ? nums.pop() + 1 : 1
}
const testNums = [-5,3,4,12,4,6,0,78,45,20];
// console.log('缺少第一个正数：',firstMissingPositive1(testNums))

