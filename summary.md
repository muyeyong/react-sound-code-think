# 总结

## 宏观包结构

react: 提供reactElement必要的api。提供react更新的api（setState、hook以及context）

react-schedule：调度react-reconcoler注册的任务。执行回调

react-reconciler：协调react、react-dom和react-schedule。装载渲染器，能够在正确的时候使用渲染器的api；处理react-dom 和 		   react发起的更新；将fiber树的构建回调注册到调度器里面

react-dom：将react-reconcile构建的fiber树渲染到页面上。引导react的启动；将react-reconciler处理的fiber树渲染成dom节点