/**
 * class 继承
 * 1.如何准确的判断一个变量是不是数组 a instanceof Array
 * 2.手写JQuery,考虑插件和扩展性
 * 3.class原型本质，怎么理解
 */

// 父类
class People{
    constructor(name,male){
        this.name = name;
        this.male = male;
    }
    eat(){
        console.log(`${this.name} eating`)
    }
}
// 子类
class Student extends People{
    constructor(name,male,num){
        super(name,male);
        this.num = num;
    }
    study(){console.log(`${this.name} study`)}
}
class Teacher extends People{
    constructor(name,male,major){
        super(name,male);
        this.major = major;
    }
    teacher(){ console.log(`${this.name} 教 ${this.major}`) }
}

const xiaoming = new Student('xiaoming','男',100);
const laoshi = new Teacher('wanglaoshi','女','数学');
console.log(xiaoming,laoshi)
xiaoming.eat()
xiaoming.study()
laoshi.eat()
laoshi.teacher()