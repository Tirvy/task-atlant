(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["websockets"],{"09fd":function(t,n,e){"use strict";e("37a8")},"13d5":function(t,n,e){"use strict";var s=e("23e7"),o=e("d58f").left,i=e("a640"),r=e("ae40"),a=e("2d00"),c=e("605d"),u=i("reduce"),d=r("reduce",{1:0}),f=!c&&a>79&&a<83;s({target:"Array",proto:!0,forced:!u||!d||f},{reduce:function(t){return o(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"1dde":function(t,n,e){var s=e("d039"),o=e("b622"),i=e("2d00"),r=o("species");t.exports=function(t){return i>=51||!s((function(){var n=[],e=n.constructor={};return e[r]=function(){return{foo:1}},1!==n[t](Boolean).foo}))}},"37a8":function(t,n,e){},"65f0":function(t,n,e){var s=e("861d"),o=e("e8b5"),i=e("b622"),r=i("species");t.exports=function(t,n){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)?s(e)&&(e=e[r],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===n?0:n)}},"79ea":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"websockets-page-container"},[e("div",{staticClass:"controls-row"},[e("div",{staticClass:"button",class:{disabled:!t.canListen},on:{click:t.listenToTransactions}},[t._v(" Запуск ")]),e("div",{staticClass:"button",class:{disabled:!t.canStop},on:{click:t.stopListeningToTransactions}},[t._v(" Остановка ")]),e("div",{staticClass:"button",class:{disabled:!t.sum},on:{click:t.clearTransactions}},[t._v(" Сброс ")])]),e("div",{staticClass:"controls-row"},[e("div",{staticClass:"sum-thing"},[t._v("SUM: "+t._s(t.sum))])]),e("div",[e("table",{staticClass:"transactions-table"},[e("tr",{staticClass:"table-header"},t._l(t.shownFields,(function(n){return e("td",{key:n.key},[t._v(" "+t._s(n.name)+" ")])})),0),t._l(t.transactionsFormatted,(function(n,s){return e("tr",{key:s},t._l(t.shownFields,(function(s){return e("td",{key:s.key},[t._v(t._s(n[s.key])+" "+t._s(s.postfix))])})),0)}))],2)])])},o=[],i=(e("a15b"),e("d81d"),e("13d5"),[{id:"disabled",name:"Отключено"},{id:"stopped",name:"Остановлено"},{id:"listening",name:"Слушаем"}].reduce((function(t,n){return t[n.id]=n,t}),{})),r={name:"Websockets",data:function(){return{transactions:[],status:i.disabled,websocket:null}},mounted:function(){this.websocket=new WebSocket("wss://ws.blockchain.info/inv"),this.websocket.onopen=this.handleWebsocketOpen,this.websocket.onclose=this.handleWebsocketClose,this.websocket.onmessage=this.handleWebsocketMessage,this.websocket.onerror=this.handleWebsocketError},beforeUnmount:function(){this.websocket.close()},computed:{canListen:function(){return"stopped"===this.status.id},canStop:function(){return"listening"===this.status.id},shownFields:function(){return[{key:"from",name:"FROM"},{key:"to",name:"TO"},{key:"value",name:"SUM",postfix:" BTC"}]},transactionsFormatted:function(){return this.transactions.map((function(t){return{from:t.inputs.map((function(t){return t.prev_out.addr})).join(",\n"),to:t.out.map((function(t){return t.addr})).join(",\n"),value:t.out.reduce((function(t,n){return t+n.value}),0)/1e8}}))},sum:function(){return this.transactionsFormatted.reduce((function(t,n){return t+n.value}),0)}},methods:{listenToTransactions:function(){this.sendWebsocketMessage({op:"unconfirmed_sub"})&&(this.status=i.listening)},stopListeningToTransactions:function(){this.sendWebsocketMessage({op:"unconfirmed_unsub"})&&(this.status=i.stopped)},clearTransactions:function(){this.transactions=[]},handleWebsocketOpen:function(){this.status=i.stopped,this.sendWebsocketMessage({op:"ping"})},handleWebsocketClose:function(){this.status=i.disabled},handleWebsocketMessage:function(t){var n=JSON.parse(t.data);n&&"utx"===n.op&&this.transactions.push(n.x)},handleWebsocketError:function(t){console.warn(t)},sendWebsocketMessage:function(t){return"unavailable"!==this.status.id&&1===this.websocket.readyState?(this.websocket.send(JSON.stringify(t)),!0):(console.warn("Attempt to send a message in an unavailable state",t),!1)}}},a=r,c=(e("09fd"),e("c963"),e("2877")),u=Object(c["a"])(a,s,o,!1,null,"db06d57c",null);n["default"]=u.exports},a15b:function(t,n,e){"use strict";var s=e("23e7"),o=e("44ad"),i=e("fc6a"),r=e("a640"),a=[].join,c=o!=Object,u=r("join",",");s({target:"Array",proto:!0,forced:c||!u},{join:function(t){return a.call(i(this),void 0===t?",":t)}})},a640:function(t,n,e){"use strict";var s=e("d039");t.exports=function(t,n){var e=[][t];return!!e&&s((function(){e.call(null,n||function(){throw 1},1)}))}},ae40:function(t,n,e){var s=e("83ab"),o=e("d039"),i=e("5135"),r=Object.defineProperty,a={},c=function(t){throw t};t.exports=function(t,n){if(i(a,t))return a[t];n||(n={});var e=[][t],u=!!i(n,"ACCESSORS")&&n.ACCESSORS,d=i(n,0)?n[0]:c,f=i(n,1)?n[1]:void 0;return a[t]=!!e&&!o((function(){if(u&&!s)return!0;var t={length:-1};u?r(t,1,{enumerable:!0,get:c}):t[1]=1,e.call(t,d,f)}))}},b727:function(t,n,e){var s=e("0366"),o=e("44ad"),i=e("7b0b"),r=e("50c4"),a=e("65f0"),c=[].push,u=function(t){var n=1==t,e=2==t,u=3==t,d=4==t,f=6==t,l=5==t||f;return function(b,h,p,v){for(var k,m,w=i(b),g=o(w),y=s(h,p,3),_=r(g.length),C=0,S=v||a,W=n?S(b,_):e?S(b,0):void 0;_>C;C++)if((l||C in g)&&(k=g[C],m=y(k,C,w),t))if(n)W[C]=m;else if(m)switch(t){case 3:return!0;case 5:return k;case 6:return C;case 2:c.call(W,k)}else if(d)return!1;return f?-1:u||d?d:W}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},c963:function(t,n,e){"use strict";e("f30e")},d58f:function(t,n,e){var s=e("1c0b"),o=e("7b0b"),i=e("44ad"),r=e("50c4"),a=function(t){return function(n,e,a,c){s(e);var u=o(n),d=i(u),f=r(u.length),l=t?f-1:0,b=t?-1:1;if(a<2)while(1){if(l in d){c=d[l],l+=b;break}if(l+=b,t?l<0:f<=l)throw TypeError("Reduce of empty array with no initial value")}for(;t?l>=0:f>l;l+=b)l in d&&(c=e(c,d[l],l,u));return c}};t.exports={left:a(!1),right:a(!0)}},d81d:function(t,n,e){"use strict";var s=e("23e7"),o=e("b727").map,i=e("1dde"),r=e("ae40"),a=i("map"),c=r("map");s({target:"Array",proto:!0,forced:!a||!c},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,n,e){var s=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==s(t)}},f30e:function(t,n,e){}}]);
//# sourceMappingURL=websockets.d1d60e34.js.map