- 1.盒模型
```
IE模型：宽高由content + padding + border  border-box
标准模型：宽高 content  content-box
```

- 2.不定宽高的元素垂直水平居中的方式
```css
/* flex */
.parent1{
    display: flex;
    justify-content: center;align-items: center;
}
/* table */
.parent2{
    text-align: center;
    display: table;
}
.parent2 .child2{
    display: table-cell;
    vertical-align: middle;
}
/* postion */
.parent3{
    position: relative;
    height: 100px;
}
.parent3 .child3{
    postion:absolute;
    left:50%;right:50%;
    transform:translate(-50%,-50%);
    /* 定宽高 */
    /* position: absolute;
    left: 0;right: 0;top: 0;bottom: 0;
    margin: auto; */
}
/* grid */
.parent4{
    display: grid; height: 100px;
}
.child4{
    justify-self: center; align-self: center;
}
```

- 3.JS有几种数据类型，判断类型有哪几种方法？

```
string,number,boolean,null,undefined,object,symbol
typeof 判断出 string number boolean object(null,array,object) function symbol
instanceof 可以区别数组和对象
Object.prototype.toString 根据返回的第二个值表示该值的构造函数
```

- 4.不会返回 考察的是事件循环机制
- 5.10 10 作用域
- 6.改变函数内部this指针的指向的方法有哪些，有什么区别
```
apply/bind/call  箭头函数
apply和call绑定之后是立即执行，bind是重新赋值给一个绑定的this的函数
apply接收的是一个包含多个参数的数组，call/bind是接受若干参数的列表
```
- 7.简述HTTP缓存策略(非Cookie等浏览器缓存)

缓存分为强缓存和协商缓存。强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

强缓存
Expires
cache-control
协商缓存
Last-Modified 和 If-Modified-Since
Etag 和 If-None-Match

- 8.实现一个深拷贝
```javascript
function deepClone(obj){
    if(typeof obj !== 'object' || object == null){
        return obj
    }
    let res;
    if(obj instanceof Array){
        res = []
    }else{
        res = {}
    }
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            res[key] = deepClone(obj[key])
        }
    }
    return res
}
```
- 9.实现一个节流、防抖函数
```javascript
// 节流 一段时间内只会执行一次
function throttle(fn,delay){
    let timer = null;
    return function(){
        if(timer) return;
        timer = setTimeout(()=>{
            fn.call(this,arguments);
            timer = null;
        })
    }
}
// 防抖 执行的过程中若被打断则重新发起执行
function debounce(fn,delay){
    let timer = null;
    return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.call(this,arguments);
            timer = null;
        },delay)
    }
}
```
- 10.继承的方式
```javascript
// 定义一个动物类
function Animal(name, color) {
    // 属性
    this.name = name || 'Animal';
    this.color = color || ['black'];
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};
// 1.原型链继承
function Cat(name){
    this.name = name || 'tom';
}
Cat.prototype = new Animal();

优点：基于原型链，即是父类的实例，也是子类的实例
缺点：1.无法实现多继承；2.所有新实例都会共享父类实例的属性

// 2.构造继承
function Dog(name){
    Animal.call(this);
    this.name = name || 'mica';
}
优点：可以实现多继承 call多个，解决所有实例共享父类实例属性的问题
缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法

// 3.组合继承
function Mouse(name){
    Animal.call(this);
    this.name = name || 'jerry';
}
Mouse.prototype = new Animal();
Mouse.prototype.constructor = Mouse;

优点：可以继承实例的属性和方法，也可以继承原型属性和方法
缺点：调用两次父类的构造函数，生成两份实例

// 4.最优解 组合继承
function Cat(name){
    Animal.call(this);
    this.name = name || 'tom';
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;


```
