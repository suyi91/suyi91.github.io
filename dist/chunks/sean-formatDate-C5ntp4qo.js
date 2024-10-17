import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import utc from 'dayjs/plugin/utc.js';
import { t } from './sean-Comment-BjqYC_Gb.js';
import { a as config } from './sean-_astro_content-B5Xhww3n.js';

dayjs.locale(config.lang);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
function formatDate(date, dateType = "post.dateFormat") {
  if (date) {
    const dateFormat = t(dateType) || "YYYY-MM-DD";
    return dayjs(date).utc().format(dateFormat);
  } else {
    return "";
  }
}

export { formatDate as f };
