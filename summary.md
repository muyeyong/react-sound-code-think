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

## [优先级管理](https://react-illustration-series.osrc.com/main/priority)

两套优先级结构，一套相互转换结构

scheduler优先级--> schedulerPriority ：scheduler包

fiber优先级 --> lanePriority：react-reconciler包

reactPriorityLevel 优先级转换： react-reconciler包

## [调度原理](https://react-illustration-series.osrc.com/main/scheduler)

通过`messageChannel` 请求调度(异步执行)，最终调用的是`scheduledHostCallback`。将需要调度的函数存在`scheduledHostCallback`

流程： 创建任务(unstable_scheduleCallback) --> 请求调度(requestHostCallback(flushWork)) ---> 执行回调(时间分片 以及 可中断渲染)

flushWork执行workLoop，workLoop内部的while循环会从任务队列取出任务执行，在这个过程中会判断task是否超时(任务创建时间 + 任务分配执行时间 > 当前时间) 以及在执行task的时候产生了新的回调处理，每一次while循环的退出就是一次时间分片。

时间分片原理：分配时间，超时退出
[可中断渲染原理]( https://react-illustration-series.osrc.com/main/scheduler#%E5%8F%AF%E4%B8%AD%E6%96%AD%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86)：fiber树的构建过程中， 每构造完成一个单元, 都会检测一次超时，不是很懂？

节流防抖(正对同一个fiber)：

​		防抖： 新旧更新的优先级相同，多次setState，不会创建多个task，直接退出

​		节流：新旧更新的优先级不同，取消旧的task，创建新的task

🤔：

​	 **那些可以被称作task 或者 什么时候创建task**

​	 **task派生的callback怎么处理的**

​	task 与 update的关系

## fiber树构建-基础准备

update.lanes: leagcy 和 blocking 的优先级是 syncLane， concurrent是根据调度优先级创建lane优先级

渲染优先级：每次调度之前都需要计算出全局渲染的优先级(getNextLanes)，根据fiberRoot上的属性(`expiredLanes`, `suspendedLanes`, `pingedLanes`等)，确定最紧要的优先级， 如果update 或 fiber的lanes低于渲染优先级，就会被忽略

fiber.lanes:  分为两个部分，fiber.lanes 和 fiber.childLanes，初始化都是NoLanes

🤔：

​	setState同步异步问题：什么情况下执行上下文为空？ 首次加载？ executionContext === NoContext

​	fiber.lanes什么时候更新

## fiber树构建-初次创建

beginWork：

1. 根据 `ReactElement`对象创建所有的`fiber`节点, 最终构造出`fiber树形结构`(设置`return`和`sibling`指针)
2. 设置`fiber.flags`(二进制形式变量, 用来标记 `fiber`节点 的`增,删,改`状态, 等待`completeWork阶段处理`)
3. 设置`fiber.stateNode`局部状态(如`Class类型`节点: `fiber.stateNode=new Class()`)

completeWork：

1. 给`fiber`节点(tag=HostComponent, HostText)创建 DOM 实例, 设置`fiber.stateNode`局部状态(如`tag=HostComponent, HostText`节点: fiber.stateNode 指向这个 DOM 实例).

2. 为 DOM 节点设置属性, 绑定事件(这里先说明有这个步骤, 详细的事件处理流程, 在`合成事件原理`中详细说明).

3. 设置`fiber.flags`标记

2022-09-07：

​	beginWork 不断向下构架fiber子树，同时设置fiber.flags

​	completeWork 创造对应的dom(ClassComponent跳过)，同时将fiber.flags上移，最终在fiberRoot的firstEffect 和 lastEffect

🤔：

对于设置fiber.flags是在什么情况下才有的？

beginWork 会执行一些声明周期，都有哪些？

上移副作用队列: 由于本节点`fiber(header)`没有副作用(`fiber.flags = 0`), 所以执行之后副作用队列没有实质变化(目前为空) 什么时候有副作用？

## [fiber树构造-对比更新](https://react-illustration-series.osrc.com/main/fibertree-update)

childLans

lans

fiber.flags

fiber.effects

对于这些变量还不太了解，渲染优先级跟fiber.lane 怎么赋值，怎么计算，lane这块还是不太熟悉

相对于初次创建，多了对比的过程，beginWork向下查找那些需要更新的，completeWork将副作用上移、生成dom实例

🤔:

​	对于更新，需要向上查找，然后自定向下？

## [fiber树渲染](https://react-illustration-series.osrc.com/main/fibertree-commit)

🤔:

​	首个hostComponent.stateNode 怎么将子节点全部收集的？ appendChild?

​	副作用队列处理结构是什么 ==> 单个`fiber`对象