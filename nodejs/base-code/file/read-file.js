const fs = require('fs');
// 读取文件
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('读取文件成功：', data);
  }
})

// 写入文件
fs.writeFile('a.txt', 'hello', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('写入文件成功');
  }
})

// 追加写入文件
fs.appendFile('a.txt', 'world', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('追加写入文件成功');
  }
})

// // 删除文件
// fs.unlink('a.txt', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('删除成功');
//   }
// })

// 创建文件夹
fs.mkdir('demo', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('创建文件夹成功');
  }
})

// 删除文件夹
// fs.rmdir('demo', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('删除文件夹成功');
//   }
// })

// 创建文件
fs.open('demo.txt', 'w', (err, fd) => {
  if (err) {
    console.log(err);
  } else {
    console.log('创建文件成功');
  }
})
