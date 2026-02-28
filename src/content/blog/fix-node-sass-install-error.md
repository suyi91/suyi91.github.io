---
draft: false
date: 2025-02-27
title: node-sass安装报错备忘
description: 2025年再次遇到node-sass的安装报错，如何快速解决？
mermaid: true
mathjax: true
tags: ['css', 'sass', 'node-sass']
category: ['前端']
---

## 常见安装报错问题列举

### 1. nodejs和node-sass版本不匹配

参考node-sass的readme，安装node-sass时需要关注运行时的nodejs版本

```
NodeJS  | Supported node-sass version | Node Module
--------|-----------------------------|------------
Node 20 | 9.0+                        | 115
Node 19 | 8.0+                        | 111
Node 18 | 8.0+                        | 108
Node 17 | 7.0+, <8.0                  | 102
Node 16 | 6.0+                        | 93
Node 15 | 5.0+, <7.0                  | 88
Node 14 | 4.14+, <9.0                 | 83
Node 13 | 4.13+, <5.0                 | 79
Node 12 | 4.12+, <8.0                 | 72
Node 11 | 4.10+, <5.0                 | 67
Node 10 | 4.9+, <6.0                  | 64
Node 8  | 4.5.3+, <5.0                | 57
Node <8 | <5.0                        | <57
```

### 2. 网络问题导致下载异常

:::note
node-sass安装时默认直连github下载文件，但因为众所周知的gfw原因下载大概率会被中断导致报错。
:::

node-sass支持修改下载地址，可使用如下方式:
1. 命令行:  npm install node-sass --`sass-binary-site`=http://example.com/
2. npmrc:  `sass_binary_site`=http://example.com/

:::tip
国内可用的地址值为: `https://npmmirror.com/mirrors`
:::

### 3. 使用dart sass

npm包`node-sass` => `sass`


## 参考信息

1. mirror-config-china: https://www.npmjs.com/package/mirror-config-china