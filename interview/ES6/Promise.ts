/**
 * Promise.prototype.then()
 * Promise.prototype.catch()
 * Promise.prototype.finally()
 * Promise.resolve()
 * Promise.reject()
 * Promise.all([p1,p2,p3]) : 参数是一个可迭代的对象（具备iterator的接口），将多个Promise实例包装成一个新的Promise实例返回
 *      分为两种情况：只有p1,p2,p3的状态全变成fulfilled,结果才会变成fulfilled,返回一个数组
 *                 只要有一个被rejected,结果就变成rejected,返回第一个被reject的实例的返回值
 * Promise.race()
 * Promise.allSettled()
 * Promise.any()
 * Promise.try()
 */

/**
 * MyPromise
 */

enum StateEnum {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}
class MyPromise {
    // 状态
    state: StateEnum = StateEnum.PENDING // pending fulfilled rejected
    value = '' // 成功后的值
    reason = '' // 错误的原因

    resolveCallback: (()=>void)[] = []
    rejectCallback:(()=>void)[] = []

    constructor(fn){
        const resolveHandle = (value) => {
            if(this.state === StateEnum.PENDING){
                this.state = StateEnum.FULFILLED
                this.value = value;
                this.resolveCallback.forEach(fn=> fn(value))
            }
        }
        const rejectHandle = (reason) => {
            if(this.state === StateEnum.PENDING){
                this.state = StateEnum.REJECTED
                this.reason = reason
                this.rejectCallback.forEach(fn=> fn(reason))
            }
        }
        // 执行 fn
        try {
            fn(resolveHandle,rejectHandle)
        } catch (error) {
            rejectHandle(error)
        }
    }

    then(fn1,fn2){
        // 有三种的不同的状态下的不同处理，都会返回一个新的promise
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
        fn2 = typeof fn2 === 'function' ? fn2 : (v) => v;


        if(this.state === StateEnum.PENDING){
            return new MyPromise((resolve,reject) => {
                this.resolveCallback.push(()=>{
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)
                    } catch (err) {
                        reject(err)
                    }
                })

                this.rejectCallback.push(()=>{
                    try {
                        const newReason = fn2(this.reason)
                        resolve(newReason)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        }

        if(this.state === StateEnum.FULFILLED){
            return new MyPromise((resolve,reject) => {
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (error) {
                    reject(error)
                }
            })
        }

        if(this.state === StateEnum.REJECTED){
            return new MyPromise((resolve,reject) => {
                try {
                    const newReason = fn1(this.reason)
                    resolve(newReason)
                } catch (error) {
                    reject(error)
                }
            })
        }

    }

    // 是 then 方法的一个语法糖
    catch(fn) {
        return this.then(null,fn)
    }
}


/**
 * 手写Promise.all
 * @params []
 * @return new Promise
 */

const PromiseAll = (params) => {
    return new Promise((resolve,reject) => {
        let len = params.length,res = []
        if(!len) {
            resolve(res)
            return;
        }
        Array.from(params).forEach((ele) => {
            Promise.resolve(ele).then(data => {
                res.push(data)
                res.length === len && resolve(res)
            }).catch(err => {
                reject(err)
            })
        });
    }).catch(err => console.log(err))
}

// 验证all
// let p1 = Promise.reject(1),
//     p2 = Promise.resolve(2),
//     p3 = Promise.resolve(3);

// PromiseAll([p1,p2,p3]).then((res)=>{
//     console.log(res, 'res')
// }, (err)=>{
//     console.log(err, 'err')
// })

/**
 * allSettled 接收promise数组，返回一个对应的数组，[{status:'fulfilled',value:data},{status:'rejected',value:'reject reason'}]
 * @param {*} params promise数组
 */
const PromiseAllSettled = (params) => {
    return new Promise((resolve,reject) => {
        let len = params.length,res = []
        if(!len) {
            resolve(res)
            return;
        }
        Array.from(params).forEach((ele,i) => {
            Promise.resolve(ele).then(data => {
                res.push({status:'fulfilled',value:data})
                res.length === len && resolve(res)
            }).catch(err => {
                res.push({status:'rejected',value:err})
                res.length === len && resolve(res)
            })
        });
    }).catch(err => console.log(err))
}

/**
 * race 接受一个可迭代的实例，返回第一个fulfilled或rejected的实例包装后的新实例
 */

const PromiseRace = params => {
    return new Promise((resolve,reject) => {
        params.forEach(p => {
            Promise.resolve(p).then( value => {
                resolve(value)
                return;
            },err => {
                reject(err)
                return;
            })
        })
    }).catch( err => console.log(err) )
}

/**
 * finally 无论当前Promise是成功还是失败，调用之后都会执行finally中传入的函数，并且将值原封不动传递下去
 */
Promise.prototype.myFinally = function(callback){
    let p = this.constructor
    return this.then(
        value => Promise.resolve(callback()).then( ()=> value),
        err => Promise.resolve(callback()).then( () => { throw new Error(err) })
    )
}

// new Promise((resolve,reject) => {
//     resolve(2)
// }).myFinally(()=>{
//     const a = 1
//     console.log('sum',a + 2)
// }).then(value => {
//     console.log('value',value)
// })


/**
 * any() 接受可迭代实例，
 * 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例
 * 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promsie，且值为 AggregateError 的错误
 * 其他情况都会返回一个 pending 的新实例
 */
const PromiseAny = function(params){
    let index = 0,len = params.length
    return new Promise((resolve,reject) => {
        if(len === 0) return
        params.forEach((p,i) => {
            Promise.resolve(p).then(val => {
                resolve(val)
            },err => {
                index ++ 
                if(index === len){
                    reject(new AggregateError('All promises were rejected'))
                }
            })
        })
    })
}

var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

PromiseAny([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

PromiseAny([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});


