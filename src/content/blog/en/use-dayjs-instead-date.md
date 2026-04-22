---
draft: false
date: 2024-11-02
title: Using Day.js for Date Operations
description: How to work with dates conveniently using Day.js.
mermaid: true
mathjax: true
tags: []
category: ['frontend']
translationKey: use-dayjs-instead-date
audio: true
---

## Two Code Snippets Compared

### 1. Raw time manipulation

```js
setTimeout(() => {
  // logic
}, 60 * 60 * 1000)
```

### 2. Using Day.js

```js
const oneHour = dayjs.duration(1, 'hours').asMilliseconds()

setTimeout(() => {
    // logic
}, oneHour)
```

Which snippet is easier to read?

The second one is clearly more semantic — you can tell at a glance how long the timer runs.

:::tip
[Semantic programming](https://worktile.com/kb/ask/2229667.html) means writing code with a clear, expressive style and naming conventions so that the code is easier to read, understand, maintain, and reuse.

Key benefits:
1. Readability
2. Maintainability
3. Reusability
4. Implicit conventions
5. Compatibility
:::

## About Day.js

Day.js is a package with a core of only 2 KB, designed as a replacement for the heavyweight Moment.js. It provides a similar API, making migration from Moment.js straightforward.

Day.js also has a [plugin](https://day.js.org/docs/en/plugin/plugin) system, so larger, less commonly used features can be loaded on demand.

Day.js method names clearly express intent, parameters follow natural mental models, and chaining is supported — all of which reduce errors. It is recommended as a drop-in replacement for hand-rolled date manipulation code.

### Common Use Cases

#### Parsing a string to a date

The string must conform to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

```js
dayjs('2018-04-04T16:00:00.000Z')
dayjs('2018-04-13 19:18:17.040+02:00')
dayjs('2018-04-13 19:18')
```

#### Converting between JS Date and Day.js

```js
var d = new Date(2018, 8, 18)
var day = dayjs(d)

var date = day.toDate()
```

#### Reading and writing date fields

```js
dayjs().valueOf() // current timestamp

dayjs().second(30) // set seconds to 30
dayjs().second() // read seconds
```

#### Formatting dates

```js
dayjs().format('YYYY-MM-DD HH:mm:ss')
```

#### Calculating differences

```js
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2) // milliseconds: 20217600000

// Difference in a specific unit (truncated)
date1.diff('2018-06-05', 'month') // 7
// With decimal
date1.diff('2018-06-05', 'month', true) // 7.645161290322581
```

#### Comparing dates

`isAfter`:

```js
dayjs().isAfter(dayjs('2024-11-03')) // true
// Compare from month granularity (month + year only)
dayjs().isAfter(dayjs('2024-11-03'), 'month') // false
```

`isBefore` and `isSame` work the same way.

`isSameOrAfter` / `isSameOrBefore` — include boundary; requires the [`IsSameOrBefore`](https://day.js.org/docs/en/query/is-same-or-before) plugin.

`isBetween` — checks if a date falls between two others; requires the [`IsBetween`](https://day.js.org/docs/en/plugin/is-between) plugin. Also supports a granularity unit.

```js
dayjs.extend(isBetween)
dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'))  // true

dayjs('2010-10-20').isBetween('2010-10-19', '2010-10-25', 'month') // false
```

#### Adding and subtracting time

```js
var a = dayjs('2024-11-03')
a.add(2, 'day')      // => 2024-11-05
a.subtract(1, 'day') // => 2024-11-02
```

#### Duration objects

:::note
Requires the [`Duration`](https://day.js.org/docs/en/plugin/duration) plugin.
:::

```js
dayjs.extend(duration)

dayjs.duration({ months: 12 })
dayjs.duration(12, 'm'); // equivalent to the object form above
```

Durations support arithmetic:

```js
var a = dayjs.duration(1, 'd');
var b = dayjs.duration(2, 'd');

a.add(b).days(); // 3
a.add({ days: 2 }).days();
a.subtract(2, 'days');
```

A Day.js date object can be added a duration:

```js
var a = dayjs('2024-11-03')
var b = dayjs.duration(2, 'd')

a.add(b).date(); // 5
```
