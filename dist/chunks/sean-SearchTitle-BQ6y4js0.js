import { b as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import 'clsx';
import { t } from './sean-Comment-BjqYC_Gb.js';

const $$Astro = createAstro("https://suyi.xyz");
const $$SearchTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SearchTitle;
  const { label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="my-2 text-wrap break-all">${t("search.labelOne")} <span class="text-skin-active mx-1">${label === "uncategorized" ? t("sidebar.uncategorized") : label}</span> ${t("search.labelTwo")}</div>`;
}, "/Users/sean/my-astro-blog/src/components/SearchTitle.astro", void 0);

export { $$SearchTitle as $ };
