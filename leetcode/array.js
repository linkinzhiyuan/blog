/**
 * @param {string} digits
 * @return {string[]}
 * @url https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 */
var letterCombinations = function(digits) {
    // 按照数字对应字符的方式 2->'abc'
    let str = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
        code = [];
    // 输入的数字转化为 字符串数组 ['abc','def']
    digits.split('').map(item=>{
        if(str[item]){
            code.push(str[item])
        }
    })
    const twoArray = function(arr){
        let result = [];
        for(let i = 0;i<arr[0].length;i++){
            for(let j = 0;j<arr[1].length;j++){
                result.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        //替换arr的前两位为result
        arr.splice(0,2,result)
        //如果长度大于继续 递归操作
        if(arr.length > 1){
            twoArray(arr);
        }
        // 最后返回数组的第一位也是唯一的一位
        return arr[0]
    }
    // 判断长度为1的输出情况
    return code.length>1?twoArray(code):code.toString().split('')
};

// console.log(letterCombinations('234'))
const letterCombinations_2 = (digits) => {
    if(digits.length === 0) return [];
    const obj = {
        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r','s'],
        '8': ['t','u','v'],
        '9': ['w','x','y','z']
    };
    return digits.split('').map(num=>{
        return [].concat(obj[num]) //输出二维数组
    }).reduce((res,a)=>{ //使用reduce的前两个元素的特点
        let result = [];
        res.forEach(res_item=>{ //循环第一个元素
            a.forEach(a_item=>{ //循环第二个元素
                result.push(`${res_item}${a_item}`)
            })
        })
        return result
    })
}
// console.log(letterCombinations_2('2'))

/**
 * @param {number[]} deck
 * @return {boolean}
 * @url https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/
 */
// 此方法适用于只有个位数的数字
var hasGroupsSizeX = function(deck) {
    // 思路 排序相同的数字，并且个数的关系是成倍数关系的 就是最大公约数>=2
    //最大公约数函数
    let gcd = (a,b)=>{ //GreatestCommonDivisor
        // a=c*b+d { d===0 b是最大公约数; d!==0 b=e*d+f {f===0,d是最大公约数；f!==0 递归操作}}
        // console.log(a,b)
        return b === 0 ? a : gcd(b,a%b)
    }
    // 排序比较大小 小->大
    let compare = (a,b)=> a-b
    let group = deck.sort().join('').match(/(\d)\1+|\d/g);
    while(group.length > 1){
        const a = group.shift().length,b = group.shift().length;
        let num = gcd(a,b);
        if(num === 1){
            return false
        }else{
            group.unshift('0'.repeat(num))
        }
    }
    return group.length ? group[0].length>=2 : false
};

const hasGroupsSizeX_2 = (deck) => {
    // 找出数组中元素出现的个数，然后通过最大公约数判断
    let gcd = (a,b)=>{ //GreatestCommonDivisor
        // a=c*b+d { d===0 b是最大公约数; d!==0 b=e*d+f {f===0,d是最大公约数；f!==0 递归操作}}
        return b === 0 ? a : gcd(b,a%b)
    }
    let obj = deck.reduce(function(prev,next){
        prev[next] = (prev[next] + 1) || 1;
        return prev;
    },{});
    const group = Object.values(obj);
    while(group.length > 1){
        const a = group.shift(),b = group.shift();
        let num = gcd(a,b);
        if(num === 1){
            return false
        }else{
            group.unshift(num)
        }
    }
    return group.length ? group[0]>=2 : false
}
// console.log(hasGroupsSizeX_2([1,2,3,4,4,3,2,1]))


/**
 * @param {array,number} flowerbed,n
 * @return {boolean}
 * @url https://leetcode.com/problems/can-place-flowers/
 */
const canPlaceFlowers = function(flowerbed,n){
    // solved 1
    let max = 0;
    for(let i = 0;i<flowerbed.length;i++){
        if(flowerbed[i]===0){
            if(i===0&&flowerbed[1]!==1){
                max ++;
                i++;
            }else if(flowerbed[i-1]!==1&&flowerbed[i+1]!==1){
                max ++;
                i++;
            }else if(i === flowerbed.length-1 &&flowerbed[flowerbed.length-2] !== 1 ){
                max ++;
                i++;
            }
        }
    }
    return max>=n;
    // solved 2
    for(let i=0;i<flowerbed.length;i++){
        if(max >= n) return true;
        if(flowerbed[i]===0 && flowerbed[i-1] !== 1 && flowerbed[i+1] !== 1){
            max++;
            i++;
        }
    }
    return max >= n;
    // solved 3
    for(let i=0;i<flowerbed.length;i++){
        //提前完成任务的
        if(n <= 0) return true
        //获取左右中的数值
        const left = i > 0 ? flowerbed[i-1]:0,
        right = i < flowerbed.length - 1 ? flowerbed[i+1]:0,
        current = flowerbed[i];
        if(!(left+right+current)){
            //符合条件的n-- 中间的数值变成1
            n--;
            flowerbed[i] = 1;
        }
    }
    return n <= 0;
}
// console.log(canPlaceFlowers([0],1))

/**
 * @param {number} n
 * @return {number[]}
 * @url https://leetcode.com/problems/gray-code/
 */
var grayCode = function(n) {
    // solved 1
    // 递归函数 借助上一位返回值，根据对称性最后添加一位加入0和1，或者开头添加一位0和1
    // let turnGray = (n)=>{
    //     if(n===0){
    //         return ['0']
    //     }else if(n===1){
    //         return ['0','1']
    //     }else{
    //         const prev = turnGray(n-1),result = [],max = Math.pow(2,n)-1;
    //         for(let i=0,len=prev.length;i<len;i++){
    //             result[i] = `${prev[i]}0`;
    //             result[max-i] = `${prev[i]}1`
    //         }
    //         return result
    //     }
    // }
    // // 二进制转化为十进制
    // let decimal = (arr) => {
    //     let newArr = []
    //     arr.forEach(i=>{
    //         newArr.push(parseInt(i.toString(),2))
    //     })
    //     return newArr
    // }
    // return decimal(turnGray(n))
    // solved 2
    // 输出的十进制的数组两层循环增加不同的数字，相当于对称加上某一个相同的数字Math.pow(2,n-1)
    // [0,1]=>[0,1,3,2]=>[0,1,3,2,6,7,5,4]
    let arr = [0]
    for(let i=1;i<=n;i++){
        const num = Math.pow(2,i-1);
        for(let j=num-1;j>=0;j--){
            arr.push(num+arr[j])
        }
    }
    return arr
};
// console.log(grayCode(3))