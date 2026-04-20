---
draft: false
date: 2024-10-22
title: Quick Deploy Astro to GitHub Pages
description: How to build a blog quickly and for free with Astro & GitHub Pages.
mermaid: true
mathjax: true
tags: ['astro']
category: ['frontend']
translationKey: github-pages-deploy-astro
audio: true
---

> ^_^ This site itself was built using the method described below — feel free to click around and see Astro in action.

## Deployment Steps

1. Generate an Astro project. You can choose from an existing theme at [Astro Themes Gallery](https://astro.build/themes).
2. Create a GitHub Pages repository.
    - Example: `github.com/your-user-name/your-user-name.github.io`
    - The main branch (`main`) stores the deployed static files.
3. Create a `source` branch for the source code. Push code to the `source` branch.
4. Build with Astro:
    - If you have a custom domain, configure a **CNAME** in your Astro project pointing to it.
    - See the [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/).
5. Use the [gh-pages](https://github.com/tschaub/gh-pages) library to publish the build output to the `main` branch.
6. Visit the site via your CNAME domain to verify.

## Known Issues

1. GitHub Pages does not serve files or folders whose names start with an underscore.

    By default, Astro builds generate `/_astro/` and `/_astro/_xxx.js` files. Because of Jekyll's default behavior on GitHub Pages, these paths are not accessible directly.

    Fix: Place a `.nojekyll` file in the root of the GitHub Pages repo to [disable Jekyll](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators).
