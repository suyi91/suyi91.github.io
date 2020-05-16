---
title: Webpack2中多页应用的实现
date: "2017-05-13 15:27:37"
template: "post"
draft: false
tags:
  - "webpack"
  - "vue"
  - "html-webpack-plugin"
slug: "webpack2-multi-pages"
description: ""
category: "开发"
socialImage:
---
## 前言
接触前端几个月，开始在做基于Vuejs2的移动端网页应用。单页应用做的真爽，Vue的数据绑定(MVVM)写的不亦乐乎，轻松愉快就可以写出一个完整的单页项目出来。

然后问题来了，公司的一个新移动端项目也要整合进来。出于上线时间较为紧急的考虑，就直接在项目的router中添加了新项目的路由，代码拷贝了一份。上线后，小问题不断。。。新老项目出现了相互影响的问题。所以，经过了讨论决定，将两个项目发布为两个单页应用，共享同一个项目。

## Webpack2打包多个单页应用
研究了一下Vue的编译发布，实际上是进行了`node build/build.js`。其中在webpack.prod.conf.js中，HtmlWebpackPlugin插件用于生成输出的页面。

下面是一个入口页的HtmlWebpackPlugin配置。
```js
  plugins: [
    // ...
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // ...
  ]
```
实现多页应用，只需再`new HtmlWebpackPlugin`就可以了。

### 具体的实现代码
``` javascript
plugins: [
    // ...
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index2, // => 输出页的fileName config/index.js的build中新建index2属性
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // ...
  ]
```
这边只是简单地创建一个新的输出页(内容和默认的index.html一致)，HtmlWebpackPlugin还有其他属性可自行配置：

属性  | 类型 | 默认值 | 描述
 :---: | :---: | :---: | :---:
title|String|`''`|生成html页面的title
filename|String|`index.html`|生成页的路径地址
template|String|`''`|编译使用的的模板文件
inject|String&#124;Boolean|true|js在template的注入位置 true&#124;'body'=>body底部 'head'=>head里 false=>不插入js
favicon|String|`''`|网站图标文件路径
meta|Object|`{}`|html的meta标签 比如`meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}`
minify|Boolean&#124;Object|`true`|true&#124;false或minify参数配置[html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)
hash|Boolean|`false`|js是否生成hash(Webpack编译后是否在文件名后添加文件hash) 避免文件缓存用
cache|Boolean|`true`|文件变化才编译出文件
showErrors|Boolean|`true`|是否在生成的html中显示error详情
chunks|{?}|`?`|需要包含的chunks
chunksSortMode|String&#124;Function|`auto`|chunk在生成网页中的的排序模式 可选值'none' &#124; 'auto' &#124; 'dependency' &#124; 'manual' &#124; {Function}
excludeChunks|Array|`''`|编译中需要排除的chunks
xhtml|Boolean|`false`|`true`=>`link`标签闭合(符合xhtml规范)

具体的使用方式可以在[https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)上查看

## 开发模式的多应用配置
本地通常是执行npm run dev进行开发调试。npm run dev时实际运行了node build/dev-server.js。研究脚本可知在启动时会读取webpack.dev.conf.js的配置。
文件中有下面这段代码，在编译时将index.html编译挂载。
``` javascript
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
```
对于多页应用，只需在每次执行时，将template改为需要启动的页面即可。

当然，这种做法感觉有点笨拙，我们可以这样:
1. 在package.json中定义一个新的script，比如`dev-new`;
1. 定义`dev`和`dev-new`的HtmlWebpackPlugin;
1. 执行`npm run dev`时将2中定义的`dev`的HtmlWebpackPlugin加载到webpack.dev.conf.js的plugin中即可
1. 执行`npm run dev-new`时将2中定义的`dev-new`的HtmlWebpackPlugin加载到webpack.dev.conf.js的plugin中即可

Ps: 为了完全的拆分，可以在webpack.base.conf.js中的entry新建一个入口、新建入口配置文件、新建router文件、HtmlWebpackPlugin配置chunks......

这样，就完成了Vuejs2中多页应用的简单配置。
