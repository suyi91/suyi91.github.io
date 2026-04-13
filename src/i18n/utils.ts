import { en } from './en'
import { zhCn } from './zhCn'
import { config } from '../consts'

export type Lang = 'en' | 'zh'

const ui = {
  en,
  zh: zhCn,
}

const NON_DEFAULT_LANGS: Lang[] = ['zh']

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/')
  if ((NON_DEFAULT_LANGS as string[]).includes(first)) return first as Lang
  return 'en'
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang]?.[key] ?? ui['en'][key] ?? key
  }
}

// Backward compat: default uses config.lang mapped to Lang type
const configLangMap: Record<string, Lang> = { 'zh-cn': 'zh', 'zh': 'zh', 'en': 'en' }
export const t = useTranslations(configLangMap[config.lang] ?? 'en')
