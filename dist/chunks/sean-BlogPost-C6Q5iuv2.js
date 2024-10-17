import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, a as renderComponent, e as renderSlot } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import { t, $ as $$BaseHead, a as $$Header, b as $$Comment, c as $$Profile, e as $$Footer } from './sean-Comment-BjqYC_Gb.js';
import 'clsx';
/* empty css                            */
import { c as comment } from './sean-_astro_content-B5Xhww3n.js';

const $$Toc = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="toc" class="shadow-lg rounded-lg my-4 py-2 px-2 bg-skin-card sticky top-20" data-astro-cid-6t6zfk7k> <div class="flex items-center border-b border-b-gray-300 mb-1" data-astro-cid-6t6zfk7k> <i class="ri-list-check menu-icon" data-astro-cid-6t6zfk7k></i> ${t("blog.tableOfContent")} </div> <div class="overflow-auto" data-astro-cid-6t6zfk7k> <div class="toc-container" data-astro-cid-6t6zfk7k></div> </div> </div>  `;
}, "/Users/sean/my-astro-blog/src/components/Toc.astro", void 0);

const $$ScrollToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" id="scrollToTopBtn" class="header-btn fixed bottom-4 right-2 hidden" title="scroll to top"> <i class="ri-arrow-up-line"></i> </button> `;
}, "/Users/sean/my-astro-blog/src/components/ScrollToTop.astro", void 0);

const $$Astro = createAstro("https://suyi.xyz");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { frontmatter = { comment: false, donate: false, toc: false, mathjax: false, mermaid: false } } = Astro2.props;
  return renderTemplate`<html lang="en"> ${renderComponent($$result, "BaseHead", $$BaseHead, { "mathjax": frontmatter.mathjax, "mermaid": frontmatter.mermaid })}${maybeRenderHead()}<body class="bg-skin-secondary"> ${renderComponent($$result, "Header", $$Header, {})} <main class="container p-4  pt-20 text-skin-base min-h-full pb-32 relative" id="app"> <div class="grid grid-cols-4 gap-8"> <div class="col-span-4 xl:col-span-3 space-y-4"> <button class="flex items-center text-md cursor-pointer hover:text-skin-active outline-none" style="background-color: inherit;" onclick="history.back()"> <i class="ri-arrow-left-line mr-2"></i> <span>${t("home.goBack")}</span> </button> ${renderSlot($$result, $$slots["default"])} ${frontmatter.comment && comment.enable && renderTemplate`${renderComponent($$result, "Comment", $$Comment, {})}`} </div> <div class="hidden xl:block col-span-1 relative"> ${renderComponent($$result, "Profile", $$Profile, {})} ${frontmatter.toc && renderTemplate`${renderComponent($$result, "Toc", $$Toc, {})}`} </div> ${renderComponent($$result, "ScrollToTop", $$ScrollToTop, {})} </div> ${renderComponent($$result, "Footer", $$Footer, {})} </main> </body></html>`;
}, "/Users/sean/my-astro-blog/src/layouts/BlogPost.astro", void 0);

export { $$BlogPost as $ };
