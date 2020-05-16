---
title: 在浏览器中直接使用ES Module
author: Suyi
authorURL: https://github.com/suyi91
authorFBID: 100009224056265
---

> 众所周知，浏览器都是不支持JS的模块化的，例如CommonJS、AMD/CMD和ES Module等。
>
> 如果想要进行模块化编程，通常都需要工具或库的支持，比如AMD的requireJS、CMD的seajs、Webpack/Babel等。

在[HTML5.2](https://www.w3.org/TR/html52/semantics-scripting.html#the-script-element)中，对`<script>`标签加入了`type="module"`的支持，可以在网页中直接引入并使用原生ES Module了。

```html
<script type="module">
import test from './test.js';

console.log(test)
</script>
```

```js
// test.js

export default 'This is in test.js'
```
<!--truncate-->

## 浏览器开始支持版本

PC端

|浏览器|支持版本|
|-----|:------:|
|Chrome|61|
|Edge|16|
|Firefox|60<br />(54 — 60需要启用`dom.moduleScripts.enabled`)|
|IE|-|
|Safari|10.1|
|Opera|48|

Mobile端

|浏览器|支持版本|
|-----|:------:|
|Android Webview|61|
|Chrome Android|61|
|Edge Mobile|16|
|Firefox Android|60<br />(54 — 60需要启用`dom.moduleScripts.enabled`)|
|Opera Android|48|
|Safari iOS|10.3|

## 使用时的注意点

### module的路径定义

支持下列几种路径方式

``` js
import module from 'http://pathOf/module.js'
import module from '/pathOf/module.js'
import module from './pathOf/module.js'
import module from '../pathOf/module.js'
```

没有全局module，所以不支持下列几中路径

``` js
import module from 'module'
import module from 'path-of/module.js'
```

引入路径也不支持本地文件协议`file:///`

### module默认defer

defer是script的一个属性，表明文件不阻塞网页，会在加载完成后按照顺序执行，执行例子如下图。

![defer图例](assets/html-script-defer.jpg)

### 同一个module只会加载一次

如果module的完整路径一致，那么就认为是同一个module，只会被加载一次。

例如`http://xxx/a.js`和`http://xxx/a.js?1`，因为路径不同，是两个module。

## 小结

浏览器支持ES Module可以给我们带来很多开发上的便利，但是

**!!!自己玩玩就行了，不要在线上产品使用**

**!!!自己玩玩就行了，不要在线上产品使用**

**!!!自己玩玩就行了，不要在线上产品使用**

😁
