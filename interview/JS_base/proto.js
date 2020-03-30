/**
 * 按照如下要求实现Person 和 Student 对象
 * a)Student 继承Person 
 * b)Person 包含一个实例变量 name， 包含一个方法 printName
 * c)Student 包含一个实例变量 score， 包含一个实例方法printScore
 * d)所有Person和Student对象之间共享一个方法
 */

 function Person(name){
     this.name = name;
     this.printName = function(){}
 }
 Person.prototype.commonFun = function(){}
 function Student(name,score){
    Person.call(this,name);
    this.score = score;
    this.printScore = function(){}
 }
 Student.prototype = Object.create(Person.prototype);
 Student.prototype.constructor = Student;
const s = new Student('xiaohong',100)
const p = new Person('ppp') 
console.log(s.commonFun === p.commonFun) // true


//  ES6
// class Person{
//     constructor(name){
//         this.name = name;
//     }
//     printName(){}
//     commonFun(){}
// }
// class Student extends Person{
//     constructor(name,score){
//         super(name);
//         this.score = score;
//     }
//     printScore(){}
// }
// const s = new Student('xiaohong',100)
// const p = new Person('ppp')
// console.log(s,p)
// console.log(s.commonFun === p.commonFun) // true
// console.log(Student.commonFun === Person.commonFun) //true


/**
 * 面试题
 */
// Object.prototype.__proto__    //null
// Function.prototype.__proto__  //Object.prototype
// Object.__proto__              //Function.prototype
// Object.__proto__.__proto__ === Object.prototype
// Function.prototype.__proto__ === Object.prototype