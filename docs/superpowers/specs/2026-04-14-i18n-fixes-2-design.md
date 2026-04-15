# Design: i18n Bug Fixes Round 2 — Date Formats, Sitemap, Callout Titles

**Date:** 2026-04-14
**Status:** Approved

## Overview

Three independent bugs/improvements:

1. **Bug 1a — `lastModified` 格式**：remark 插件在构建时把 `lastModified` 预格式化为英文字符串，`PostTitle` 直接插值，中文 lang 永远无效
2. **Bug 1b — `BlogFooter` 日期格式**：`BlogFooter` 不接收 `lang` prop，`formatDate(date)` 永远用英文格式
3. **Bug 2 — sitemap `<link>` 不一致**：`BaseHead.astro` 的 `<link rel="sitemap">` 指向 `/sitemap-0.xml`（分片文件），与 Footer 的 `/sitemap-index.xml` 不一致；Footer 链接本身在生产中正常，开发模式 404 属于 dev server 限制，不修
4. **Bug 3 — callout 默认标题不随语言变化**：`remark-asides.js` 和 `remark-collapse.js` 使用模块级单例 `t`（固定为 `config.lang`），不感知当前被处理文件的语言

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

## Bug 3：callout 默认标题不随语言变化

### Root Cause

**`remark-asides.js` 第 4 行**：`import {t} from '../i18n/utils.ts'`

`t` 是模块初始化时固定的单例（绑定到 `config.lang`），所有文章共用同一套翻译，不区分文件语言。

`defaultLabel(v)` 函数（第 7–20 行）调用这个单例 `t`，而 transformer（第 105 行）签名为 `(tree)` ——没有接收 `file` 参数，无法读取文件路径。

**`remark-collapse.js` 第 18 行**：

```js
label: t('remark.open') || "Open",
```

标题在 `remarkCollapse({})` 被调用时（模块加载阶段）就已固化，更严重。

### Fix

在两个插件的 transformer 中，通过 `(tree, file)` 接收 `file` 参数，从 `file.history[0]`（文件绝对路径）提取语言，动态调用 `useTranslations`。

语言提取逻辑：

```js
import {useTranslations} from '../i18n/utils.ts'

function getLangFromPath(filePath) {
  // e.g. /Users/sean/my-blog/src/content/blog/zh/xxx.md → 'zh'
  //      /Users/sean/my-blog/src/content/blog/en/xxx.md → 'en'
  //      /Users/sean/my-blog/src/content/feed/zh/xxx.md → 'zh'
  return filePath.includes('/zh/') ? 'zh' : 'en'
}
```

**`remark-asides.js`**：

1. 移除模块级 `import {t}`
2. 加 `import {useTranslations} from '../i18n/utils.ts'`
3. 加 `getLangFromPath` helper
4. transformer 改为 `(tree, file)`
5. `defaultLabel` 改为接收 `lang` 参数（或直接在调用处内联）
6. `let title = options.label?.(variant)` 改为在 transformer 内动态解析：

```js
const transformer = (tree, file) => {
  const lang = getLangFromPath(file.history[0] ?? '')
  const t = useTranslations(lang)
  // defaultLabel 内联：
  function localLabel(v) {
    switch (v) {
      case "note":    return t('aside.note') || 'Note'
      case "tip":     return t('aside.tip') || 'Tip'
      case "caution": return t('aside.caution') || 'Caution'
      case "danger":  return t('aside.danger') || 'Danger'
      default:        return ""
    }
  }
  visit(tree, (node, index, parent) => {
    ...
    let title = options.label ? options.label(variant) : localLabel(variant)
    // 如果 options.label 被外部传入则沿用；否则用 localLabel
    ...
  })
}
```

实际上 `options.label` 在 `astro.config.mjs` 调用时是 `defaultLabel`（模块级旧函数），为了彻底修复，改为让 `options.label` 默认为 `null`，transformer 内部用 `localLabel`：

```js
options = {
  label: null,  // 不再默认 defaultLabel（旧的单例版本）
  ...options,
}
...
let title = options.label ? options.label(variant) : localLabel(variant)
```

**`remark-collapse.js`**：

1. 移除模块级 `import {t}`
2. 加 `import {useTranslations} from '../i18n/utils.ts'`
3. 加 `getLangFromPath` helper
4. `options.label` 改为 `null`（不再在工厂阶段固化）
5. transformer 改为 `(tree, file)`
6. 在 transformer 内动态获取标题：

```js
options = {
  label: null,
  ...options,
}

const transformer = (tree, file) => {
  const lang = getLangFromPath(file.history[0] ?? '')
  const t = useTranslations(lang)
  visit(tree, (node, index, parent) => {
    ...
    let title = options.label ?? t('remark.open') ?? "Open"
    ...
  })
}
```

---

## Architecture Notes

- 4 个独立 fix，可任意顺序实现
- 验证：`bun run build` 成功，0 错误
- Bug 3 fix 后，带自定义标题的 callout（如 `:::note 自定义标题`）不受影响——自定义标题在 `remove(node, ...)` 中被提取并覆盖 `title`，逻辑不变

---

## Files Changed Summary

| File | Change |
|---|---|
| `src/remarkPlugin/remark-modified-time.mjs` | 存 ISO string，移除 `formatDate` import |
| `src/components/PostTitle.astro` | `lastModified` 改用 `formatDate(lastModified, lang as Lang)` |
| `src/components/BlogFooter.astro` | 加 `lang` prop，`useTranslations(lang)`，`formatDate(date, lang as Lang)` |
| `src/pages/blog/[...slug].astro` | 传 `lang="en"` 给 `<BlogFooter>` |
| `src/pages/zh/blog/[...slug].astro` | 传 `lang="zh"` 给 `<BlogFooter>` |
| `src/components/BaseHead.astro` | `sitemap` link 改为 `/sitemap-index.xml` |
| `src/remarkPlugin/remark-asides.js` | 移除模块级 `t`，transformer 接收 `(tree, file)`，动态 `useTranslations` |
| `src/remarkPlugin/remark-collapse.js` | 同上 |
