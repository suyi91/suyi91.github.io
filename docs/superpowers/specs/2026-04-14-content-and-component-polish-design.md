# Design: Content & Component Polish

**Date:** 2026-04-14  
**Status:** Approved

## Overview

Three independent improvements to the i18n blog:

1. **English article translations** — Translate all 5 zh/ posts into English, place in en/, link with `translationKey`
2. **lang prop refactor** — Pass `lang` explicitly to Header/Footer instead of URL detection; fix mobile menu links
3. **zh/ missing pages** — Create `/zh/message` and `/zh/friends` pages

---

## Task A: English Article Translations

### Articles to translate (zh/ → en/)

| zh/ slug | English title | tags (en) | category (en) |
|---|---|---|---|
| `fix-node-sass-install-error` | Fixing node-sass Installation Errors | css, sass, node-sass | frontend |
| `github-pages-deploy-astro` | Quick Deploy Astro to GitHub Pages | astro | frontend |
| `new-features-test` | New Features Test | (empty) | (empty) |
| `use-dayjs-instead-date` | Using Day.js for Date Operations | (empty) | frontend |
| `vue-2.7-jsx-bugs` | Buggy Vue 2.7 JSX | vue | frontend |

### frontmatter rules

Each `en/` file mirrors the `zh/` counterpart with:
- `title`: English translation
- `description`: English translation
- `tags`: English equivalents (css/sass/node-sass/astro/vue stay as-is; Chinese tags translated)
- `category`: English equivalent (前端 → frontend)
- `date`, `sticky`, `toc`, `donate`, `comment`, `mathjax`, `mermaid`, `draft`: unchanged
- `translationKey`: same slug without lang prefix (e.g. `fix-node-sass-install-error`)

Also add `translationKey` to the corresponding `zh/` files.

### Content rules

- Code blocks: unchanged
- Chinese text: translated to natural English
- Links: preserved as-is
- Custom remark syntax (`:::tip`, `:::note`, etc.): preserved

---

## Task B: lang Prop Refactor

### Header.astro

**Current:** `const lang = getLangFromUrl(Astro.url)` — URL detection only  
**After:** Accept `lang?: Lang` prop; fall back to URL detection if not provided

```ts
interface Props { lang?: Lang }
const { lang: langProp } = Astro.props
const lang = langProp ?? getLangFromUrl(Astro.url)
```

Mobile menu category/tag links currently hardcode `/category/xxx` and `/tags/xxx`. These must use a `prefix` computed from `lang`:

```ts
const prefix = lang === 'zh' ? '/zh' : ''
// links become: `${prefix}/category/${cat}` and `${prefix}/tags/${tag}`
```

Also the site logo link (`href="/"`) should become `href={lang === 'zh' ? '/zh' : '/'}`.

### Footer.astro

**Current:** `const lang = getLangFromUrl(Astro.url)` — URL detection only  
**After:** Accept `lang?: Lang` prop; fall back to URL detection if not provided

Same pattern as Header. The sitemap link at `/sitemap-index.xml` does not need a lang prefix (it's universal).

### Callers that pass lang

All layouts already pass `lang` to `<IndexPage>` and `<BlogPost>`. These layouts include Header and Footer. The layouts should forward `lang` to Header and Footer components.

Layouts to update:
- `src/layouts/IndexPage.astro` — pass `lang` to `<Header lang={lang}>` and `<Footer lang={lang}>`
- `src/layouts/BlogPost.astro` — same

---

## Task C: zh/ Missing Pages

### `/zh/message`

File: `src/pages/zh/message/index.astro`  
Content: mirrors `/message/index.astro`, uses `lang="zh"` in layout, imports `useTranslations` with `'zh'` for the welcome/tips text.

### `/zh/friends`

File: `src/pages/zh/friends/index.astro`  
Content: mirrors `/friends/index.astro`, uses `lang="zh"` in layout.

### Navigation

`consts.ts` message/friends entries remain commented out (user decision). No nav changes.

---

## Architecture Notes

- No new utilities needed
- No schema changes needed (translationKey already exists in config.ts)
- Tasks A, B, C are independent and can be parallelized
- Verification: `bun run build` must succeed with 0 errors and generate en/ blog pages

---

## Files Changed

**Task A (new files):**
- `src/content/blog/en/fix-node-sass-install-error.md`
- `src/content/blog/en/github-pages-deploy-astro.md`
- `src/content/blog/en/new-features-test.md`
- `src/content/blog/en/use-dayjs-instead-date.md`
- `src/content/blog/en/vue-2.7-jsx-bugs.md`

**Task A (modified):**
- `src/content/blog/zh/*.md` — add `translationKey` to each

**Task B (modified):**
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/layouts/IndexPage.astro`
- `src/layouts/BlogPost.astro`

**Task C (new files):**
- `src/pages/zh/message/index.astro`
- `src/pages/zh/friends/index.astro`
