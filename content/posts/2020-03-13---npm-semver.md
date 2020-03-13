---
title: "npm中的semver"
date: "2020-03-13 22:00"
template: "post"
slug: "npm-semver"
tags:
  - "npm"
  - "semver"
  - "前端"
  - "node"
draft: false
category: "开发"
socialImage: "semver.jpg"
---

讲到前端，绕不开`npm`。作为前端包管理工具，`npm`的版本管理也遵循[semantic version](https://semver.org/lang/zh-CN/)。

## npm包的版本

npm包的版本定义在`package.json`中的`version`字段中，发布新版本时可以升级`major`、`minor`、`patch`等，数字的升级规则可见前文。

包一般都需要用到很多的第三方依赖包，依赖包定义在`package.json`的`dependencies`或`devDependencies`中。

### 依赖版本中符号的意义

1. `^` 包含相同`major`版本中所有大于指定版本的版本
> 例如: `1.10.0`满足`^1.2.3`但是`2.0.0`不满足

1. `~` 包含相同`major`和`minor`版本中所有大于指定版本的版本
> 例如: `1.2.5`满足`~1.2.3`但是`1.10.0`不满足

1. `>` `<`, `=`, `>=`, `<=`版本比较符号，和各自的数学意义一致。
> 例如: `2.0.0`满足`>1.2.3`但是`1.2.0`不满足

1. `-` 用来连接两个版本，`-`两侧必须要有空格
> 例如: `2.0.1`满足`2.0.0 - 2.0.2`

1. `||` "或" 连接左右两侧的判断
> 例如: `2.1.0`和`2.3.1`均满足`^2 <2.2 || > 2.3`

1. `*`/`x`/`X` 表示所在位置可以为任意值
> 例如: `1.2.3`满足`1.2.x`

### 版本管理库 -- semver

`semver`是npm中很强大的[库](https://github.com/npm/node-semver)，可以方便的操作、比较版本字符串。同时，也是npm正在使用的semver解析工具。

以下摘取github中部分的api使用sample。

```js
const semver = require('semver')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```

### npm相关的版本命令

npm-cli有一个命令`version`，可以查看包版本和设置版本(写入`package.json`/`package-lock.json`，如果存在`npm-shrinkwrap.json`也将写入)。

1. `npm version <newversion>` 将版本设置为`<newversion>`，`<newversion>`必须符合semver规范

1. `npm version [major | minor | patch]` 根据输入的内容，将版本的对应部分 + 1，取得新版本并写入项目。

1. `npm version [premajor | preminor | prepatch]` 根据输入的内容，将版本的对应部分预发布版本 + 1，取得新版本并写入项目。
> `0.0.0`经过`premajor`后得到`1.0.0-0`

1. `npm version prerelease [--preid=<prerelease-id>]` 生成新的预发布版本(如果已经是正式版本，则得到新的`prepatch`版本)。`preid`为阶段id，例如`beta`/`alpha`等等。
> `1.0.0`经过`prerelease`后得到`1.0.1-0`
>
> `1.0.0`经过`prerelease --preid=beta`后得到`1.0.1-beta.0`，再次`prerelease --preid=beta`后得到`1.0.1-beta.1`

## 参考

1. [npm语义化版本计算器](https://semver.npmjs.com/)
1. [npm version说明](https://docs.npmjs.com/cli/version)
