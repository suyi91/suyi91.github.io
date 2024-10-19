---
draft: false
date: 2024-11-02
title: dayjs使用分享
description: 如何使用dayjs便捷地操作日期呢？
mermaid: true
mathjax: true
tags: []
category: ['前端']
---

## 两段代码对比

### 1. 时间操作

```js
setTimeout(() => {
  // xxx代码逻辑
}, 60 * 60 * 1000)
```

### 2. 用Dayjs操作

```js
const oneHour = dayjs.duration(1, 'hours').asMilliseconds()

setTimeout(() => {
    // xxx代码逻辑
}, oneHour)
```

哪段代码更容易理解？

显然，第二段代码更加的语义化，一眼就能看懂定时器的时长。

:::tip
[语义化编程](https://worktile.com/kb/ask/2229667.html)是指使用具有明确意义的编程风格和命名规范来编写代码的一种方法。该方法的目的是使代码更易阅读、理解、维护和重用。

1. 可读性 
2. 可维护性 
3. 可重用性
4. 隐式约定
5. 兼容性
:::

## dayjs介绍

dayjs是一个core只有2kb的包，用于替代庞大的momentjs。它提供了相似的API，便于从momentjs迁移代码。

dayjs也设计了[插件](https://day.js.org/docs/en/plugin/plugin)体系，一些不太常用的大体积功能可以用插件的方式引入。

dayjs的方法名直观表达意图，参数结构符合自然思维，并支持链式调用，可以减少出错的可能，推荐使用它替换代码中的手写时间日期操作代码。

### 常用场景介绍

#### 从字符串parse时间

字符串需要满足[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)标准。

```js
dayjs('2018-04-04T16:00:00.000Z')
dayjs('2018-04-13 19:18:17.040+02:00')
dayjs('2018-04-13 19:18')
```

#### JS Date & dayjs格式互转

```js
var d = new Date(2018, 8, 18)
var day = dayjs(d)

var date = day.toDate()
```


#### 时间的读 & 写

```js
dayjs().valueOf() // 获取当前时间戳

dayjs().second(30) // 设置秒为30
dayjs().second() // 读取秒
```


#### 时间格式化

```js
dayjs().format('YYYY-MM-DD HH:mm:ss')
```

#### 时间差异

```js
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // 返回毫秒数 20217600000


// 计算在具体的单位上时间差异
const date1 = dayjs('2019-01-25')
// 去除小数部分
date1.diff('2018-06-05', 'month') // 7
// => 精确小数
date1.diff('2018-06-05', 'month', true) // 7.645161290322581
```


#### 时间前后比较

`isAfter`

```js
// 默认从毫秒开始比较
dayjs().isAfter(dayjs('2024-11-03')) // true
// 例如从月开始比（月 + 年） => 第二个参数传入比较的最低单位
dayjs().isAfter(dayjs('2024-11-03'), 'month') // false
```

`isBefore`、`isSame` API用法相同。

`isSameOrAfter`、`isSameOrBefore`  => 包含比较的边界，需要额外引入[`IsSameOrBefore`](https://day.js.org/docs/en/query/is-same-or-before)插件使用。

`isBetween`: 判断是否在两个时间的中间，需要额外引入 [`IsBetween`](https://day.js.org/docs/en/plugin/is-between)插件使用。也支持传入比较的最低单位。

```js
dayjs.extend(isBetween)
dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'))  // true

dayjs('2010-10-20').isBetween('2010-10-19', '2010-10-25', 'month') // false
```

#### 时间加减

例如从一个固定时间获取一个小时后的时间，可以用`add`、`subtract`实现。

```js
var a = dayjs('2024-11-03')
a.add(2, 'day') // => 对象变为2024-11-05的值
a.substract(1, 'day') // => 对象变为2024-11-04的值
```

#### 时长对象


:::note
需要额外引入[`Duration`](https://day.js.org/docs/en/plugin/duration)插件。
:::

```js
dayjs.extend(duration)

dayjs.duration({ months: 12 })
dayjs.duration(12, 'm'); // 和上面对象形式等价
```

支持时长的加减

```js
var a = dayjs.duration(1, 'd');
var b = dayjs.duration(2, 'd');

a.add(b).days(); // 3
a.add({ days: 2 } ).days();
a.substract(2, 'days');
```

时间对象支持加减时长

```js
var a = dayjs('2024-11-03')
var b = dayjs.duration(2, 'd')

a.add(b).date(); // 5
```