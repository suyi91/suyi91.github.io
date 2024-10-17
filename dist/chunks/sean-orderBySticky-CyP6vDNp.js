import { b as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, F as Fragment } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import { f as formatDate } from './sean-formatDate-C5ntp4qo.js';
import { t, d as dealLabel } from './sean-Comment-BjqYC_Gb.js';
import _ from 'lodash';
import dayjs from 'dayjs';

const $$Astro$1 = createAstro("https://suyi.xyz");
const $$PostViewTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostViewTitle;
  const { title, date, slug, category, tags, sticky = false, draft = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="text-skin-base"> <!-- title --> <div class="flex items-center"> ${sticky > 0 && renderTemplate`<div class="post-sticky select-none">${t("home.sticky")}</div>`} <a class="flex text-xl underline-offset-4 cursor-pointer decoration-skin-base decoration-wavy hover:underline hover:decoration-sky-500 font-bold"${addAttribute(slug, "href")}> ${title} </a> </div> <div class="flex flex-wrap items-center my-2 space-x-2"> <!-- date --> ${date && renderTemplate`<i class="ri-calendar-2-fill"></i>
        <div>${formatDate(date)}</div>`} <!-- draft --> ${draft && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <div class="divider-vertical"></div> <i class="ri-git-pr-draft-line"></i> <div>${t("title.draft")}</div> ` })}`} <!-- category --> ${category && dealLabel(category).filter((item) => item !== "uncategorized").map((categoryName) => renderTemplate`<div class="divider-vertical"></div>
        <i class="ri-folder-3-line"></i>
        <a${addAttribute("/category/" + categoryName, "href")} class="text-wrap break-all hover:text-skin-active">${categoryName}</a>`)} <!-- tag --> ${tags && dealLabel(tags).map((tagName) => renderTemplate`<div class="divider-vertical"></div>
        <i class="ri-price-tag-3-line"></i>
        <a${addAttribute("/tags/" + tagName, "href")} class="text-wrap break-all hover:text-skin-active">${tagName}</a>`)} </div> </div>`;
}, "/Users/sean/my-astro-blog/src/components/PostViewTitle.astro", void 0);

const $$Astro = createAstro("https://suyi.xyz");
const $$PostView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostView;
  const { blog } = Astro2.props;
  const { data, slug } = blog;
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "PostViewTitle", $$PostViewTitle, { "slug": `/blog/${slug}`, ...data })} <p class="break-all text-skin-base mb-2"> ${data.description ? data.description : ""} </p> <div class="text-right"> <a class="hover:text-skin-active text-sm border rounded py-1 px-2"${addAttribute(`/blog/${slug}`, "href")}>${t("home.readMore")}</a> </div> </div>`;
}, "/Users/sean/my-astro-blog/src/components/PostView.astro", void 0);

const orderBySticky = (posts) => {
  let handlePosts = posts.map((post) => {
    post.sticky = post.data.sticky ? post.data.sticky : 0;
    post.dateTimestamp = dayjs(post.data.date).valueOf();
    return post;
  });
  return _.orderBy(handlePosts, ["sticky", "dateTimestamp"], ["desc", "desc"]);
};

export { $$PostView as $, orderBySticky as o };
