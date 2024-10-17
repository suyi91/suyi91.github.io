import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, b as createAstro, a as renderComponent, e as renderSlot } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import { g as getCollectionByName, f as getUniqueTags, h as getCountByCategory, s as sortPostsByDate, t, $ as $$BaseHead, a as $$Header, c as $$Profile, e as $$Footer } from './sean-Comment-BjqYC_Gb.js';
import 'clsx';
import { c as comment, s as site, d as donate } from './sean-_astro_content-B5Xhww3n.js';
import 'dayjs/locale/cs.js';
import './sean-Donate-gaNwnTVj.js';

createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${comment.enable}`;
}, "/Users/sean/my-astro-blog/src/components/CommentAside.astro", void 0);

const $$BlogAside = createComponent(async ($$result, $$props, $$slots) => {
  const blogs = await getCollectionByName("blog");
  let tagArr = getUniqueTags(blogs);
  let categoryCount = getCountByCategory(blogs);
  let sortPosts = await sortPostsByDate(blogs);
  let resultPosts = sortPosts.splice(0, site.recentBlogSize);
  return renderTemplate`${maybeRenderHead()}<div> ${Object.keys(categoryCount).length > 0 && renderTemplate`<div class="aside-widget"> <i class="ri-folder-line menu-icon"></i>${t("sidebar.categories")} </div>`} ${Object.keys(categoryCount).map((category) => renderTemplate`<a class="my-1 truncate block hover:text-skin-active"${addAttribute(category + " (" + categoryCount[category] + ")", "title")}${addAttribute("/category/" + category, "href")}> ${(category === "uncategorized" ? t("sidebar.uncategorized") : category) + " (" + categoryCount[category] + ")"} </a>`)} </div> <div> ${tagArr.length > 0 && renderTemplate`<div class="aside-widget"> <i class="ri-price-tag-3-line menu-icon"></i> ${t("sidebar.tags")} </div>`} <div class="flex flex-wrap"> ${tagArr && tagArr.map(
    (tag) => renderTemplate`<a class="inline-block truncate m-1 border p-1 text-sm rounded hover:text-skin-active"${addAttribute(tag, "title")}${addAttribute("/tags/" + tag, "href")}>${tag}</a>`
  )} </div> </div> <div> <div class="aside-widget"> <i class="ri-file-line menu-icon"></i> ${t("sidebar.recentArticle")} </div> <div class="flex flex-col"> ${resultPosts.map((post) => renderTemplate`<a${addAttribute("/blog/" + post.slug, "href")} class="truncate cursor-pointr mt-1 hover:text-skin-active"${addAttribute(post.data.title, "title")}> ${post.data.title} </a>`)} </div> </div> ${comment.enable}`;
}, "/Users/sean/my-astro-blog/src/components/BlogAside.astro", void 0);

const $$Astro = createAstro("https://suyi.xyz");
const $$IndexPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$IndexPage;
  Astro2.props;
  return renderTemplate`<html lang="en"> ${renderComponent($$result, "BaseHead", $$BaseHead, {})}${maybeRenderHead()}<body class="bg-skin-secondary relative"> ${renderComponent($$result, "Header", $$Header, {})} <main class="container p-4 pt-20 text-skin-base pb-32 min-h-full relative" id="app"> <div class="grid grid-cols-4 gap-8"> <div class="col-span-4 xl:col-span-3 space-y-6"> ${renderSlot($$result, $$slots["default"])} ${donate.enable} ${comment.enable} </div> <div> <div class="hidden xl:block space-y-6"> ${renderComponent($$result, "Profile", $$Profile, {})} ${renderComponent($$result, "BlogAside", $$BlogAside, {})} </div> </div> </div> ${renderComponent($$result, "Footer", $$Footer, {})} </main>  </body></html>`;
}, "/Users/sean/my-astro-blog/src/layouts/IndexPage.astro", void 0);

export { $$IndexPage as $ };
