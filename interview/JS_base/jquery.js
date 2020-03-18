
class Jquery{
    constructor(selector){
        const result = document.querySelectorAll(selector);
        const length = result.length;
        for(let i = 0;i<length;i++){
            this[i] = result[i]
        }
        this.length = length;
        this.result = result
    }
    get(index){
        return this[index]
    }
    each(fn){
        for(let i = 0;i<this.length;i++){
            const elem = this.result[i]
            fn(elem)
        }
    }
    on(type,fn){
        return this.each((elem)=>{
            elem.addEventListener(type,fn,false)
        })
    }
}
// 插件
Jquery.prototype.dialog = function(){
    console.log('dialog')
}

// 造轮子
class MyJquery extends Jquery{
    constructor(selector){
        super(selector)
    }
    addClass(classname){ console.log(classname)}
    removeClass(classname){}
}