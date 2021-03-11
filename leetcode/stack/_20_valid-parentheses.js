/**
 * 有效的括号
 * https://leetcode-cn.com/problems/valid-parentheses/
*/
const isValid = function(s) {
    // 栈 数据结构
    // 1.是否能被2整除，单数的false
    // 2.遇到left的入栈，遇到right出栈，判断是否匹配一直，一直则继续，否则返回false
    // 3.栈内为空则true，否则false
    const left = ['(','[','{'],right = [')',']','}']
    const len = s.length,stack = []
    if(len % 2 !== 0) return false
    for(let i = 0;i < len;i++){
        if(left.indexOf(s[i]) > -1){
            stack.push(s[i])
        } else {
            if(s[i] === ')' && stack.pop() !== '(') return false
            if(s[i] === ']' && stack.pop() !== '[') return false 
            if(s[i] === '}' && stack.pop() !== '{') return false 
        }     
    }
    console.log('stack',stack)
    return !(stack.length > 0)
};

const isValid2 = (s) => {
    while(s.indexOf('()') > -1 || s.indexOf('[]') > -1 || s.indexOf('{}') > -1){
        s = s.replace('()','')
        s = s.replace('[]','')
        s = s.replace('{}','')
    }
    return !(s.length > 0)
}

const isValid3 = (s) => {
    let arr = []
    let len = s.length
    if (len%2) return false
    for (let i = 0; i < len; i++) {
        let letter = s[i]
        switch(letter) {
            case "(": {
                arr.push(letter)
                break;
            }
            case "[": {
                arr.push(letter)
                break;
            }
            case "{": {
                arr.push(letter)
                break;
            }
            case ")": {
                if (arr.pop() !== "(") return false
                break;
            }
            case "]": {
                 if (arr.pop() !== "[") return false
                break;
            }
            case "}": {
                if (arr.pop() !== "{") return false
                break;
            }
        }
    }
    return !arr.length
}

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid4 = function (s) {
    const stack = [],map = new Map()
    map.set("(", ")")
    map.set("[", "]")
    map.set("{", "}")
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) stack.push(s[i])
        else {
            if (stack.length === 0) return false // 还有右括号的情况，stack已经为空的时候
            if (map.get(stack.pop()) !== s[i]) return false
        }
    }
    return !stack.length
};

console.log(isValid('()'))
console.log(isValid('()[]{}'))
console.log(isValid('(]'))
console.log(isValid('([)]'))
console.log(isValid('{[]}'))
console.log(isValid2('()'))
console.log(isValid2('()[]{}'))
console.log(isValid2('(]'))
console.log(isValid2('([)]'))
console.log(isValid2('{[]}'))
