/*
 * @lc app=leetcode.cn id=399 lang=typescript
 * @lcpr version=20004
 *
 * [399] 除法求值
 *
 * https://leetcode.cn/problems/evaluate-division/description/
 *
 * algorithms
 * Medium (58.83%)
 * Likes:    1146
 * Dislikes: 0
 * Total Accepted:    111.7K
 * Total Submissions: 189.8K
 * Testcase Example:  '[["a","b"],["b","c"]]\n' +
  '[2.0,3.0]\n' +
  '[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]'
 *
 * 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和
 * values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
 * 
 * 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj
 * = ? 的结果作为答案。
 * 
 * 返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0
 * 替代这个答案。
 * 
 * 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。
 * 
 * 注意：未在等式列表中出现的变量是未定义的，因此无法确定它们的答案。
 * 
 * 示例 1：
 * 
 * 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries =
 * [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
 * 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
 * 解释：
 * 条件：a / b = 2.0, b / c = 3.0
 * 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
 * 结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
 * 注意：x 是未定义的 => -1.0
 * 
 * 示例 2：
 * 
 * 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0],
 * queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
 * 输出：[3.75000,0.40000,5.00000,0.20000]
 * 
 * 
 * 示例 3：
 * 
 * 输入：equations = [["a","b"]], values = [0.5], queries =
 * [["a","b"],["b","a"],["a","c"],["x","y"]]
 * 输出：[0.50000,2.00000,-1.00000,-1.00000]
 * 
 * 提示：
 * 
 * 1 <= equations.length <= 20
 * equations[i].length == 2
 * 1 <= Ai.length, Bi.length <= 5
 * values.length == equations.length
 * 0.0 < values[i] <= 20.0
 * 1 <= queries.length <= 20
 * queries[i].length == 2
 * 1 <= Cj.length, Dj.length <= 5
 * Ai, Bi, Cj, Dj 由小写英文字母与数字组成
 * 
 * 
 */

// @lc code=start
/**
 * 图的思路，a 点，b 点, a->b 即边值 a/b, b->a 即边值 b/a
 * Map 数据结构 {a： {b: 1.5}, b: {c: 2.5}, bc: {cd: 5}}
 * 求值: a->c = a->b * b->c , c->b = c->a * a->b, bc->cd = bc->cd, cd->bc = cd->bc
 * @param equations 
 * @param values 
 * @param queries 
 */
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  // 图的结构 Map结构
  const graph = new Map<string, Map<string, number>>()

  // 构建图
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i]
    const val = values[i]

    if (!graph.has(a)) {
      graph.set(a, new Map())
    }
    if (!graph.has(b)) {
      graph.set(b, new Map())
    }
    graph.get(a)?.set(b, val)
    graph.get(b)?.set(a, 1 / val)
  }

  const dfs = (a: string, b: string, val: number, visited: Set<string>): number => {
    if (a === b) {
      return val
    }

    visited.add(a)
    
    for (const [next, nextVal] of graph.get(a) || []) {
      if (visited.has(next)) {
        continue
      }
      const res = dfs(next, b, val * nextVal, visited)
      if (res !== -1) {
        return res
      }
    }
    return -1
  }

  // 求值
  const res: number[] = []
  for (let i = 0; i < queries.length; i++) {
    const [a, b] = queries[i]
    const visited = new Set<string>()
    if (graph.has(a) && graph.has(b)) {
      res.push(dfs(a, b, 1, visited))
    } else {
      res.push(-1)
    }
  }
  return res
};

describe('calcEquation', () => {
  it('should return empty array for empty equations and queries', () => {
    const equations: string[][] = [];
    const values: number[] = [];
    const queries: string[][] = [];
    expect(calcEquation(equations, values, queries)).toEqual([]);
  });

  it('should return correct result for single equation and query', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquation(equations, values, queries)).toEqual([2]);
  });

  it('should return correct results for multiple equations and queries', () => {
    const equations: string[][] = [['a', 'b'], ['b', 'c']];
    const values: number[] = [2, 3];
    const queries: string[][] = [['a', 'b'], ['b', 'c'], ['a', 'c']];
    expect(calcEquation(equations, values, queries)).toEqual([2, 3, 6]);
  });

  it('should return -1 for queries with no solution', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquation(equations, values, queries)).toEqual([-1]);
  });

  it('should return -1 for queries with division by zero', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [0];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquation(equations, values, queries)).toEqual([0]);
  });

  it('should return correct result for queries with same variables', () => {
    const equations: string[][] = [['a', 'c']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquation(equations, values, queries)).toEqual([2]);
  });
});

/**
 * BFS
 */
function calcEquationBFS(equations: string[][], values: number[], queries: string[][]): number[] {
  // 图的结构 Map结构
  const graph = new Map<string, Map<string, number>>()

  // 构建图
  for(let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i]
    const val = values[i]

    if (!graph.has(a))  graph.set(a, new Map())
    if (!graph.has(b))  graph.set(b, new Map())
    graph.get(a)?.set(b, val)
    graph.get(b)?.set(a, 1 / val)
  }

  const bfs = (a: string, b: string): number => {
    if (a === b) return 1

    const visited = new Set<string>()
    const queue: [string, number][] = [[a, 1]]

    while (queue.length) {
      const [node, val] = queue.shift()!

      if (node === b) return val

      visited.add(node)

      for (const [next, nextVal] of graph.get(node) || []) {
        if (visited.has(next)) {
          continue
        }
        queue.push([next, val * nextVal])
      }
    }

    return -1
  }

  const res: number[] = []
  for(let i = 0; i < queries.length; i++) {
    const [a, b] = queries[i]
    if (!graph.has(a) || !graph.has(b)) {
      res.push(-1)
    } else {
      res.push(bfs(a, b))
    }
  }

  return res
}


describe('calcEquationBFS', () => {
  it('should return empty array for empty equations and queries', () => {
    const equations: string[][] = [];
    const values: number[] = [];
    const queries: string[][] = [];
    expect(calcEquationBFS(equations, values, queries)).toEqual([]);
  });

  it('should return correct result for single equation and query', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquationBFS(equations, values, queries)).toEqual([2]);
  });

  it('should return correct results for multiple equations and queries', () => {
    const equations: string[][] = [['a', 'b'], ['b', 'c']];
    const values: number[] = [2, 3];
    const queries: string[][] = [['a', 'b'], ['b', 'c'], ['a', 'c']];
    expect(calcEquationBFS(equations, values, queries)).toEqual([2, 3, 6]);
  });

  it('should return -1 for queries with no solution', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquationBFS(equations, values, queries)).toEqual([-1]);
  });

  it('should return -1 for queries with division by zero', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [0];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquationBFS(equations, values, queries)).toEqual([0]);
  });

  it('should return correct result for queries with same variables', () => {
    const equations: string[][] = [['a', 'c']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquationBFS(equations, values, queries)).toEqual([2]);
  });
});

function calcEquationBFS2(equations: string[][], values: number[], queries: string[][]): number[] {
  const graph = new Map<string, Map<string, number>>()
  // 构建图结构
  for(let i = 0; i < equations.length; i++) {
    const [A, B] = equations[i]
    const val = values[i]

    if(!graph.has(A)) graph.set(A, new Map())
    if(!graph.has(B)) graph.set(B, new Map())
    
    graph.get(A)?.set(B, val)
    graph.get(B)?.set(A, 1 / val)
  }

  const bfs = (C: string, D: string):number => {
    if(C === D) return 1

    const queue: Array<[string, number]> = [[C, 1]]
    const visited= new Set<string>()

    while(queue.length) {
      const [current, val] = queue.shift()!

      if(current === D) return val
      visited.add(current)

      for(const [next, nextVal] of graph.get(current) || []) {
        if(visited.has(next)) continue
        queue.push([next, val * nextVal])
      }
    }

    return -1
  }

  const result: number[] = []
  for(const [C, D] of queries) {
    if(!graph.has(C) || !graph.has(D)) {
      result.push(-1)
    } else {
      result.push(bfs(C, D))
    }
  }

  return result
}


describe('calcEquationBFS2', () => {
  it('should return empty array for empty equations and queries', () => {
    const equations: string[][] = [];
    const values: number[] = [];
    const queries: string[][] = [];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([]);
  });

  it('should return correct result for single equation and query', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([2]);
  });

  it('should return correct results for multiple equations and queries', () => {
    const equations: string[][] = [['a', 'b'], ['b', 'c']];
    const values: number[] = [2, 3];
    const queries: string[][] = [['a', 'b'], ['b', 'c'], ['a', 'c']];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([2, 3, 6]);
  });

  it('should return -1 for queries with no solution', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([-1]);
  });

  it('should return -1 for queries with division by zero', () => {
    const equations: string[][] = [['a', 'b']];
    const values: number[] = [0];
    const queries: string[][] = [['a', 'b']];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([0]);
  });

  it('should return correct result for queries with same variables', () => {
    const equations: string[][] = [['a', 'c']];
    const values: number[] = [2];
    const queries: string[][] = [['a', 'c']];
    expect(calcEquationBFS2(equations, values, queries)).toEqual([2]);
  });
});

// @lc code=end


