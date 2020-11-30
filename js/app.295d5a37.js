(function(e){function t(t){for(var n,o,i=t[0],u=t[1],c=t[2],l=0,v=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&v.push(s[o][0]),s[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);d&&d(t);while(v.length)v.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==s[i]&&(n=!1)}n&&(a.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},o={app:0},s={app:0},a=[];function i(e){return u.p+"js/"+({desktop:"desktop",websockets:"websockets"}[e]||e)+"."+{desktop:"405d6b16",websockets:"d1d60e34"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.e=function(e){var t=[],r={desktop:1,websockets:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise((function(t,r){for(var n="css/"+({desktop:"desktop",websockets:"websockets"}[e]||e)+"."+{desktop:"fefb20b4",websockets:"a46754a1"}[e]+".css",s=u.p+n,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=a[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===n||l===s))return t()}var v=document.getElementsByTagName("style");for(i=0;i<v.length;i++){c=v[i],l=c.getAttribute("data-href");if(l===n||l===s)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||s,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete o[e],d.parentNode.removeChild(d),r(a)},d.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,r){n=s[e]=[t,r]}));t.push(n[2]=a);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var v=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(d);var r=s[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;v.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",v.name="ChunkLoadError",v.type=n,v.request=o,r[1](v)}s[e]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/task-atlant/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var v=0;v<c.length;v++)t(c[v]);var d=l;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),r("router-link",{attrs:{to:"/websockets"}},[e._v("Websockets")]),e._v(" | "),r("router-link",{attrs:{to:"/desktop"}},[e._v("Desktop")])],1),r("router-view")],1)},s=[],a=r("2877"),i={},u=Object(a["a"])(i,o,s,!1,null,null,null),c=u.exports,l=(r("d3b7"),r("8c4f")),v=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("h1",[e._v(" Комментарии по коду/реализации ")]),n("div",[n("h2",[e._v(" Общее ")]),n("div",[n("h4",[e._v(" Ипользуемые ресурсы/библиотеки ")]),e._v(" SASS, prettier, vuecli, vuerouter. Остальное - нативно/через vuejs ")]),n("div",[n("h4",[e._v(" Почему именно такие настройки prettier? ")]),e._v(" Привычка. Переучиться на новое будет совсем не сложно, но такие настройки были на прошлых проектах ")]),n("div",[n("h4",[e._v(" Почему бы не подключить %libraryName%? ")]),e._v(" Было очень интересно сделать рабочий стол максимально нативно. А в сокетах нет ничего сложного, для чего подключение чего-либо было бы выгодным ")]),n("div",[n("h4",[e._v(" Почему так некрасиво? ")]),e._v(" Функционально! Про красоту требований не было, поэтому прототип делался максимально функционально. При это удобство пользования всё же не забывалось (всё же тестить сами будем, о себе позаботиться тоже надо ^_^) ")])]),n("div",[n("h2",[e._v(" Desktop ")]),n("div",[n("h4",[e._v(" Метод кеширования ")]),e._v(" localStorage. Эти данные не критичны для безопасности, поэтому можно и так. Если бы был бэк - можно было бы хранить там, чтобы синхронизировать на разных устройствах. ")]),n("div",[n("h4",[e._v(" Почему без vuex? ")]),e._v(" Vuex всё же предпочитаю для случаев, когда надо синхронизировать данные многих компонент. Или для очень сложных формочек. Здесь все данные умещаются в одной и нигде больше не нужны и никогда не будут нужны. ")]),n("div",[n("h4",[e._v(" Зачем файл constants.js? ")]),e._v(" Чтобы вынести все константы в отдельный файл и не засорять основной. ")]),n("div",[n("h4",[e._v(" Почему позиция окна пихается в props, а не устанавливается в родительской компоненте? ")]),e._v(" Потому что может появиться в будущем идея такого окна, для которого будет важно знать свой размер. И даже если этого не случится - текущая реализация не дает много мусора или каких-либо ударов по производительности ")]),n("div",[n("h4",[e._v(' v-bind="item"? ')]),e._v(" Ага. Коротко и ясно. ")]),n("div",[n("h4",[e._v(" Почему isMoving и isResizing - разные переменные? ")]),e._v(" Так исторически сложилось. Возможно, стоило бы просто оставить одну и сделать поле-индикатор. Но у них чуть разная структура, поэтому поэтому не вижу определенного выигрыша в любом из вариантов ")]),n("div",[n("h4",[e._v(" Как можно улучшить? Что для этого сделать? ")]),n("p",[e._v(" Объединить переменную стиля $resize-border-size и edgeVisualWidth в константах ")]),n("p",[e._v(" Предусмотреть при загрузке из кеша нормирование всех level. То есть сделать вместо текущих возможных 1, 2, 1000, 34863 нормальные 1, 2, 3, 4. Иначе можно вылезти за предел (хотя и ОЧЕНЬ нескоро) ")]),n("p",[e._v(" Считать позицию окон не в абсолютных величинах при сохранении-загрузке окон. Иначе окно может оказаться за пределами экрана без возможности даже узнать о том, что оно там есть ")]),n("p",[e._v(" Можно динамически вешать/снимать listener'ы mousemove/mouseup. Но это настолько мелкие операции проверки, что их совсем не жалко кидать каждый tick. На рекламных лендингах намного больше навешано и ничего, работают и быстро. ")])])]),n("div",[n("h2",[e._v(" Websockets ")]),n("div",[n("h4",[e._v(" Зачем отдельно делать переменную статуса? ")]),e._v(" Потому что состояние websocket'а, если смотреть на него - не реактивно. Поэтому приходится дублировать и через callback'и менять. ")]),n("div",[n("h4",[e._v(" Зачем shownFields? ")]),e._v(' Когда делаем таблицу, то первая же хотелка - "а давайте скрывать столбцы и сортироку добавим!". Вот сразу для этого. ')]),n("div",[n("h4",[e._v(" А почему данные транзакций храним полностью, а для вывода каждый раз форматируем? ")]),e._v(" Потому что данные терять не стоит. А форматируя для вывода мы позволяем в будущем еще приделать относительно быстро пагинацию, фильтр, сортировку итд. Да, на большом количестве данных будет тормозирить. Тогда и приделаем пагинацию и всё снова станет хорошо. ")]),n("div",[n("h4",[e._v(" Что можно улучшить? ")]),n("p",[e._v(" Сделать статус более понятным (сейчас он очень базово реализован) и выводить его ")])])])])}],p={name:"Home",components:{}},f=p,h=Object(a["a"])(f,v,d,!1,null,null,null),_=h.exports;n["a"].use(l["a"]);var m=[{path:"/",name:"Home",component:_},{path:"/desktop",name:"Desktop",component:function(){return r.e("desktop").then(r.bind(null,"08be"))}},{path:"/websockets",name:"Websockets",component:function(){return r.e("websockets").then(r.bind(null,"79ea"))}}],b=new l["a"]({mode:"hash",base:"/task-atlant/",routes:m}),k=b,g=r("2f62");n["a"].use(g["a"]);var w=new g["a"].Store({state:{},mutations:{},actions:{},modules:{}});n["a"].config.productionTip=!1,new n["a"]({router:k,store:w,render:function(e){return e(c)}}).$mount("#app")},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.295d5a37.js.map