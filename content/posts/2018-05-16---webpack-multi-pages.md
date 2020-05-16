---
title: "WebpackDevServer实现多页应用"
date: "2018-05-16 22:42:54"
template: "post"
slug: "webpack-dev-server-multi-pages"
description: "一直以来公司的前端项目都是一个项目一个vue-cli生成的SPA，然后放入不同的业务画面的iframe中..."
tags:
  - "webpack"
  - "vue"
  - "前端"
  - "html-webpack-plugin"
  - "webpack-dev-server"
draft: false
category: "开发"
socialImage: ""
---

## 前言

一直以来公司的前端项目都是一个项目一个vue-cli生成的SPA，然后放入不同的业务画面的iframe中。

起初，只有一两个项目时，代码管理和开发还是比较轻松的。但当老系统逐渐拆分，新项目的不断启动，问题就来了。

## 问题

### 项目的创建

项目越来越多，每一个都需要单独vue-cli生成，然后配置一堆参数。当一个配置的参数有变，所有的其他项目都需要联动调整，维护量较大。

### 项目的编码维护

每个项目，所属的业务不同。但是整体上应当： 系统UI一致、部分相同业务逻辑代码处理一致。重复coding很多，维护量也很大。当编码不受控时，各个项目的处理方式也可能各不相同。

### iframe性能问题

iframe在使用中，问题不少。

- iframe相当于一个完整的页面，内存cpu占用是一个问题；
- iframe和主页面共享同一个连接池，可能会和主页面相互影响；
- iframe不同平台(PC和移动等)、不同浏览器(Chrome和IE等)效果有差异，适配也是难点；
- iframe和主页面需要考虑跨域的问题；
- 等等等...

所以很多地方建议前端尽可能少用iframe。

## 解决方法

对于各种发现的问题，简单构想一下可以整合前台项目，通过Webpack按项目打包生成多个SPA。

### 项目配置

之前在一篇文章[Webpack2中多页应用的实现](/posts/webpack2-multi-pages)中写到了项目最终打包生成多页的配置文件，但是开发模式上一直没能解决完整启动多页的功能。

这次研究了一下webpackDevServer，终于找到了可行的解决方法。

### 项目配置思路

在Webpack中，入口js是配置项的entry，最终的html生成是plugin中`HtmlWebpackPlugin`插件实现。

实际使用中，就是找到各个页面入口js和入口html，加入配置就行。

### 配置Demo

下面是一个比较简单的多页HTML Demo配置

```js
const entry = {
  page1: './src/page1.js',
  page2: './src/page2.js',
}
const htmlPlugins = [
  new HtmlWebpackPlugin({
    template: './src/page1.html',
    filename: 'page1.html',
    inject: true,
    chunks: 'all',
    excludeChunks: ['page2'],
    chunksSortMode: 'dependency',
  }),
  new HtmlWebpackPlugin({
    template: './src/page2.html',
    filename: 'page2.html',
    inject: true,
    chunks: 'all',
    excludeChunks: ['page1'],
    chunksSortMode: 'dependency',
  })];
```

ok，按照这个配置，生产编译问题解决了。

但是开发环境呢。。。

### 开发环境配置

之前公司项目中也用到了多页配置，加上了HtmlWebpackPlugin实现了，但是每次只能启动一个单页。虽然两个模板关系不是特别紧密，但是如果能一次直接启动全部肯定是更好的。

正好最近在给自己的项目模板做 `Webpack 4` 升级的过程中也遇到了这个问题，所以自己翻查了下webpackDevServer的文档说明，找到了解决方案[devServer.historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback)。

参照文档描述，只需要自己指定路由重写机制，就可以实现开发模式多页面注入并导航。

那上面的demo，配置类似如下写法就可以满足需求。

```js
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/page1.html' },
    { from: /^\/page1/, to: '/page1.html' },
    { from: /^\/page2/, to: '/page2.html' }
  ]
}
```

## 一个现成的项目例子

多页的开发生产配置项目，已经上传了[suyi91/simple-frontend-template](https://github.com/suyi91/simple-frontend-template) 源代码为[1.2.0版本](https://github.com/suyi91/simple-frontend-template/archive/1.2.0.zip)
