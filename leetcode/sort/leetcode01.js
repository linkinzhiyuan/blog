/**
 * 冒泡排序
 * @param {Array} arr
 * @return {Array} 
 */

//冒泡排序 第一层循环是循环的次数 第二层是比较相邻两个数的大小，前一个比后一个大则交换顺序，反之顺序不变
const testSort1 = [92,2,5,4,120,45,1,500,23,100,6,12]

let bubblingSort = function(arr){
    const l = arr.length;
    for(let i = l - 1,tmp; i > 0;i--){
        for(let j = 0;j < i;j++){
            tmp = arr[j]
            if(tmp > arr[j+1]){
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
    return arr
}
// console.log(bubblingSort(testSort1))

// 选择排序 两次循环，第一次依次取值，第二次比较值后面的数，取最小的交换位置
let selectSort = function(arr){
    const l = arr.length;
    for(let i = 0,min;i < l;i++){
        min = arr[i];
        for(let j = i+1;j < l;j++){
            if(arr[j] < min){
                const c = min;
                min = arr[j];
                arr[j] = c;
            }
        }
        arr[i] = min
    }
    return arr
}
// console.log(selectSort(testSort1))

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
console.log(oddEvenSort(testSort2))
