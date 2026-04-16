# Sitemap 页面问题修复实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 sitemap 中所有页面的问题：修复 tags 404、callout i18n、Mermaid/MathJax 渲染、代码拼写错误等问题

**Architecture:** 独立任务，每个问题单独修复，完成后验证。Callout i18n 需要重新调查根因。

**Tech Stack:** Astro, Bun, remark plugins, expressive-code, rehype

---

## Status Summary

| Task | Status | Notes |
|------|--------|-------|
| Task 1: tags 页面 404 | ✅ Done | 创建了 tags/index.astro |
| Task 2: Mermaid 未渲染 | ✅ Done | 移除 mermaid script 的 async 属性 |
| Task 3: MathJax 未渲染 | ✅ Done | 移除 mathjax script 的 async 属性 |
| Task 4: 代码块换行丢失 | ❌ Removed | 本地验证无问题 |
| Task 5: 表格渲染损坏 | ❌ Removed | 本地验证无问题 |
| Task 6: 代码拼写错误 | ✅ Done | substract → subtract |
| Task 7: Callout i18n | ⏸️ Paused | remark plugin 对 content collections 只调用一次，需更多调查 |

---

## Task 1: 修复 tags 页面 404 ✅

**文件:**
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/zh/tags/index.astro`

**状态:** ✅ Done
- 提交: `156566c feat: add tags index pages for /tags and /zh/tags routes`
- 使用直接 await 模式而非 getStaticPaths

---

## Task 2: 修复 Mermaid 图表未渲染 ✅

**文件:**
- Modify: `src/components/BaseHead.astro`

**状态:** ✅ Done
- 修复: 移除 mermaid script 的 `async` 属性
- 提交: `76ad318 fix: remove async attribute from mermaid script`

---

## Task 3: 修复 MathJax 公式未渲染 ✅

**文件:**
- Modify: `src/components/BaseHead.astro`

**状态:** ✅ Done
- 修复: 移除 mathjax script 的 `async` 属性
- 提交: `168b03c feat: sitemap page fixes - part 1`

---

## Task 4: 修复代码块换行丢失 ❌ Removed

**状态:** ❌ Removed - 本地验证无问题

---

## Task 5: 修复表格渲染损坏 ❌ Removed

**状态:** ❌ Removed - 本地验证无问题

---

## Task 6: 修复代码拼写错误 ✅

**文件:**
- Modify: `src/content/blog/en/use-dayjs-instead-date.md`

**状态:** ✅ Done
- 修复: `substract` → `subtract` (行 128, 133, 157)

---

## Task 7: 重新调查并修复 Callout i18n ⏸️

**文件:**
- Modify: `src/remarkPlugin/remark-asides.js`
- Modify: `src/remarkPlugin/remark-collapse.js`

**状态:** ⏸️ Paused

**调试发现:**
- `remarkAsides` 工厂函数只被调用一次
- transformer 也只被调用一次（针对 `about.md`）
- 博客文章有 remark-aside HTML 输出，但标题语言错误
- Astro content collections 可能缓存了 remark 处理结果

**根因推测:** Astro 对 content collections 的 remark 处理与页面文件走不同 pipeline

**下一步:** 需要调查 Astro 内部 content collection 的 remark pipeline 机制

---

## 完成后验证

- [x] 运行 `bun run build` 确保无构建错误
- [x] 部署后访问 https://suyi.xyz/tags 确认 404 已修复
- [ ] 检查各页面 Mermaid、MathJax 是否正确渲染（待部署验证）
- [ ] 检查英文/中文 callout 标题是否正确（Task 7 待完成）

---

## Git Commits

- `156566c` feat: add tags index pages for /tags and /zh/tags routes
- `76ad318` fix: remove async attribute from mermaid script
- `168b03c` feat: sitemap page fixes - part 1 (mathjax, table fix, remark plugins)
