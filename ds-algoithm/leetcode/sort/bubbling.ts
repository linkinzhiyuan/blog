/**
 * 冒泡排序, 大数往后排
 * 第一层循环是循环的次数 第二层是比较相邻两个数的大小，前一个比后一个大则交换顺序，反之顺序不变
 * @param {Array} arr
 * @return {Array} 
 */

export const bubblingSort = function(arr: Array<number>): Array<number>{
    const l = arr.length;
    for(let i = l - 1; i > 0;i--){
        for(let j = 0;j < i;j++){
            if(arr[j] > arr[j+1]){ // 前一个值比后面的大，则交换位置 大数向后面排
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    }
    return arr
}

/**
 * 数组中的第K个最大元素
 * @param {Array} nums
 * @param {Number} k
 * @return {Number}
 * @url https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 */
export const findKthLargest = function(nums: number[],k: number): number{
    return nums.sort((a: number,b: number) => b-a )[k-1];
}
// 优化版本 冒泡排序
export const findKthLargestRefactor = function(nums: number[],k: number){
    // 利用冒泡排序的原理，每次排序都是选出最大的数右移到最后，这次只需要排序k次就能拿到
    // 冒泡原理：确定每次循环时对比的次数，第一次是全部
    const l = nums.length;
    for(let i = l - 1;i > l-1-k;i--){
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
export const maximumGap = function(nums: Array<any>): number{
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

/**
 * 优化版的最大间距算法，在冒泡排序的第一层循环的过程中，比较筛选后的后面的大数的最大间距，最后在对比前两个数的间距
 * @param nums 
 * @returns 
 */
export const maximumGapRefactor = function(nums: number[]){
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
