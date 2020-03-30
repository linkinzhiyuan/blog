/**
 * 阻止事件冒泡和默认行为
 */

// event.preventDefault(); 阻止默认行为
// event.stopPropagation(); 阻止事件冒泡
// event.preventDefault();
// event.stopPropagation();

/**
 * 查找，新建，删除，移动DOM节点
 */
// 查找
// document.getElementById()
// document.getElementsByTagName()
// document.getElementsByClassName()
// document.querySelectorAll()
// document.querySelector()

// 新建
// document.createElement()
// document.createDocumentFragment()
// body.appendChild()

// 删除
// div.removeChild()

// 移动
// document.getElementsByName()
// body.appendChild()

// 子节点 父节点
// div.childNodes
// div.parentNode

 /**
  * 如何减少DOM操作
  */

// 缓存DOM查询
const div = document.getElementsByName('div');
const divLength = div.length;
// 多次DOM操作，合并到一次插入
const list = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment()

for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li')
    li.innerHTML = `List item ${i}`

    // 先插入文档片段中
    frag.appendChild(li)
}

// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag)
