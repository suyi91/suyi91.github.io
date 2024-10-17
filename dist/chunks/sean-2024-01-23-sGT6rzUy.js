import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import 'clsx';

const html = "<p>New Blog Release!</p>";

				const frontmatter = {"date":"2024-10-16T23:31:13.000Z","lastModified":"2024-10-16","readingTime":{"text":"1 min read","minutes":0.015,"time":900,"words":3}};
				const file = "/Users/sean/my-astro-blog/src/content/feed/2024-01-23.md";
				const url = undefined;
				function rawContent() {
					return "\nNew Blog Release!";
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

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
