# Design: i18n Bug Fixes Round 2 — Date Formats, Sitemap, Callout Titles

**Date:** 2026-04-14
**Status:** Completed (Bug 1a, 1b, 2); Pending (Bug 3)

## Overview

Four independent bugs/improvements:

1. ✅ **Bug 1a — `lastModified` 格式**：remark 插件存 ISO string，`PostTitle` 用 `formatDate(lastModified, lang)` 渲染
2. ✅ **Bug 1b — `BlogFooter` 日期格式**：`BlogFooter` 接收 `lang` prop，`formatDate(date, lang)` 渲染
3. ✅ **Bug 2 — sitemap `<link>` 不一致**：已随 sitemap 重构解决（`/sitemap-index.xml` → `/sitemap.xml`）
4. ❌ **Bug 3 — callout 默认标题不随语言变化**：见 `docs/superpowers/plans/2026-04-15-callout-i18n-plan.md`

---

## Bug 1a：lastModified 日期格式

### Root Cause

`src/remarkPlugin/remark-modified-time.mjs` 第 21 行：

```js
file.data.astro.frontmatter.lastModified = formatDate(result.mtime)
```

`formatDate` 在此时不知道文件语言，`lang` 默认 `'en'`，`lastModified` 被固化为英文字符串（如 `"14th April 2026"`）。

`PostTitle.astro` 第 34 行直接插值 `{lastModified}`，不再经过 `formatDate`，中文 `lang` prop 无法影响它。

### Fix（方案 A）

**`remark-modified-time.mjs`**：存原始时间（ISO string），不预格式化：

```js
// 改动：存 ISO string，不调用 formatDate
file.data.astro.frontmatter.lastModified = result.mtime.toISOString()
// 同时移除 formatDate 的 import（此文件不再需要）
```

**`PostTitle.astro`**：用 `formatDate(lastModified, lang)` 渲染：

```astro
{t('post.lastUpdated')}：{formatDate(lastModified, lang as Lang)}
```

`lang` prop 已在 Task C 中加入，直接可用。

---

## Bug 1b：BlogFooter 日期格式

### Root Cause

`BlogFooter.astro` 第 3 行：`const {title, date, url} = Astro.props` — 无 `lang`。

第 4 行：`import {t} from '../i18n/utils'` — 静态 `t`，不感知运行时语言。

第 18 行：`formatDate(date)` — 无 `lang`，默认 `'en'`。

调用方：
- `src/pages/blog/[...slug].astro` 第 88 行：`<BlogFooter ... />` — 无 `lang`
- `src/pages/zh/blog/[...slug].astro` 第 79 行：同上

### Fix

**`BlogFooter.astro`**：

1. 加 `lang` prop：`const {title, date, url, lang = 'en'} = Astro.props`
2. 将 `import {t}` 改为 `import {useTranslations, type Lang} from '../i18n/utils'`，并在 frontmatter 中 `const t = useTranslations(lang as Lang)`
3. 第 18 行改为 `formatDate(date, lang as Lang)`

**`src/pages/blog/[...slug].astro` 第 88 行**：加 `lang="en"`

**`src/pages/zh/blog/[...slug].astro` 第 79 行**：加 `lang="zh"`

---

## Bug 2：sitemap `<link>` 不一致

### Root Cause

`BaseHead.astro` 第 48 行：`<link rel="sitemap" href="/sitemap-0.xml"/>`

`@astrojs/sitemap` 生成两个文件：`/sitemap-index.xml`（索引）和 `/sitemap-0.xml`（分片）。`<link rel="sitemap">` 应指向索引文件，爬虫会从索引发现所有分片。

`Footer.astro` 链接 `/sitemap-index.xml` 是正确的，`BaseHead` 的不一致属于小问题，顺便修正。

### Fix

**`BaseHead.astro` 第 48 行**：

```astro
<link rel="sitemap" href="/sitemap-index.xml"/>
```

---

## Bug 3：callout 默认标题不随语言变化 ❌ Pending

### Root Cause

**`remark-asides.js` 第 4 行**：`import {t} from '../i18n/utils.ts'`

`t` 是模块初始化时固定的单例（绑定到 `config.lang`），所有文章共用同一套翻译，不区分文件语言。

**`remark-collapse.js` 第 18 行**：`label: t('remark.open') || "Open",` — 在模块加载时就固化，更严重。

### Status

**未实现**。详细方案见 `docs/superpowers/plans/2026-04-15-callout-i18n-plan.md`。

---

## Architecture Notes

- Bug 1a、1b、2 已实现，Bug 3 待实现
- Bug 3 fix 后，带自定义标题的 callout（如 `:::note 自定义标题`）不受影响——自定义标题在 `remove(node, ...)` 中被提取并覆盖 `title`，逻辑不变

---

## Files Changed Summary

| File | Change |
|---|---|
| `src/remarkPlugin/remark-modified-time.mjs` | ✅ 存 ISO string，移除 `formatDate` import |
| `src/components/PostTitle.astro` | ✅ `lastModified` 改用 `formatDate(lastModified, lang as Lang)` |
| `src/components/BlogFooter.astro` | ✅ 加 `lang` prop，`useTranslations(lang)`，`formatDate(date, lang as Lang)` |
| `src/pages/blog/[...slug].astro` | ✅ 传 `lang="en"` 给 `<BlogFooter>` |
| `src/pages/zh/blog/[...slug].astro` | ✅ 传 `lang="zh"` 给 `<BlogFooter>` |
| `src/components/BaseHead.astro` | ✅ `sitemap` link 改为 `/sitemap.xml` |
| `src/remarkPlugin/remark-asides.js` | ❌ 未修改（见 callout-i18n-plan） |
| `src/remarkPlugin/remark-collapse.js` | ❌ 未修改（见 callout-i18n-plan） |
