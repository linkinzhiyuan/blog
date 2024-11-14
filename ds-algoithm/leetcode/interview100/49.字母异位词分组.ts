/*
 * @lc app=leetcode.cn id=49 lang=typescript
 * @lcpr version=20003
 *
 * [49] 字母异位词分组
 *
 * https://leetcode.cn/problems/group-anagrams/description/
 *
 * algorithms
 * Medium (69.03%)
 * Likes:    2037
 * Dislikes: 0
 * Total Accepted:    876.5K
 * Total Submissions: 1.3M
 * Testcase Example:  '["eat","tea","tan","ate","nat","bat"]'
 *
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 * 
 * 示例 1:
 * 
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 示例 2:
 * 
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 示例 3:
 * 
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 * 
 * 提示：
 * 
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] 仅包含小写字母
 * 
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 遍历每一个字符串，将每个字符串作为key，value为该字符串的异位词组成的数组
 * @param strs 
 * @returns
 */
export function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>()
  for (let i = 0; i < strs.length; i++) {
    const sortStr = strs[i].split('').sort().join('')
    if (map.has(sortStr)) {
      map.set(sortStr, [...map.get(sortStr) as string[], strs[i]])
    } else {
      map.set(sortStr, [strs[i]])
    }
  }
  return Array.from(map.values())
};
// @lc code=end

