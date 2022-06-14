## 存在两种使用方式

childContextTypes（已经过时了）

```js
// https://zh-hans.reactjs.org/docs/legacy-context.html
通过给 父组件（context 的生产者）添加 childContextTypes 和 getChildContext，React 自动向下传递信息，子树上的所有组件可以通过定义 contextTypes 来访问 context。
```



createContext

```js
// https://zh-hans.reactjs.org/docs/context.html
createContext 返回一个对象，包含Provider 和 Comsumer，Provider提供子组件消费的值
```



## 问题

1. 没见过怎么使用Comsumer