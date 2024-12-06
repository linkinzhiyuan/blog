/*
 * @lc app=leetcode.cn id=102 lang=typescript
 * @lcpr version=20004
 *
 * [102] 二叉树的层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (68.44%)
 * Likes:    2044
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.7M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 * 
 * 示例 1：
 * 
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 * 
 * 示例 2：
 * 
 * 输入：root = [1]
 * 输出：[[1]]
 * 
 * 示例 3：
 * 
 * 输入：root = []
 * 输出：[]
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
}

/**
 * BFS
 * @param root 
 */
function levelOrder(root: TreeNode | null): number[][] {
  if(!root) return []
  const result: number[][] = []
  const queue: Array<TreeNode> = [root]

  while (queue.length) {
    const levelSize = queue.length
    const levelRes: number[] = []
    for(let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      levelRes.push(node?.val!)

      if(node?.left) queue.push(node.left)
      if(node?.right) queue.push(node.right)
    }

    result.push(levelRes)
  }

  return result
};


/**
 * DFS
 */
function levelOrderDFS(root: TreeNode | null): number[][] {
  if(!root) return []
  const result: number[][] = []

  const dfs = (node: TreeNode | null, level: number):void => {
    if(!node) return;

    if(result.length === level) {
      result[level] = []
    }

    result[level].push(node.val)

    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }

  dfs(root, 0)
  return result
}


describe('levelOrder function', () => {
  it('should return empty array for empty tree', () => {
    const root: TreeNode | null = null;
    expect(levelOrder(root)).toEqual([]);
  });

  it('should return single node value for single node tree', () => {
    const root: TreeNode = new TreeNode(1);
    expect(levelOrder(root)).toEqual([[1]]);
  });

  it('should return level order traversal for balanced binary tree', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
  });

  it('should return level order traversal for unbalanced binary tree', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6]]);
  });

  it('should return level order traversal for tree with multiple levels', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6, 7], [8, 9]]);
  });
});

describe('levelOrderDFS function', () => {
  it('should return empty array for empty tree', () => {
    const root: TreeNode | null = null;
    expect(levelOrderDFS(root)).toEqual([]);
  });

  it('should return single node value for single node tree', () => {
    const root: TreeNode = new TreeNode(1);
    expect(levelOrderDFS(root)).toEqual([[1]]);
  });

  it('should return level order traversal for balanced binary tree', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    expect(levelOrderDFS(root)).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
  });

  it('should return level order traversal for unbalanced binary tree', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    expect(levelOrderDFS(root)).toEqual([[1], [2, 3], [4, 5, 6]]);
  });

  it('should return level order traversal for tree with multiple levels', () => {
    const root: TreeNode = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    root.left.left.left = new TreeNode(8);
    root.left.left.right = new TreeNode(9);
    expect(levelOrderDFS(root)).toEqual([[1], [2, 3], [4, 5, 6, 7], [8, 9]]);
  });
});

/**
 * 实际应用1： UI组件树的遍历
 */
interface UIComponent {
  id: string;
  children?: UIComponent[] | null;
}

function traverseUITree(root: UIComponent): string[][] {
  const result: string[][] = [];
  const queue: [UIComponent, number][] = [[root, 0]];
  
  while (queue.length > 0) {
      const [node, level] = queue.shift()!;
      
      if (!result[level]) {
          result[level] = [];
      }
      
      result[level].push(node.id);
      
      if (node.children) {
          node.children.forEach(child => {
              queue.push([child, level + 1]);
          });
      }
  }
  
  return result;
}

describe('traverseUITree function', () => {

  it('should return array with single node for single node tree', () => {
    const root: UIComponent = { id: '1' };
    root.children = [];
    expect(traverseUITree(root)).toEqual([['1']]);
  });

  it('should return array with multiple nodes for tree with multiple nodes', () => {
    const root: UIComponent = { id: '1' };
    root.children = [
      { id: '2', children: [] },
      { id: '3', children: [] },
    ];
    expect(traverseUITree(root)).toEqual([['1'], ['2', '3']]);
  });

  it('should return array with multiple levels for tree with multiple levels', () => {
    const root: UIComponent = { id: '1' };
    root.children = [
      { id: '2', children: [
        { id: '4', children: [] },
        { id: '5', children: [] },
      ] },
      { id: '3', children: [
        { id: '6', children: [] },
        { id: '7', children: [] },
      ] },
    ];
    expect(traverseUITree(root)).toEqual([['1'], ['2', '3'], ['4', '5', '6', '7']]);
  });
});

/**
 * 文件系统遍历
 */
interface FileNode {
  name: string;
  isDirectory: boolean;
  children?: FileNode[];
}

function traverseFileSystem(root: FileNode): string[][] {
  const result: string[][] = [];
  const queue: [FileNode, number][] = [[root, 0]];
  
  while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel: string[] = [];
      
      for (let i = 0; i < levelSize; i++) {
          const [node, level] = queue.shift()!;
          currentLevel.push(node.name);
          
          if (node.isDirectory && node.children) {
              node.children.forEach(child => {
                  queue.push([child, level + 1]);
              });
          }
      }
      
      result.push(currentLevel);
  }
  
  return result;
}
describe('traverseFileSystem function', () => {
  it('should return array with single file for single file', () => {
    const root: FileNode = { name: 'file1', isDirectory: false };
    expect(traverseFileSystem(root)).toEqual([['file1']]);
  });

  it('should return array with single directory for single directory with no children', () => {
    const root: FileNode = { name: 'dir1', isDirectory: true, children: [] };
    expect(traverseFileSystem(root)).toEqual([['dir1']]);
  });

  it('should return array with directory and child file for single directory with one child file', () => {
    const root: FileNode = {
      name: 'dir1',
      isDirectory: true,
      children: [{ name: 'file1', isDirectory: false }]
    };
    expect(traverseFileSystem(root)).toEqual([['dir1'], ['file1']]);
  });

  it('should return array with directory and child directory for single directory with one child directory', () => {
    const root: FileNode = {
      name: 'dir1',
      isDirectory: true,
      children: [{ name: 'dir2', isDirectory: true, children: [] }]
    };
    expect(traverseFileSystem(root)).toEqual([['dir1'], ['dir2']]);
  });

  it('should return array with multiple levels of directories', () => {
    const root: FileNode = {
      name: 'dir1',
      isDirectory: true,
      children: [
        {
          name: 'dir2',
          isDirectory: true,
          children: [
            {
              name: 'dir3',
              isDirectory: true,
              children: []
            }
          ]
        }
      ]
    };
    expect(traverseFileSystem(root)).toEqual([['dir1'], ['dir2'], ['dir3']]);
  });

  it('should return array with multiple files in the same directory', () => {
    const root: FileNode = {
      name: 'dir1',
      isDirectory: true,
      children: [
        { name: 'file1', isDirectory: false },
        { name: 'file2', isDirectory: false }
      ]
    };
    expect(traverseFileSystem(root)).toEqual([['dir1'], ['file1', 'file2']]);
  });
});


/**
 * 组织架构遍历
 */
interface Employee {
  name: string;
  title: string;
  subordinates?: Employee[];
}

function traverseOrgChart(root: Employee): string[][] {
  const result: string[][] = [];
  
  function dfs(employee: Employee, level: number) {
      if (!result[level]) {
          result[level] = [];
      }
      
      result[level].push(`${employee.name} (${employee.title})`);
      
      if (employee.subordinates) {
          employee.subordinates.forEach(sub => {
              dfs(sub, level + 1);
          });
      }
  }
  
  dfs(root, 0);
  return result;
}

describe('traverseOrgChart function', () => {
  it('should return array with single employee for single employee', () => {
    const root: Employee = { name: 'John', title: 'CEO', subordinates: [] };
    expect(traverseOrgChart(root)).toEqual([['John (CEO)']]);
  });

  it('should return array with single employee and their subordinates for single employee with subordinates', () => {
    const root: Employee = {
      name: 'John',
      title: 'CEO',
      subordinates: [
        { name: 'Alice', title: 'Manager', subordinates: [] },
        { name: 'Bob', title: 'Developer', subordinates: [] }
      ]
    };
    expect(traverseOrgChart(root)).toEqual([
      ['John (CEO)'],
      ['Alice (Manager)', 'Bob (Developer)']
    ]);
  });

  it('should return array with multiple levels of employees for complex org chart', () => {
    const root: Employee = {
      name: 'John',
      title: 'CEO',
      subordinates: [
        {
          name: 'Alice',
          title: 'Manager',
          subordinates: [
            { name: 'Charlie', title: 'Developer', subordinates: [] },
            { name: 'David', title: 'Developer', subordinates: [] }
          ]
        },
        {
          name: 'Bob',
          title: 'Manager',
          subordinates: [
            { name: 'Eve', title: 'Developer', subordinates: [] },
            { name: 'Frank', title: 'Developer', subordinates: [] }
          ]
        }
      ]
    };
    expect(traverseOrgChart(root)).toEqual([
      ['John (CEO)'],
      ['Alice (Manager)', 'Bob (Manager)'],
      ['Charlie (Developer)', 'David (Developer)', 'Eve (Developer)', 'Frank (Developer)']
    ]);
  });
});
// @lc code=end


