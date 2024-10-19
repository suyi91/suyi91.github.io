---
draft: false
date: 2024-10-22
title: Astro github pages快速部署
description: 如何用astro & github快速、免费搭一个blog呢？
mermaid: true
mathjax: true
tags: ['astro']
category: ['前端']
---

> ^_^本站就是笔者用下面的方式摸索搭建出来的，可以多多点击查看astro的效果。

## 部署步骤

1. 生成astro项目，可以选择已有主题 [Astro主题Gallery](https://astro.build/themes)
2. 新建github pages仓库。 
    - 例如：`github.com/your-user-name/your-user-name.github.io`
    - 主分支为`main` => 作为部署的静态文件保存用
3. 新建一个`source`分支，放源码。Push codes  => `source`分支
4. Astrojs build
    - 如果自有域名，在astrojs项目中配置**CNAME**指向
    - astrojs的各种[配置项说明文档](https://docs.astro.build/en/reference/configuration-reference/)
5. 使用[gh-pages](https://github.com/tschaub/gh-pages)库将build产物发布到main分支
6. 使用CNAME的域名访问查看效果。

## 问题备忘
1. Github page不支持astrojs的build产物中下划线开头的文件/文件夹的访问。

    默认build会生成`/_astro`、`/_astro/_xxx.js`等文件，由于github page的jekyll默认特性，无法直接访问。

    解决方案：Github pages根目录放置`.nojekyll`文件可以禁用[jekyll的特性](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators)。

