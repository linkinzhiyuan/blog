/*
 * @lc app=leetcode.cn id=205 lang=typescript
 * @lcpr version=20003
 *
 * [205] 同构字符串
 *
 * https://leetcode.cn/problems/isomorphic-strings/description/
 *
 * algorithms
 * Easy (49.66%)
 * Likes:    744
 * Dislikes: 0
 * Total Accepted:    308.9K
 * Total Submissions: 622K
 * Testcase Example:  '"egg"\n"add"'
 *
 * 给定两个字符串 s 和 t ，判断它们是否是同构的。
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
 * 
 * 示例 1:
 * 
 * 输入：s = "egg", t = "add"
 * 输出：true
 * 
 * 示例 2：
 * 
 * 输入：s = "foo", t = "bar"
 * 输出：false
 * 
 * 示例 3：
 * 
 * 输入：s = "paper", t = "title"
 * 输出：true
 * 提示：
 * 1 <= s.length <= 5 * 10^4
 * t.length == s.length
 * s 和 t 由任意有效的 ASCII 字符组成
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 1. 两个字符串的长度不一致，返回false
 * 2. 遍历字符串s 和 t, 建立两个map, map1用于存储s中的字符和t中的字符的映射关系，map2用于存储t中的字符和s中的字符的映射关系
 * @param s 
 * @param t 
 * @returns
 */
export function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const map: Map<string, string> = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      if (map.get(s[i]) !== t[i]) return false;
    } else {
      map.set(s[i], t[i]);
    }
  }

  const map2: Map<string, string> = new Map();
  for (let i = 0; i < t.length; i++) {
    if (map2.has(t[i])) {
      if (map2.get(t[i]) !== s[i]) return false;
    } else {
      map2.set(t[i], s[i]);
    }
  }
  return true;
};

/**
 * 1. 两个字符串的长度不一致，返回false
 */
export function isIsomorphic2(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const sMap: Map<string, string> = new Map();
  const tMap: Map<string, string> = new Map();
  for(let i=0; i<s.length;i++){
    const x = s[i], y = t[i];
    if((sMap.has(x) && sMap.get(x) !== y) || (tMap.has(y) && tMap.get(y) !== x)) return false;
    sMap.set(x, y);
    tMap.set(y, x);
  }

  return true
}



// @lc code=end


