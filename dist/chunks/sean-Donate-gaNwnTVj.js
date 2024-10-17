import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from './sean-astro/server-BJyMlwxL.js';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { d as donate } from './sean-_astro_content-B5Xhww3n.js';

createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mt-4"> <div class="esa-sponsor"> <div class="tip flex items-center justify-center my-4"> ${donate.tip} </div> <div class="flex items-center justify-center"> <div id="alipay" class="border rounded-tl-lg rounded-bl-lg p-2"> <img src="/alipay.svg" class="h-4" alt="alipay"> </div> <div id="wechatpay" class="border-t border-b p-2"> <img src="/wechat.svg" class="h-4" alt="wechat"> </div> <a class="border rounded-tr-lg rounded-br-lg p-2"${addAttribute(donate.paypalUrl, "href")} target="_blank"> <img src="/paypal.svg" class="h-4" alt="paypal"> </a> </div> <div class="qrshow"> <img${addAttribute(donate.alipayQRCode, "src")} alt="alipayQRCode"> </div> <div class="qrshow"> <img${addAttribute(donate.wechatQRCode, "src")} alt="wechatQRCode"> </div> </div> </div> `;
}, "/Users/sean/my-astro-blog/src/components/Donate.astro", void 0);
