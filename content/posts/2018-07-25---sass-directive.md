---
title: "sass指令directive"
date: "2018-07-25 20:17:16"
template: "post"
slug: "sass-directive"
description: ""
tags:
  - "前端"
  - "sass"
draft: false
category: "开发"
socialImage: ""
---
sass具有强大的可编程性 内建指令很多

## @debug

打印表达式的值

## @warn

打印表达式值和抛出堆栈

![@warn图例](sass-warning.jpg)

## @error

抛出error和异常堆栈(会阻断编译)

![@error图例](sass-error.jpg)

## @mixin @include

@mixin表示定义一个mixin，可以接受参数

@include表示引用一个mixin，可以接受参数

```scss
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}

@include silly-links;

// 编译结果如下
a {
  color: blue;
  background-color: red; }
```

## @content

mixin中预定义一个区域，接受mixin调用时的content

```scss
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}

// 编译结果如下
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```

## @if @else

分支指令，@if后接受sass表达式

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

// 编译结果如下
p {
  color: green; }
```

## @for

> `@for $var from <start> through <end>` => start开始end结束 ***包含*** end
>
> `@for $var from <start> to <end>` => start开始end结束 ***不含*** end
>
>
>
> `<start>` `<end>`都必须返回整数
>
> start > end 则为递减循环

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

// 编译结果如下
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

## @each

遍历用

> 基础语法 `@each $var in <list or map>`

### 简单list

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// 编译结果如下
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

### list中有list

```scss
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// 编译结果如下
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; }
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; }
```

### map

```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}

// 编译结果如下
h1 {
  font-size: 2em; }
h2 {
  font-size: 1.5em; }
h3 {
  font-size: 1.2em; }
```

## @while

和其他语言的while一样

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}

// 编译结果如下
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```

## @at-root

将rules直接放置在文档的根下，而不是包含他们的父选择器中。

```scss
.parent {
  ...
  @at-root {
    .child1 { ... }
    .child2 { ... }
  }
  .step-child { ... }
}

// 编译结果如下
.parent { ... }
.child1 { ... }
.child2 { ... }
.parent .step-child { ... }
```

### @at-root (without: ...) and @at-root (with: ...)

@at-root时，可以移除或保留特定的指令(多个指令用空格分开)

```scss
@media print {
  .page {
    width: 8in;
    @at-root (without: media) { // 移除@media
      color: red;
    }
  }
}

// 编译结果如下
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: red;
}
```

### @at-root with或without的特殊值

@at-root with或without支持两个特殊值 `rule`和`all`

> rule => `@at-root (without: rule)` 表示不作任何处理；反之`(with: rule)`表示移除所有指令
>
> all => `@at-root (without: all)` 表示移除所有指令；反之`(with: all)`表示不做任何处理

## @media

功能同css的@media，并且支持写在rule中 ***rule中的@media会包裹最外层的选择器***

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}

// 编译结果如下
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; } }
```

## @import

简单的引入操作

支持sass/scss的引入编译和css语法@import

### sass/scss引入

默认方式，编译器在指定位置寻找文件，可以不写后缀.scss/.sass，文件开头的下划线"_"可不写(下划线开头的文件通常是定义mixin文件或定义文件，不直接编译成css样式)

### css语法@import

以下几种为css的@import语法:

1. 文件后缀.css.
2. 文件名以`http://`开始.
3. 文件名以url()开始.
4. @import含有media查询.

### 支持在嵌套环境中使用@import

```scss

// example.scss
.example {
  color: red;
}

// main.scss
#main {
  @import "example";
}

// 编译结果如下
#main .example {
  color: red;
}
```

### 不支持嵌套@import的场景

@mixin和@charset的第一级不支持嵌套的@import

## @extend

extend 继承的意思

> 继承一个选择器 => sass编译器找到每一个要继承的选择器，加上当前选择器名

### 继承

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 编译结果如下
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```

### 继承多个选择器

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 编译结果如下
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```

### 多重继承

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}

// 编译结果如下
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; }

.seriousError {
  border-width: 3px; }
```

### 链式继承

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}

// 编译结果如下
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; }

.seriousError, .criticalError {
  border-width: 3px; }

.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; }
```

### %placeholder  (占位符)

> 为了@extend用，不产生实际的选择器(写类库可能需要)  ***和@mixin的目的有些类似，只是用法不同***

```scss
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
.notice {
  @extend %extreme;
}

// 编译结果如下
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em; }
```

### !optional

当@extend没有找到选择器，或者在当前环境下会导致生成出错的选择器 可以在@extend的最后加入!optional避免生成。

```scss
a.important {
  @extend .notice !optional;  // => 当不存在.notice或者 存在 h1.notice会导致出错(a和h1相冲突)
}
```
