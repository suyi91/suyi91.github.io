---
title: "next主题升级6.0"
date: "2018-04-26 14:25:08"
template: "post"
slug: "hexo-next-upgrade-6_0"
description: ""
tags:
  - "hexo"
draft: false
category: "博客搭建"
socialImage: ""
---
很久没写Po了。

最近决定写一波查查next下的一些配置，发现next有6.0了。

研究了一下[升级日志](https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/UPDATE-FROM-5.1.X.md "升级日志")，改动不多，简单操作即可。

## 升级步骤

1. clone next主题的新代码

    ```bash
      $ git clone https://github.com/theme-next/hexo-theme-next themes/next-reloaded
    ```

    这边需要注意的是，官方推荐将主题代码下载到`themes`下的新目录中(比如这边的`next-reloaded`)，这种方式便于当新主题出错时可以随时切换到老主题。

1. 拷贝next主题中修改的文件至新主题目录中

    之前next目录是直接`git clone`下来的，所以`git status`查看一下就好了。

    博主因为只修改了头像和网站icon等图像文件，所以简单拷贝粘贴即可。

1. next的配置文件`themes/next/_config.yml`

    文件`themes/next/_config.yml`中配置了很多的next下的实用功能，例如: rss、 首页菜单、 next内部主题、评论系统、Google Analysis等。这些都需要迁移到新next配置文件中。

    一个比较好的方法就是先`git diff themes/next/_config.yml`得到自己的配置内容，然后通过diff工具比较`next/_config.yml`与`next-reload/_config.yml`，将diff的内容合并到文件中。

1. hexo的配置文件切换主题

    hexo静态博客的配置文件`./_config.yml`中切换主题为新主题目录`next-reloaded`

    ```yml
    ...
    theme: next-reloaded
    ...
    ```

## 升级完成

通过上面四步，基本上升级完成。

本地运行`hexo s`查看效果。

如果没问题直接`hexo g -d`提交发布。

## 升级发现的问题

### 主页左上部分的链接从中文变成了英文

![hexo6-0升级问题1](hexo6_0-problem1.jpg)

[Github上相关issue](https://github.com/theme-next/hexo-theme-next/issues/157 "set `language: zh-Hans` invalid [renamed `zh-Hans` to `zh-CN`]")

Github上也有人提出了这个问题，hexo-next在v6.0.3版本调整了配置，`zh-Hans`改为了`zh-CN`。

修改hexo配置`_config.yml`即可。

![hexo6-0升级问题1解决](hexo6_0-problem1_solved.jpg)

### 页面LeanCloud访问统计提示'Counter not initialized! See more at console err msg.'

2018年初发现next使用的LeanCloud访客统计插件存在重大安全漏洞，需要手动修复。

参考文章: [NexT主题使用的Leancloud访客统计插件存在重大安全漏洞](https://leaferx.online/2018/02/11/lc-security/)

Ps: 如果在配置`- type: leancloud_counter_security_sync`后hexo运行出现文件解析错误，了解一下[YAML基础语法](http://yaml.org/)就行了。

### 站点🔍无限转圈无弹窗

博主的站点启用了local_search功能，next v5的时候🔍功能确定可用，但是升级后就不行了。

经过调查和翻阅Github找到了解决方式，删除`hexo-generator-searchdb`模块然后`hexo clean`并重新运行即可。

> `hexo-generator-searchdb` was forked from `hexo-generator-search`
> This is a bug in early version of the `hexo-generator-search` and it has been fixed recently
>
> `hexo-generator-searchdb`是`hexo-generator-search`的一份fork。
> 早期版本的`hexo-generator-search`存在bug，近期被修复了导致。

---

以上是简单的升级记录，后续有问题会继续更新
