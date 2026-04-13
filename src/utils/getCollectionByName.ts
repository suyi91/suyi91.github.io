import {getCollection} from "astro:content";
import type { Lang } from '../i18n/utils'

export const getCollectionByName = async (name: string, lang?: Lang) => {
  let posts = await getCollection(name);
  if (!posts || posts.length === 0) return []

  posts = posts.filter(({data}) =>
    import.meta.env.PROD ? !data.draft : true
  )

  if (lang) {
    // slug format is "zh/post-name" or "en/post-name"
    const langPosts = posts.filter((p) => p.slug.startsWith(lang + '/'))
    // if no content for this lang, fall back to 'en'
    return langPosts.length > 0
      ? langPosts
      : posts.filter((p) => p.slug.startsWith('en/'))
  }

  return posts
}
