(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.3"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}class v extends _{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||t:void 0})),t&&r&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class m{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"f932af0a43e3df0737f00be9dfba8fe9","url":"404.html"},{"revision":"3ba4df1f528b3163ec1268a4a4becdef","url":"assets/css/styles.f7a934f9.css"},{"revision":"cea99ecb44f4bebac47070e31160117f","url":"assets/js/01a85c17.f1151e71.js"},{"revision":"fc8ac26ad847bc7131a9dc4b0ac68719","url":"assets/js/031793e1.967d7fd9.js"},{"revision":"c9e3a340397b7d16d29c84bf3bf92e21","url":"assets/js/096bfee4.0ea6cf78.js"},{"revision":"b837b708cd40a3f6ddced98acd62b1ab","url":"assets/js/0e384e19.9046354d.js"},{"revision":"eccb1b7adebf79d7cc2755283c1a02d8","url":"assets/js/143.b9a8a6a8.js"},{"revision":"cace8a0e6e0052120b1d512a5515d95a","url":"assets/js/14eb3368.956ae791.js"},{"revision":"236890532a4b34694dd22457ed2d2638","url":"assets/js/16e200d8.9225554f.js"},{"revision":"e59a0a0b04a8a28c21ea2e07b6f5a6a4","url":"assets/js/17896441.2bedab04.js"},{"revision":"ab79ed5081d42920941fa70a52032f17","url":"assets/js/18c41134.92cebc55.js"},{"revision":"13dfad70aca427e83fce6d8f74a103b7","url":"assets/js/1be78505.881b4746.js"},{"revision":"b81cdcde84210d95dc264ee35523671b","url":"assets/js/1e4232ab.3e1d2301.js"},{"revision":"140151050457652a0fdd1df2ae4d9d7e","url":"assets/js/1f391b9e.a545949c.js"},{"revision":"8ef7f16009385c22961dc1169b28344d","url":"assets/js/230.fbc0b781.js"},{"revision":"d2efa00643013433c27c2666107e2b4e","url":"assets/js/2529.b3878275.js"},{"revision":"5be47dfb32eaebcff3f2994f06c14c76","url":"assets/js/30a24c52.c31ca327.js"},{"revision":"3032b47d2ccf3b8d20399259826d090d","url":"assets/js/3339.28556047.js"},{"revision":"1ec2e8105267dbabe0d536bcc86b73ab","url":"assets/js/3343.6d8e02b9.js"},{"revision":"1742c13fd1521baf3e1aa285138c3cb7","url":"assets/js/393be207.c31917b1.js"},{"revision":"a2746cfe9c26394635ae46a0edbcab32","url":"assets/js/4972.468843e2.js"},{"revision":"58d5714c27804c8a4a12aec37736fcd3","url":"assets/js/4c9e35b1.0687bdfb.js"},{"revision":"bd5309695771130cb77073c89a0635e1","url":"assets/js/50328fde.d0cf1e89.js"},{"revision":"9502cc4e7fa39cffc320baef3441f436","url":"assets/js/5131.c3c792db.js"},{"revision":"73431a48260289b27928b9a44ce32fe7","url":"assets/js/5283.c0c1882c.js"},{"revision":"c9e4232e7ed242a574251ffbf2cc103a","url":"assets/js/533a09ca.8e7380e1.js"},{"revision":"7e230a06af021fb81db30101c263d1a3","url":"assets/js/59362658.2598a943.js"},{"revision":"6b3b5f6020d2f3c43917d83ef58654b7","url":"assets/js/5c868d36.8b3ebf84.js"},{"revision":"7ff59256fccad1c85a6c1d751bde183e","url":"assets/js/608ae6a4.927c9a98.js"},{"revision":"4a9422136825e9bf266126107c3da06b","url":"assets/js/66406991.93027260.js"},{"revision":"ba3f8c386deb2147975a0ada67dee2a9","url":"assets/js/6875c492.0895308e.js"},{"revision":"06d4d95aa963bfd155deb2776b6b18d6","url":"assets/js/73664a40.bac2e33e.js"},{"revision":"95507f7e49dbcd86980198ff9e57ef24","url":"assets/js/7661071f.126bdf76.js"},{"revision":"0a38221665e0df63bed08d0e0190a1a9","url":"assets/js/814f3328.173ce81a.js"},{"revision":"f61745df0228823bf07425168cf9a948","url":"assets/js/822bd8ab.a00e6ddf.js"},{"revision":"8e6e145291850629af5c828972e9287d","url":"assets/js/82afa9ee.0cd96706.js"},{"revision":"856546a0bfc386404684f203b71f5efd","url":"assets/js/8717b14a.782278f7.js"},{"revision":"de0dd14fa04668b7bfeb637d05949434","url":"assets/js/925b3f96.f932d721.js"},{"revision":"65e646effda901142c4fecc38458b0f1","url":"assets/js/935f2afb.c78141a8.js"},{"revision":"487111a4a5a62f257155829288c0ce2f","url":"assets/js/9878.a118369f.js"},{"revision":"fd46f8994c4b8d32f466e9e7634bd714","url":"assets/js/9e4087bc.59b4a497.js"},{"revision":"a8e1764ef40f65e8d6d285dd8c4745fa","url":"assets/js/a6aa9e1f.b3916f8b.js"},{"revision":"45e05ffc13a02c72dc199b8eab115cba","url":"assets/js/a7023ddc.88fccdcc.js"},{"revision":"ebe459730260c61c8c0d89f86d8d9e63","url":"assets/js/a80da1cf.9403aa59.js"},{"revision":"3e7cd719fa6ef76adcbc9a3a836556a2","url":"assets/js/b2b675dd.361086ca.js"},{"revision":"2fc597e286bc78391bbaab11c69ee990","url":"assets/js/b2f554cd.2ea6032f.js"},{"revision":"8076ee15514f067b4ec9f7a99ddd622c","url":"assets/js/c4f5d8e4.31b19557.js"},{"revision":"b93ca43b60c81f8d1cf2beb4a6a2c16a","url":"assets/js/c844b82d.35b15e16.js"},{"revision":"a912bdda69fba981207fdf66b54b6abe","url":"assets/js/ccc49370.72b8d31f.js"},{"revision":"667f866465ac3a0e4464c803b32da9fc","url":"assets/js/d9f32620.6ff8e783.js"},{"revision":"a7dfe4f2371c700cbad4dc433689172b","url":"assets/js/dff1c289.c6daad89.js"},{"revision":"67155c8c8ba2d743430acaadc50c86cc","url":"assets/js/e16015ca.20d9fd54.js"},{"revision":"2ecf1a8921954bd9b0b65962d24e08d3","url":"assets/js/e273c56f.9d7ac6df.js"},{"revision":"3496e94118af72bf726d2b96d7eeabf3","url":"assets/js/e44a2883.9e4c0b5b.js"},{"revision":"2f586670d04667dc72ad8c795d53acb1","url":"assets/js/ea88f2a1.07573977.js"},{"revision":"90bf8ca28b91a61ec2fde1170819dd91","url":"assets/js/f4f34a3a.aff082c1.js"},{"revision":"66cddee3c1281212181c49c5fc3301da","url":"assets/js/f55d3e7a.eaa262f7.js"},{"revision":"df0026cd6e05170fae9c4f313b195494","url":"assets/js/main.d28ef510.js"},{"revision":"e8b62ffad430dacc7d88ec7e9a18b8fe","url":"assets/js/runtime~main.049a1782.js"},{"revision":"04c48bf8d5f4e2cd29b1371126b3b8e8","url":"blog.html"},{"revision":"f5142fece5548f996a7e3e38be6c8164","url":"blog/archive.html"},{"revision":"8c7c8e38f89a3466c2f819da4295e29e","url":"blog/first-blog-post.html"},{"revision":"c674a1401d6b0eafb828bae1059ad619","url":"blog/long-blog-post.html"},{"revision":"fb6db99398afd8e7fb1cb8a1f41f7eb5","url":"blog/mdx-blog-post.html"},{"revision":"aed24724b339b86987facd3753f8b29f","url":"blog/tags.html"},{"revision":"199c9b3564d7022b1dd8fdc623859cfb","url":"blog/tags/docusaurus.html"},{"revision":"72f11c2241a0fa3d40fdb7810f59cf01","url":"blog/tags/facebook.html"},{"revision":"ca1b72881797e2c166622e1a213b4936","url":"blog/tags/hello.html"},{"revision":"053451206145a55639dfa6046bdaf6f2","url":"blog/tags/hola.html"},{"revision":"e093395808d704d1122776e7a4fb07bc","url":"blog/welcome.html"},{"revision":"9d01e7dd01ce701658947e2d60367b93","url":"docs/category/tutorial---basics.html"},{"revision":"385fcb9a1caf808a14abfb59a6e28840","url":"docs/category/tutorial---extras.html"},{"revision":"16f8c43a4bf990cf828d617ed5737713","url":"docs/intro.html"},{"revision":"6e4cfa9124d7a7702473f1e76cc99ef1","url":"docs/tutorial-basics/congratulations.html"},{"revision":"6fdd3fff1c994c81d8ef9ad42a4d09f0","url":"docs/tutorial-basics/create-a-blog-post.html"},{"revision":"997b2d6bfddda572d1a3bed03851383d","url":"docs/tutorial-basics/create-a-document.html"},{"revision":"232d93f831a18f4edbf0fcf961b583cd","url":"docs/tutorial-basics/create-a-page.html"},{"revision":"84251295ddbeb497684709aa1ee808ab","url":"docs/tutorial-basics/deploy-your-site.html"},{"revision":"ff89067a8bdb5a734bb742a643644879","url":"docs/tutorial-basics/markdown-features.html"},{"revision":"2a0fae2c35693302a25aa79125379334","url":"docs/tutorial-extras/manage-docs-versions.html"},{"revision":"4a90083da2900de1d848ab95dde02d98","url":"docs/tutorial-extras/translate-your-site.html"},{"revision":"7bf03b1e2e8e67c11690eed0da563f9b","url":"index.html"},{"revision":"973eb21f0f82b4a5f6491c0d67adee4c","url":"lunr-index-1680128363224.json"},{"revision":"973eb21f0f82b4a5f6491c0d67adee4c","url":"lunr-index.json"},{"revision":"f6b8c336564c38db253d4caac5ab576a","url":"manifest.json"},{"revision":"8eb5273b0238b30dbc0e025cbb12e526","url":"markdown-page.html"},{"revision":"44645cc4ba805e09204a4b660ac431a2","url":"search-doc-1680128363224.json"},{"revision":"44645cc4ba805e09204a4b660ac431a2","url":"search-doc.json"},{"revision":"2cfd2820f70c76883c0102f397972c3c","url":"assets/images/docsVersionDropdown-35e13cbe46c9923327f30a76a90bff3b.png"},{"revision":"192a6a160f31b1689a4c6233bdbbb803","url":"assets/images/docusaurus-plushie-banner-a60f7593abca1e3eef26a9afa244e4fb.jpeg"},{"revision":"e87b53839259be1a7bc8d0283cc48c37","url":"assets/images/localeDropdown-f0d995e751e7656a1b0dbbc1134e49c2.png"},{"revision":"950ce65bb168c00fd27b771875a4baf7","url":"icons/icon-128x128.png"},{"revision":"6af74821979adcef70c24c404b6fb401","url":"icons/icon-144x144.png"},{"revision":"2336a8bea2edf0e03f88290509fbd63a","url":"icons/icon-152x152.png"},{"revision":"ed6282c307a8d0082f27a89b7b31edd1","url":"icons/icon-192x192.png"},{"revision":"05bfea6198bb8aee3cfad9ed00931d5d","url":"icons/icon-72x72.png"},{"revision":"bdcda7451b003b800fed9a7ee933e4a2","url":"icons/icon-96x96.png"},{"revision":"6d341295d4bbc9802daaba598a390489","url":"icons/icon.png"},{"revision":"000de4a48405bd21b7eec1abc07ede6c","url":"img/docusaurus-social-card.jpg"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"4343e07bf942aefb5f334501958fbc0e","url":"img/favicon.ico"},{"revision":"ac229d00ed571523017eb770035afd07","url":"img/idempiere-social-card.jpg"},{"revision":"2fe675fa5e054805c426256f83960430","url":"img/logo.png"},{"revision":"aa4fa2cdc39d33f2ee3b8f245b6d30d9","url":"img/logo.svg"},{"revision":"a6b83d7b4c3cf36cb21eb7a9721716dd","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"b64ae8e3c10e5ff2ec85a653cfe6edf8","url":"img/undraw_docusaurus_react.svg"},{"revision":"8fa6e79a15c385d7b2dc4bb761a2e9e3","url":"img/undraw_docusaurus_tree.svg"}],s=new m({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=new URL(e,self.location.href);return t.origin!==self.location.origin?[]:(t.search="",t.hash="",[t.href,`${t.href}${t.pathname.endsWith("/")?"":"/"}index.html`])}(a);for(const i of n){const r=s.getCacheKeyForURL(i);if(r){const s=caches.match(r);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:i,possibleURLs:n,cacheKey:r,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();