"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{7543:(E,_,d)=>{d.d(_,{c:()=>l});var e=d(1308),h=d(7864),u=d(1911);const l=(a,o)=>{let c,t;const s=(r,p,v)=>{if(typeof document>"u")return;const w=document.elementFromPoint(r,p);w&&o(w)?w!==c&&(m(),i(w,v)):m()},i=(r,p)=>{c=r,t||(t=c);const v=c;(0,e.c)(()=>v.classList.add("ion-activated")),p()},m=(r=!1)=>{if(!c)return;const p=c;(0,e.c)(()=>p.classList.remove("ion-activated")),r&&t!==c&&c.click(),c=void 0};return(0,u.createGesture)({el:a,gestureName:"buttonActiveDrag",threshold:0,onStart:r=>s(r.currentX,r.currentY,h.a),onMove:r=>s(r.currentX,r.currentY,h.b),onEnd:()=>{m(!0),(0,h.h)(),t=void 0}})}},5062:(E,_,d)=>{d.d(_,{i:()=>e});const e=h=>h&&""!==h.dir?"rtl"===h.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},5106:(E,_,d)=>{d.r(_),d.d(_,{startFocusVisible:()=>l});const e="ion-focused",u=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],l=a=>{let o=[],c=!0;const t=a?a.shadowRoot:document,s=a||document.body,i=y=>{o.forEach(g=>g.classList.remove(e)),y.forEach(g=>g.classList.add(e)),o=y},m=()=>{c=!1,i([])},r=y=>{c=u.includes(y.key),c||i([])},p=y=>{if(c&&void 0!==y.composedPath){const g=y.composedPath().filter(f=>!!f.classList&&f.classList.contains("ion-focusable"));i(g)}},v=()=>{t.activeElement===s&&i([])};return t.addEventListener("keydown",r),t.addEventListener("focusin",p),t.addEventListener("focusout",v),t.addEventListener("touchstart",m),t.addEventListener("mousedown",m),{destroy:()=>{t.removeEventListener("keydown",r),t.removeEventListener("focusin",p),t.removeEventListener("focusout",v),t.removeEventListener("touchstart",m),t.removeEventListener("mousedown",m)},setFocus:i}}},7040:(E,_,d)=>{d.d(_,{C:()=>a,a:()=>u,d:()=>l});var e=d(5861),h=d(5730);const u=function(){var o=(0,e.Z)(function*(c,t,s,i,m,r){var p;if(c)return c.attachViewToDom(t,s,m,i);if(!(r||"string"==typeof s||s instanceof HTMLElement))throw new Error("framework delegate is missing");const v="string"==typeof s?null===(p=t.ownerDocument)||void 0===p?void 0:p.createElement(s):s;return i&&i.forEach(w=>v.classList.add(w)),m&&Object.assign(v,m),t.appendChild(v),yield new Promise(w=>(0,h.c)(v,w)),v});return function(t,s,i,m,r,p){return o.apply(this,arguments)}}(),l=(o,c)=>{if(c){if(o)return o.removeViewFromDom(c.parentElement,c);c.remove()}return Promise.resolve()},a=()=>{let o,c;return{attachViewToDom:function(){var i=(0,e.Z)(function*(m,r,p={},v=[]){var w,y;if(o=m,r){const f="string"==typeof r?null===(w=o.ownerDocument)||void 0===w?void 0:w.createElement(r):r;v.forEach(n=>f.classList.add(n)),Object.assign(f,p),o.appendChild(f),yield new Promise(n=>(0,h.c)(f,n))}else if(o.children.length>0&&!o.children[0].classList.contains("ion-delegate-host")){const n=null===(y=o.ownerDocument)||void 0===y?void 0:y.createElement("div");n.classList.add("ion-delegate-host"),v.forEach(C=>n.classList.add(C)),n.append(...o.children),o.appendChild(n)}const g=document.querySelector("ion-app")||document.body;return c=document.createComment("ionic teleport"),o.parentNode.insertBefore(c,o),g.appendChild(o),o});return function(r,p){return i.apply(this,arguments)}}(),removeViewFromDom:()=>(o&&c&&(c.parentNode.insertBefore(o,c),c.remove()),Promise.resolve())}}},7864:(E,_,d)=>{d.d(_,{a:()=>l,b:()=>a,c:()=>u,d:()=>c,h:()=>o});const e={getEngine(){var t;const s=window;return s.TapticEngine||(null===(t=s.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Haptics"))&&s.Capacitor.Plugins.Haptics},available(){var t;const s=window;return!!this.getEngine()&&("web"!==(null===(t=s.Capacitor)||void 0===t?void 0:t.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const s=this.getEngine();if(!s)return;const i=this.isCapacitor()?t.style.toUpperCase():t.style;s.impact({style:i})},notification(t){const s=this.getEngine();if(!s)return;const i=this.isCapacitor()?t.style.toUpperCase():t.style;s.notification({style:i})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},h=()=>e.available(),u=()=>{h()&&e.selection()},l=()=>{h()&&e.selectionStart()},a=()=>{h()&&e.selectionChanged()},o=()=>{h()&&e.selectionEnd()},c=t=>{h()&&e.impact(t)}},6642:(E,_,d)=>{d.d(_,{I:()=>a,a:()=>i,b:()=>o,c:()=>p,d:()=>w,f:()=>m,g:()=>s,i:()=>t,p:()=>v,r:()=>y,s:()=>r});var e=d(5861),h=d(5730),u=d(4147);const a="ion-content",o=".ion-content-scroll-host",c=`${a}, ${o}`,t=g=>"ION-CONTENT"===g.tagName,s=function(){var g=(0,e.Z)(function*(f){return t(f)?(yield new Promise(n=>(0,h.c)(f,n)),f.getScrollElement()):f});return function(n){return g.apply(this,arguments)}}(),i=g=>g.querySelector(o)||g.querySelector(c),m=g=>g.closest(c),r=(g,f)=>t(g)?g.scrollToTop(f):Promise.resolve(g.scrollTo({top:0,left:0,behavior:f>0?"smooth":"auto"})),p=(g,f,n,C)=>t(g)?g.scrollByPoint(f,n,C):Promise.resolve(g.scrollBy({top:n,left:f,behavior:C>0?"smooth":"auto"})),v=g=>(0,u.a)(g,a),w=g=>{if(t(g)){const n=g.scrollY;return g.scrollY=!1,n}return g.style.setProperty("overflow","hidden"),!0},y=(g,f)=>{t(g)?g.scrollY=f:g.style.removeProperty("overflow")}},2357:(E,_,d)=>{d.d(_,{a:()=>e,b:()=>r,c:()=>c,d:()=>p,e:()=>M,f:()=>o,g:()=>v,h:()=>u,i:()=>h,j:()=>n,k:()=>C,l:()=>t,m:()=>i,n:()=>w,o:()=>s,p:()=>a,q:()=>l,r:()=>f,s:()=>x,t:()=>m,u:()=>y,v:()=>g});const e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Back</title><path d='M368 64L144 256l224 192V64z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Checkmark</title><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipse</title><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Remove</title><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Three</title><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Two</title><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},8439:(E,_,d)=>{d.d(_,{s:()=>e});const e=t=>{try{if(t instanceof c)return t.value;if(!l()||"string"!=typeof t||""===t)return t;const s=document.createDocumentFragment(),i=document.createElement("div");s.appendChild(i),i.innerHTML=t,o.forEach(v=>{const w=s.querySelectorAll(v);for(let y=w.length-1;y>=0;y--){const g=w[y];g.parentNode?g.parentNode.removeChild(g):s.removeChild(g);const f=u(g);for(let n=0;n<f.length;n++)h(f[n])}});const m=u(s);for(let v=0;v<m.length;v++)h(m[v]);const r=document.createElement("div");r.appendChild(s);const p=r.querySelector("div");return null!==p?p.innerHTML:r.innerHTML}catch(s){return console.error(s),""}},h=t=>{if(t.nodeType&&1!==t.nodeType)return;for(let i=t.attributes.length-1;i>=0;i--){const m=t.attributes.item(i),r=m.name;if(!a.includes(r.toLowerCase())){t.removeAttribute(r);continue}const p=m.value;null!=p&&p.toLowerCase().includes("javascript:")&&t.removeAttribute(r)}const s=u(t);for(let i=0;i<s.length;i++)h(s[i])},u=t=>null!=t.children?t.children:t.childNodes,l=()=>{var t;const s=window,i=null===(t=null==s?void 0:s.Ionic)||void 0===t?void 0:t.config;return!i||(i.get?i.get("sanitizerEnabled",!0):!0===i.sanitizerEnabled||void 0===i.sanitizerEnabled)},a=["class","id","href","src","name","slot"],o=["script","style","iframe","meta","link","object","embed"];class c{constructor(s){this.value=s}}},1316:(E,_,d)=>{d.r(_),d.d(_,{KEYBOARD_DID_CLOSE:()=>h,KEYBOARD_DID_OPEN:()=>e,copyVisualViewport:()=>f,keyboardDidClose:()=>v,keyboardDidOpen:()=>r,keyboardDidResize:()=>p,resetKeyboardAssist:()=>c,setKeyboardClose:()=>m,setKeyboardOpen:()=>i,startKeyboardAssist:()=>t,trackViewportChanges:()=>g});const e="ionKeyboardDidShow",h="ionKeyboardDidHide";let l={},a={},o=!1;const c=()=>{l={},a={},o=!1},t=n=>{s(n),n.visualViewport&&(a=f(n.visualViewport),n.visualViewport.onresize=()=>{g(n),r()||p(n)?i(n):v(n)&&m(n)})},s=n=>{n.addEventListener("keyboardDidShow",C=>i(n,C)),n.addEventListener("keyboardDidHide",()=>m(n))},i=(n,C)=>{w(n,C),o=!0},m=n=>{y(n),o=!1},r=()=>!o&&l.width===a.width&&(l.height-a.height)*a.scale>150,p=n=>o&&!v(n),v=n=>o&&a.height===n.innerHeight,w=(n,C)=>{const M=new CustomEvent(e,{detail:{keyboardHeight:C?C.keyboardHeight:n.innerHeight-a.height}});n.dispatchEvent(M)},y=n=>{const C=new CustomEvent(h);n.dispatchEvent(C)},g=n=>{l=Object.assign({},a),a=f(n.visualViewport)},f=n=>({width:Math.round(n.width),height:Math.round(n.height),offsetTop:n.offsetTop,offsetLeft:n.offsetLeft,pageTop:n.pageTop,pageLeft:n.pageLeft,scale:n.scale})},9852:(E,_,d)=>{d.d(_,{c:()=>h});var e=d(3457);const h=u=>{let l,a,o;const c=()=>{l=()=>{o=!0,u&&u(!0)},a=()=>{o=!1,u&&u(!1)},null==e.w||e.w.addEventListener("keyboardWillShow",l),null==e.w||e.w.addEventListener("keyboardWillHide",a)};return c(),{init:c,destroy:()=>{null==e.w||e.w.removeEventListener("keyboardWillShow",l),null==e.w||e.w.removeEventListener("keyboardWillHide",a),l=a=void 0},isKeyboardVisible:()=>o}}},7741:(E,_,d)=>{d.d(_,{S:()=>h});const h={bubbles:{dur:1e3,circles:9,fn:(u,l,a)=>{const o=u*l/a-u+"ms",c=2*Math.PI*l/a;return{r:5,style:{top:9*Math.sin(c)+"px",left:9*Math.cos(c)+"px","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(u,l,a)=>{const o=l/a,c=u*o-u+"ms",t=2*Math.PI*o;return{r:5,style:{top:9*Math.sin(t)+"px",left:9*Math.cos(t)+"px","animation-delay":c}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(u,l)=>({r:6,style:{left:9-9*l+"px","animation-delay":-110*l+"ms"}})},lines:{dur:1e3,lines:8,fn:(u,l,a)=>({y1:14,y2:26,style:{transform:`rotate(${360/a*l+(l<a/2?180:-180)}deg)`,"animation-delay":u*l/a-u+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(u,l,a)=>({y1:12,y2:20,style:{transform:`rotate(${360/a*l+(l<a/2?180:-180)}deg)`,"animation-delay":u*l/a-u+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(u,l,a)=>({y1:17,y2:29,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":u*l/a-u+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(u,l,a)=>({y1:12,y2:20,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":u*l/a-u+"ms"}})}}},1959:(E,_,d)=>{d.r(_),d.d(_,{createSwipeBackGesture:()=>a});var e=d(5730),h=d(5062),u=d(1911);d(4349);const a=(o,c,t,s,i)=>{const m=o.ownerDocument.defaultView,r=(0,h.i)(o),v=n=>r?-n.deltaX:n.deltaX;return(0,u.createGesture)({el:o,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:n=>(n=>{const{startX:x}=n;return r?x>=m.innerWidth-50:x<=50})(n)&&c(),onStart:t,onMove:n=>{const x=v(n)/m.innerWidth;s(x)},onEnd:n=>{const C=v(n),x=m.innerWidth,M=C/x,O=(n=>r?-n.velocityX:n.velocityX)(n),D=O>=0&&(O>.2||C>x/2),I=(D?1-M:M)*x;let T=0;if(I>5){const b=I/Math.abs(O);T=Math.min(b,540)}i(D,M<=0?.01:(0,e.l)(0,M,.9999),T)}})}},4800:(E,_,d)=>{d.d(_,{v:()=>u});var e=d(1571),h=d(529);let u=(()=>{class l{constructor(o){this.http=o}getCriticalConsidarationsData(){return this._getCriticalConsidarationsData()}getSettingUpSystemData(){return this._getSettingUpSystemData()}getFoldingUpSystemData(){return this._getFoldingUpSystemData()}_getCriticalConsidarationsData(){return this.http.get("assets/ulcans-instructions/critical-considerations.json")}_getSettingUpSystemData(){return this.http.get("assets/ulcans-instructions/setting-up-system.json")}_getFoldingUpSystemData(){return this.http.get("assets/ulcans-instructions/folding-up-system.json")}}return l.\u0275fac=function(o){return new(o||l)(e.LFG(h.eN))},l.\u0275prov=e.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})()},2621:(E,_,d)=>{d.d(_,{n:()=>t});var e=d(1571);const h=["accordionItemHeader"],u=["accordionItemBody"];function l(s,i){1&s&&e.Hsn(0)}function a(s,i){1&s&&e.Hsn(0,1)}const o=[[["","accordionItemHeader",""]],[["","accordionItemBody",""]]],c=["[accordionItemHeader]","[accordionItemBody]"];let t=(()=>{class s{constructor(){}ngOnInit(){}}return s.\u0275fac=function(m){return new(m||s)},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-accordion-item"]],viewQuery:function(m,r){if(1&m&&(e.Gf(h,5,e.Rgc),e.Gf(u,5,e.Rgc)),2&m){let p;e.iGM(p=e.CRH())&&(r.accordionItemHeader=p.first),e.iGM(p=e.CRH())&&(r.accordionItemBody=p.first)}},ngContentSelectors:c,decls:5,vars:0,consts:[[1,"accordion-item"],["accordionItemHeader",""],["accordionItemBody",""]],template:function(m,r){1&m&&(e.F$t(o),e.TgZ(0,"div",0),e.YNc(1,l,1,0,"ng-template",null,1,e.W1O),e.YNc(3,a,1,0,"ng-template",null,2,e.W1O),e.qZA())}}),s})()},7415:(E,_,d)=>{d.d(_,{Z:()=>s});var e=d(1571),h=d(4555),u=d(2621),l=d(8779),a=d(6895);const o=function(i){return{"icon-spins":i}},c=function(i){return{"body-open":i}};function t(i,m){if(1&i){const r=e.EpF();e.TgZ(0,"div",2)(1,"div",3),e.NdJ("click",function(){const w=e.CHM(r).index,y=e.oxw();return e.KtG(y.onAccordionItemClicked(w))}),e.GkF(2,4),e._UZ(3,"ion-icon",5),e.qZA(),e.TgZ(4,"div",6),e.GkF(5,4),e.qZA()()}if(2&i){const r=m.$implicit,p=m.index,v=e.oxw();e.xp6(2),e.Q6J("ngTemplateOutlet",r.accordionItemHeader)("ngTemplateOutletContext",v),e.xp6(1),e.Q6J("ngClass",e.VKq(6,o,void 0!==v.openedItemsIndexesMap[p])),e.xp6(1),e.Q6J("ngClass",e.VKq(8,c,void 0!==v.openedItemsIndexesMap[p])),e.xp6(1),e.Q6J("ngTemplateOutlet",r.accordionItemBody)("ngTemplateOutletContext",v)}}let s=(()=>{class i{constructor(){this.accordionItems=new e.n_E,this.initialOpenIndex=null,this.openedItemsIndexesMap={}}ngOnInit(){null!==this.initialOpenIndex&&(this.openedItemsIndexesMap[this.initialOpenIndex]=this.initialOpenIndex)}ngAfterContentInit(){}onAccordionItemClicked(r){void 0!==this.openedItemsIndexesMap[r]?delete this.openedItemsIndexesMap[r]:this.openedItemsIndexesMap[r]=r,console.log(this.openedItemsIndexesMap)}}return i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-accordion"]],contentQueries:function(r,p,v){if(1&r&&e.Suo(v,u.n,4),2&r){let w;e.iGM(w=e.CRH())&&(p.accordionItems=w)}},inputs:{initialOpenIndex:"initialOpenIndex"},decls:2,vars:1,consts:[[1,"accordion"],["class","accordion-item",4,"ngFor","ngForOf"],[1,"accordion-item"],[1,"accordion-item-header",3,"click"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["name","chevron-down-outline",1,"icon-down",3,"ngClass"],[1,"accordion-item-body",3,"ngClass"]],template:function(r,p){1&r&&(e.TgZ(0,"div",0),e.YNc(1,t,6,10,"div",1),e.qZA()),2&r&&(e.xp6(1),e.Q6J("ngForOf",p.accordionItems))},dependencies:[l.gu,a.mk,a.sg,a.tP],styles:[".accordion[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px;font-family:Babas-pro,sans-serif}.accordion[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%]   .accordion-item-header[_ngcontent-%COMP%]{font-size:30px;display:flex;justify-content:space-between;align-items:center;cursor:pointer}.accordion[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%]   .accordion-item-header[_ngcontent-%COMP%]   .icon-down[_ngcontent-%COMP%]{transition:transform .5s ease-in-out;transform:rotateX(0)}.accordion[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%]   .accordion-item-header[_ngcontent-%COMP%]   .icon-down.icon-spins[_ngcontent-%COMP%]{transform:rotateX(180deg)}.accordion[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%]   .accordion-item-body[_ngcontent-%COMP%]{font-size:25px;-webkit-margin-before:10px;margin-block-start:10px;display:flex;flex-direction:column;justify-content:flex-end;max-height:0;overflow:hidden;transition:max-height .6s}.accordion[_ngcontent-%COMP%]   .accordion-item[_ngcontent-%COMP%]   .accordion-item-body.body-open[_ngcontent-%COMP%]{max-height:3000px}"],data:{animation:[h.F.slidesDownAnimation]}}),i})()}}]);