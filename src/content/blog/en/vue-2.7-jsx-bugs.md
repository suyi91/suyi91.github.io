---
draft: false
date: 2024-10-21
title: Buggy Vue 2.7 JSX
description: Vue 2.7 JSX just keeps throwing bugs...
mermaid: true
mathjax: true
tags: ['vue']
category: ['frontend']
translationKey: vue-2.7-jsx-bugs
audio: true
---

While maintaining a legacy project I recently introduced Vue 2.7 and the official JSX plugin `jsx-vue2`. Things were going fine until I started hitting one pitfall after another...

## 1. vModel throws an error with the official Vue 2 JSX plugin

> vModel: __currentInstance.$set is not a function

Related issues:

- https://github.com/vuejs/jsx-vue2/issues/287
- https://github.com/vuejs/composition-api/issues/699

Workaround:

Drop the `vModel` shorthand and fall back to `value` + `onInput` manually.

## 2. Cannot get a component ref

Related issue:

- https://github.com/vuejs/jsx-vue2/issues/288

Workaround:

Assign the ref manually using a function:

```jsx
const customRef = ref()

<SwitchSettingCommonModal ref={el => { customRef.value = el } />
```

----
Looking forward to the next pitfall 🥹.

----
Since Vue 2 has reached EOL and is no longer maintained officially, I would not recommend continuing to use Vue 2 or its JSX plugin. If you still have active development needs, migrate to Vue 3 — it is still maintained and bugs will be fixed.
