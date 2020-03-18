let pubsub = {};
 
// 定义一个立即执行的匿名函数，生成独立的作用域, es6中可以使用{}形成独立的作用域，但是不能传参
(function (q) {
    let topicObj = {},
        subUid = -1;
    // 订阅方法，也是添加函数的方法
    // topic是作为动态的属性名， fn是对应的执行函数
    q.subscribe = (topic, fn) =>{
        // 判断topicObj对象中是否有对应的topic属性，如果没有则设置为数组
        if(!topicObj[topic]){
            topicObj[topic] = []
        }
 
 
        // 下标计算，是属性值，所以要转化为字符串
        let token = (++subUid).toString()
 
 
        // 添加到数组中
        topicObj[topic].push({
            token:token,
            fn:fn
        })
 
 
        console.log( topicObj )
        //return唯一的标识符token，用于删除指定的项
        return token;
    }
 
    // 发布方法，也是执行函数
    q.publish = (topic, args)=> {
        if(!topicObj[topic])return;
 
 
        // 获取指定topic属性项，并获取长度
        let subscribes =  topicObj[topic],
            len = subscribes.length;
        //console.log(--len);
        // 遍历并执行
        while (len--){
            // 回调函数有2个参数，一个表示属于对像的属性，另一个则是变量，在定义函数的时候要注意
            subscribes[len].fn(topic, args);
        }
        return this;
    }
 
 
    //  删除订阅者，即对象中指定的属性，也就是对应动态添加的函数
    q.delScribe = (token)=>{
        for(let key in topicObj){
            topicObj[key].forEach((item, i)=>{
                if(item.token===token){
                    topicObj[key].splice(i,1)
                }
            })
        }
        //  console.log( topicObj )
        return this;
     }
 
})(pubsub);

// console.log(pubsub);

//测试
let msg = (data)=>{
    // 这里还可以执行其它相关的函数
    console.log('data---',data);
}
let messageLogger = function(topics,data){
    console.log('logging:' + topics + ":" + data)
}
// const subscription = pubsub.subscribe('inbox-newMessage',messageLogger)
// pubsub.publish("inbox-newMessage","hello world")
// pubsub.publish("inbox-newMessage",['a','b','c'])
// pubsub.publish("inbox-newMessage",{a:'111',b:'222'})
// pubsub.subscribe('test', msg);
// pubsub.publish('test', 'hhhh');
// 取消订阅 token值
// pubsub.delScribe('0');
// pubsub.publish("inbox-newMessage","delete")

// Mixin 设计模式
let myMixins = {
    moveUp:function(){
        console.log('move up')
    }
}
function carAnimator(){
    this.moveLeft = function(){
        console.log('move left')
    }
}
// carAnimator原型收集myMixins的 即扩展构造函数的原型
Object.assign(carAnimator.prototype,myMixins)
const testCar = new carAnimator()
testCar.moveUp()
testCar.moveLeft()