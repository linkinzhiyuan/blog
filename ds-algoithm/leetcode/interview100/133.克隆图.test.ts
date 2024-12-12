/*
 * @lc app=leetcode.cn id=133 lang=typescript
 * @lcpr version=20004
 *
 * [133] 克隆图
 *
 * https://leetcode.cn/problems/clone-graph/description/
 *
 * algorithms
 * Medium (71.93%)
 * Likes:    751
 * Dislikes: 0
 * Total Accepted:    166.7K
 * Total Submissions: 231.2K
 * Testcase Example:  '[[2,4],[1,3],[2,4],[1,3]]'
 *
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * 
 * 图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。
 * 
 * class Node {
 * ⁠   public int val;
 * ⁠   public List<Node> neighbors;
 * }
 * 
 * 
 * 
 * 测试用例格式：
 * 
 * 简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val =
 * 2），以此类推。该图在测试用例中使用邻接列表表示。
 * 
 * 邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。
 * 
 * 给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
 * 输出：[[2,4],[1,3],[2,4],[1,3]]
 * 解释：
 * 图中有 4 个节点。
 * 节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
 * 节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
 * 节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
 * 节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：adjList = [[]]
 * 输出：[[]]
 * 解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
 * 
 * 
 * 示例 3：
 * 
 * 输入：adjList = []
 * 输出：[]
 * 解释：这个图是空的，它不含任何节点。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 这张图中的节点数在 [0, 100] 之间。
 * 1 <= Node.val <= 100
 * 每个节点值 Node.val 都是唯一的，
 * 图中没有重复的边，也没有自环。
 * 图是连通图，你可以从给定节点访问到所有节点。
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 * 
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */
export class _Node {
  val: number
  neighbors: _Node[]

  constructor(val?: number, neighbors?: _Node[]) {
      this.val = (val===undefined ? 0 : val)
      this.neighbors = (neighbors===undefined ? [] : neighbors)
  }
}

/**
 * DFS 深度优先遍历
 * @param node 
 */
function cloneGraph(node: _Node | null): _Node | null {
	if(!node) return null

  // 记录克隆过的节点
  const map = new Map<_Node, _Node>()

  const dfs = (current: _Node): _Node => {
    // 如果当前节点已经被克隆过，则直接返回
    if(map.has(current)){
      return map.get(current)!
    }

    // 克隆当前节点
    const cloneNode = new _Node(current.val)
    map.set(current, cloneNode);

    // 克隆邻居节点
    for(const neighbor of current.neighbors) {
      cloneNode.neighbors.push(dfs(neighbor))
    }

    return cloneNode
  }

  return dfs(node)
};

function cloneGraphBFS(node: _Node | null): _Node | null {
  if(!node) return null
  const map = new Map<_Node, _Node>()
  const queue: _Node[] = []

  const clone = new _Node(node.val)
  map.set(node, clone)
  queue.push(node)

  while(queue.length) {
    const curr = queue.shift()!

    for(const neighbor of curr.neighbors) {
      if(!map.has(neighbor)) {
        const neighborClone = new _Node(neighbor.val)
        map.set(neighbor, neighborClone)
        queue.push(neighbor)
      }

      // 将克隆的邻居加入当前克隆节点的邻居列表
      map.get(curr)?.neighbors.push(map.get(neighbor)!)
    }
  }

  return clone
}


describe('cloneGraphBFS', () => {
  it('should clone an empty graph', () => {
    const node: _Node | null = null;
    const clonedNode = cloneGraphBFS(node);
    expect(clonedNode).toBeNull();
  });

  it('should clone a graph with a single node', () => {
    const node = new _Node(1);
    const clonedNode = cloneGraphBFS(node);
    expect(clonedNode).not.toBeNull();
    expect(clonedNode!.val).toBe(1);
    expect(clonedNode!.neighbors).toEqual([]);
  });

  it('should clone a graph with multiple nodes and edges', () => {
    const node1 = new _Node(1);
    const node2 = new _Node(2);
    const node3 = new _Node(3);
    node1.neighbors = [node2, node3];
    node2.neighbors = [node3];
    const clonedNode = cloneGraphBFS(node1);
    expect(clonedNode).not.toBeNull();
    expect(clonedNode!.val).toBe(1);
    expect(clonedNode!.neighbors).toHaveLength(2);
    expect(clonedNode!.neighbors[0].val).toBe(2);
    expect(clonedNode!.neighbors[1].val).toBe(3);
  });

  it('should clone a graph with cycles', () => {
    const node1 = new _Node(1);
    const node2 = new _Node(2);
    node1.neighbors = [node2];
    node2.neighbors = [node1];
    const clonedNode = cloneGraphBFS(node1);
    expect(clonedNode).not.toBeNull();
    expect(clonedNode!.val).toBe(1);
    expect(clonedNode!.neighbors).toHaveLength(1);
    expect(clonedNode!.neighbors[0].val).toBe(2);
    expect(clonedNode!.neighbors[0].neighbors[0].val).toBe(1);
  });
});
// @lc code=end


