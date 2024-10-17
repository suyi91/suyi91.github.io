import { b as createAstro, c as createComponent, r as renderTemplate, f as renderHead, a as renderComponent, d as addAttribute, g as defineScriptVars, F as Fragment, m as maybeRenderHead, s as spreadAttributes, e as renderSlot } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
/* empty css                          */
import { a as config, s as site, g as getCollection, b as categories, i as infoLinks, c as comment } from './sean-_astro_content-B5Xhww3n.js';
import _ from 'lodash';
import 'clsx';
import 'dayjs/locale/cs.js';
import dayjs from 'dayjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1, _b, _d, _e;
const $$Astro$1 = createAstro("https://suyi.xyz");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { mathjax = false, mermaid = false } = Astro2.props;
  return renderTemplate(_e || (_e = __template$1(['<head><!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml"', '><meta name="generator"', '><!-- Canonical URL --><link rel="canonical"', '><!-- Primary Meta Tags --><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:alt"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta httpEquiv="X-UA-Compatible" content="IE=edge"><meta name="msapplication-TileColor" content="#da532c"><meta name="msapplication-config" content="/browserconfig.xml"><meta name="theme-color" content="#ffffff"><link rel="sitemap" href="/sitemap-0.xml"><title>', '</title><script src="/toggle-theme.js"><\/script>', "", "", "<!-- Google tag (gtag.js) -->", "", "</head>"])), addAttribute(site.favicon, "href"), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), addAttribute(site.title, "content"), addAttribute(site.description, "content"), addAttribute(Astro2.url, "content"), addAttribute(site.title, "content"), addAttribute(site.description, "content"), addAttribute(new URL(site.avatar, Astro2.site?.href).href, "content"), addAttribute(site.description, "content"), addAttribute(Astro2.url, "content"), addAttribute(site.title, "content"), addAttribute(site.description, "content"), addAttribute(new URL(site.avatar, Astro2.site?.href).href, "content"), site.title, mathjax && renderTemplate(_a$1 || (_a$1 = __template$1(['<script async type="text/javascript" src="/load-mathjax.js"><\/script>']))), mermaid && renderTemplate(_b || (_b = __template$1(['<script async type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/mermaid/10.9.0/mermaid.min.js"><\/script>']))), config.busuanzi, renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_d || (_d = __template$1(["<script", "><\/script><script>(function(){", "\n        window.dataLayer = window.dataLayer || [];\n\n        function gtag() {\n          dataLayer.push(arguments);\n        }\n\n        gtag('js', new Date());\n\n        gtag('config', ga);\n      })();<\/script>"])), addAttribute("https://www.googletagmanager.com/gtag/js?id=" + config.ga, "src"), defineScriptVars({ ga: config.ga })) })}`, renderHead());
}, "/Users/sean/my-astro-blog/src/components/BaseHead.astro", void 0);

const getCollectionByName = async (name) => {
  let posts = await getCollection(name);
  if (posts && posts.length > 0) {
    return posts.filter(({ data }) => {
      return !data.draft ;
    });
  } else {
    return [];
  }
};

const dealLabel = (label) => {
  if (_.isEmpty(label)) {
    return [];
  } else if (_.isString(label)) {
    let arr = label.split(",");
    return [...arr];
  } else if (_.isArray(label)) {
    return [...label];
  }
  return [];
};

const getUniqueTags = (posts) => {
  let tags = [];
  const filteredPosts = posts.filter(({ data }) => {
    return !data.draft ;
  });
  filteredPosts.forEach((post) => {
    tags = [...tags, ...dealLabel(post.data.tags)].filter(
      (value, index, self) => self.indexOf(value) === index
    );
  });
  return _.compact(tags);
};

const getCountByCategory = (posts) => {
  let category = [];
  const filteredPosts = posts.filter(({ data }) => {
    return !data.draft ;
  });
  filteredPosts.forEach((post) => {
    category = _.compact([...category, ..._.flattenDeep(dealLabel(post.data.category))]);
  });
  let result = _.countBy(category);
  if (result["uncategorized"]) {
    let num = result["uncategorized"];
    delete result["uncategorized"];
    result["uncategorized"] = num;
  }
  return result;
};

const $$Astro = createAstro("https://suyi.xyz");
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, icon: iconClass, children, target, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  let hrefMath = href.split("/");
  let pathnameMatch = pathname.split("/");
  const isActive = hrefMath[1] === pathnameMatch[1];
  return renderTemplate`${maybeRenderHead()}<div class="box relative h-10 w-auto flex items-center" data-astro-cid-eimmu3lg> <a${addAttribute(href, "href")}${addAttribute(target, "target")}${addAttribute([isActive ? "header-link-active" : "", "hover:header-link-hover"], "class:list")}${spreadAttributes(props)} data-astro-cid-eimmu3lg> <i${addAttribute(iconClass, "class")} data-astro-cid-eimmu3lg></i> ${renderSlot($$result, $$slots["default"])} ${children.length > 0 && renderTemplate`<i class="ri-arrow-down-s-line" data-astro-cid-eimmu3lg></i>`} </a> ${children && children.length > 0 && renderTemplate`<div class="dropdown cursor-pointer border rounded bg-skin-fill p-4" data-astro-cid-eimmu3lg> <ul class="space-y-4 w-28" data-astro-cid-eimmu3lg> ${children.map(
    (child) => renderTemplate`<li class="text-center hover:text-skin-active select-none" data-astro-cid-eimmu3lg> <i${addAttribute(child.iconClass, "class")} data-astro-cid-eimmu3lg></i> <a${addAttribute(child.target ? child.target : "_self", "target")}${addAttribute(child.href, "href")} data-astro-cid-eimmu3lg>${child.name}</a> </li>`
  )} </ul> </div>`} </div> `;
}, "/Users/sean/my-astro-blog/src/components/HeaderLink.astro", void 0);

const $$ThemeIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" id="theme-btn" class="header-btn" title="Toggles light & dark" aria-label="auto" aria-live="polite"> <i id="moon-icon" class="ri-sun-line"></i> <i id="sun-icon" class="ri-moon-line"></i> </button>`;
}, "/Users/sean/my-astro-blog/src/components/ThemeIcon.astro", void 0);

const $$MenuIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" id="menu-icon" class="header-btn" title="Menu"> <i class="ri-menu-fill"></i> </button> <button type="button" id="menu-icon-close" class="header-btn hidden" title="Menu"> <i class="ri-close-fill"></i> </button> `;
}, "/Users/sean/my-astro-blog/src/components/MenuIcon.astro", void 0);

const $$SidebarIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" id="aside-btn" class="header-btn" title="Open Aside Bar" aria-label="auto" aria-live="polite"> <i class="ri-user-line"></i> </button> <button type="button" id="aside-close-btn" class="header-btn hidden" title="Close Aside Bar" aria-label="auto" aria-live="polite"> <i class="ri-close-fill"></i> </button> <div id="blog-aside" class="absolute top-16 bg-skin-fill right-0 blog-aside hidden"></div> `;
}, "/Users/sean/my-astro-blog/src/components/SidebarIcon.astro", void 0);

const en = {
  "aside.caution": "Caution",
  "aside.danger": "Danger",
  "aside.note": "Note",
  "aside.tip": "Tip",
  "blog.tableOfContent": "Table of Contents",
  "feed.next": "Next",
  "feed.previous": "Previous",
  "feed.publishedIn": "Published in",
  "footer.articleAuthor": "Article author",
  "footer.articleTitle": "Article title",
  "footer.busuanziSitePV": "Page views:",
  "footer.busuanziSitePVUnit": "",
  "footer.busuanziSiteUV": "Total visitors:",
  "footer.busuanziSiteUVUnit": "",
  "footer.copyrightOne": "Copyright notice: This article is licensed under the",
  "footer.copyrightThree": "",
  "footer.copyrightTwo": "「Attribution-NonCommercial-ShareAlike 4.0 International」",
  "footer.originalLink": "Original link",
  "footer.releaseTime": "Release time",
  "footer.sitemap": "Sitemap",
  "home.goBack": "Go back",
  "home.moreArticles": "More articles",
  "home.readMore": "Read more",
  "home.sticky": "Sticky",
  "message.welcome": "Welcome",
  "message.welcomeTips": "Leave a footprint!",
  "pagination.total": "Total",
  "pagination.unit": "Pages",
  "post.dateFormat": "Do MMMM YYYY",
  "post.lastUpdated": "Last updated",
  "remark.open": "Open",
  "search.labelOne": "Viewing articles under the ",
  "search.labelTwo": "",
  "search.placeholder": "Enter title or abstract keywords",
  "search.search": "Search",
  "search.searchLabelOne": "Found ",
  "search.searchLabelTwo": " article(s) in total",
  "sidebar.categories": "Categories",
  "sidebar.recentArticle": "Recent Articles",
  "sidebar.recentComments": "Recent Comments",
  "sidebar.tags": "Tags",
  "sidebar.uncategorized": "uncategorized",
  "title.draft": "draft",
  "title.minutes": " Minutes",
  "title.words": " Words"
};

const zhCn = {
  "aside.note": "注意",
  "aside.tip": "提示",
  "aside.caution": "警告",
  "aside.danger": "危险",
  "home.sticky": "置顶",
  "home.goBack": "返回",
  "home.moreArticles": "更多文章",
  "home.readMore": "阅读全文",
  "message.welcome": "欢迎留言",
  "message.welcomeTips": "既然来了就留个脚印吧！",
  "post.lastUpdated": "最后更新",
  "remark.open": "展开",
  "sidebar.categories": "分类",
  "sidebar.uncategorized": "未分类",
  "sidebar.tags": "标签",
  "sidebar.recentArticle": "最近文章",
  "sidebar.recentComments": "最近评论",
  "footer.articleTitle": "本文标题",
  "footer.articleAuthor": "文章作者",
  "footer.releaseTime": "发布时间",
  "footer.originalLink": "原始链接",
  "footer.copyrightOne": "版权声明：本作品采用",
  "footer.copyrightTwo": "「署名-非商业性使用-相同方式共享 4.0 国际」",
  "footer.copyrightThree": "许可协议进行许可",
  "footer.sitemap": "站点地图",
  "footer.busuanziSitePV": "总访问量",
  "footer.busuanziSitePVUnit": "次",
  "footer.busuanziSiteUV": "总访客数",
  "footer.busuanziSiteUVUnit": "人次",
  "feed.publishedIn": "发表于",
  "pagination.total": "共",
  "pagination.unit": "页",
  "title.minutes": "分钟",
  "title.words": "字",
  "title.draft": "草稿",
  "blog.tableOfContent": "文章目录",
  "search.labelOne": "正在查看",
  "search.labelTwo": "下的文章",
  "search.search": "搜索",
  "search.searchLabelOne": "共找到 ",
  "search.searchLabelTwo": " 篇文章",
  "search.placeholder": "输入标题或摘要关键字",
  "feed.previous": "上一条动态",
  "feed.next": "下一条动态"
};

let cs = {
  "aside.caution": "varování",
  "aside.danger": "nouze",
  "aside.note": "vzít na vědomí",
  "aside.tip": "upozornit na něco",
  "blog.tableOfContent": "Obsah",
  "feed.next": "Další",
  "feed.previous": "Předchozí",
  "feed.publishedIn": "Publikováno v",
  "footer.articleAuthor": "Autor článku",
  "footer.articleTitle": "Název článku",
  "footer.busuanziSitePV": "Zobrazení stránky:",
  "footer.busuanziSitePVUnit": "",
  "footer.busuanziSiteUV": "Celkový počet návštěvníků:",
  "footer.busuanziSiteUVUnit": "",
  "footer.copyrightOne": "Oznámení o autorských právech: Tento článek je licencován pod",
  "footer.copyrightThree": "",
  "footer.copyrightTwo": "„Attribution-NonCommercial-ShareAlike 4.0 International“",
  "footer.originalLink": "Původní odkaz",
  "footer.releaseTime": "Čas vydání",
  "footer.sitemap": "Mapa stránek",
  "home.goBack": "Jít zpět",
  "home.moreArticles": "Více článků",
  "home.readMore": "Číst dál",
  "home.sticky": "Připíchnuto",
  "message.welcomeTips": "Zanechte stopu!",
  "message.welcome": "Vítejte",
  "pagination.total": "Celkem",
  "pagination.unit": "Stránky",
  "post.dateFormat": "D. MMMM YYYY",
  "post.lastUpdated": "Poslední aktualizace",
  "search.labelOne": "Zobrazení článků pod",
  "search.labelTwo": "",
  "search.placeholder": "Zadejte klíčová slova názvu nebo abstraktu",
  "search.searchLabelOne": "Nalezeno ",
  "search.searchLabelTwo": " článek(ů) celkem",
  "search.search": "Hledat",
  "sidebar.categories": "Kategorie",
  "sidebar.recentArticle": "Nedávné články",
  "sidebar.recentComments": "Nedávné komentáře",
  "sidebar.tags": "Štítky",
  "sidebar.uncategorized": "nekategorizované",
  "title.draft": "návrh",
  "title.minutes": " Minut",
  "title.words": " Slov"
};

const ui = {
  en,
  "zh-cn": zhCn,
  cs
};
function useTranslations(lang) {
  return function t2(key) {
    return ui[lang][key] || ui[config.lang][key];
  };
}
const t = useTranslations(config.lang);

const getCountByTagName = (posts) => {
  let tags = [];
  const filteredPosts = posts.filter(({ data }) => {
    return !data.draft ;
  });
  filteredPosts.forEach((post) => {
    tags = _.compact([...tags, ..._.flattenDeep(dealLabel(post.data.tags))]);
  });
  return _.countBy(tags);
};

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const blogs = await getCollectionByName("blog");
  let tagArr = getUniqueTags(blogs);
  let categoryCount = getCountByCategory(blogs);
  let tagCount = getCountByTagName(blogs);
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 w-full bg-skin-fill text-skin-base z-10"> <div class="flex items-center justify-between container"> <div class="block xl:hidden"> ${renderComponent($$result, "MenuIcon", $$MenuIcon, {})} </div> <a class="text-2xl p-4" href="/">${site.title}</a> <div class="flex items-center"> <div class="hidden xl:block"> <div class="flex items-center space-x-5 pr-4"> ${categories.map((category) => renderTemplate`${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": category.href, "icon": category.iconClass, "target": category.target ? category.target : "_self", "children": category.children ? category.children : [] }, { "default": ($$result2) => renderTemplate`${category.name}` })}`)} </div> </div> ${renderComponent($$result, "ThemeIcon", $$ThemeIcon, {})} <div class="block xl:hidden"> ${renderComponent($$result, "AsideIcon", $$SidebarIcon, {})} </div> </div> </div> <div id="mobile-menu" class="hidden text-center overflow-y-auto pb-8" style="height: calc(100vh - 64px)"> ${categories.map((category) => renderTemplate`<div class="py-2"> <a class=" hover:text-skin-active"${addAttribute(category.href, "href")}> <i${addAttribute(category.iconClass, "class")}></i> <span>${category.name}</span> </a> ${category.children && category.children.length > 0 && renderTemplate`<div class="divider-horizontal"></div>`} <div class="space-y-4 text-sm"> ${category.children && category.children.map(
    (sub) => renderTemplate`<a class="block hover:text-skin-active"${addAttribute(sub.href, "href")}> <i${addAttribute(sub.iconClass, "class")}></i> <span>${sub.name}</span> </a>`
  )} </div> </div>`)} </div> <div id="personal-info" class="hidden break-all overflow-y-auto pb-8" style="height: calc(100vh - 64px)"> <img class="avatar my-4 mx-auto"${addAttribute(site.avatar, "src")} alt="avatar"> <div class="mb-2 text-center">${site.motto}</div> <div class="flex items-center justify-center flex-wrap"> ${infoLinks.map((infoItem) => renderTemplate`<a${addAttribute(infoItem.name, "title")}${addAttribute(infoItem.outlink, "href")} target="_blank"> <i${addAttribute(infoItem.icon + " text-2xl mr-2 cursor-pointer", "class")}></i> </a>`)} </div> <div class="divider-horizontal-mini"></div> <div class="text-center"> ${Object.keys(categoryCount).length > 0 && renderTemplate`<div> <i class="ri-folder-line menu-icon"></i>${t("sidebar.categories")} </div>`} ${Object.keys(categoryCount).map((category) => renderTemplate`<div class="my-2 break-all truncate"> <a class="hover:text-skin-active"${addAttribute(category + " (" + categoryCount[category] + ")", "title")}${addAttribute("/category/" + category, "href")}> ${category + " (" + categoryCount[category] + ")"} </a> </div>`)} ${tagArr.length > 0 && renderTemplate`<div class="divider-horizontal-mini"></div>
          <div class="text-center"> <i class="ri-price-tag-3-line menu-icon"></i> ${t("sidebar.tags")} </div>`} ${tagArr && tagArr.map((tag) => renderTemplate`<div class="my-2 break-all truncate"> <a class="hover:text-skin-active my-2"${addAttribute(tag, "title")}${addAttribute("/tags/" + tag, "href")}>${tag + " (" + tagCount[tag] + ")"}</a> </div>`)} </div> </div> </header>`;
}, "/Users/sean/my-astro-blog/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="footer container p-4" data-astro-cid-sz7xmlte> ${config.busuanzi} <div class="flex items-center flex-wrap justify-center mb-4 text-skin-base" data-astro-cid-sz7xmlte> <div data-astro-cid-sz7xmlte> <span class="cursor-default" data-astro-cid-sz7xmlte>Copyright</span> <i class="ri-copyright-line align-middle" data-astro-cid-sz7xmlte></i> <span class="align-middle" data-astro-cid-sz7xmlte>2024</span> </div> ${site.beian} <div class="divider-vertical" data-astro-cid-sz7xmlte></div> <a href="/sitemap-index.xml" data-astro-cid-sz7xmlte>${t("footer.sitemap")}</a> </div> </div> `;
}, "/Users/sean/my-astro-blog/src/components/Footer.astro", void 0);

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="shadow-lg rounded-lg h-64 w-auto flex flex-col items-center justify-center bg-skin-card p-2"> <img class="avatar mb-4"${addAttribute(site.avatar, "src")} alt="avatar"> <div class="mb-2 text-center">${site.motto}</div> <div class="flex items-center justify-center flex-wrap"> ${infoLinks.map((infoItem) => renderTemplate`<a${addAttribute(infoItem.name, "title")}${addAttribute(infoItem.outlink, "href")} target="_blank"> <i${addAttribute(infoItem.icon + " text-2xl mr-2 cursor-pointer", "class")}></i> </a>`)} </div> </div>`;
}, "/Users/sean/my-astro-blog/src/components/Profile.astro", void 0);

const sortPostsByDate = (posts) => posts.filter(({ data }) => {
  return !data.draft ;
}).sort((a, b) => dayjs(b.data.date).unix() - dayjs(a.data.date).unix());

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div class="giscus"></div> <script src="https://giscus.app/client.js"', "><\/script>"])), maybeRenderHead(), spreadAttributes(comment.giscusConfig));
}, "/Users/sean/my-astro-blog/src/components/GiscusComment.astro", void 0);

createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="waline"></div> `;
}, "/Users/sean/my-astro-blog/src/components/WalineComment.astro", void 0);

const $$Comment = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${comment.enable}${comment.enable}`;
}, "/Users/sean/my-astro-blog/src/components/Comment.astro", void 0);

export { $$BaseHead as $, $$Header as a, $$Comment as b, $$Profile as c, dealLabel as d, $$Footer as e, getUniqueTags as f, getCollectionByName as g, getCountByCategory as h, sortPostsByDate as s, t };
