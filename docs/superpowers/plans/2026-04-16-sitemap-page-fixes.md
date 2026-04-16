# Sitemap 页面问题修复实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 sitemap 中所有页面的问题：修复 tags 404、callout i18n、Mermaid/MathJax 渲染、代码块/表格渲染、代码拼写错误等问题

**Architecture:** 独立任务，每个问题单独修复，完成后验证。Callout i18n 需要重新调查根因。

**Tech Stack:** Astro, Bun, remark plugins, expressive-code, rehype

---

## Status Summary

| Task | Status | Notes |
|------|--------|-------|
| Task 1: tags 页面 404 | ❌ TODO | sitemap 包含 `/tags` 但页面不存在 |
| Task 2: Mermaid 未渲染 | ❌ TODO | new-features-test 文章 |
| Task 3: MathJax 未渲染 | ❌ TODO | new-features-test 文章 |
| Task 4: 代码块换行丢失 | ❌ TODO | vue-2.7-jsx-bugs 文章 |
| Task 5: 表格渲染损坏 | ❌ TODO | fix-node-sass-install-error 文章 |
| Task 6: 代码拼写错误 | ❌ TODO | use-dayjs-instead-date: `substract` → `subtract` |
| Task 7: Callout i18n | ❌ TODO | 英文文章显示中文标题 |

---

## Task 1: 修复 tags 页面 404

**文件:**
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/zh/tags/index.astro`

**背景:** sitemap.xml 将 `/tags` 和 `/zh/tags` 作为静态页面列出，但 `src/pages/tags/` 下只有 `[tag].astro`（动态标签页），没有 `index.astro`（标签列表页）。

### Step 1: 创建英文 tags 索引页

- [ ] **Step 1: 创建 `src/pages/tags/index.astro`**

```astro
---
import IndexPage from "src/layouts/IndexPage.astro";
import getUniqueTags from "src/utils/getUniqueTags";
import SearchTitle from "src/components/SearchTitle.astro";
import {getCollectionByName} from "../../utils/getCollectionByName";

export async function getStaticPaths() {
  const posts = await getCollectionByName("blog", 'en');
  const tags = getUniqueTags(posts).filter((tag) => tag);
  return [{params: {}, props: {tags}}];
}

const {tags} = Astro.props;
---
<IndexPage lang="en">
  <SearchTitle label="All Tags"/>
  <div class="flex flex-wrap gap-2">
    {
      tags.map((tag) => (
        <a
          href={`/tags/${tag}`}
          class="px-3 py-1 text-sm rounded-full bg-skin-secondary text-skin-base hover:bg-skin-active hover:text-skin-base"
        >
          {tag}
        </a>
      ))
    }
  </div>
</IndexPage>
```

### Step 2: 创建中文 tags 索引页

- [ ] **Step 2: 创建 `src/pages/zh/tags/index.astro`**

```astro
---
import IndexPage from "src/layouts/IndexPage.astro";
import getUniqueTags from "src/utils/getUniqueTags";
import SearchTitle from "src/components/SearchTitle.astro";
import {getCollectionByName} from "../../../utils/getCollectionByName";

export async function getStaticPaths() {
  const posts = await getCollectionByName("blog", 'zh');
  const tags = getUniqueTags(posts).filter((tag) => tag);
  return [{params: {}, props: {tags}}];
}

const {tags} = Astro.props;
---
<IndexPage lang="zh">
  <SearchTitle label="所有标签"/>
  <div class="flex flex-wrap gap-2">
    {
      tags.map((tag) => (
        <a
          href={`/zh/tags/${tag}`}
          class="px-3 py-1 text-sm rounded-full bg-skin-secondary text-skin-base hover:bg-skin-active hover:text-skin-base"
        >
          {tag}
        </a>
      ))
    }
  </div>
</IndexPage>
```

### Step 3: 验证构建

- [ ] **Step 3: 运行构建验证**

Run: `bun run build`
Expected: 构建成功，dist 包含 `tags/index.html` 和 `zh/tags/index.html`

---

## Task 2: 修复 Mermaid 图表未渲染

**文件:**
- Modify: `src/content/blog/en/new-features-test.md`
- Modify: `astro.config.mjs`

**背景:** Mermaid 图表显示为原始代码而非渲染图表。可能是 expressive-code 未正确处理 mermaid 块。

### Step 1: 检查文章中的 Mermaid 用法

- [ ] **Step 1: 查找 mermaid 语法使用**

Run: `grep -n "mermaid\|:::mermaid" /Users/sean/my-blog/src/content/blog/en/new-features-test.md`

### Step 2: 检查配置

- [ ] **Step 2: 检查 expressive-code 配置**

Expressive-code 默认不处理 Mermaid，需要通过 rehype-mermaid 或类似插件支持。

---

## Task 3: 修复 MathJax 公式未渲染

**文件:**
- Modify: `src/layouts/BlogPost.astro`

**背景:** MathJax 公式显示为 LaTeX 源码。需要确认 MathJax 是否正确加载。

### Step 1: 检查 BlogPost 布局是否加载 MathJax

- [ ] **Step 1: 检查 MathJax 脚本**

Run: `grep -n "mathjax\|MathJax" /Users/sean/my-blog/src/layouts/BlogPost.astro`

### Step 2: 添加 MathJax 脚本

- [ ] **Step 2: 如缺少则添加 MathJax CDN 脚本**

在 `<head>` 中添加：
```html
<script is:inline src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

---

## Task 4: 修复代码块换行丢失

**文件:**
- Modify: `src/content/blog/en/vue-2.7-jsx-bugs.md`

**背景:** vue-2.7-jsx-bugs 文章的代码块显示为 `1const customRef = ref()2` 这样没有换行。

### Step 1: 检查代码块语法

- [ ] **Step 1: 查看 vue-2.7-jsx-bugs.md 中的代码块**

Run: `grep -B2 -A10 "```" /Users/sean/my-blog/src/content/blog/en/vue-2.7-jsx-bugs.md | head -40`

---

## Task 5: 修复表格渲染损坏

**文件:**
- Modify: `src/content/blog/en/fix-node-sass-install-error.md`

**背景:** 表格的 markdown 渲染出错，`2--------|...` 这样的字符显示在表格分隔行中。

### Step 1: 检查表格语法

- [ ] **Step 1: 查看表格 markdown**

Run: `grep -B2 -A10 "^|" /Users/sean/my-blog/src/content/blog/en/fix-node-sass-install-error.md`

---

## Task 6: 修复代码拼写错误

**文件:**
- Modify: `src/content/blog/en/use-dayjs-instead-date.md:42,64`

**背景:** `substract` 应为 `subtract`

### Step 1: 修复拼写错误

- [ ] **Step 1: 修复 `substract` → `subtract`**

Run: `sed -i '' 's/substract/subtract/g' /Users/sean/my-blog/src/content/blog/en/use-dayjs-instead-date.md`

- [ ] **Step 2: 验证修复**

Run: `grep -n "substract\|subtract" /Users/sean/my-blog/src/content/blog/en/use-dayjs-instead-date.md`
Expected: 只有 `subtract`，没有 `substract`

---

## Task 7: 重新调查并修复 Callout i18n

**文件:**
- Modify: `src/remarkPlugin/remark-asides.js`
- Modify: `src/remarkPlugin/remark-collapse.js`

**背景:** 之前尝试修复但回滚了。根因分析显示 `file.history[0]` 在内容集合渲染时可能不包含正确的文件路径。需要进一步调试。

### Step 1: 添加调试代码

- [ ] **Step 1: 在 remark-asides.js 添加调试日志**

在 transformer 函数开头添加：
```js
const transformer = (tree, file) => {
  console.error('[remark-asides] file.path:', file.path);
  console.error('[remark-asides] file.history:', file.history);
  // ...
}
```

### Step 2: 构建并检查调试输出

- [ ] **Step 2: 运行构建查看调试输出**

Run: `bun run build 2>&1 | grep -A2 "remark-asides"`
Expected: 显示 file.path 和 file.history 的值

### Step 3: 根据调试结果修复

- [ ] **Step 3: 根据 `file.history[0]` 或 `file.path` 的值实现动态语言检测**

如果 `file.history[0]` 包含 `/zh/` 路径，则使用 `'zh'`，否则使用 `'en'`。

```js
function getLangFromPath(filePath) {
  return filePath?.includes('/zh/') ? 'zh' : 'en';
}

// 在 transformer 内
const path = file.history?.[0] ?? file.path ?? '';
const lang = getLangFromPath(path);
const {useTranslations} = await import('../i18n/utils.ts');
const t = useTranslations(lang);
```

### Step 4: 验证英文/中文 callout 标题

- [ ] **Step 4: 验证英文文章显示 "Note"/"Tip"，中文文章显示 "注意"/"提示"**

Run: `grep -o 'remark-aside__title">[^<]*' dist/blog/en/new-features-test/index.html | head -5`
Run: `grep -o 'remark-aside__title">[^<]*' dist/blog/zh/new-features-test/index.html | head -5`

---

## 完成后验证

- [ ] 运行 `bun run build` 确保无构建错误
- [ ] 部署后访问 https://suyi.xyz/tags 确认 404 已修复
- [ ] 检查各页面 Mermaid、MathJax、代码块、表格是否正确渲染
- [ ] 检查英文/中文 callout 标题是否正确
