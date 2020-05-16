---
id: webpack-assets-cdn
title: Webpack中资源配置CDN
sidebar_label: Webpack中资源配置CDN
---

## 前言

如今的网站开发遵循动静分离的原则，将前端资源与后台应用分离开。为了更好地加速用户访问，前端静态资源会选择部署在CDN上。

## Webpack中配置CDN

Webpack提供了配置[`output.publicPath`](https://webpack.js.org/configuration/output/#outputpublicpath)支持给编译生成并注入html文件的静态资源加上CDN前缀。

👇就是一个简单的配置🌰。

```js
// 开发模式下为本地相对地址，生产模式下cdn地址
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : 'https://your-cdn-url',
  }
}
```

如此配置，经由`HtmlWebpackPlugin`生成的html文件中引入的css/js都配置了CDN。但是css文件中形如`url(xxx.png)`的部分并没有生效

## CSS中的`url(xxxx.png)`配置CDN

在Webpack工程配置中，通常会使用[`url-loader`](https://github.com/webpack-contrib/url-loader)进行图片等资源的处理，url-loader也提供了属性`publicPath`。

### Webpack中

```js
{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'url-loader',
    options: {
      publicPath: process.env.NODE_ENV === 'development' ? '/' : 'https://your-cdn-url',
    }
  }
}`
```

### Vue-cli3中

Vue-cli3封装了一系列Webpack配置并开放了一些接口供修改，改动起来相对繁琐，需要熟悉[webpack-chain](https://github.com/neutrinojs/webpack-chain)。

```js
{
  // ...
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('url-loader')
        .tap(options => {
          return merge(options, {
            publicPath: 'https://your-cdn-url'
          })
        });
    }
  }
  // ...
}
```
