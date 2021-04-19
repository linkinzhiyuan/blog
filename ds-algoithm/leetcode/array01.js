/**
 * 20200601 - 20200607 leetcode 题目解析
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * @url https://leetcode-cn.com/problems/two-sum/
 */
// eg. nums = [2, 7, 11, 15] target 9 return [0,1]
const nums = [3,2,4,3,2,4];
var twoSum = function(nums,target){
    // 1.两次循环
    // for(let i = 0;i < nums.length - 1; i++){
    //     for(let j = i+1; j < nums.length; j++){
    //         if(nums[i]+nums[j] === target ){
    //             return [i,j]
    //         }
    //     }
    // }
    // return;

    // 2.差值 取对象的下标直接查找更快
    // let obj = {}, // key 对应数字，value对应小标
    // loop = 0, //循环的次数
    // dis; // 差值
    // while(loop < nums.length){
    //     dis = target - nums[loop];
    //     if(obj[dis] !== undefined){ // 这个数字存在的话 就符合条件
    //         return [obj[dis],loop]
    //     }
    //     obj[nums[loop]] = loop; // 存储不符合条件的数字和对应的下标
    //     loop ++ ;
    // }
    // return;

    // 3.Map 数据结构
    const l = nums.length;
    // 根据数组长度筛选一部分
    if(l < 2) return []
    if(l === 2){
        if(nums[0] + nums[1] === target){return [0,1]}
        return []
    } 
    let newMap = turnMap(nums);
    for(let i = 0;i < l;i++){
        let dis = target - nums[i];
        if(newMap.has(dis)){
            const targetIndex = newMap.get(dis)
            if(targetIndex > i){
                return [i,targetIndex]
            }
        }
    }
}
const turnMap = function(nums){
    let newMap = new Map();
    nums.forEach((item,i)=>{
        newMap.set(item,i)  // key为数值，value为下标，重复的数字直接覆盖
    })
    return newMap
}
// console.log('两数之和输出:',twoSum(nums,6))

/**
 * @param {number[]} nums
 * @return {number[][]} 
 * @url https://leetcode-cn.com/problems/3sum/
 */
const threeNums = [-1, 0, 1, 2, -1, -4,0, -1, 1,-2];
let threeSum = function(nums){
    // 1).特判：数组长度n，数组为null或者数组长度小于3，返回[]
    // 2).数组升序排序
    // 3).遍历数组：若num[i]>0,由于数组是升序，后面的遍历必然是大于0的，所以直接返回结果；
    // 若num[i]<0,令左指针L= i+1,右指针R= n-1,当L<R时执行循环
    // 令sum = num[i]+num[L]+num[R]
    // 若sum = 0 执行循环，判断左右指针是否和下一位重复，去除重复解，并同时将L,R移到下一位，寻找新的解
    // 若sum > 0,说明sum[R]太大，R左移
    // 若sum < 0,说明sum[L]太小，L右移
    const l = nums.length,res = [];
    if(nums.length < 3 || nums === null) return res;
    nums.sort((a,b) => a-b); // 升序
    for( let i = 0;i < l-2;){
        if( nums[i] > 0 ) break; // 由于是升序 不符合条件跳出循环
        let L = i+1,R = l-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R]
            if( sum === 0 ){ // 符合条件 去重 并指针移到下一位寻找新解
                res.push([nums[i],nums[L],nums[R]]);
                // 左右指针去重
                while( L < R && nums[L] === nums[++L] );
                while( L < R && nums[R] === nums[--R] );
            }else if( sum > 0 ){ // sum[R]太大，R左移
                // while( L < R && nums[R] === nums[--R] );
                R--;
            }else if( sum < 0){ // 若sum < 0,说明sum[L]太小，L右移
                // while( L < R && nums[L] === nums[++L] );
                L++;
            }
        }
        while(nums[i] === nums[++i]); // 定值去重
    }
    return res;
}

// console.log(threeSum(threeNums))

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * @url https://leetcode-cn.com/problems/3sum-closest/
 */
const numsThree = [-1,2,1,-2,-1,0,-3,-4]
var threeSumClosest = function(nums,target){
    // 特判：nums为null,数组长度小于4，直接返回数组之和
    // 排序 双指针
    // 确定第一个数的位置，循环；若L<R 循环比较三个数和和目标元素，相等则直接返回，小于则L+1,大于则R-1
    const l = nums.length;
    if(nums === null || l === 0) return null;
    if( l < 4 ) return nums.reduce((a,b)=>a+b,0);
    nums.sort((a,b)=>a-b); // 升序
    let res = nums[0] + nums[1] + nums[2]; // 初始三个数的和
    // for(let i = 0;i<l-2;i++){
    //     let L = i + 1,R = l - 1;
    //     while( L < R){
    //         const sum = nums[i] + nums[L] + nums[R]; 
    //         if( sum === target ){
    //             return sum
    //         }else if(sum > target){ // 和大于目标 R--
    //             --R;
    //             // while( nums[R] === nums[--R]);
    //         }else{
    //             ++L;
    //             // while( nums[L] === nums[++L]);
    //         }
    //         if(Math.abs(sum - target) < Math.abs(res - target)){ // 结果sum和初始的res对比 更接近target
    //             res = sum
    //         }
    //     }
    // }
    // return res;

    for(let i = 0;i < l;i++){
        let L = i + 1,R = l - 1;
        while( L < R ){
            const sum = nums[i] + nums[L] + nums[R]; 
            if(Math.abs(target - sum) < Math.abs(target - res)){
                res = sum
            }
            if(sum > target){
                R--;
            }else if(sum < target){
                L++;
            }else{
                return sum
            }
        }
    }
    return res
}

// console.log(threeSumClosest(numsThree,1))