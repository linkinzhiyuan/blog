/**
 * 选择排序
 * 两次循环，第一次依次取值，第二次比较值后面的数，取最小的交换位置
 * @param {*} arr 
 */

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

// const testSort1 = [92,2,5,4,120,45,1,500,23,100,6,12]
// console.log('选择排序：',selectSort(testSort1))


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