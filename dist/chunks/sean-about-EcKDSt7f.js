/* empty css                          */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import 'clsx';

const html = "<p>我是一枚小小的前端开发者，一直在不断学习新知识，改变自我。</p>\n<p><img src=\"/spinner.gif\" alt=\"default\" data-src=\"/images/happy.jpg\" data-alt=\"Happy\"></p>";

				const frontmatter = {"donate":false,"comment":false,"lastModified":"2024-10-16","readingTime":{"text":"1 min read","minutes":0.135,"time":8100,"words":27}};
				const file = "/Users/sean/my-astro-blog/src/pages/about/about.md";
				const url = "/about/about";
				function rawContent() {
					return "\n我是一枚小小的前端开发者，一直在不断学习新知识，改变自我。\n\n![Happy](/images/happy.jpg)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
