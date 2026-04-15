# Plan: Sitemap i18n — Add hreflang for Bilingual Pages

**Date:** 2026-04-15
**Status:** Completed

## Overview

`@astrojs/sitemap` 生成的 sitemap 未区分语言版本，所有页面混在一起，没有 `xhtml:link` hreflang 告知搜索引擎页面对应关系。Google 可能把中英文版本当作重复内容，降权处理。

**目标**：让 sitemap 正确表达中/英文页面的对应关系。

---

## Background: Multilingual SEO

**核心要求**：Google 推荐在 sitemap 的每个 URL 下用 `xhtml:link rel="alternate"` hreflang 标签标注所有语言版本。

**文件拆分 vs 不拆分**：两者都是合规的，只要每个文件内的每个 URL 都包含 `xhtml:link`：
- **单文件**：`sitemap.xml` 包含所有 URL，每个 URL 下带 `xhtml:link`
- **分文件**：`sitemap-en.xml` + `sitemap-zh.xml` + `sitemap-index.xml`，各自内部的 URL 仍需 `xhtml:link`

对于当前博客（44 页，5 篇文章），**单文件更简单**。

**规则**：
- 每个语言版本都必须列出所有版本（包括自己）
- `hreflang` 值必须与页面 `<link rel="alternate" hreflang="...">` 一致
- 所有版本必须返回 200 状态码

**`hreflang` 值**（与 `BaseHead.astro` 保持一致）：
- 英文：`hreflang="en"`
- 中文：`hreflang="zh-CN"`

---

## Current State

- `astro.config.mjs` 使用 `@astrojs/sitemap`，默认生成 `sitemap-index.xml` + `sitemap-0.xml`（无 hreflang）
- `rss.xml.js` 未区分语言，中文内容不在 feed 中
- 内容结构：英文 `/blog/<slug>`，中文 `/zh/blog/<slug>`
- 现有 `translationKey` frontmatter 用于关联不同语言版本的文章

---

## Approach: Single File + Custom Generation

放弃 `@astrojs/sitemap`，手动创建 `src/pages/sitemap.xml.js`，输出单文件 sitemap，每个 URL 下带 `xhtml:link`。

### 语言配对逻辑

**优先使用 `translationKey`**：显式关联，最可靠。

**Fallback**：如果某篇中文文章没有 `translationKey`（fallback 到英文），则根据 slug 路径推断——`/blog/<slug>` 与 `/zh/blog/<slug>` 视为一对。

### 生成逻辑

1. 遍历所有 blog 条目
2. 英文条目 → URL `/blog/<slug>`，找对应的中文版（`/zh/blog/<slug>`）
3. 中文条目 → URL `/zh/blog/<slug>`，找对应的英文版（`/blog/<slug>`）
4. 每个 URL 生成 `xhtml:link` 指向所有语言版本

### RSS 处理

将现有的 `/rss.xml` 拆分为两个：
- `/rss.xml` — 只包含英文 blog 文章
- `/zh/rss.xml` — 只包含中文 blog 文章

实现方式：
1. `src/pages/rss.xml.js` 保持英文版（filter `lang !== 'zh'`）
2. 新建 `src/pages/zh/rss.xml.js` 作为中文版（filter `lang === 'zh'`）

---

## Implementation Steps

1. **删除 `@astrojs/sitemap` integration**（`astro.config.mjs`）
2. **创建 `src/pages/sitemap.xml.js`**：
   - 引入 `getCollection` 获取所有 blog 条目
   - 构建 language map（`translationKey` → en/zh 条目）
   - 遍历所有条目，每个生成一个 `<url>` 块
   - 每个 URL 下输出两个 `xhtml:link`（en + zh）
   - 输出 `urlset` 根节点，带 `xmlns:xhtml`
3. **修改 `src/pages/rss.xml.js`**：filter 只保留英文 blog
4. **创建 `src/pages/zh/rss.xml.js`**：中文版 RSS
5. **验证**：构建后检查 `dist/sitemap.xml` 和两个 RSS 文件

---

## Output Format

### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://suyi.xyz/blog/fix-node-sass-install-error</loc>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://suyi.xyz/zh/blog/fix-node-sass-install-error" />
    <xhtml:link rel="alternate" hreflang="en" href="https://suyi.xyz/blog/fix-node-sass-install-error" />
  </url>
  <url>
    <loc>https://suyi.xyz/zh/blog/fix-node-sass-install-error</loc>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://suyi.xyz/zh/blog/fix-node-sass-install-error" />
    <xhtml:link rel="alternate" hreflang="en" href="https://suyi.xyz/blog/fix-node-sass-install-error" />
  </url>
  ...
  <!-- 非文章页面不需要 hreflang -->
  <url>
    <loc>https://suyi.xyz/about</loc>
  </url>
  <url>
    <loc>https://suyi.xyz/zh/about</loc>
  </url>
</urlset>
```

### rss.xml（英文）
```xml
<!-- 仅英文 blog 条目 -->
```

### zh/rss.xml（中文）
```xml
<!-- 仅中文 blog 条目 -->
```

---

## Files to Change

| File | Change |
|---|---|
| `astro.config.mjs` | 移除 `@astrojs/sitemap` integration |
| `src/pages/sitemap.xml.js` | 新建，手动生成 sitemap |
| `src/pages/rss.xml.js` | 修改，filter 只保留英文 blog |
| `src/pages/zh/rss.xml.js` | 新建，中文版 RSS |
| `src/components/BaseHead.astro` | sitemap link 改为 `/sitemap.xml` |

---

## Todo Checklist

- [x] 移除 `@astrojs/sitemap` integration
- [x] 创建 `src/pages/sitemap.xml.js`
- [x] 修改 `src/pages/rss.xml.js`（英文 filter）
- [x] 创建 `src/pages/zh/rss.xml.js`（中文 RSS）
- [x] 确认 `BaseHead.astro` sitemap link
- [x] `bun run build` 验证输出

---

## References

- [Google: Tell Google about localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [hreflang annotation in sitemaps](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap-approach)
