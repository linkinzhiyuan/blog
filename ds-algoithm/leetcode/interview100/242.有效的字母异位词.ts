/*
 * @lc app=leetcode.cn id=242 lang=typescript
 * @lcpr version=20003
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode.cn/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (67.02%)
 * Likes:    955
 * Dislikes: 0
 * Total Accepted:    867.1K
 * Total Submissions: 1.3M
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。
 * 
 * 示例 1:
 * 
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 示例 2:
 * 
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 
 * 提示:
 * 
 * 1 <= s.length, t.length <= 5 * 10^4
 * s 和 t 仅包含小写字母
 * 
 * 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * length 相等且每个字母出现次数相等
 * @param s 
 * @param t 
 * @returns 
 */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const sMap: Map<string,number> = new Map();
  const tMap: Map<string,number> = new Map();
  for (let i = 0; i < s.length; i++) {
    sMap.set(s[i], (sMap.get(s[i]) || 0) + 1)
    tMap.set(t[i], (tMap.get(t[i]) || 0) + 1)
  }

  for(let [key,value] of sMap.entries()){
    if(value !== tMap.get(key)) return false
  }

  return true
};

/**
 * 利用26个字母的个数组成一个新的长度为26数组
 * s是加，t是减
 * 遍历数组都是0，返回true，否则false
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export function isAnagramChartCodeAt(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const arr = new Array(26).fill(0);
  const aIndex = 'a'.charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    arr[s.charCodeAt(i) - aIndex]++;
    arr[t.charCodeAt(i) - aIndex]--;
  }
  return arr.every(item => item === 0)
}

/**
 * 排序之后比较是否完全相同
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
export function isAnagramSort(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  return s.split('').sort().join('') === t.split('').sort().join('')
}
// @lc code=end

