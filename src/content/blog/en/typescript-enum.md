---
draft: false
date: 2026-05-09
title: TypeScript Enums Explained
description: A deep dive into TypeScript enum types, how they work, and best practices
mermaid: false
mathjax: false
tags: ['TypeScript']
category: ['frontend']
audio: true
---

Let's talk about TypeScript enums — they might look simple at first glance, but there's actually quite a lot going on under the hood.

Specifically, `enum` and `const enum` — a lot of people get confused about the differences between them. Let's clear that up today.

Simply put: **one is a real object that exists at runtime, the other is just an illusion after compilation**.

---

## 1. enum (Regular Enum)

A regular enum compiles down to a real JavaScript object.

Check this out:

```typescript
enum Role {
  Admin = 1,
  User = 2
}
```

After compilation, it looks like this:

```javascript
var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
})(Role || (Role = {}));
```

This IIFE closure does something pretty clever: it not only stores `Role.Admin = 1`, but also creates a reverse mapping `Role[1] = "Admin"`.

So you can do things like:

```typescript
console.log(Role.Admin);   // 1
console.log(Role[1]);      // "Admin" — reverse lookup
```

**Key points:**

- Creates a real object in memory
- Can be iterated over and passed around at runtime
- Supports reverse mapping — look up names by value

---

## 2. const enum (Constant Enum)

Constant enums are the complete opposite — they get "evaporated" during compilation, and all references are replaced with inline values.

```typescript
const enum Color {
  Red = 0,
  Green = 1
}
let myColor = Color.Red;
```

After compilation:

```javascript
let myColor = 0; // Color object? What Color object?
```

**Key points:**

- **Zero runtime code**: no JS object generated
- **No reverse mapping**: the object doesn't exist, so `Color[0]` is nowhere to be found
- **Smaller bundle**: great for size-sensitive projects

:::tip
Want to save bundle size and don't need runtime access? Just use `const enum` without thinking twice.
:::

---

## 3. Which one should you use?

| Feature | enum | const enum |
| --- | --- | --- |
| Compilation output | Generates a full JS object | Inline values, no output |
| Reverse mapping | ✅ Supported | ❌ Not supported |
| Runtime access | ✅ Can access dynamically | ❌ Cannot (unless `preserveConstEnums` is on) |
| Bundle size | Slightly larger | Minimal |

---

## Summary

- **Use `const enum`**: when you're just giving numbers readable names for better code clarity, without needing runtime manipulation
- **Use regular `enum`**: when you need to look up names by value, or want to iterate over values at runtime

:::note
Want to try it yourself? Check it out here: [TypeScript Playground](https://www.typescriptlang.org/play/?#code/PTAEFMDsFcFsCgp1AJQPYBtygN71KAIIAmsAlpKALygCMANPqAKoDO4ATtaAEzwC+8ISFABjNJFYAXCDATjJMpLFABhTGi54CKcMW4AGRgQDiHcFG60B8LDNgBPdRk3dnmgHS7iAbiA)

```tsx
// enum
enum Role {
  Admin = 1,
  User = 2
}


// const enum
const enum Color {
  Red = 0,
  Green = 1
}
let myColor = Color.Red;
```
:::
