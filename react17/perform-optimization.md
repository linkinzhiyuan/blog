#### [React官方性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)

#### React、React-Router使用CDN加载，减少webpack打包

#### 路由的懒加载，路由监听器

```javascript
const routerObserveQueue = [] /* 存放路由卫视钩子 */
/* 懒加载路由卫士钩子 */
export const RouterHooks = {
  /* 路由组件加载之前 */
  beforeRouterComponentLoad: function(callback) {
    routerObserveQueue.push({
      type: 'before',
      callback
    })
  },
  /* 路由组件加载之后 */
  afterRouterComponentDidLoaded(callback) {
    routerObserveQueue.push({
      type: 'after',
      callback
    })
  }
}
/* 路由懒加载HOC */
export default function AsyncRouter(loadRouter) {
  return class Content extends React.Component {
    constructor(props) {
      super(props)
      /* 触发每个路由加载之前钩子函数 */
      this.dispatchRouterQueue('before')
    }
    state = {Component: null}
    dispatchRouterQueue(type) {
      const {history} = this.props
      routerObserveQueue.forEach(item => {
        if (item.type === type) item.callback(history)
      })
    }
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
        .then(module => module.default)
        .then(Component => this.setState({Component},
          () => {
            /* 触发每个路由加载之后钩子函数 */
            this.dispatchRouterQueue('after')
          }))
    }
    render() {
      const {Component} = this.state
      return Component ? <Component {
      ...this.props
      }
      /> : null
    }
  }
}

// use
const Index = AsyncRouter(()=>import('../src/page/home/index'))
// or
import React, { Component } from 'react'

import { Spin, Icon } from 'antd'

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />

/**
 * 使用 webpack 的 import 方法实现动态加载组件！dynamic import
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = { component: null }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }

    render() {
      const RenderComponet = this.state.component
      return RenderComponet ? (
        <RenderComponet {...this.props} />
      ) : (
        <Spin indicator={antIcon} className='async-com-loading' />
      )
    }
  }

export default asyncComponent

```

#### 受控组件颗粒化，独立请求渲染单元

1.受控组件颗粒化

组件的更新有组件单元自行控制，不需要父组件的更新，不需要父组件设置独立的state保留状态

2，独立请求渲染单元 - 减少setState后的render


#### `shouldComponentUpdate` `PureComponent`和 `React.memo`,`immetable.js`

1.`PureComponent`，通过浅比较

2.`React.memo`作为第一个高阶组件，第二个参数可以对props进行比较，与`shouldComponentUpdate`不同，第二个参数返回true，证明props没有变化，不更新

3.`shouldComponentUpdate`比较state或props，默认返回true，返回false不会重新渲染更新

```javascript
shouldComponentUpdate(nextProps, nextState) {
  /* 当 state 中 data1 发生改变的时候，重新更新组件 */  
  return nextState.data1 !== this.state.data1
}
```

4.`immetable.js` 处理复杂数据格式，对象的数据类型

#### 规范书写，处理细节问题

1.绑定事件尽量不要用箭头函数，每次渲染都会创建一个新的事件处理器，有状态的组件可以在定义的时候使用箭头函数，无状态的组件可以使用useMemo