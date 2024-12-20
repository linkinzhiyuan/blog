/*
 * @lc app=leetcode.cn id=127 lang=typescript
 * @lcpr version=20004
 *
 * [127] 单词接龙
 *
 * https://leetcode.cn/problems/word-ladder/description/
 *
 * algorithms
 * Hard (49.18%)
 * Likes:    1427
 * Dislikes: 0
 * Total Accepted:    234.5K
 * Total Submissions: 475.9K
 * Testcase Example:  '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]'
 *
 * 字典 wordList 中从单词 beginWord 到 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 ->
 * s2 -> ... -> sk：
 * 
 * 
 * 每一对相邻的单词只差一个字母。
 * 对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
 * sk == endWord
 * 
 * 
 * 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列
 * 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
 * 
 * 
 * 示例 1：
 * 
 * 输入：beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log","cog"]
 * 输出：5
 * 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
 * 
 * 
 * 示例 2：
 * 
 * 输入：beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log"]
 * 输出：0
 * 解释：endWord "cog" 不在字典中，所以无法进行转换。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= beginWord.length <= 10
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 5000
 * wordList[i].length == beginWord.length
 * beginWord、endWord 和 wordList[i] 由小写英文字母组成
 * beginWord != endWord
 * wordList 中的所有字符串 互不相同
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 图的最短路径，BFS
 * @param beginWord 
 * @param endWord 
 * @param wordList 
 */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if(wordList.indexOf(endWord) === -1) return 0;

  const wordSet = new Set(wordList); // 转换集合，便于查找
  const queue: Array<[string, number]> = [[beginWord, 1]]; // 队列
  const visited = new Set<string>(beginWord) // 已经访问过的单词

  while(queue.length) {
    const [current, level] = queue.shift()! // 取出当前单词

    for(let i = 0; i < current.length; i++) {
      for(let j = 0; j < 26; j++) {
        if(current[i] === String.fromCharCode('a'.charCodeAt(0) + j)) continue;
        const next = current.slice(0, i) + String.fromCharCode('a'.charCodeAt(0) + j) + current.slice(i + 1)
        if(next === endWord) return level + 1
        if(wordSet.has(next) && !visited.has(next)) {
          queue.push([next, level + 1])
          visited.add(next)
        }
      }
    }
  }

  return 0
};
// @lc code=end


describe('ladderLength', () => {
  it('should return the length of the shortest transformation sequence', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(5);
  });

  it('should return 0 if endWord is not in wordList', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log'];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });

  it('should return 1 if beginWord is the same as endWord', () => {
    const beginWord = 'hit';
    const endWord = 'hit';
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log'];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });

  it('should return 0 if wordList is empty', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList: string[] = [];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });

  // it('should throw an error if beginWord and endWord have different lengths', () => {
  //   const beginWord = 'hit';
  //   const endWord = 'cogs';
  //   const wordList = ['hot', 'dot', 'dog', 'lot', 'log'];
  //   expect(() => ladderLength(beginWord, endWord, wordList)).toBe(0);
  // });

  it('should ignore duplicate words in wordList', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList = ['hot', 'hot', 'dot', 'dog', 'lot', 'log', 'cog'];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(5);
  });
});
