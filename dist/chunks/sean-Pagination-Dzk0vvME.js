import { b as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import 'clsx';
import { t } from './sean-Comment-BjqYC_Gb.js';
/* empty css                             */

const $$Astro = createAstro("https://suyi.xyz");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  let pager = [];
  const {
    currentPage,
    totalPage,
    prefixUrl = "/blog/",
    url = { prev: "", next: "" }
  } = Astro2.props;
  if (totalPage === 1) {
    pager = [];
  } else if (totalPage <= 5) {
    pager = new Array(totalPage).fill(0).map((i, index) => index + 1);
  } else {
    if (currentPage > totalPage) {
      return;
    }
    let diffNextPages = 2 - (totalPage - currentPage);
    let diffPrevPages = currentPage - 1;
    if (diffNextPages <= 2 && diffNextPages >= 0) {
      pager = [
        currentPage - 2 - diffNextPages,
        currentPage - 1 - diffNextPages,
        currentPage - diffNextPages,
        currentPage + 1 - diffNextPages,
        currentPage + 2 - diffNextPages
      ];
    } else if (diffPrevPages <= 1 && diffPrevPages >= 0) {
      pager = [1, 2, 3, 4, 5];
    } else {
      pager = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      ];
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center justify-center my-16 text-skin-base" data-astro-cid-d776pwuy> ${pager.length > 4 && renderTemplate`<a${addAttribute(prefixUrl + "1", "href")} style="font-size:18px;line-height:32px;" data-astro-cid-d776pwuy> <i class="ri-skip-left-line" data-astro-cid-d776pwuy></i> </a>`} <!-- 当前分页数据 --> ${pager.map(
    (i) => currentPage === i ? renderTemplate`<a class="text-skin-active"${addAttribute(prefixUrl + i, "href")} style="line-height:32px;" data-astro-cid-d776pwuy> ${i} </a>` : renderTemplate`<a${addAttribute(prefixUrl + i, "href")} style="line-height:32px;" data-astro-cid-d776pwuy> ${i} </a>`
  )} ${pager.length > 4 && renderTemplate`<a${addAttribute(prefixUrl + totalPage, "href")} style="font-size:18px;line-height:32px;" data-astro-cid-d776pwuy> <i class="ri-skip-right-line" data-astro-cid-d776pwuy></i> </a>`} ${totalPage > 5 && t("pagination.total") + totalPage + t("pagination.unit")} </div> `;
}, "/Users/sean/my-astro-blog/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
