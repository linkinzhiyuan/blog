/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 *
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/description/
 *
 * algorithms
 * Hard (38.91%)
 * Likes:    1152
 * Dislikes: 0
 * Total Accepted:    223.8K
 * Total Submissions: 581.5K
 * Testcase Example:  '"barfoothefoobarman"\n["foo","bar"]'
 *
 * 给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。
 * 
 * s 中的 串联子串 是指一个包含  words 中所有字符串以任意顺序排列连接起来的子串。
 * 
 * 
 * 例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"，
 * "cdefab"，"efabcd"， 和 "efcdab" 都是串联子串。 "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
 * 
 * 
 * 返回所有串联子串在 s 中的开始索引。你可以以 任意顺序 返回答案。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "barfoothefoobarman", words = ["foo","bar"]
 * 输出：[0,9]
 * 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
 * 子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
 * 子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
 * 输出顺序无关紧要。返回 [9,0] 也是可以的。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
 * 输出：[]
 * 解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
 * s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
 * 所以我们返回一个空数组。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
 * 输出：[6,9,12]
 * 解释：因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。
 * 子串 "foobarthe" 开始位置是 6。它是 words 中以 ["foo","bar","the"] 顺序排列的连接。
 * 子串 "barthefoo" 开始位置是 9。它是 words 中以 ["bar","the","foo"] 顺序排列的连接。
 * 子串 "thefoobar" 开始位置是 12。它是 words 中以 ["the","foo","bar"] 顺序排列的连接。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 10^4
 * 1 <= words.length <= 5000
 * 1 <= words[i].length <= 30
 * words[i] 和 s 由小写英文字母组成
 * 
 * 
 */

// @lc code=start
/**
 * 滑动窗口
 * 初始化，记录总长度和单个单词长度
 * 遍历字符串，统计每个单词出现的次数
 * 从0遍历到s-totalLen之间，截取单词，判断是否存在，不存在则跳出
 * 存在，更新单词出现次数，如果出现次数大于单词出现次数，跳出
 * 如果 seenWords 中的单词频率与 wordCount 中相同，则记录起始位置
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
export const findSubstring = function(s: string, words: string[]): number[] {
  if(!words.length) return []

  const wordLen = words[0].length, totalLen = wordLen * words.length;
  const wordCount = new Map();
  const result: number[] = [];

  for(let i = 0; i < words.length; i++){
    wordCount.set(words[i], (wordCount.get(words[i]) || 0) + 1);
  }

  for(let i = 0; i< s.length - totalLen; i++){
    const seenWords = new Map();
    let j =0;
    while(j < words.length){
      // 截取单词 看出现的次数
      const start= i + j * wordLen;
      const end = start + wordLen;
      const word = s.substring(start, end);
      if(!wordCount.get(word)) break; // 在wordCount中找不到该单词

      seenWords.set(word, (seenWords.get(word) || 0) + 1);
      if(seenWords.get(word) > wordCount.get(word)) break; // 该单词出现次数大于wordCount中的单词

      j++;
    }

    if(j === words.length){
      result.push(i);
    }
  }

  return result

};

/**
 * 分段滑动窗口
 * 因为单词长度相同，可以将字符串划分为 wordLen 个段，分别处理。这样可以减少重复检查的次数。
 * 对每个段，使用滑动窗口策略检查子串
 * 通过分段，可以有效减少不必要的检查次数，提高效率
 * @param {string} s
 * @param {string[]} words
 */
export const findSubstring2 = function(s: string, words: string[]): number[] {
  if(words.length === 0) return [];
  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;
  const wordCount = new Map();
  const result: number[] = [];

  for(let i = 0; i < words.length; i++){
    wordCount.set(words[i], (wordCount.get(words[i]) || 0) + 1);
  }

  for(let i = 0; i < wordLen; i++){
    let left = i, right = i;
    const seenWords = new Map();

    while(right + wordLen <= s.length){
      const word = s.substring(right, right + wordLen);
      right += wordLen;

      // 不存在，继续前移
      if(!wordCount.has(word)){
        left = right;
        seenWords.clear();
        continue;
      } else {
        // 存在的情况，更新出现次数
        seenWords.set(word, (seenWords.get(word) || 0) + 1);
        // 如果一直大于单词出现次数，则继续前移，并把单词出现次数减一
        while(seenWords.get(word) > wordCount.get(word)){
          const leftWord = s.substring(left, left + wordLen);
          left += wordLen;
          seenWords.set(leftWord, (seenWords.get(leftWord) || 0) - 1);
        }

        if(right - left === totalLen){
          result.push(left);
        }
      }
    }
  }

  return result
}
// @lc code=end

