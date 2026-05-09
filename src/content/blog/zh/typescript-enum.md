---
draft: false
date: 2026-05-09
title: TypeScript 枚举类型详解
description: 深入解析 TypeScript 枚举类型的用法、原理与最佳实践
mermaid: false
mathjax: false
tags: ['TypeScript']
category: ['frontend']
audio: true
---

聊聊 TypeScript 里的枚举（enum）吧，这玩意儿看起来不起眼，但里面的门道还挺多的。

特别是 `enum` 和 `const enum` 这俩，很多人对它们的区别傻傻分不清。今天就来一探究竟。

简单来说：**一个是真实存在的对象，另一个是编译后的"幻觉"**。

---

## 1. enum（普通枚举）

普通枚举编译后会生成一个真实的 JavaScript 对象。

来，看个例子：

```typescript
enum Role {
  Admin = 1,
  User = 2
}
```

编译成 JS 后长这样：

```javascript
var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
})(Role || (Role = {}));
```

这个 IIFE 闭包干了一件很有意思的事：它不仅存了 `Role.Admin = 1`，还顺手建立了反向映射 `Role[1] = "Admin"`。

所以你可以这么玩：

```typescript
console.log(Role.Admin);   // 1
console.log(Role[1]);      // "Admin" — 反向查找
```

**特点：**

- 会在内存中创建一个真实对象
- 运行时可以随便遍历、传来传去
- 支持反向映射，从值找名字

---

## 2. const enum（常量枚举）

常量枚举完全相反，它在编译阶段就被"蒸发"了，所有引用直接替换成数值。

```typescript
const enum Color {
  Red = 0,
  Green = 1
}
let myColor = Color.Red;
```

编译后：

```javascript
let myColor = 0; // Color 对象？不存在的好吧
```

**特点：**

- **零运行时代码**：不生成任何 JS 对象
- **不支持反向映射**：对象都没了，`Color[0]` 根本找不到
- **包体积小**：适合对体积敏感的项目

:::tip
想省体积又不需要运行时访问？闭着眼睛用 `const enum`。
:::

---

## 3. 到底该用哪个？

| 特性 | enum | const enum |
| --- | --- | --- |
| 编译输出 | 生成完整 JS 对象 | 内联值，无输出 |
| 反向映射 | ✅ 支持 | ❌ 不支持 |
| 运行时访问 | ✅ 可以 | ❌ 不行 |
| 包体积 | 稍大 | 最小 |

---

## 总结

- **用 const enum**：只是给数值起个名字让代码好读，不需要运行时折腾它
- **用普通 enum**：需要通过值反向查名字，或者要在运行时遍历/动态处理

:::note
想自己动手试试？戳这里：[TypeScript Playground](https://www.typescriptlang.org/play/?#code/PTAEFMDsFcFsCgp1AJQPYBtygN71KAIIAmsAlpKALygCMANPqAKoDO4ATtaAEzwC+8ISFABjNJFYAXCDATjJMpLFABhTGi54CKcMW4AGRgQDiHcFG60B8LDNgBPdRk3dnmgHS7iAbiA)

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
