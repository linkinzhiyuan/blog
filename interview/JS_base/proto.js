/**
 * 按照如下要求实现Person 和 Student 对象
 * a)Student 继承Person 
 * b)Person 包含一个实例变量 name， 包含一个方法 printName
 * c)Student 包含一个实例变量 score， 包含一个实例方法printScore
 * d)所有Person和Student对象之间共享一个方法
 */

//  function Person(name){
//      this.name = name;
//      this.printName = function(){}
//  }
//  Person.prototype.commonFun = function(){}
//  function Student(name,score){
//     Person.call(this,name);
//     this.score = score;
//     this.printScore = function(){}
//  }
//  Student.prototype = Object.create(Person.prototype);
//  Student.prototype.constructor = Student;
// const s = new Student('xiaohong',100)
// const p = new Person('ppp') 
// console.log(s.commonFun === p.commonFun) // true


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
 * interview question
 */
// 一
// Object.prototype.__proto__    //null
// Function.prototype.__proto__  //Object.prototype
// Object.__proto__              //Function.prototype
// Object.__proto__.__proto__ === Object.prototype
// Function.prototype.__proto__ === Object.prototype

// 二
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

// console.log(b.n); // 1
// console.log(b.m); // undefined

// console.log(c.n); //2
// console.log(c.m); //3

//三
var F = function() {};

Object.prototype.a = function() {
  console.log('a');
};

Function.prototype.b = function() {
  console.log('b');
}

var f = new F();

// f.a(); // a
// f.b(); // not a function

// F.a(); // a
// F.b(); //b

// 四
function Person(name) {
    this.name = name
}
let p = new Person('Tom');
console.log( p.__proto__,Person.__proto__) // Person.prototype Function.prototype

//五
var foo = {}, F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a); // value a
console.log(foo.b); // undefined

console.log(F.a); // undefined 错误 正确->value a
console.log(F.b); // value b

var obj = {
    birth: 1995,
    getAge: function() {
      var b = this.birth; // 1995
    //   var that = this
    //   var fn = function() {
    //     return that.birth; 
    //   };
        var fn =()=> this.birth
        return fn; // 通过 call()，将 obj 的 this 指向了 fn 中
    }
}
obj.getAge()
  