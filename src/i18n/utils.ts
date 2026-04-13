import { en } from './en'
import { zhCn } from './zhCn'
import { cs } from './cs'
import { config } from '../consts'

export type Lang = 'en' | 'zh'

const ui = {
  en,
  zh: zhCn,
  cs,
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/')
  if (lang === 'zh') return 'zh'
  return 'en'
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang]?.[key] ?? ui['en'][key] ?? key
  }
}

// Backward compat: default uses config.lang mapped to Lang type
export const t = useTranslations(config.lang === 'zh-cn' ? 'zh' : 'en')
