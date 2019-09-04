/**
 * @param {string} s
 * @return {number}
 * @url https://leetcode.com/problems/count-binary-substrings/
 */
var countBinarySubstrings = function(s) {
    let arr = [];
    // findMatch方法的实现
    let findMatch = (str)=>{
        let j = str.match(/^(0+|1+)/)[0];
        let o = (j[0] ^ 1).toString().repeat(j.length)
        let reg = new RegExp(`^(${j}${o})`)
        // 符合正则
        if(reg.test(str)){
            return RegExp.$1 //输出匹配的第一个
        }else{
            return ''
        }
    }
    //循环找出合适的子字符串，存储输出
    for(let i = 0;i<s.length;i++){
        const str = findMatch(s.slice(i))
        if(str){
            arr.push(str)
        }
    }
    return arr
};
// 方法二
const countBinarySubstrings_2 = (s) => s.replace(/01/g, '0,1').replace(/10/g, '1,0').split(',')
    .reduce((res, a, i, arr) =>  i ? res+Math.min(a.length, arr[--i].length):0, 0);
//00110011 //6
// console.log(countBinarySubstrings_2("00001000111001100")) //11
