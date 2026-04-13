# 博客项目说明

Astro Theme Yi 个人静态博客，部署在 GitHub Pages（suyi.xyz）。使用 Bun 作为包管理器和运行时。

- 源码分支：`sources`（所有开发工作在此进行）
- 部署分支：`master`（存放编译后的 `dist/`，由脚本自动管理，**禁止手动修改**）

## 命令速查

| 操作 | 命令 |
|---|---|
| 启动开发服务器 | `bun run dev`（访问 http://localhost:4321） |
| 构建 | `bun run build`（输出到 `./dist`） |
| 本地预览构建产物 | `bun run preview` |
| 发布到生产环境 | `bun run upload`（自动先执行 build，再推送 dist/ 到 master） |
| 安装依赖 | `bun install` |

**无 lint、typecheck、test 命令。** 不要查找这些命令，本项目不存在。

## 项目结构

- `src/content/blog/` — 博客文章（Markdown），内容集合 schema 定义在 `src/content/config.ts`（Zod）
- `src/content/feed/` — 短记/动态（Markdown），同上
- `src/consts.ts` — 全局站点配置（单一信息源）
- `src/i18n/` — 多语言文件（`en`/`zh-cn`/`cs`），活跃语言由 `config.lang` 控制，`src/i18n/utils.ts` 提供 `t()` 函数
- `public/` — 静态资源（含 `toggle-theme.js`）
- `deploy.js` — 部署脚本（使用 `gh-pages` 包推送 `dist/` 到 master 分支）
- `.env.local` — 本地环境变量（含 `GH_TOKEN`，**不提交到 Git**，deploy.js 必须有此变量才能运行）

## 路径别名

- `$components` → `src/components/`
- `$` → `src/`

## 内容格式

### 博客文章 — `src/content/blog/<slug>.md`

最小 frontmatter（必填）：
```yaml
---
title: 文章标题
date: 2026-02-28
---
```

完整 frontmatter：
```yaml
---
title: ""
description: ""      # SEO 和列表预览
date: 2026-02-28
tags: [tag1, tag2]
category: [分类名]
sticky: 0            # 置顶权重，数字越大越靠前
draft: false         # true = 草稿，不出现在列表中
toc: true
comment: true
donate: true
mathjax: false       # 启用 MathJax 数学公式
mermaid: false       # 启用 Mermaid 图表
---
```

### 短记 — `src/content/feed/<date>.md`（推荐以日期命名）

```yaml
---
date: 2026-02-28
---
内容随意书写。
```

### 多语言内容组织

- 英文文章：`src/content/blog/en/<slug>.md`（URL：`/blog/<slug>`）
- 中文文章：`src/content/blog/zh/<slug>.md`（URL：`/zh/blog/<slug>`）
- 英文 Feed：`src/content/feed/en/<date>.md`
- 中文 Feed：`src/content/feed/zh/<date>.md`
- 无英文版时，`/blog/<slug>` 自动回落显示中文版本
- 语言偏好保存在 `localStorage['lang']`（`'en'` 或 `'zh'`）
- 新增 frontmatter 可选字段：`translationKey`（关联同一文章的不同语言版本）

### Markdown 扩展（自定义 remark 插件）

```markdown
:::tip 标题
:::note 标题
:::caution 标题
:::danger 标题
:::collapse 点击展开
隐藏内容
:::
```

阅读时间和最后修改时间由 `remark-modified-time.mjs` 在构建时自动注入。

### 静态资源

图片放入 `public/images/`，引用路径以 `/images/` 开头。

**懒加载机制**：自定义 rehype 插件在构建时将 `src` 替换为 `data-src`；`BlogPost.astro` 客户端通过 IntersectionObserver 恢复加载。无需手动处理。

## 架构要点

### 站点配置

`src/consts.ts` 是全局配置的单一信息源：站点标题、作者、头像、分页数量、导航链接、社交链接、评论系统（giscus，当前已关闭）、打赏、统计分析。Friends 和 Message 导航项已存在但被注释掉。

### 布局

- `src/layouts/BlogPost.astro` — 文章页（4 列网格：3 列内容 + xl 屏幕 1 列侧边栏含 Profile 和 Toc）；客户端初始化 Fancybox 灯箱和懒加载 observer
- `src/layouts/IndexPage.astro` — 列表/归档/标签/分类页（同网格；侧边栏含 Profile 和 BlogAside）

### 主题

深/浅色模式通过 `<html>` 上的 `[data-theme="dark|light"]` 切换，逻辑在 `public/toggle-theme.js`。所有颜色为 CSS 自定义属性（`--color-text`、`--color-fill`、`--color-card` 等），通过 `tailwind.config.js` 中的 `withOpacity()` 包装接入 Tailwind。自定义断点：`sm=600px`、`md=720px`、`lg=840px`、`xl=960px`、`2xl=1080px`。

### Astro 集成

- `@astrojs/tailwind` — 样式
- `@astrojs/solid-js` — **仅用于** `src/components/Search.jsx`（客户端搜索）
- `astro-expressive-code` — 语法高亮（GitHub Dark/Light 主题，JetBrains Mono，行号，可折叠代码块）；主题随 `[data-theme]` 切换
- `@astrojs/mdx` — MDX 支持
- `@astrojs/sitemap` — 排除 `/friends/` 和 `/message/`

## 分支与提交规范

```bash
# 源码提交到 sources 分支
git add .
git commit -m "feat: add new post"
git push origin sources

# 部署（自动处理 master 分支，不要手动操作 master）
bun run upload
```

Commit message 前缀：
- `feat:` — 新增文章或功能
- `fix:` — 修复问题
- `chore:` — 配置或依赖调整
- `style:` — 样式调整
