/*
 * @lc app=leetcode.cn id=146 lang=typescript
 * @lcpr version=20003
 *
 * [146] LRU 缓存
 *
 * https://leetcode.cn/problems/lru-cache/description/
 *
 * algorithms
 * Medium (54.04%)
 * Likes:    3318
 * Dislikes: 0
 * Total Accepted:    736.8K
 * Total Submissions: 1.4M
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 
 * 实现 LRUCache 类：
 * 
 * 
 * 
 * 
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组
 * key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 
 * 
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 * 
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 输入
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 
 * 解释
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1
 * lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= capacity <= 3000
 * 0 <= key <= 10000
 * 0 <= value <= 10^5
 * 最多调用 2 * 10^5 次 get 和 put
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 思路： 使用Map，key为key,value为value, 使用keys的next方法获取最旧的值
 * @description: 
 * @param {number} capacity
 */
class LRUCache {
    private capacity: number;
    private cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        if (!this.cache.has(key)) {
            return -1;
        }
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
    }
}

// Unit tests
describe('LRUCache', () => {
    let cache: LRUCache;

    beforeEach(() => {
        cache = new LRUCache(2);
    });

    test('should initialize with correct capacity', () => {
        expect(cache['capacity']).toBe(2);
        expect(cache['cache'].size).toBe(0);
    });

    test('should handle basic put and get operations', () => {
        cache.put(1, 1);
        cache.put(2, 2);
        expect(cache.get(1)).toBe(1);
        expect(cache.get(2)).toBe(2);
    });

    test('should return -1 for non-existent keys', () => {
        expect(cache.get(1)).toBe(-1);
    });

    test('should evict least recently used item when capacity is exceeded', () => {
        cache.put(1, 1);
        cache.put(2, 2);
        cache.put(3, 3);
        expect(cache.get(1)).toBe(-1);
        expect(cache.get(2)).toBe(2);
        expect(cache.get(3)).toBe(3);
    });

    test('should update access order on get', () => {
        cache.put(1, 1);
        cache.put(2, 2);
        cache.get(1);
        cache.put(3, 3);
        expect(cache.get(1)).toBe(1);
        expect(cache.get(2)).toBe(-1);
        expect(cache.get(3)).toBe(3);
    });

    test('should update existing key-value pairs', () => {
        cache.put(1, 1);
        cache.put(1, 2);
        expect(cache.get(1)).toBe(2);
    });
});

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end



