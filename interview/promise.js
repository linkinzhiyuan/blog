//https://juejin.im/post/5b88e06451882542d733767a#heading-3
//https://juejin.im/post/5c6ad98e6fb9a049d51a0f5e
//结合两篇文章

let MyPromise = function(executor){ // 接收一个函数作为参数
    const self     = this;
    self.status    = 'pending'; // 初始状态是进行中
    self.value     = undefined;
    self.reason    = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value){
        self.value = value;
        if(self.status === 'pending'){ // 保证promise实例状态一旦变更不能再次改变，只有在pending时候才可以变状态
            self.status = 'fulfilled'; // 状态改为成功
            self.onResolvedCallbacks.forEach(fn=>{ //发布
                fn();
            })
        }
    }
    function reject(reason){
        self.reason = reason;
        if(self.status === 'pending'){ // 保证promise实例状态一旦变更不能再次改变，只有在pending时候才可以变状态
            self.status = 'rejected'; // 状态改变为失败
            self.onRejectedCallbacks.forEach(fn=>{ //发布
                fn();
            })
        }
    }
    executor(resolve,reject) // 执行函数 接收两个函数作为参数
}
// then 返回值是一个全新的promise
MyPromise.prototype.then = function(onFulfilled,onReject){
    const self = this;
    let newPromise;
    // then方法中两个回调函数可以是可选参数，所以我们也要处理一下
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:val=>val;
    onReject = typeof onReject === 'function'?onReject:err=>{throw err};
    // 返回一个新的promise
    newPromise = new MyPromise(function(resolve,reject){
        //返回成功状态时 onReject回调
        if(self.status === 'fulfilled'){
            setTimeout(()=>{
                try{
                  let x = onFulfilled(self.value)
                  // resolve(x)
                  //这个函数可能是一个值也可能是一个函数 或者返回一个promise
                  resolvePromise(newPromise,x,resolve,reject)
                }catch(e){
                  reject(e)
                }
            },0)
        }
        //失败状态时 onReject回调
        if(self.status === 'rejected'){
            setTimeout(()=>{
                try{
                  let x = onReject(self.reason)
                  resolvePromise(newPromise,x,resolve,reject)
                }catch(e){
                  reject(e)
                }
            },0)
        }
        if(self.status === 'pending'){ //订阅的过程
            self.onResolvedCallbacks.push(()=>{ //以函数的形式存储
                try{
                  let x = onFulfilled(self.value)
                  resolvePromise(newPromise,x,resolve,reject)
                }catch(e){
                  reject(e)
                }
            })
            self.onRejectedCallbacks.push(()=>{
                try{
                  let x = onReject(self.reason)
                  resolvePromise(newPromise,x,resolve,reject)
                }catch(e){
                  reject(e)
                }
            })
        }
    })
    function resolvePromise(promise,x,resolve,reject){
        if(promise === x){ //防止出现回调地狱，如果相等了说明出现了回调地狱
            throw new Error('循环引用错误')
        }
        if(x !== null && (typeof x === 'object' || typeof x === 'function')){
            try {
                let then = x.then;
                if(typeof then === 'function'){
                    then.call(x,(y)=>{
                        if(called) return;
                        called = true;
                        resolvePromise(newPromise,y,resolve,reject)
                    },(e)=>{
                        if(called) return;
                        called = true;
                        reject(e)
                    })
                }else{
                    resolve(x)
                }
            } catch (e) {
                reject(e)
            }
        }else {
            resolve(x) // 普通指进入下一个成功方法
        }
    }
    return newPromise;
}
// catch
MyPromise.prototype.catch = function (onrejected) {
  return this.then(null, onrejected)
}
// resolve reject
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  })
}

// 实际的promise实例
// let p = new Promise(function(resolve,reject){
//     console.log('start');
//     resolve('resolve')
// })
// p.then(
//     (v)=>{console.log('成功',v)},
//     (err)=>{console.log('失败',err)}
// )
// console.log('end')


// 手写的MyPromise实例
let MyP = new MyPromise(function(resolve,reject){
    console.log('start')
    // setTimeout(()=>{
        resolve('1111')
    // },2000)
})
MyP.then(
    (v)=>{
        console.log('成功',v)
        return {a:100}
    },
    (v)=>{console.log('失败',v)}
).then(
    (v)=>{
        console.log(v)
    }
)
console.log('end')
