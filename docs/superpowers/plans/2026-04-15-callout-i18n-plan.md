# Plan: Callout Default Titles i18n

**Date:** 2026-04-15
**Status:** Pending

## Overview

`remark-asides.js` 和 `remark-collapse.js` 使用模块级单例 `t`（绑定到 `config.lang`），导致英文文章里的 callout 默认标题显示中文（如"注意"而非"Note"）。

## Root Cause

**`remark-asides.js` 第 4 行**：
```js
import {t} from '../i18n/utils.ts'
```
`t` 在模块初始化时固化，所有文件共用同一套翻译。

**`remark-collapse.js` 第 18 行**：
```js
label: t('remark.open') || "Open",
```
在 `remarkCollapse({})` 调用时就已固化，更严重。

## Approach

在两个插件的 transformer 中，通过 `(tree, file)` 接收 `file` 参数，从 `file.history[0]` 提取语言，动态调用 `useTranslations`。

语言提取逻辑：
```js
function getLangFromPath(filePath) {
  return filePath.includes('/zh/') ? 'zh' : 'en'
}
```

### remark-asides.js

1. 移除模块级 `import {t}`
2. 加 `import {useTranslations} from '../i18n/utils.ts'`
3. 加 `getLangFromPath` helper
4. transformer 改为 `(tree, file)`
5. `options.label` 默认为 `null`（不再用固化版本）
6. transformer 内用 `localLabel(v)` 动态获取标题

### remark-collapse.js

1. 移除模块级 `import {t}`
2. 加 `import {useTranslations} from '../i18n/utils.ts'`
3. 加 `getLangFromPath` helper
4. `options.label` 改为 `null`（不在工厂阶段固化）
5. transformer 改为 `(tree, file)`
6. 在 transformer 内动态获取标题

## Todo Checklist

- [ ] 修改 `src/remarkPlugin/remark-asides.js`
- [ ] 修改 `src/remarkPlugin/remark-collapse.js`
- [ ] 验证英文文章 callout 显示 "Note"/"Tip" 等
- [ ] 验证中文文章 callout 显示 "注意"/"提示" 等
- [ ] 验证自定义标题不受影响
