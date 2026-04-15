# Design: Header Navigation & Site Title i18n — 2026-04-15

**Date:** 2026-04-15
**Status:** Completed

## Overview

Header 中的导航项（Blog、Feed、Archive、Search、About）和站点标题（Suyi的小站）硬编码为英文，无法随语言切换。通过 i18n `t()` 函数实现动态翻译。

---

## Change 1: Navigation Items i18n

### Root Cause

`Header.astro` 第 43 行直接渲染 `category.name`（来自 `consts.ts`），未经翻译：
```astro
{category.name}
```

### Fix

**`Header.astro`**：将所有 `category.name` 和 `sub.name` 替换为 `t('nav.' + category.name)`：

| 位置 | 旧 | 新 |
|---|---|---|
| 第 43 行（桌面导航） | `{category.name}` | `{t('nav.' + category.name)}` |
| 第 61 行（移动端导航） | `{category.name}` | `{t('nav.' + category.name)}` |
| 第 73 行（移动端子菜单） | `{sub.name}` | `{t('nav.' + sub.name)}` |

**`zhCn.ts`**：
```ts
'nav.Blog': '博客',
'nav.Feed': '动态',
'nav.Archive': '归档',
'nav.Search': '搜索',
'nav.About': '关于',
```

**`en.ts`**：
```ts
'nav.Blog': 'Blog',
'nav.Feed': 'Feed',
'nav.Archive': 'Archive',
'nav.Search': 'Search',
'nav.About': 'About',
```

---

## Change 2: Site Title i18n

### Root Cause

`Header.astro` 第 37 行硬编码 `{site.title}`，取自 `consts.ts` 的 `'Suyi的小站'`，不随语言切换。

### Fix

**`Header.astro`** 第 37 行：
```astro
<a class="text-2xl p-4" href={lang === 'zh' ? '/zh' : '/'}>{t('site.title')}</a>
```

**`zhCn.ts`**：
```ts
'site.title': 'Sean的小站',
```

**`en.ts`**：
```ts
'site.title': "Sean's Blog",
```

---

## Change 3: Remove Unused Czech (cs) Locale

### Root Cause

`cs.ts` 存在但 `consts.ts` 的 `config.lang` 只支持 `'en'` 和 `'zh-cn'`，从未启用。维护冗余代码。

### Fix

删除 `src/i18n/cs.ts`。

---

## Architecture Notes

- 导航链接前缀（`/zh` vs `/`）由既有的 `prefix = lang === 'zh' ? '/zh' : ''` 处理，本次只改文字，不改链接
- `t('nav.' + category.name)` 如果 key 不存在会 fallback 到原值（`t()` 默认行为）
- `cs.ts` 删除后无任何副作用

---

## Files Changed Summary

| File | Change |
|---|---|
| `src/components/Header.astro` | `site.title` → `t('site.title')`；`category.name` → `t('nav.' + category.name)` |
| `src/i18n/zhCn.ts` | 添加 `site.title`、`nav.Blog/Feed/Archive/Search/About` |
| `src/i18n/en.ts` | 添加 `site.title`、`nav.*` |
| `src/i18n/cs.ts` | **已删除** |
| `AGENTS.md` | 更新 i18n 描述，移除 cs；添加设计决策记录 |
