"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{7543:(D,f,c)=>{c.d(f,{c:()=>s});var l=c(1308),v=c(7864),r=c(1911);const s=(o,n)=>{let i,t;const a=(g,w,p)=>{if(typeof document>"u")return;const _=document.elementFromPoint(g,w);_&&n(_)?_!==i&&(h(),u(_,p)):h()},u=(g,w)=>{i=g,t||(t=i);const p=i;(0,l.c)(()=>p.classList.add("ion-activated")),w()},h=(g=!1)=>{if(!i)return;const w=i;(0,l.c)(()=>w.classList.remove("ion-activated")),g&&t!==i&&i.click(),i=void 0};return(0,r.createGesture)({el:o,gestureName:"buttonActiveDrag",threshold:0,onStart:g=>a(g.currentX,g.currentY,v.a),onMove:g=>a(g.currentX,g.currentY,v.b),onEnd:()=>{h(!0),(0,v.h)(),t=void 0}})}},5062:(D,f,c)=>{c.d(f,{i:()=>l});const l=v=>v&&""!==v.dir?"rtl"===v.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},5106:(D,f,c)=>{c.r(f),c.d(f,{startFocusVisible:()=>s});const l="ion-focused",r=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],s=o=>{let n=[],i=!0;const t=o?o.shadowRoot:document,a=o||document.body,u=E=>{n.forEach(d=>d.classList.remove(l)),E.forEach(d=>d.classList.add(l)),n=E},h=()=>{i=!1,u([])},g=E=>{i=r.includes(E.key),i||u([])},w=E=>{if(i&&void 0!==E.composedPath){const d=E.composedPath().filter(m=>!!m.classList&&m.classList.contains("ion-focusable"));u(d)}},p=()=>{t.activeElement===a&&u([])};return t.addEventListener("keydown",g),t.addEventListener("focusin",w),t.addEventListener("focusout",p),t.addEventListener("touchstart",h),t.addEventListener("mousedown",h),{destroy:()=>{t.removeEventListener("keydown",g),t.removeEventListener("focusin",w),t.removeEventListener("focusout",p),t.removeEventListener("touchstart",h),t.removeEventListener("mousedown",h)},setFocus:u}}},7040:(D,f,c)=>{c.d(f,{C:()=>o,a:()=>r,d:()=>s});var l=c(5861),v=c(5730);const r=function(){var n=(0,l.Z)(function*(i,t,a,u,h,g){var w;if(i)return i.attachViewToDom(t,a,h,u);if(!(g||"string"==typeof a||a instanceof HTMLElement))throw new Error("framework delegate is missing");const p="string"==typeof a?null===(w=t.ownerDocument)||void 0===w?void 0:w.createElement(a):a;return u&&u.forEach(_=>p.classList.add(_)),h&&Object.assign(p,h),t.appendChild(p),yield new Promise(_=>(0,v.c)(p,_)),p});return function(t,a,u,h,g,w){return n.apply(this,arguments)}}(),s=(n,i)=>{if(i){if(n)return n.removeViewFromDom(i.parentElement,i);i.remove()}return Promise.resolve()},o=()=>{let n,i;return{attachViewToDom:function(){var u=(0,l.Z)(function*(h,g,w={},p=[]){var _,E;if(n=h,g){const m="string"==typeof g?null===(_=n.ownerDocument)||void 0===_?void 0:_.createElement(g):g;p.forEach(e=>m.classList.add(e)),Object.assign(m,w),n.appendChild(m),yield new Promise(e=>(0,v.c)(m,e))}else if(n.children.length>0&&!n.children[0].classList.contains("ion-delegate-host")){const e=null===(E=n.ownerDocument)||void 0===E?void 0:E.createElement("div");e.classList.add("ion-delegate-host"),p.forEach(y=>e.classList.add(y)),e.append(...n.children),n.appendChild(e)}const d=document.querySelector("ion-app")||document.body;return i=document.createComment("ionic teleport"),n.parentNode.insertBefore(i,n),d.appendChild(n),n});return function(g,w){return u.apply(this,arguments)}}(),removeViewFromDom:()=>(n&&i&&(i.parentNode.insertBefore(n,i),i.remove()),Promise.resolve())}}},7864:(D,f,c)=>{c.d(f,{a:()=>s,b:()=>o,c:()=>r,d:()=>i,h:()=>n});const l={getEngine(){var t;const a=window;return a.TapticEngine||(null===(t=a.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Haptics"))&&a.Capacitor.Plugins.Haptics},available(){var t;const a=window;return!!this.getEngine()&&("web"!==(null===(t=a.Capacitor)||void 0===t?void 0:t.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const a=this.getEngine();if(!a)return;const u=this.isCapacitor()?t.style.toUpperCase():t.style;a.impact({style:u})},notification(t){const a=this.getEngine();if(!a)return;const u=this.isCapacitor()?t.style.toUpperCase():t.style;a.notification({style:u})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();!t||(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},v=()=>l.available(),r=()=>{v()&&l.selection()},s=()=>{v()&&l.selectionStart()},o=()=>{v()&&l.selectionChanged()},n=()=>{v()&&l.selectionEnd()},i=t=>{v()&&l.impact(t)}},6642:(D,f,c)=>{c.d(f,{I:()=>o,a:()=>u,b:()=>n,c:()=>w,d:()=>_,f:()=>h,g:()=>a,i:()=>t,p:()=>p,r:()=>E,s:()=>g});var l=c(5861),v=c(5730),r=c(4147);const o="ion-content",n=".ion-content-scroll-host",i=`${o}, ${n}`,t=d=>"ION-CONTENT"===d.tagName,a=function(){var d=(0,l.Z)(function*(m){return t(m)?(yield new Promise(e=>(0,v.c)(m,e)),m.getScrollElement()):m});return function(e){return d.apply(this,arguments)}}(),u=d=>d.querySelector(n)||d.querySelector(i),h=d=>d.closest(i),g=(d,m)=>t(d)?d.scrollToTop(m):Promise.resolve(d.scrollTo({top:0,left:0,behavior:m>0?"smooth":"auto"})),w=(d,m,e,y)=>t(d)?d.scrollByPoint(m,e,y):Promise.resolve(d.scrollBy({top:e,left:m,behavior:y>0?"smooth":"auto"})),p=d=>(0,r.a)(d,o),_=d=>{if(t(d)){const e=d.scrollY;return d.scrollY=!1,e}return d.style.setProperty("overflow","hidden"),!0},E=(d,m)=>{t(d)?d.scrollY=m:d.style.removeProperty("overflow")}},2357:(D,f,c)=>{c.d(f,{a:()=>l,b:()=>g,c:()=>i,d:()=>w,e:()=>M,f:()=>n,g:()=>p,h:()=>r,i:()=>v,j:()=>e,k:()=>y,l:()=>t,m:()=>u,n:()=>_,o:()=>a,p:()=>o,q:()=>s,r:()=>m,s:()=>C,t:()=>h,u:()=>E,v:()=>d});const l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Back</title><path d='M368 64L144 256l224 192V64z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Checkmark</title><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipse</title><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Remove</title><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Three</title><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Two</title><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},8439:(D,f,c)=>{c.d(f,{s:()=>l});const l=t=>{try{if(t instanceof i)return t.value;if(!s()||"string"!=typeof t||""===t)return t;const a=document.createDocumentFragment(),u=document.createElement("div");a.appendChild(u),u.innerHTML=t,n.forEach(p=>{const _=a.querySelectorAll(p);for(let E=_.length-1;E>=0;E--){const d=_[E];d.parentNode?d.parentNode.removeChild(d):a.removeChild(d);const m=r(d);for(let e=0;e<m.length;e++)v(m[e])}});const h=r(a);for(let p=0;p<h.length;p++)v(h[p]);const g=document.createElement("div");g.appendChild(a);const w=g.querySelector("div");return null!==w?w.innerHTML:g.innerHTML}catch(a){return console.error(a),""}},v=t=>{if(t.nodeType&&1!==t.nodeType)return;for(let u=t.attributes.length-1;u>=0;u--){const h=t.attributes.item(u),g=h.name;if(!o.includes(g.toLowerCase())){t.removeAttribute(g);continue}const w=h.value;null!=w&&w.toLowerCase().includes("javascript:")&&t.removeAttribute(g)}const a=r(t);for(let u=0;u<a.length;u++)v(a[u])},r=t=>null!=t.children?t.children:t.childNodes,s=()=>{var t;const a=window,u=null===(t=null==a?void 0:a.Ionic)||void 0===t?void 0:t.config;return!u||(u.get?u.get("sanitizerEnabled",!0):!0===u.sanitizerEnabled||void 0===u.sanitizerEnabled)},o=["class","id","href","src","name","slot"],n=["script","style","iframe","meta","link","object","embed"];class i{constructor(a){this.value=a}}},1316:(D,f,c)=>{c.r(f),c.d(f,{KEYBOARD_DID_CLOSE:()=>v,KEYBOARD_DID_OPEN:()=>l,copyVisualViewport:()=>m,keyboardDidClose:()=>p,keyboardDidOpen:()=>g,keyboardDidResize:()=>w,resetKeyboardAssist:()=>i,setKeyboardClose:()=>h,setKeyboardOpen:()=>u,startKeyboardAssist:()=>t,trackViewportChanges:()=>d});const l="ionKeyboardDidShow",v="ionKeyboardDidHide";let s={},o={},n=!1;const i=()=>{s={},o={},n=!1},t=e=>{a(e),e.visualViewport&&(o=m(e.visualViewport),e.visualViewport.onresize=()=>{d(e),g()||w(e)?u(e):p(e)&&h(e)})},a=e=>{e.addEventListener("keyboardDidShow",y=>u(e,y)),e.addEventListener("keyboardDidHide",()=>h(e))},u=(e,y)=>{_(e,y),n=!0},h=e=>{E(e),n=!1},g=()=>!n&&s.width===o.width&&(s.height-o.height)*o.scale>150,w=e=>n&&!p(e),p=e=>n&&o.height===e.innerHeight,_=(e,y)=>{const M=new CustomEvent(l,{detail:{keyboardHeight:y?y.keyboardHeight:e.innerHeight-o.height}});e.dispatchEvent(M)},E=e=>{const y=new CustomEvent(v);e.dispatchEvent(y)},d=e=>{s=Object.assign({},o),o=m(e.visualViewport)},m=e=>({width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale})},9852:(D,f,c)=>{c.d(f,{c:()=>v});var l=c(3457);const v=r=>{let s,o,n;const i=()=>{s=()=>{n=!0,r&&r(!0)},o=()=>{n=!1,r&&r(!1)},null==l.w||l.w.addEventListener("keyboardWillShow",s),null==l.w||l.w.addEventListener("keyboardWillHide",o)};return i(),{init:i,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",s),null==l.w||l.w.removeEventListener("keyboardWillHide",o),s=o=void 0},isKeyboardVisible:()=>n}}},7741:(D,f,c)=>{c.d(f,{S:()=>v});const v={bubbles:{dur:1e3,circles:9,fn:(r,s,o)=>{const n=r*s/o-r+"ms",i=2*Math.PI*s/o;return{r:5,style:{top:9*Math.sin(i)+"px",left:9*Math.cos(i)+"px","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:(r,s,o)=>{const n=s/o,i=r*n-r+"ms",t=2*Math.PI*n;return{r:5,style:{top:9*Math.sin(t)+"px",left:9*Math.cos(t)+"px","animation-delay":i}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(r,s)=>({r:6,style:{left:9-9*s+"px","animation-delay":-110*s+"ms"}})},lines:{dur:1e3,lines:8,fn:(r,s,o)=>({y1:14,y2:26,style:{transform:`rotate(${360/o*s+(s<o/2?180:-180)}deg)`,"animation-delay":r*s/o-r+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(r,s,o)=>({y1:12,y2:20,style:{transform:`rotate(${360/o*s+(s<o/2?180:-180)}deg)`,"animation-delay":r*s/o-r+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(r,s,o)=>({y1:17,y2:29,style:{transform:`rotate(${30*s+(s<6?180:-180)}deg)`,"animation-delay":r*s/o-r+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(r,s,o)=>({y1:12,y2:20,style:{transform:`rotate(${30*s+(s<6?180:-180)}deg)`,"animation-delay":r*s/o-r+"ms"}})}}},1959:(D,f,c)=>{c.r(f),c.d(f,{createSwipeBackGesture:()=>o});var l=c(5730),v=c(5062),r=c(1911);c(4349);const o=(n,i,t,a,u)=>{const h=n.ownerDocument.defaultView,g=(0,v.i)(n),p=e=>g?-e.deltaX:e.deltaX;return(0,r.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:e=>(e=>{const{startX:C}=e;return g?C>=h.innerWidth-50:C<=50})(e)&&i(),onStart:t,onMove:e=>{const C=p(e)/h.innerWidth;a(C)},onEnd:e=>{const y=p(e),C=h.innerWidth,M=y/C,x=(e=>g?-e.velocityX:e.velocityX)(e),L=x>=0&&(x>.2||y>C/2),O=(L?1-M:M)*C;let S=0;if(O>5){const k=O/Math.abs(x);S=Math.min(k,540)}u(L,M<=0?.01:(0,l.l)(0,M,.9999),S)}})}},4800:(D,f,c)=>{c.d(f,{v:()=>r});var l=c(1571),v=c(529);let r=(()=>{class s{constructor(n){this.http=n}getCriticalConsidarationsData(){return this._getCriticalConsidarationsData()}getSettingUpSystemData(){return this._getSettingUpSystemData()}getFoldingUpSystemData(){return this._getFoldingUpSystemData()}_getCriticalConsidarationsData(){return this.http.get("assets/ulcans-instructions/critical-considerations.json")}_getSettingUpSystemData(){return this.http.get("assets/ulcans-instructions/setting-up-system.json")}_getFoldingUpSystemData(){return this.http.get("assets/ulcans-instructions/folding-up-system.json")}}return s.\u0275fac=function(n){return new(n||s)(l.LFG(v.eN))},s.\u0275prov=l.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},1275:(D,f,c)=>{c.d(f,{f:()=>r});var l=c(1571),v=c(529);let r=(()=>{class s{constructor(n){this.http=n}getEquipmentDescriptionData(){return this._getEquipmentDescriptionData()}getMaintenanceData(){return this._getMaintenanceData()}_getMaintenanceData(){return this.http.get("assets/equipment-information/maintenance.json")}_getEquipmentDescriptionData(){return this.http.get("assets/equipment-information/equipment-description.json")}}return s.\u0275fac=function(n){return new(n||s)(l.LFG(v.eN))},s.\u0275prov=l.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},8975:(D,f,c)=>{c.d(f,{V:()=>v});var l=c(1571);let v=(()=>{class r{constructor(){}resolve(o,n){return{index:o.queryParams.index?+o.queryParams.index:null,innerIndex:o.queryParams.innerIndex?+o.queryParams.innerIndex:null}}}return r.\u0275fac=function(o){return new(o||r)},r.\u0275prov=l.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);