(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"4M6O":function(t,e,n){"use strict";n("rE2o"),n("ioFf"),n("RW0V"),n("rGqo"),n("yt8O"),n("Btvt"),n("XfO3"),n("T39b");var i=n("TqRt");e.__esModule=!0,e.insertScript=function(t,e,n){var i=window.document.createElement("script");return i.async=!0,i.src=t,i.id=e,n.appendChild(i),i},e.removeScript=function(t,e){var n=window.document.getElementById(t);n&&e.removeChild(n)},e.debounce=function(t,e,n){var i;return function(){var o=this,r=arguments,s=function(){i=null,n||t.apply(o,r)},a=n&&!i;window.clearTimeout(i),i=setTimeout(s,e),a&&t.apply(o,r)}},e.isReactElement=r,e.shallowComparison=function(t,e){var n=new Set(Object.keys(t),Object.keys(e)),i=Array.isArray(n),o=0;for(n=i?n:n[Symbol.iterator]();;){var s;if(i){if(o>=n.length)break;s=n[o++]}else{if((o=n.next()).done)break;s=o.value}var a=s;if(t[a]!==e[a]&&!r(t[a]))return!0}return!1};var o=i(n("q1tI"));function r(t){return!!o.default.isValidElement(t)||!!Array.isArray(t)&&t.some((function(t){return o.default.isValidElement(t)}))}},ORnI:function(t,e,n){"use strict";var i=n("TqRt");e.__esModule=!0,e.default=void 0;var o=i(n("VUT9"));e.Disqus=o.default;var r=i(n("qASQ"));e.CommentCount=r.default;var s=o.default;e.default=s},VUT9:function(t,e,n){"use strict";var i=n("TqRt");e.__esModule=!0,e.default=void 0;var o=i(n("pVnL")),r=i(n("8OQS")),s=i(n("VbXa")),a=i(n("q1tI")),d=i(n("17x9")),u=n("4M6O"),c=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="suyi91",e.config?n.config=e.config:n.config={identifier:e.identifier,url:e.url,title:e.title},n}(0,s.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){"undefined"!=typeof window&&window.document&&this.shortname&&this.cleanInstance(),this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,u.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){if("undefined"!=typeof window&&window.document&&this.shortname){var t=this.config;window.disqus_config=function(){this.page.identifier=t.identifier,this.page.title=t.title,this.page.url=t.url},(0,u.insertScript)("https://"+this.shortname+".disqus.com/embed.js","disqus-embed-script",window.document.body)}},n.cleanInstance=function(){(0,u.removeScript)("disqus-embed-script",window.document.body),window&&window.DISQUS&&window.DISQUS.reset();try{delete window.DISQUS}catch(e){window.DISQUS=void 0}var t=window.document.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)},n.render=function(){var t=this.props,e=(t.config,(0,r.default)(t,["config"]));return a.default.createElement("div",(0,o.default)({id:"disqus_thread"},e,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:73},__self:this}))},e}(a.default.Component);e.default=c,c.propTypes={config:d.default.shape({identifier:d.default.string,title:d.default.string,url:d.default.string}),identifier:d.default.string,title:d.default.string,url:d.default.string}},qASQ:function(t,e,n){"use strict";var i=n("TqRt");e.__esModule=!0,e.default=void 0;var o=i(n("pVnL")),r=i(n("8OQS")),s=i(n("VbXa")),a=i(n("q1tI")),d=i(n("17x9")),u=n("4M6O"),c=(0,u.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),l=function(t){function e(e){var n;return(n=t.call(this,e)||this).shortname="suyi91",n}(0,s.default)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(t){return this.props!==t&&(0,u.shallowComparison)(this.props,t)},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?c():(0,u.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,u.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var t=this.props,e=t.config,n=t.placeholder,i=(0,r.default)(t,["config","placeholder"]);return a.default.createElement("span",(0,o.default)({className:"disqus-comment-count","data-disqus-identifier":e.identifier,"data-disqus-url":e.url},i,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:49},__self:this}),n)},e}(a.default.Component);e.default=l,l.defaultProps={placeholder:"..."},l.propTypes={config:d.default.shape({identifier:d.default.string,title:d.default.string,url:d.default.string}),placeholder:d.default.string}},sweJ:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",(function(){return p}));var i=n("q1tI"),o=n.n(i),r=n("17x9"),s=n.n(r),a=n("ORnI"),d=n("vrFN"),u=n("Bl7J"),c=n("rgsX"),l=n("x2Lh"),f=function(t){var e=t.data,n=t.pageContext,i=t.location,r=e.markdownRemark,s=r.frontmatter,f=s.title,p=s.date,m=s.path,h=s.author,w=s.coverImage,v=s.excerpt,g=s.tags,y=r.excerpt,b=r.id,q=r.html,I=n.next,S=n.previous,C=Object(l.a)({location:i,path:m,title:f});return o.a.createElement(u.a,null,o.a.createElement(d.a,{title:f,description:v||y}),o.a.createElement(c.a,{key:b,title:f,date:p,path:m,author:h,coverImage:w,html:q,tags:g,previousPost:S,nextPost:I}),o.a.createElement(a.Disqus,{config:C,style:{width:"100%"}}))};e.default=f,f.propTypes={data:s.a.object.isRequired,pageContext:s.a.shape({next:s.a.object,previous:s.a.object}),location:s.a.object.isRequired};var p="2649831006"}}]);
//# sourceMappingURL=component---src-templates-page-js-693f352b3798e2b1f1c8.js.map