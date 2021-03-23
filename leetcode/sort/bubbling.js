/**
 * 冒泡排序
 * 第一层循环是循环的次数 第二层是比较相邻两个数的大小，前一个比后一个大则交换顺序，反之顺序不变
 * @param {Array} arr
 * @return {Array} 
 */

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
const testSort1 = [92,2,5,4,120,45,1,500,23,100,6,12]
console.log(bubblingSort(testSort1))


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
// console.log('数组中的第K个最大元素',findKthLargest2([3,2,1,5,6,4],2)) // 5
// console.log('数组中的第K个最大元素',findKthLargest2([3,2,3,1,2,4,5,5,6],4)) // 4 

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
        if(nums[i+1] - nums[i] > maximum){
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