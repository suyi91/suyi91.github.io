import {getCollection} from "astro:content";

const siteUrl = 'https://suyi.xyz';

function getLangFromSlug(slug) {
  return slug.startsWith('zh/') ? 'zh' : 'en';
}

function stripLangPrefix(slug) {
  return slug.replace(/^(en|zh)\//, '');
}

export async function GET(context) {
  const blog = await getCollection('blog');

  // Group by translationKey
  const groups = {};
  for (const post of blog) {
    if (import.meta.env.PROD && post.data.draft) continue;
    const key = post.data.translationKey || post.slug;
    if (!groups[key]) {
      groups[key] = {};
    }
    const lang = getLangFromSlug(post.slug);
    groups[key][lang] = post;
  }

  // Static pages that have zh version
  const staticPages = [
    {en: '/', zh: '/zh'},
    {en: '/about', zh: '/zh/about'},
    {en: '/search', zh: '/zh/search'},
    {en: '/archive/1', zh: '/zh/archive/1'},
    {en: '/feed/1', zh: '/zh/feed/1'},
    {en: '/tags', zh: '/zh/tags'},
    {en: '/category/frontend', zh: '/zh/category/frontend'},
  ];

  const urls = [];

  // Blog pages
  for (const [key, pair] of Object.entries(groups)) {
    const enPost = pair['en'];
    const zhPost = pair['zh'];

    if (enPost) {
      const enSlug = stripLangPrefix(enPost.slug);
      const zhSlug = zhPost ? stripLangPrefix(zhPost.slug) : enSlug;
      const enUrl = `/blog/${enSlug}/`;
      const zhUrl = `/zh/blog/${zhSlug}/`;
      urls.push({loc: enUrl, alternates: [{lang: 'en', href: enUrl}, {lang: 'zh-CN', href: zhUrl}]});
    }
    if (zhPost) {
      const zhSlug = stripLangPrefix(zhPost.slug);
      const enSlug = enPost ? stripLangPrefix(enPost.slug) : zhSlug;
      const zhUrl = `/zh/blog/${zhSlug}/`;
      const enUrl = `/blog/${enSlug}/`;
      urls.push({loc: zhUrl, alternates: [{lang: 'en', href: enUrl}, {lang: 'zh-CN', href: zhUrl}]});
    }
  }

  // Static pages
  for (const page of staticPages) {
    urls.push({loc: page.en, alternates: [{lang: 'en', href: page.en}, {lang: 'zh-CN', href: page.zh}]});
    urls.push({loc: page.zh, alternates: [{lang: 'en', href: page.en}, {lang: 'zh-CN', href: page.zh}]});
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.loc}</loc>
${u.alternates.map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${siteUrl}${a.href}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
