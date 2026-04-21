---
draft: false
date: 2024-10-21
title: Buggy vue2.7 jsx
description: Vue2.7 jsx使用bug不断...
mermaid: true
mathjax: true
tags: ['vue']
category: ['frontend']
translationKey: vue-2.7-jsx-bugs
audio: true
---

最近维护老项目引入了vue2.7和官方提供的jsx方案`jsx-vue2`，写着写着发现了几个坑......

## 1. 官方vue2的jsx插件vModel报错

> vModel: __currentInstance.$set is not a function

相关issue讨论: 

- https://github.com/vuejs/jsx-vue2/issues/287
- https://github.com/vuejs/composition-api/issues/699

解决(回避)方案:

不用vModel语法糖了，回归原始用`value`和`onInput`替代吧。

## 2. 无法获取组件ref

相关issue讨论:

- https://github.com/vuejs/jsx-vue2/issues/288

解决(回避)方案:

需要用函数手写ref赋值。

```jsx
const customRef = ref()

<SwitchSettingCommonModal ref={el => { customRef.value = el } />
```


----
期待下一个坑🥹。

----
因为vue2已经eol了，官方已经不再更新，所以不推荐再用vue2以及jsx了，有开发需要赶紧换3吧，3还没eol，如果有bug了官方团队应该会修的。。。😔

