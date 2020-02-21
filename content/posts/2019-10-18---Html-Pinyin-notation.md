---
title: "在网页中显示注音"
date: "2019-10-18 16:51"
template: "post"
slug: "html-pinyin-notation"
description: "平时浏览网页时，可以看到一些冷门、复杂单词的上方有拼音。在开发中，如何实现注音呢？"
tags:
  - "前端"
  - "HTML"
draft: false
category: "开发"
socialImage: "pinyin-notation.jpg"
---

![](pinyin-notation.jpg)

> 平时浏览网页时，可以看到一些冷门、复杂单词的上方有拼音。在开发中，如何实现注音呢？

## `<ruby />`和`<rt />`

[MDN `<ruby />`说明标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby)

例如下面的html代码，就可以实现注音:
```html
<ruby>这是<rt>zhèshì</rt></ruby><ruby>拼音<rt>pīnyīn</rt></ruby>
```
运行结果: <ruby>这是<rt>zhèshì</rt></ruby><ruby>拼音<rt>pīnyīn</rt></ruby>

## `<ruby />`不兼容性的回退方案`<rp />`

因为web标准的兼容性，[`<rp />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp)被用来作为`<ruby />`注音不支持的回退方案。

`<rp />`的使用方法如下(需要围绕`rt`的开、闭标签):
```html
<ruby>
这是 <rp>(</rp><rt>zhèshì</rt><rp>)</rp>
拼音 <rp>(</rp><rt>pīnyīn</rt><rp>)</rp>
</ruby>
```

运行结果: <ruby>这是 <rp>(</rp><rt>zhèshì</rt><rp>)</rp>拼音 <rp>(</rp><rt>pīnyīn</rt><rp>)</rp></ruby>
