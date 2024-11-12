/*
 * @lc app=leetcode.cn id=383 lang=typescript
 * @lcpr version=20003
 *
 * [383] 赎金信
 *
 * https://leetcode.cn/problems/ransom-note/description/
 *
 * algorithms
 * Easy (65.77%)
 * Likes:    928
 * Dislikes: 0
 * Total Accepted:    557.6K
 * Total Submissions: 847.5K
 * Testcase Example:  '"a"\n"b"'
 *
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
 * 
 * 如果可以，返回 true ；否则返回 false 。
 * 
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 * 示例 1：
 * 
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 * 
 * 
 * 示例 2：
 * 
 * 输入：ransomNote = "aa", magazine = "ab"
 * 输出：false
 * 示例 3：
 * 输入：ransomNote = "aa", magazine = "aab"
 * 输出：true
 * 提示：
 * 1 <= ransomNote.length, magazine.length <= 10^5
 * ransomNote 和 magazine 由小写英文字母组成
 */
// @lcpr-template-start

// @lcpr-template-end
// @lc code=start

/**
 * 1. 首先判断ransomNote长度是否大于magazine长度，如果是，直接返回false
 * 2. 然后遍历magazine字符串，用map记录每个字符出现的次数
 * 3. 遍历ransomNote字符串，判断map中是否存在该字符，存在的话，出现次数-1，不存在的话，直接返回false
 * 4. 最后遍历map，判断是否存在出现次数小于0的情况，存在的话，返回false
 * @param ransomNote 
 * @param magazine 
 * @returns 
 */
export function canConstruct(ransomNote: string, magazine: string): boolean {
  const rl = ransomNote.length, ml = magazine.length;
  if (rl > ml) return false;
  const map: Map<string, number> = new Map();
  for (let i = 0; i < ml; i++) {
    map.set(magazine[i], (map.get(magazine[i]) || 0) + 1);
  }

  for (let i = 0; i < rl; i++) {
    if(!map.has(ransomNote[i])) return false;
    map.set(ransomNote[i], (map.get(ransomNote[i]) || 0) - 1);
    if((map.get(ransomNote[i] as string) as number) < 0) return false;
  }

  return true
};

/**
 * 1. 比较两个字符串的map结构
 * @param ransomNote
 * @param magazine
 * @returns boolean
 */
export function canConstructTwoMap(ransomNote: string, magazine: string): boolean {
  const rl = ransomNote.length, ml = magazine.length;
  if (rl > ml) return false;
  const mapR: Map<string, number> = new Map();
  const mapM: Map<string, number> = new Map();

  for (let i = 0; i < ml; i++) {
    mapM.set(magazine[i], (mapM.get(magazine[i] as string) || 0) + 1)
  }

  for (let i = 0; i < rl; i++) {
    if(!mapM.has(ransomNote[i])) return false;
    mapR.set(ransomNote[i], (mapR.get(ransomNote[i] as string) || 0) + 1)
  }

  for (let i = 0; i < rl; i++) {
    if((mapM.get(ransomNote[i] as string) as number) < (mapR.get(ransomNote[i] as string) as number)) return false
  }

  return true
}

/**
  * 我们可以用一个哈希表或长度为 26 的数组 cnt 记录字符串 magazine 中所有字符出现的次数。然后遍历字符串 ransomNote，对于其中的每个字符 c，我们将其从 cnt 的次数减 1，如果减 1 之后的次数小于 0，说明 c 在 magazine 中出现的次数不够，因此无法构成 ransomNote，返回 false 即可。
  * 否则，遍历结束后，说明 ransomNote 中的每个字符都可以在 magazine 中找到对应的字符，因此返回 true
 */
export const canConstructCharCodeAt = function(ransomNote: string, magazine: string): boolean {
  const cnt = new Array(26).fill(0);
  for(const c of magazine) cnt[c.charCodeAt(0) - 97]++;
  for(const c of ransomNote) {
    cnt[c.charCodeAt(0) - 97]--;
    if(cnt[c.charCodeAt(0) - 97] < 0) return false;
    console.log(ransomNote,c)
  }
  return true
}
// @lc code=end

