---
title: "从零搭建react开发环境"
date: "2020-10-13 22:00"
template: "post"
slug: "react-setup-from-zero"
tags:
  - "react"
draft: false
category: "开发"
description: ""
socialImage: ""
---

最近工作不多，趁着有空，学习一下react。首先需要实现的是搭建开发环境。

`create-react-app`是react官方Facebook推出的脚手架工具，可以一行命令实现生成一个标准的react项目——对初学者上手开发比较友好，但如果后期需要调整配置就需要完整理解配置的各个文件及其内容。

所以准备用webpack配置一个开发环境，毕竟webpack用了很多年了😂。

## Target

一个react前端的开发环境，下面几项是必不可少的:

- react
- webpack
- jsx
- html
- css
- webpack-dev-server

下面分别实现这几项。

first in first，新建一个空目录并快速初始化`npm init -y`。

## react

项目引入react相关的包。

```bash
$ yarn add react react-dom
```

创建`src/index.jsx`文件。

```jsx
import React from "react";
import ReactDOM from "react-dom";

```

## webpack

作为前端web项目打包的工具，webpack（使用webpack 4）必不可少。

```bash
$ yarn add -D webpack webpack-cli
```

项目根目录新建`webpack.config.js`文件，并写入下面的内容。

```js
// webpack.config.js
module.exports = {
  entry: './src/index.jsx'
}
```

`package.json`加入`scripts`。

```json
{
  scripts: {
    "build": "webpack --mode production"
  }
}
```

至此可以`yarn build`生成打包后的js文件了

## 编译jsx

webpack不支持jsx语法，需要引入babel实现代码的编译。

```bash
$ yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

根目录新建`babel.config.js`

```js
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

webpack加入babel-loader的支持

```js
// webpack.config.js
module.exports = {
  // xxx
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
      // xxx
    ]
  }
  // xxx
}
```

此时项目支持jsx的语法了。

## 编译html

web应用都需要html入口页，webpack默认不支持，需要使用`html-loader`和`html-webpack-plugin`实现html的读取和注入js bundle地址。

```bash
$ yarn add -D html-loader html-webpack-plugin
```

新建入口html页面文件`src/index.html`

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>set up React, Webpack, and Babel</title>
</head>
<body>
<div id="container"></div>
</body>
</html>
```

修改webpack配置

```js
// webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // xxx
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}
```

最后修改入口jsx文件内容

```jsx
// src/index.jsx
import React from "react";
import ReactDOM from "react-dom";
import Form from "./js/components/Form"; // Form为任意写的一个组件

const wrapper = document.getElementById("container");

ReactDOM.render(<Form />, wrapper)
```

这时，`yarn build`编译后就会生成最终的产物目录（`dist/`目录）。

## 编译css

css的接入方案有很多，以后再介绍各种用法。

## webpack-dev-server

前端本地开发离不开`webpack-dev-server`。接入比较简单，首先是安装依赖。

```bash
$ yarn add -D webpack-dev-server
```

`package.json`再加入脚本即可。

```json
{
  scripts: {
    // xxx
    "start": "webpack-dev-server --open --mode development"
  }
}
```

`yarn start`就可直接打开开发环境了。

## 总结

总体上来说，手撸一个react的开发/编译环境是很简单的，且可以借这个机会熟悉webpack的配置。

因为纯手撸，后续需要修改配置、优化编译等可以查阅webpack官网、而不需要额外的学习成本（`create-react-app`等）。
