import"./sean-hoisted-1wnBLGwa.js";import"../chunks/sean-Donate.astro_astro_type_script_index_0_lang-RQ03OKpK.js";import{d as E,a as h,t as S}from"../chunks/sean-formatDate-CQW_wamv.js";import{c as H,g as b}from"../chunks/sean-_commonjsHelpers-Cpj98o6Y.js";import{c as j}from"../chunks/sean-consts-dA5GKCQJ.js";import"../chunks/sean-WalineComment.astro_astro_type_script_index_0_lang-C880GxvN.js";var g={exports:{}};(function(_,c){(function(r,o){_.exports=o()})(H,function(){return function(r,o,s){r=r||{};var n=o.prototype,e={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function m(t,d,u,p){return n.fromToBase(t,d,u,p)}s.en.relativeTime=e,n.fromToBase=function(t,d,u,p,T){for(var M,Y,y,v=u.$locale().relativeTime||e,x=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],w=x.length,f=0;f<w;f+=1){var i=x[f];i.d&&(M=p?s(t).diff(u,i.d,!0):u.diff(t,i.d,!0));var l=(r.rounding||Math.round)(Math.abs(M));if(y=M>0,l<=i.r||!i.r){l<=1&&f>0&&(i=x[f-1]);var D=v[i.l];T&&(l=T(""+l)),Y=typeof D=="string"?D.replace("%d",l):D(l,d,i.l,y);break}}if(d)return Y;var L=y?v.future:v.past;return typeof L=="function"?L(Y):L.replace("%s",Y)},n.to=function(t,d){return m(t,d,this,!0)},n.from=function(t,d){return m(t,d,this)};var a=function(t){return t.$u?s.utc():s()};n.toNow=function(t){return this.to(a(this),t)},n.fromNow=function(t){return this.from(a(this),t)}}})})(g);var k=g.exports;const N=b(k);var $={exports:{}};(function(_,c){(function(r,o){_.exports=o(E)})(H,function(r){function o(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var s=o(r),n={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(e,m){return m==="W"?e+"周":e+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(e,m){var a=100*e+m;return a<600?"凌晨":a<900?"早上":a<1100?"上午":a<1300?"中午":a<1800?"下午":"晚上"}};return s.default.locale(n,null,!0),n})})($);h.extend(N);h.locale(j.lang);class B extends HTMLElement{constructor(){super();const c=this.dataset.date,r=this.dataset.index;let o=document.getElementsByClassName("postTimeEle"),s=c?h(c).fromNow():h().format("YYYY-MM-DD");o[r].innerHTML=`${S("feed.publishedIn")}：${s}`}}customElements.define("feed-post-date",B);
