---
title: "git worktree"
date: "2020-05-18 22:00"
template: "post"
slug: "git-worktree"
tags:
  - "git"
draft: false
category: "开发"
description: "git的worktree命令可以方便地checkout出多分支代码并且不需要重复clone代码仓库。"
socialImage: ""
---

## Intro

方便管理当前仓库多工作树的命令。

可以省略git clone/git checkout操作在新的目录切代码。

方便多分支同时管理和开发。

## 常用命令说明(以purchase-view为例)

```bash
# git help worktree的内容
git worktree add [-f] [--detach] [--checkout] [--lock] [-b <new-branch>] <path> [<commit-ish>]
git worktree list [--porcelain]
git worktree lock [--reason <string>] <worktree>
git worktree move <worktree> <new-path>
git worktree prune [-n] [-v] [--expire <expire>]
git worktree remove [-f] <worktree>
git worktree unlock <worktree>
```

### worktree add

> 创建一个新的目录并checkout代码

```bash
# 在../purchase-view__master目录切origin/master分支的代码
➜  purchase-view git:(test) git worktree add --checkout ../purchase-view__master origin/master
Preparing worktree (detached HEAD 55dceaf4)
HEAD is now at 55dceaf4 Merge branch 'test' into 'master'

# 新建成功后可以查看结果
➜  purchase-view git:(test) ✗ git worktree list
/Users/sean/Documents/workspace/f6prj/purchase-view         e82c8f29 [test]
/Users/sean/Documents/workspace/f6prj/purchase-view__master  55dceaf4 (detached HEAD)
```

### worktree list

> 列举仓库的worktree情况

可见`worktree add`中结果。

### worktree lock/unlock

> 配置worktree某目录锁定和解锁动作。
>
> 暂时没碰到使用场景。

### worktree move

> 将working tree目录移动到新位置。主目录和带有子模块(submodules)的目录不可以移动。

```bash
➜  purchase-view git:(test) git worktree move ../purchase-view__master ../new--purchase-view__master
➜  purchase-view git:(test) git worktree list
/Users/sean/Documents/workspace/f6prj/purchase-view               e82c8f29 [test]
/Users/sean/Documents/workspace/f6prj/new--purchase-view__master  55dceaf4 [master]
```

### worktree remove

> 移除指定的worktree

```bash
➜  purchase-view git:(test) git worktree remove ../new--purchase-view__master
➜  purchase-view git:(test) git worktree list
/Users/sean/Documents/workspace/f6prj/purchase-view  e82c8f29 [test]
```

### worktree prune

> 清理worktree的配置信息 <span style="color:red">$GIT_DIR/worktrees</span>

例如手动删除了一个worktree的文件夹但是没有执行`git worktree remove`，git并不能识别出已经删除了。

可以使用`git worktree prune`手动更新项目的woktree配置。

推荐使用`git worktree remove`移除worktree。
