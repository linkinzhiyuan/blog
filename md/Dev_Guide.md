
## 规范的意义

每一种事物都有它被发明时，都会有其用处和目的，每一个事物都是自己擅长和适合的领域； 我们要在对的地方使用它，让它做自己擅长的事。

- 规范的代码可以促进团队合作；
- 规范的代码可以减少bug处理；
- 规范的代码可以降低维护成本；
- 规范的代码有助于代码审查；
- 养成代码规范的习惯，有助于程序员自身的成长；


## 命名
#### 驼峰式命名
- 大驼峰式：首字母大写。eg：StudentInfo、UserInfo、ProductInfo
- 小驼峰式：首字母小写。eg：studentInfo、userInfo、productInfo

#### 文件资源命名
- 文件名不得含有空格
- 文件名建议只使用小写字母，不使用大写字母。( 为了醒目，某些说明文件的文件名，可以使用大写字母，比如README、LICENSE。 )
- 文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔。
- 引入资源使用相对路径，不要指定资源所带的具体协议 ( http:,https: ) ，除非这两者协议都不可用。

#### 变量命名

- 命名方式：小驼峰式；命名规范：类型+对象描述的方式，若没有明确的类型，可以使前缀为名词

#### 函数命名

- 方式：小驼峰式 （构造函数使用大驼峰式）

|动词|含义|返回值 |
|:-----  |:------|:-------------  |
|can  |判断是否可执行某个动作|返回boolean;true可执行;false不可执行|
|has  |判断是否可含有某个值|返回boolean;true含有此值;false不含有此值|
|is  |判断是否为某个值|返回boolean;true为当前值;false不是此值|
|get  |获取某个值|值的内容|
|set  |设置某个值|无返回值、返回是否设置成功或者返回链式对象|

推荐
```javascript
//是否可阅读
function canRead(){
    return true;
}

//获取姓名
function getName{
    return this.name
}
```

#### 常量
- 方式：全部大写 规范：使用大写字母和下划线来组合命名，下划线用来分割单词

#### 类的成员
- 公共属性和方法：命名方式：小驼峰式；命名规范：类型+对象描述的方式，若没有明确的类型，可以使前缀为名词
- 私有属性和方法：前缀为下划线_ 后面跟小驼峰式命名
```javascript
unction Student(name) {
    var _name = name; // 私有成员

    // 公共方法
    this.getName = function () {
        return _name;
    }

    // 公共方式
    this.setName = function (value) {
        _name = value;
    }
}
var st = new Student('tom');
st.setName('jerry');
console.log(st.getName()); // => jerry：输出_name私有变量的值
```

#### 注释规范







## HTML规范

## JS规范
- 防止全局命名空间被污染，我们通常的做法是将代码包裹成一个 IIFE(Immediately-Invoked Function Expression)，创建独立隔绝的定义域。也使得内存在执行完后立即释放

- 总是使用 === 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰；==， 两边值类型不同的时候，要先进行类型转换，再比较。 ===，不做类型转换，类型不同的一定不等。

- 不使用evel()函数，使用eval()函数会带来安全隐患。eval()函数的作用是返回任意字符串，当作js代码来处理。

- 三元条件判断（if 的快捷方法）


## CSS规范

#### id和class
- ID和class的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称
- 合理使用IDm,一般情况下ID不应该被用于样式，ID的权重很重，所以不用ID解决样式问题，推荐class
- 从结构、表现、行为分离的原则来看，应该尽量避免css中出现HTML标签，并且在css选择器中出现标签名会存在潜在的问题。
- 使用子选择器 推荐.content>.title
- 0后面不带单位
- 尽量使用缩写属性
```css
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```


## React开发规范

## Vue开发规范

## eslint 第三方代码规范插件

## Git开发规范

#### 1.分支管理

#### 2.日志规范

具体的格式：
```
<type>: <subject>
```
type的类别说明：
- feat:添加新的特性
- fix:修复bug
- docs:仅仅修改了文档
- style:仅仅修改了style
- refactor:代码重构，没有加新的功能
- perf:增加代码进行性能测试
- test:增加测试用例
- chore:改变重构流程、或者增加依赖库、工具


### 参考链接
- [前端开发规范：命名规范、html规范、css规范、js规范](https://juejin.im/post/592d4a5b0ce463006b43b6da)
- [Vue前端开发规范](https://juejin.im/post/5ada9b586fb9a07aaf34c746#heading-10)
- [各种前端规范](https://github.com/ecomfe/spec)
- [腾讯前端规范](http://imweb.github.io/CodeGuide/)
- [网易前端规范](http://nec.netease.com/standard)
- [Airbnb 规范](https://github.com/airbnb/javascript)
- [您必须知道的 Git 分支开发规范](https://juejin.im/post/5b4328bbf265da0fa21a6820)
- [制定自己团队的前端开发规范之 eslint](https://juejin.im/post/5d3130be6fb9a07eb74b7621)
- [制定自己团队的前端开发规范](https://juejin.im/post/5d300e0fe51d4577407b1dff)

