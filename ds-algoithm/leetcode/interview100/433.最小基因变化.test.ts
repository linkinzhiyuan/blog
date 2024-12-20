/*
 * @lc app=leetcode.cn id=433 lang=typescript
 * @lcpr version=20004
 *
 * [433] 最小基因变化
 *
 * https://leetcode.cn/problems/minimum-genetic-mutation/description/
 *
 * algorithms
 * Medium (54.49%)
 * Likes:    310
 * Dislikes: 0
 * Total Accepted:    78.5K
 * Total Submissions: 144K
 * Testcase Example:  '"AACCGGTT"\n"AACCGGTA"\n["AACCGGTA"]'
 *
 * 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。
 * 
 * 假设我们需要调查从基因序列 start 变为 end 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。
 * 
 * 
 * 例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
 * 
 * 
 * 另有一个基因库 bank 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。（变化后的基因必须位于基因库 bank 中）
 * 
 * 给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end
 * 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。
 * 
 * 注意：起始基因序列 start 默认是有效的，但是它并不一定会出现在基因库中。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 输入：start = "AACCGGTT", end = "AAACGGTA", bank =
 * ["AACCGGTA","AACCGCTA","AAACGGTA"]
 * 输出：2
 * 
 * 
 * 示例 3：
 * 
 * 输入：start = "AAAAACCC", end = "AACCCCCC", bank =
 * ["AAAACCCC","AAACCCCC","AACCCCCC"]
 * 输出：3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * start.length == 8
 * end.length == 8
 * 0 <= bank.length <= 10
 * bank[i].length == 8
 * start、end 和 bank[i] 仅由字符 ['A', 'C', 'G', 'T'] 组成
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 最短路径问题：广度优先遍历，BFS是经典方法，逐层扩展，找到的第一个解就是最短路径
 * 1. 首先将起点加入队列
 * 2. 将起点标记为已访问
 * 3. 从队列中取出队头
 * 4. 对队头的子节点进行逐词替换，如果在基因库中，且没有访问过，就加入队列，并标记为已访问
 * 5. 如果队头的子节点是终点，返回步数
 * @param startGene 
 * @param endGene 
 * @param bank 
 */
function minMutation(startGene: string, endGene: string, bank: string[]): number {
  const bankSet = new Set(bank) // 基因库转化为集合，便于查找
  if(!bankSet.has(endGene)) return -1;

  const queue: Array<[string, number]> = [[startGene,0]]; // 基因序列和变化次
  const visited = new Set<string>(); // 已经访问过的基因
  visited.add(startGene);

  const chars = ['A', 'C', 'G', 'T']; // 可能的变化字符

  while(queue.length) {
    const [current,step] = queue.shift()!; // 取出队头

    if(current === endGene) return step;

    for(let i = 0; i  < current.length; i++) {
      for(const char of chars) {
        if(char === current[i]) continue; // 不替换
        // 逐词替换
        const next = current.slice(0,i) + char + current.slice(i+1);
        if(bankSet.has(next) && !visited.has(next)) { // 如果在基因库中，且没有访问过
          queue.push([next, step + 1])
          visited.add(next)
        }
      }
    }
  }

  return -1
};

/**
 * 双向BFS，是BFS的优化
 * @param startGene 
 * @param endGene 
 * @param bank
 */
function minMutationTwoBFS(startGene: string, endGene: string, bank: string[]): number {
  const bankSet = new Set(bank) // 基因库转化为集合，便于查找
  if(!bankSet.has(endGene)) return -1;

  let startSet = new Set<string>([startGene]);
  let endSet = new Set<string>([endGene]);
  const visited = new Set<string>(); // 已经访问过的基因

  const chars = ['A', 'C', 'G', 'T']; // 可能的变化字符

  let step = 0;

  while(startSet.size > 0 && endSet.size > 0) {
    if(startSet.size > endSet.size) { 
      [startSet, endSet] = [endSet, startSet]; // 交换
    }

    const nextSet = new Set<string>();
    for(const start of startSet) {
      for(let i = 0; i  < start.length; i++) {
        for(const char of chars) {
          if(char === start[i]) continue; // 不替换
          // 逐词替换
          const next = start.slice(0,i) + char + start.slice(i+1);

          if(endSet.has(next)) return step + 1;

          if(bankSet.has(next) && !visited.has(next)) { // 如果在基因库中，且没有访问过
            nextSet.add(next);
            visited.add(next)
          }
        }
      }
    }

    startSet = nextSet;
    step++;
  }

  return -1
}

// @lc code=end

describe('minMutation', () => {
  it('should return -1 if endGene is not in the bank', () => {
    expect(minMutation('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC'])).toBe(-1);
  });

  it('should return the correct step if endGene is in the bank', () => {
    expect(minMutation('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(3);
  });

  it('should return 0 if startGene and endGene are the same', () => {
    expect(minMutation('AAAAACCC', 'AAAAACCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(-1);
  });

  it('should return the correct step for a longer mutation', () => {
    expect(minMutation('AAAAACCC', 'TTTTTTTT', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC', 'TTTTTTTT'])).toBe(-1);
  });
  it('leetcode case 2 should return the correct step for a longer mutation', () => {
    expect(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA','AACCGCTA','AAACGGTA'])).toBe(2);
  })
  // start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
  it('leetcode case 1 should return the correct step for a longer mutation', () => {
    expect(minMutation('AACCGGTT', 'AACCGGTA', ['AACCGGTA'])).toBe(1);
  })
  //   start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
  it('leetcode case 3 should return the correct step for a longer mutation', () => {
    expect(minMutation('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(3);
  })
});

describe('minMutationTwoBFS', () => {
  it('should return -1 if endGene is not in the bank', () => {
    expect(minMutationTwoBFS('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC'])).toBe(-1);
  });

  it('should return the correct step if endGene is in the bank', () => {
    expect(minMutationTwoBFS('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(3);
  });

  it('should return 0 if startGene and endGene are the same', () => {
    expect(minMutationTwoBFS('AAAAACCC', 'AAAAACCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(-1);
  });

  it('should return the correct step for a longer mutation', () => {
    expect(minMutationTwoBFS('AAAAACCC', 'TTTTTTTT', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC', 'TTTTTTTT'])).toBe(-1);
  });
  it('leetcode case 2 should return the correct step for a longer mutation', () => {
    expect(minMutationTwoBFS('AACCGGTT', 'AAACGGTA', ['AACCGGTA','AACCGCTA','AAACGGTA'])).toBe(2);
  })
  // start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
  it('leetcode case 1 should return the correct step for a longer mutation', () => {
    expect(minMutationTwoBFS('AACCGGTT', 'AACCGGTA', ['AACCGGTA'])).toBe(1);
  })
  //   start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
  it('leetcode case 3 should return the correct step for a longer mutation', () => {
    expect(minMutationTwoBFS('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(3);
  })
});
