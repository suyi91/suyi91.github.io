import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import {remarkModifiedTime} from "./src/remarkPlugin/remark-modified-time.mjs";
import {resetRemark} from "./src/remarkPlugin/reset-remark.js";
import remarkDirective from "remark-directive";
import {remarkAsides} from  './src/remarkPlugin/remark-asides.js'
import {remarkCollapse} from "./src/remarkPlugin/remark-collapse.js";

import expressiveCode from "astro-expressive-code";
import {pluginLineNumbers} from '@expressive-code/plugin-line-numbers'

import {visit} from 'unist-util-visit'
import {pluginCollapsibleSections} from '@expressive-code/plugin-collapsible-sections'

function customRehypeLazyLoadImage() {
  return function (tree) {
    visit(tree, function (node) {
      if (node.tagName === 'img') {
        node.properties['data-src'] = node.properties.src
        node.properties.src = '/spinner.gif'
        node.properties['data-alt'] = node.properties.alt
        node.properties.alt = 'default'
      }
    })
  }
}

export default defineConfig({
  site: 'https://suyi.xyz',
  output: 'static',
  integrations: [sitemap(), tailwind(), solid(), expressiveCode({
    plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
    themes: ["github-dark", "github-light"],
    styleOverrides: {
      codeFontFamily: "jetbrains-mono",
      uiFontFamily: "jetbrains-mono",
    },
    themeCssSelector: (theme) => `[data-theme="${theme.type}"]`
  }), mdx()],
  markdown: {
    remarkPlugins: [remarkModifiedTime, resetRemark, remarkDirective, remarkAsides({}),remarkCollapse({})],
    rehypePlugins: [customRehypeLazyLoadImage],
  },
  build: {
    assets: 'dist'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // github page因为jeklly的原因（`.nojekyll`也没用），不能使用下划线开头的命名，只能加一个前缀
          assetFileNames: 'dist/assets/sean-[name]-[extname]', // 自定义静态资源文件命名
          chunkFileNames: 'dist/chunks/sean-[name]-[hash].js', // 自定义代码分块文件命名
          entryFileNames: 'dist/entry/sean-[name]-[hash].js', // 自定义入口文件命名
        }
      }
    }
  }
});
