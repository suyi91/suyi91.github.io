---
draft: false
date: 2026-05-25
title: Git Notes 使用指南
description: Git Notes 给 commit 贴便利条——不影响 SHA，但 GitHub 已不支持，仅推荐本地自用
mermaid: false
mathjax: false
tags: ['Git']
category: ['tech']
translationKey: git-notes
audio: false
---

:::caution[TL;DR]
Git notes 给 commit 贴便利条，不影响 SHA，但 **GitHub 自 2014 年起已不再支持显示**，不适合依赖远程协作的场景。本地自用可，否则不推荐。
:::

## 是什么

**给 Git 对象（主要是 commit）贴便利贴。** Commit 本身不能改（改了 SHA 就变），但可以在旁边附加一段额外信息，不影响 commit 的任何属性。

当前 commit 的 git notes 属于默认的 `refs/notes/commits`（即 `git notes` 不加 `--ref` 时的默认命名空间）。注意 `--ref=commits` 等价于 `refs/notes/commits`，即 `git notes --ref=commits add` 写入的是同一个位置。

### 关键特征

| 特性 | 说明 |
|------|------|
| **不影响 SHA** | 加 notes 不改 commit 本身，适合附加 CI 结果、Review 备注 |
| **独立存储** | 存在 `refs/notes/commits` 分支，底层是一棵特殊的树 |
| **可作用于任意对象** | 不只是 commit，blob/tree/tag 都能贴 |
| **默认不传远程** | 需显式 push/fetch |
| **支持命名空间** | `--ref` 参数可隔离不同用途的 notes |
| **GitHub 不支持** | GitHub 自 2014 年起停用 notes 展示 |

## 基本用法

```bash
# 给当前 commit 加 note
git notes add -m "Review: LGTM"

# 查看 note
git notes show HEAD

# 编辑已有 note
git notes edit abc123

# 删除 note
git notes remove abc123

# 所有有 note 的 commit
git notes list
```

## 实战演示

以下在本地仓库演示 notes 的实际显示效果：

```bash
# 给第一个 commit 加一条 note
git notes add -m "Review: looks good to me" 680457d

# 查看 log，note 显示在 commit message 下方
git log --oneline --notes
# 680457d feat: initial commit
# Notes:
#     Review: looks good to me
```

```bash
# 用命名空间隔离不同用途的 notes
git notes --ref=review add -m "Code style: good, no issues" a408136
git notes --ref=ci add -m "Tests: passed (14/14)" a408136
git notes --ref=ci add -m "Build: success (2.3s)" 6fdbc36

# 显示时用 --notes=xxx 指定命名空间
git log --oneline --notes=review --notes=ci
# 6fdbc36 chore: add todo comment
# Notes (ci):
#     Build: success (2.3s)
#
# a408136 feat: add index.js
# Notes (review):
#     Code style: good, no issues
#
# Notes (ci):
#     Tests: passed (14/14)
```

```bash
# 列出所有带 notes 的 commit（默认命名空间）
git notes list

# 列出指定命名空间
git notes --ref=review list
```

```bash
# append 追加内容到已有 note，不会覆盖原内容
git notes append -m "Re-review: approved after minor fixes" 680457d

git log --oneline --notes 680457d
# 680457d feat: initial commit
# Notes:
#     Review: looks good to me
#
#     Re-review: approved after minor fixes
```

:::note
`git notes append` 适合增量式添加信息（如多轮 review 意见、CI 重跑结果），旧内容和新内容之间以空行分隔。
:::

## 命名空间

不同用途的 notes 可以隔离在不同命名空间下：

```bash
git notes --ref=review add -m "LGTM" HEAD    # → refs/notes/review
git notes --ref=ci add -m "passed" HEAD       # → refs/notes/ci
```

显示时：

```bash
git log --notes=review --notes=ci
```

或配置 `notes.displayRef` 自动显示。

## 远程协作

### 推送与拉取

Notes 默认不随 push/fetch 传输，需显式指定：

```bash
git push origin refs/notes/commits
git fetch origin refs/notes/commits:refs/notes/commits
```

或配置自动同步：

```bash
git config remote.origin.fetch "+refs/notes/*:refs/notes/*"
```

### 合并策略

多人同时编辑 notes 时可能产生冲突，`git notes merge` 支持多种策略：

- `ours` / `theirs` — 直接选一方覆盖
- `union` — 拼接双方内容
- `cat_sort_uniq` — 拼接+排序+去重（适合 line-based 格式）
- `manual`（默认）— 检出冲突到 `.git/NOTES_MERGE_WORKTREE`，手动解决后 `git notes merge --commit`

## 进阶技巧

- **Rebase 携带 notes**：配置 `notes.rewriteRef` 可在 rebase/amend 时自动携带 notes
- **`git log --no-notes`**：隐藏所有 notes 的显示
- **适用场景**：Code review 备注、CI 测试结果附加到 commit、GPG 签名信息等

## 平台兼容性

GitHub 自 **2014 年 8 月 14 日**起已不再支持显示 git notes（[官方公告](https://github.blog/news-insights/git-notes-display/)）。notes 在其他平台（GitLab、自建 Git 服务）也可能有兼容问题。**不推荐在依赖远程协作的场景中使用。**
