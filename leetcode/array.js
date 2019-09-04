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
