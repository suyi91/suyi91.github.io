---
draft: false
date: 2025-02-27
title: Fixing node-sass Installation Errors
description: Encountered node-sass installation errors again in 2025 — here's how to fix them quickly.
mermaid: true
mathjax: true
tags: ['css', 'sass', 'node-sass']
category: ['frontend']
translationKey: fix-node-sass-install-error
---

## Common Installation Errors

### 1. Node.js and node-sass version mismatch

According to the node-sass readme, you need to match the node-sass version to your Node.js runtime:

```
NodeJS  | Supported node-sass version | Node Module
--------|-----------------------------|------------
Node 20 | 9.0+                        | 115
Node 19 | 8.0+                        | 111
Node 18 | 8.0+                        | 108
Node 17 | 7.0+, <8.0                  | 102
Node 16 | 6.0+                        | 93
Node 15 | 5.0+, <7.0                  | 88
Node 14 | 4.14+, <9.0                 | 83
Node 13 | 4.13+, <5.0                 | 79
Node 12 | 4.12+, <8.0                 | 72
Node 11 | 4.10+, <5.0                 | 67
Node 10 | 4.9+, <6.0                  | 64
Node 8  | 4.5.3+, <5.0                | 57
Node <8 | <5.0                        | <57
```

### 2. Download failure due to network issues

:::note
By default, node-sass downloads its binary directly from GitHub. Due to the GFW, this download will almost certainly be interrupted, causing installation to fail.
:::

node-sass supports overriding the download mirror. You can configure it as follows:
1. CLI: `npm install node-sass --sass-binary-site=http://example.com/`
2. `.npmrc`: `sass_binary_site=http://example.com/`

:::tip
A working mirror for users in China: `https://npmmirror.com/mirrors`
:::

### 3. Switch to dart sass

Replace the npm package `node-sass` with `sass`.

## References

1. mirror-config-china: https://www.npmjs.com/package/mirror-config-china
