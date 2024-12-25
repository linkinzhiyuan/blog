/*
 * @lc app=leetcode.cn id=208 lang=typescript
 * @lcpr version=20004
 *
 * [208] 实现 Trie (前缀树)
 *
 * https://leetcode.cn/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (72.36%)
 * Likes:    1737
 * Dislikes: 0
 * Total Accepted:    383.1K
 * Total Submissions: 529K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n' +
  '[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * Trie（发音类似 "try"）或者说 前缀树
 * 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。
 * 
 * 请你实现 Trie 类：
 * 
 * 
 * Trie() 初始化前缀树对象。
 * void insert(String word) 向前缀树中插入字符串 word 。
 * boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回
 * false 。
 * boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true
 * ；否则，返回 false 。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 输入
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出
 * [null, null, true, false, true, null, true]
 * 
 * 解释
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 * 
 * 提示：
 * 
 * 1 <= word.length, prefix.length <= 2000
 * word 和 prefix 仅由小写英文字母组成
 * insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class TrieNode {
    isEnd: boolean;
    children: Map<string, TrieNode>;
    constructor(){
        this.isEnd = false;
        this.children = new Map();
    }
}
class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for(const char of word){
            if(!node.children.has(char)){
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        let node = this.root;
        for(const char of word){
            if(!node.children.has(char)){
                return false
            }
            node = node.children.get(char)!
        }
        return node.isEnd
    }

    startsWith(prefix: string): boolean {
        let node = this.root;
        for(const char of prefix){
            if(!node.children.has(char)){
                return false
            }
            node = node.children.get(char)!
        }
        return true
    }
}


// 字典树存储方式, 通过数组存储
class TrieArrayNode {
    children: (TrieArrayNode | null)[];
    isEnd: boolean;
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEnd = false;
    }
}
class TrieArray {
    root: TrieArrayNode;

    constructor() {
        this.root = new TrieArrayNode();
    }

    insert(word: string): void {
        let node = this.root;
        for(const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if(!node.children[index]){
                node.children[index] = new TrieArrayNode();
            }
            node = node.children[index]!;
        }
        node.isEnd = true;
        console.log(this.root);
    }

    search(word: string): boolean {
        let node = this.root;
        for(const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if(!node.children[index]){
                return false;
            }
            node = node.children[index]!;
        }
        return node.isEnd;
    }

    startsWith(prefix: string): boolean {
        let node = this.root;
        for(const char of prefix) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if(!node.children[index]){
                return false;
            }
            node = node.children[index]!;
        }
        return true;
    }
}

// 哈希表存储方式
describe('TrieArray', () => {
    let trie: TrieArray;

    beforeEach(() => {
        trie = new TrieArray();
    });

    test('should insert and search words correctly', () => {
        trie.insert('apple');
        expect(trie.search('apple')).toBe(true); // returns true
        expect(trie.search('app')).toBe(false);  // returns false
        expect(trie.startsWith('app')).toBe(true); // returns true
        trie.insert('app');
        expect(trie.search('app')).toBe(true); // returns true
    });

    test('should handle words with common prefixes', () => {
        trie.insert('apple');
        trie.insert('app');
        trie.insert('apricot');
        expect(trie.search('apple')).toBe(true);
        expect(trie.search('app')).toBe(true);
        expect(trie.search('apricot')).toBe(true);
        expect(trie.startsWith('ap')).toBe(true);
        expect(trie.startsWith('apr')).toBe(true);
        expect(trie.startsWith('apple')).toBe(true);
        expect(trie.startsWith('apples')).toBe(false);
    });

    test('should return false for non-existent words', () => {
        expect(trie.search('banana')).toBe(false);
        expect(trie.startsWith('ban')).toBe(false);
    });

    test('should handle empty string', () => {
        trie.insert('');
        expect(trie.search('')).toBe(true);
        expect(trie.startsWith('')).toBe(true);
    });
});

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end



