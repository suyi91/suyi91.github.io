import rss from '@astrojs/rss';
import {site} from "../consts";
import {getCollection} from "astro:content";

export async function GET(context) {
  const blog = (await getCollection('blog')).filter((post) => {
    if (import.meta.env.PROD && post.data.draft) return false;
    return !post.slug.startsWith('zh/');
  });
  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ? post.data.description : post.body.substring(0, 140).replace(/#/gi, "") + "...",
      link: `/blog/${post.slug.replace(/^(en|zh)\//, '')}/`,
    })),
  });
}
