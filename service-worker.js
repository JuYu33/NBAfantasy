"use strict";var precacheConfig=[["/NBAfantasy/index.html","185dcdbc959125779fa191bbb9192077"],["/NBAfantasy/static/css/main.7c2e2e1e.css","33123d67d802e6cbc849dedb383d4b79"],["/NBAfantasy/static/js/main.45d8bb4e.js","ae9afb353f7065d78ce02094c53dc731"],["/NBAfantasy/static/media/ATL.cee527d5.svg","cee527d5fa349dca94bc35aaca6f73ef"],["/NBAfantasy/static/media/BKN.ef522259.svg","ef52225977568ae6bddcf159cb0007f2"],["/NBAfantasy/static/media/BOS.605ba2a5.svg","605ba2a566b63162d2d1801e6ed9bf9e"],["/NBAfantasy/static/media/CHA.84949a29.svg","84949a29b4f2d55d7438c9056591445e"],["/NBAfantasy/static/media/CHI.ff13916f.svg","ff13916f670537d1e4b43cfaac69789e"],["/NBAfantasy/static/media/CLE.287062bf.svg","287062bf5047ff9f21f73e3f0cc9a8d3"],["/NBAfantasy/static/media/DAL.87114886.svg","87114886042d4220a7c674932e19461f"],["/NBAfantasy/static/media/DEN.a45125d2.svg","a45125d2a287a4484e3c5552ca8dc217"],["/NBAfantasy/static/media/DET.ae399b19.svg","ae399b19e70d567562ac96089357c760"],["/NBAfantasy/static/media/GSW.9c91d0d5.svg","9c91d0d562a31df035401e7cec29afb0"],["/NBAfantasy/static/media/HOU.d91bdb56.svg","d91bdb56105205eaa626b9edc8ab9558"],["/NBAfantasy/static/media/IND.a86733e5.svg","a86733e58a5935d010e809e3aa788e8b"],["/NBAfantasy/static/media/LAC.e63f6635.svg","e63f6635aa1f43afb048fb8475f5dcc9"],["/NBAfantasy/static/media/LAL.6de8407f.svg","6de8407f4d4e0dbe01906e6b26b5c34f"],["/NBAfantasy/static/media/MEM.10726c5b.svg","10726c5bcb25278ce4b64ea7eae65f3e"],["/NBAfantasy/static/media/MIA.9cdd831a.svg","9cdd831a31754a7beb8cb132c4dcd5b1"],["/NBAfantasy/static/media/MIL.d43cf056.svg","d43cf056d9247d1bd192d168efb1d591"],["/NBAfantasy/static/media/MIN.a92f2c41.svg","a92f2c411ef9a98615a2a29e53eb26ad"],["/NBAfantasy/static/media/NOP.65488d5f.svg","65488d5f2ca6692ca110d93eed77f31d"],["/NBAfantasy/static/media/NYK.9d91c050.svg","9d91c0503f07736523e3844e2daca9d4"],["/NBAfantasy/static/media/OKC.e93ce0dc.svg","e93ce0dc9e51056bf7bca5696778c7d0"],["/NBAfantasy/static/media/ORL.cdd504dd.svg","cdd504ddffadd78cbb80990eb8cedea4"],["/NBAfantasy/static/media/PHI.9b8ebfa9.svg","9b8ebfa99eec1c607b7b848098b191ff"],["/NBAfantasy/static/media/PHX.882efa62.svg","882efa626154883d6d029dd075244ac1"],["/NBAfantasy/static/media/POR.973172de.svg","973172de70ef476825daa7bd08b5d693"],["/NBAfantasy/static/media/SAC.2ad59a5c.svg","2ad59a5c43454f08c20f2d92c6582d44"],["/NBAfantasy/static/media/SAS.e79b4401.svg","e79b440121c7c83a7f3562183a939e93"],["/NBAfantasy/static/media/TOR.98cb0781.svg","98cb0781df78d3dedcf93d2de66186e2"],["/NBAfantasy/static/media/UTA.23f3ffea.svg","23f3ffea6417afc93bdf848dacf2b307"],["/NBAfantasy/static/media/WAS.99bb146c.svg","99bb146c070afa37aa400858c69cb29a"],["/NBAfantasy/static/media/basketball.f5129201.svg","f51292010c5f2decd478f71725b5e1d9"],["/NBAfantasy/static/media/cal.336692e2.png","336692e21f072cda0ebb21d38da9f6d2"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),c=createCacheKey(s,hashParamName,t,/\.\w{8}\./);return[s.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(s){return setOfCachedUrls(s).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return s.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),s="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,s),e=urlsToCacheKeys.has(t));var c="/NBAfantasy/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});