# 总结

## [宏观包结构](https://react-illustration-series.osrc.com/main/macro-structure)

react: 提供reactElement必要的api。提供react更新的api（setState、hook以及context）

react-schedule：调度react-reconcoler注册的任务。执行回调

react-reconciler：协调react、react-dom和react-schedule。装载渲染器，能够在正确的时候使用渲染器的api；处理react-dom 和 		   react发起的更新；将fiber树的构建回调注册到调度器里面

react-dom：将react-reconcile构建的fiber树渲染到页面上。引导react的启动；将react-reconciler处理的fiber树渲染成dom节点

## [两大核心事件循环](https://react-illustration-series.osrc.com/main/workloop)

react-scheduler 任务调度循环

react-reconciler fiber创建循环

两大循环的关系：任务调度循环包含fiber创建循环

react的主干逻辑：将输入转为输出，将dom的更新当做一个task，接受task不会马上构建fiber树，会将task注册到调度器，调度器在适当的时机执行task，生成fiber树，渲染器将fiber树渲染到页面上，其中涉及分片以及可中断的更新。

🤔：**task有好几个过程，分片的时候怎么处理？**

## [高频对象](https://react-illustration-series.osrc.com/main/object-structure)

reactElement：jsx语法转换成一个对象，重要的属性有key（默认为null）、type

fiber：每一个reactElement会对应一个或两个fiber对象

update：跟fiber相关连，updateQueue指向fiber上的update链表，需要注意的是怎样实现中断继续以及如何保持上一次的状态

hook：更fiber关联，memoizedState指向fiber节点的内存状态，单向循环链表，可中断，跟优先级相关

task：小顶堆结构

🤔：**通过setState触发更新，fiber上的update 和 hook这两个数据会产生怎样的变化？**

​	hook是去出发更新，update是去存储需要做出的变化

## [reconciler运作流程](https://react-illustration-series.osrc.com/main/reconciler-workflow)

入口： scheduleUpdateOnFiber

注册调度： ensureRootIsScheduled 

执行调度函数： performSyncWorkOnRoot => commitImp (beforeMutation、 mutation 和 layout三个阶段) 

## [启动过程](https://react-illustration-series.osrc.com/main/bootstrap)

三种启动模式：legacy、 blocking 和 Concurrent

都需要创建三个对象： ReactDom(blocking)Root<包含render和unmount方法>、FiberRoot<fibeRoot对象存储创建fiber的全局状态> 和HostRootFiber<第一个fiber对象，fiber树的根节点>

将react-dom和react-reconciler连接： updateContainer里面调用