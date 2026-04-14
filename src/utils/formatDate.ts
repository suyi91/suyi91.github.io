import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import utc from "dayjs/plugin/utc";
import { useTranslations, type Lang } from '../i18n/utils';

dayjs.extend(advancedFormat)
dayjs.extend(utc);

export function formatDate(date: Date | string | undefined, lang: Lang = 'en', dateType = 'post.dateFormat'): string {
  if (!date) return ''
  const t = useTranslations(lang)
  const dateFormat = t(dateType) || 'YYYY-MM-DD'
  return dayjs(date).utc().format(dateFormat)
}
