---
title: JavaScript中的职责链模式
author: Suyi
authorURL: https://github.com/suyi91
authorFBID: 100009224056265
---

## 简介

职责链模式的定义是使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

职责链模式的名字非常形象，一系列可能会处理请求的对象被连接成一条链，请求在这些对象之间依次传递，直到遇到一个可以处理它的对象，把这些对象称为链中的节点。

![chain](https://i.loli.net/2019/09/17/cVhmHiXlge3vWGO.jpg)

<!--truncate-->

## Example

思路来自[JavaScript设计模式与开发实践](https://book.douban.com/subject/26382780/)

一个复杂工单提交单据前，需要进行一系列的操作处理：

1. 检查车主信息，是否正确填写；
1. 检查单据基本信息，是否都正确填写；
1. 检查项目列表明细，是否都正确填写；
1. 检查材料列表明细，是否都正确填写；
1. ...
1. 提交数据

检查都通过后，处理数据提交单据。

一般的写法就是在check方法中一堆的if else；稍微改进一些的方法是，根据上面的列表顺序分别定义check方法执行。

对于if else的方式，业务复杂时代码量过大，出现业务变动时改动可能比较痛苦；并且，同一个函数域内可能需要定义较多的中间变量。

对于提取每个步骤的check方法的方式，在相邻检查步骤的处理中可能存在关联调用的情况——步骤1通过后调用步骤2、步骤2通过后调用步骤3等等——当出现添加、删除环节的业务场景，不够灵活(也违反开闭原则)。

----

## 使用职责链模式的实现

### 定义Chain链节点构造函数

```ts
export default class Chain {
  /** 当前节点处理方法 */
  private fn: Function;
  /** 存储下一节点 */
  private successor: Chain | null;

  public static readonly SuccessorKey = 'nextSuccessor';

  public constructor(fn: Function) {
    this.fn = fn;
    this.successor = null;
  }

  /**
   * 设置下一节点
   * @param successor 下一节点
   */
  public setNextSuccessor(successor: Chain): Chain {
    return (this.successor = successor);
  }

  public passRequest(...args: any[]): any {
    const ret = this.fn.apply(this, arguments);
    if (ret === Chain.SuccessorKey) {
      return this.successor && this.successor.passRequest.apply(this.successor, args);
    }
    return ret;
  }
}
```

### 定义链节点

```ts
const Chain1 = new Chain((val: any): any => (val === 1 ? val : Chain.SuccessorKey));
const Chain2 = new Chain((val: any): any => (val === 2 ? val : Chain.SuccessorKey));
const Chain3 = new Chain((val: any): any => (val === 3 ? val : Chain.SuccessorKey));
const Chain4 = new Chain((val: any): any => (val === 4 ? val : Chain.SuccessorKey));
const Chain5 = new Chain((val: any): any => (val === 5 ? val : Chain.SuccessorKey));
```

### 串接链节点并执行

```ts
Chain1.setNextSuccessor(Chain2)
      .setNextSuccessor(Chain3)
      .setNextSuccessor(Chain4)
      .setNextSuccessor(Chain5);

Chain1.passRequest(/** 传入参数xx */)
```

### 业务变动，在Chain2和Chain3中间插入Chain2_5节点

```ts
const Chain2_5 = new Chain((val: any): any => (val === 2.5 ? val : Chain.SuccessorKey));

Chain2.setNextSuccessor(Chain2_5);
Chain2_5.setNextSuccessor(Chain3);
```

*__注__: 在不清楚既存代码的时候，这种改动方式可能是最保险的*

## 异步的职责链实现

上面都是同步的职责链，那么对于网络请求的场景利用职责链如何实现呢？

很简单，给Chain加入next方法，在需要的时候手动执行。

```ts
class Chain {
  // 原有内容省略

  public next(...args: any): any {
    return this.successor && this.successor.passRequest.apply(this.successor, args);
  }
}
```

### Demo

```ts
const AsyncChain1 = new Chain(function(val: any): any {
  if (val === 1) return val;
  return this.next(val);
});
const AsyncChain2 = new Chain(function(val: any): any {
  if (val === 2) return val;
  return this.next(val);
});

AsyncChain1.setNextSuccessor(AsyncChain2)

AsyncChain1.passRequest(2) // 2
```

## 其他

### 转化链

从职责链的定义可以看出，职责链的入参是不可变的，但是有些业务场景需要在中间进行处理(例如input的输入过程，需要对不合法的内容进行修改)。

这些场景下可以对职责链模型`Chain`进行改造，扩展成负责转化数据的`Chain`。

```js
class TransformChain extends Chain {
  /** 同步用 */
  passRequest(...args) {
    const newArgs = this.fn.call(this, ...args);
    return this.successor && this.successor.passRequest.call(this.successor, ...newArgs);
  }
  /** 异步用 */
  next(...args) {
    const newArgs = this.fn.call(this, ...args);
    return this.successor && this.successor.passRequest.call(this.successor, ...newArgs);
  }
}
```

`Chain`和`TransformChain`结合使用，效果更佳。😁
