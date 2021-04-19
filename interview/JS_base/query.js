// // 传统方式
// function query(name) {
//     const search = location.search.substr(1) // 类似 array.slice(1)
//     // search: 'a=10&b=20&c=30'
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//     const res = search.match(reg)
//     if (res === null) {
//         return null
//     }
//     return res[2]
// }
// query('d')

// URLSearchParams https://segmentfault.com/a/1190000019099536
function query(name) {
    const search = location.search
    const p = new URLSearchParams(search)
    return p.get(name)
}
console.log( query('b') )


// 将url参数解析为js对象
function queryObj(){
    const search = location.search.substr(1); //取出？后面的内容
    let res = new Object();
    search.split('&').forEach(list=>{
        const arr = list.split('=');
        const key = arr[0];
        const val = arr[1];
        res[key] = val;
    })
    return res
}

function queryObjURLSearch(){
    let res = {}
    const urlList = new URLSearchParams(location.search);
    urlList.forEach((val,key)=>{
        res[key] = val
    })
    return res
}