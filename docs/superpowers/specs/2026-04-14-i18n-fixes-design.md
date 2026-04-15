# Design: i18n Bug Fixes — Active State, Categories, Recent Posts, Date Format

**Date:** 2026-04-14
**Status:** Approved

## Overview

Four independent bugs/improvements to the i18n blog:

1. **HeaderLink active state** — wrong active detection on `/zh/*` routes (all links light up)
2. **Category slug unification** — `前端` and `frontend` are the same concept; unify to `frontend` slug with i18n display
3. **BlogAside lang-awareness** — recent posts, categories, and tags show mixed-language content
4. **Date format per language** — `formatDate` uses a static global `t()`, ignoring the actual page language

---

## Bug 1: HeaderLink Active State

### Root Cause

`src/components/HeaderLink.astro` compares `href.split('/')[1]` vs `pathname.split('/')[1]`. For any `/zh/*` URL, `pathname.split('/')[1]` is `'zh'`, and every `href` (e.g. `/zh/blog/1`, `/zh/feed/1`) also has `'zh'` at position 1 → all nav items appear active simultaneously.

### Fix

Extract the **first non-lang path segment** from both href and pathname, then compare:

```ts
function getSection(path: string): string {
  const parts = path.split('/').filter(Boolean)
  const first = parts[0]
  return (first === 'zh' || first === 'en') ? (parts[1] ?? '') : first
}
const isActive = getSection(href) === getSection(pathname)
```

Examples:
- `/zh/blog/1` → `blog`
- `/blog/1` → `blog`
- `/zh/feed/1` → `feed`
- `/search` → `search`
- `/zh/search` → `search`

---

## Bug 2: Category Slug Unification

### Root Cause

`zh/` articles use `category: ['前端']` and `en/` articles use `category: ['frontend']`. Both appear in `BlogAside` and `Header` sidebar when all articles are loaded, producing two separate category entries for the same concept.

### Fix

**Unify slugs to English:** change all `zh/` articles to `category: ['frontend']`. Display the translated name via i18n at render time.

**i18n translation map** — add to `zhCn.ts`:
```ts
'category.frontend': '前端',
```

No new entries needed in `en.ts` (the slug itself is already English).

**Display logic:** anywhere a category name is rendered (BlogAside, PostViewTitle, PostTitle, Header sidebar), use `t('category.' + categoryName)` with fallback to the raw slug if no translation key exists:

```ts
// helper (inline, no new file needed)
function displayCategory(categoryName: string, t: (key: string) => string): string {
  const translated = t('category.' + categoryName)
  // t() falls back to the key itself if missing, so check for that
  return translated !== ('category.' + categoryName) ? translated : categoryName
}
```

**Routes:** `/zh/category/[category].astro` already uses `getCollectionByName('blog', 'zh')` which returns entries with slug `zh/*`. After this change, the category param will be `frontend` (same as the English route), giving symmetric URLs:
- `/category/frontend` — English
- `/zh/category/frontend` — Chinese

**Files to modify:**
- `src/content/blog/zh/fix-node-sass-install-error.md` — `category: ['frontend']`
- `src/content/blog/zh/github-pages-deploy-astro.md` — `category: ['frontend']`
- `src/content/blog/zh/use-dayjs-instead-date.md` — `category: ['frontend']`
- `src/content/blog/zh/vue-2.7-jsx-bugs.md` — `category: ['frontend']`
- `src/i18n/zhCn.ts` — add `'category.frontend': '前端'`
- `src/components/BlogAside.astro` — use `displayCategory()` helper
- `src/components/PostViewTitle.astro` — use `displayCategory()` helper + lang-aware category links
- `src/components/PostTitle.astro` — same
- `src/components/Header.astro` — sidebar category display (already uses `category` strings from `getCountByCategory`)

---

## Bug 3: BlogAside Lang-Awareness

### Root Cause

`BlogAside.astro` calls `getCollectionByName('blog')` without a `lang` argument, returning all articles (both `en/` and `zh/`). The "Recent Articles" links hardcode `/blog/` prefix. The category/tag links also hardcode `/category/` and `/tags/` without language prefix.

### Fix

Add `lang: Lang` prop to `BlogAside`. Propagate from `IndexPage.astro`.

```astro
// BlogAside.astro
interface Props { lang?: Lang }
const { lang = 'en' } = Astro.props
const prefix = lang === 'zh' ? '/zh' : ''
const t = useTranslations(lang)

const blogs = await getCollectionByName('blog', lang)  // lang-filtered
```

Link fixes:
- Category links: `href={prefix + "/category/" + category}`
- Tag links: `href={prefix + "/tags/" + tag}`
- Recent article links: `href={prefix + "/blog/" + post.slug.replace(/^(en|zh)\//, '')}`

Caller: `IndexPage.astro` line 37:
```astro
<BlogAside lang={lang}/>
```

---

## Bug 4: Date Format Per Language

### Root Cause

`formatDate.ts` uses the module-level singleton `t` (bound to `config.lang` at import time), not the actual page language. `zhCn.ts` also has no `'post.dateFormat'` key, so it falls back to the English `'Do MMMM YYYY'` format for all pages.

### Fix

**`zhCn.ts`** — add:
```ts
'post.dateFormat': 'YYYY/MM/DD',
```

**`formatDate.ts`** — add `lang` parameter:
```ts
import { useTranslations, type Lang } from '../i18n/utils'

export function formatDate(date: Date | string | undefined, lang: Lang = 'en', dateType = 'post.dateFormat'): string {
  if (!date) return ''
  const t = useTranslations(lang)
  const dateFormat = t(dateType) || 'YYYY-MM-DD'
  return dayjs(date).utc().format(dateFormat)
}
```

The old zero-arg signature `formatDate(date)` becomes `formatDate(date, 'en')` — callers that don't pass `lang` keep the same behavior.

**`PostTitle.astro`** — add `lang: Lang` prop, pass to `formatDate`:
```astro
const { ..., lang = 'en' } = Astro.props
// in template:
{formatDate(date, lang)}
```

**`PostViewTitle.astro`** — same.

**Callers that must pass `lang`:**

| Component | Called from | How lang arrives |
|---|---|---|
| `PostTitle` | `src/pages/blog/[...slug].astro` line 54 | `lang="en"` already on `<BlogPost>` — pass `lang="en"` to `<PostTitle>` |
| `PostTitle` | `src/pages/zh/blog/[...slug].astro` | `lang="zh"` — pass `lang="zh"` to `<PostTitle>` |
| `PostViewTitle` | `PostView.astro` | `lang` prop already present on `PostView` — pass to `PostViewTitle` |

`PostView.astro` already receives `lang` prop (line 4) and passes it to `PostViewTitle` via `{...data}` spread — **wait, no**: `{...data}` spreads `blog.data` (frontmatter), not component props. `lang` must be added explicitly: `<PostViewTitle {...data} lang={lang} slug={...} />`.

---

## Architecture Notes

- No new files created
- All four fixes are independent and can be implemented in any order
- Verification: `bun run build` must succeed with 0 errors
- After category slug change, the URL `/zh/category/前端` no longer exists; it becomes `/zh/category/frontend`

---

## Files Changed Summary

| File | Change |
|---|---|
| `src/components/HeaderLink.astro` | Fix `isActive` logic with `getSection()` helper |
| `src/content/blog/zh/*.md` (4 files) | `category: ['前端']` → `['frontend']` |
| `src/i18n/zhCn.ts` | Add `'category.frontend': '前端'` |
| `src/components/BlogAside.astro` | Accept `lang` prop, filter by lang, fix all links, use `displayCategory()` |
| `src/components/PostViewTitle.astro` | Accept `lang` prop, pass to `formatDate`, use `displayCategory()`, fix category/tag links |
| `src/components/PostTitle.astro` | Accept `lang` prop, pass to `formatDate`, use `displayCategory()`, fix category/tag links |
| `src/components/PostView.astro` | Pass `lang` to `<PostViewTitle>` explicitly |
| `src/components/Header.astro` | Use `displayCategory()` in sidebar category list |
| `src/layouts/IndexPage.astro` | Pass `lang` to `<BlogAside>` |
| `src/utils/formatDate.ts` | Add `lang: Lang` param, use `useTranslations(lang)` |
| `src/i18n/zhCn.ts` | Add `'post.dateFormat': 'YYYY/MM/DD'` |
| `src/pages/blog/[...slug].astro` | Pass `lang="en"` to `<PostTitle>` |
| `src/pages/zh/blog/[...slug].astro` | Pass `lang="zh"` to `<PostTitle>` |
