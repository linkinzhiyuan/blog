/*
 * @lc app=leetcode.cn id=211 lang=typescript
 * @lcpr version=20004
 *
 * [211] 添加与搜索单词 - 数据结构设计
 *
 * https://leetcode.cn/problems/design-add-and-search-words-data-structure/description/
 *
 * algorithms
 * Medium (50.46%)
 * Likes:    596
 * Dislikes: 0
 * Total Accepted:    99.9K
 * Total Submissions: 197.7K
 * Testcase Example:  '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n' +
  '[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]'
 *
 * 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。
 * 
 * 实现词典类 WordDictionary ：
 * 
 * 
 * WordDictionary() 初始化词典对象
 * void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
 * bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些
 * '.' ，每个 . 都可以表示任何一个字母。
 * 
 * 示例：
 * 
 * 输入：
 * 
 * ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 * [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * 输出：
 * [null,null,null,null,false,true,true,true]
 * 
 * 解释：
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // 返回 False
 * wordDictionary.search("bad"); // 返回 True
 * wordDictionary.search(".ad"); // 返回 True
 * wordDictionary.search("b.."); // 返回 True
 * 
 * 提示：
 * 
 * 
 * 1 <= word.length <= 25
 * addWord 中的 word 由小写英文字母组成
 * search 中的 word 由 '.' 或小写英文字母组成
 * 最多调用 10^4 次 addWord 和 search
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class WordNode {
    isEnd: boolean;
    children: Map<string, WordNode>;
    constructor() {
        this.isEnd = false;
        this.children = new Map();
    }
}
class WordDictionary {
    root: WordNode;
    constructor() {
        this.root = new WordNode();
    }

    addWord(word: string): void {
        let node = this.root;
        for(const char of word) {
            if(!node.children.has(char)) {
                node.children.set(char, new WordNode());
            }
            node = node.children.get(char)!;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        return this.dfsSearch(this.root, word, 0);
    }

    private dfsSearch(node: WordNode, word: string, index: number): boolean {
        if(index === word.length) return node.isEnd;
        const char = word[index];

        // 处理通配符 '.' 的情况
        if(char === '.') {
            for(const child of node.children.values()) {
                if(this.dfsSearch(child, word, index + 1)) {
                    return true;
                }
            }
            return false;
        } else {
            if(node.children.has(char)) {
                return this.dfsSearch(node.children.get(char)!, word, index + 1);
            } else {
                return false;
            }
        }
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end


describe('WordDictionary', () => {
  let wordDictionary: WordDictionary;

  beforeEach(() => {
    wordDictionary = new WordDictionary();
  });

  test('should add a word', () => {
    wordDictionary.addWord('apple');
    expect(wordDictionary.search('apple')).toBe(true);
  });

  test('should handle empty word', () => {
    wordDictionary.addWord('');
    expect(wordDictionary.search('')).toBe(true);
  });

  test('should handle non-existent word', () => {
    wordDictionary.addWord('apple');
    expect(wordDictionary.search('banana')).toBe(false);
  });

  test('should handle partial match', () => {
    wordDictionary.addWord('apple');
    expect(wordDictionary.search('app')).toBe(false);
  });

  test('should handle wildcard search', () => {
    wordDictionary.addWord('apple');
    expect(wordDictionary.search('.pple')).toBe(true);
    expect(wordDictionary.search('a.p.e')).toBe(true);
  });
});


