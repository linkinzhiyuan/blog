/**
 * 奇偶排序
 * @param {Array} arr 
 * @return {Array}
 * @url https://leetcode-cn.com/problems/sort-array-by-parity-ii/
 */

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



    for(let i = 0,j = 1; i < arr.length; i += 2){
        // 当arr[i]为偶数 i也是偶数则跳出当前循环，继续下次循环操作
        // 当arr[i]为奇数时 会到下面的while循环看j
        // if( arr[i] % 2 === 0 ) continue; 
        if(arr[i] % 2 === 1){
            while( arr[j] % 2 === 1 ){ // 会一直寻找 直到不是奇数才往下执行
                j += 2;
            }
            [ arr[i],arr[j] ] = [ arr[j],arr[i] ]; //ES6在引入了数组解构的概念，值互换会变得更加方便
        }
    }
    return arr;

    // for (var i = 0, j = -1; i < arr.length; i += 2){
    //     if (arr[i] & 1) {
    //         while(arr[j += 2] & 1) {}
    //         [arr[i], arr[j]] = [arr[j], arr[i]]
    //     }
    // } 
    // return arr
}
const testSort2 = [1,3,5,7,2,4,6,8]
// [1,3,5,7,2,4,6,8]
// 43572168 i=2 j=5
// 43872165 i=4 j=7
console.log('奇偶排序',oddEvenSort(testSort2))