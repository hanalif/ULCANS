"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8430],{8430:(M,l,o)=>{o.r(l),o.d(l,{SettingUpSystemPageModule:()=>h});var c=o(6895),g=o(433),s=o(8779),r=o(5472),t=o(1571),m=o(4800),u=o(7415),v=o(2621),S=o(3162);function y(n,i){if(1&n&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&n){const e=i.$implicit;t.xp6(1),t.Oqu(e)}}function _(n,i){if(1&n&&(t.TgZ(0,"div",12)(1,"div",13)(2,"video",14),t._UZ(3,"source",15),t._uU(4," Your browser does not support HTML video. "),t.qZA()()()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("src",e.videoUrl,t.LSH)}}function f(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"a",19),t.NdJ("click",function(){const d=t.CHM(e).$implicit,A=t.oxw(4);return t.KtG(A.onLink(d.link,d.index,d.innerIndex))}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.xp6(1),t.hij(" ",e.txt," ")}}function U(n,i){if(1&n&&(t.TgZ(0,"div",16)(1,"div",17),t._uU(2,"For More Information:"),t.qZA(),t.YNc(3,f,2,1,"a",18),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.linksForMoreInformation)}}function x(n,i){if(1&n&&(t.TgZ(0,"div",8)(1,"div",9),t.YNc(2,y,2,1,"p",5),t.qZA(),t.YNc(3,_,5,1,"div",10),t.YNc(4,U,4,1,"div",11),t.qZA()),2&n){const e=i.$implicit;t.xp6(2),t.Q6J("ngForOf",e.text),t.xp6(1),t.Q6J("ngIf","none"!==e.videoUrl),t.xp6(1),t.Q6J("ngIf",e.linksForMoreInformation)}}function Z(n,i){if(1&n&&(t.TgZ(0,"app-accordion-item")(1,"div",6),t._uU(2),t.ALo(3,"uppercase"),t.qZA(),t.YNc(4,x,5,3,"div",7),t.qZA()),2&n){const e=i.$implicit;t.xp6(2),t.hij(" ",t.lcZ(3,2,e.title)," "),t.xp6(2),t.Q6J("ngForOf",e.content)}}const P=[{path:"",component:(()=>{class n{constructor(e,a){this.systemDataService=e,this.route=a}ngOnInit(){this.settingUpSystemData$=this.systemDataService.getSettingUpSystemData()}onLink(e,a,p=[]){console.log(a),console.log(p),this.route.navigate([e],{queryParams:{index:a.join(","),innerIndex:p.join(",")}})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.v),t.Y36(r.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-setting-up-system"]],decls:11,vars:3,consts:[[1,"scrollbar"],[1,"page-container","style1","main-layout"],[1,"top"],[1,"title"],[1,"middle"],[4,"ngFor","ngForOf"],["accordionItemHeader",""],["class","data-content","accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody","",1,"data-content"],[1,"text-container"],["class","video-box",4,"ngIf"],["class","links-box",4,"ngIf"],[1,"video-box"],[1,"video-container"],["width","100%","controls",""],["type","video/mp4",3,"src"],[1,"links-box"],[1,"links-title"],["class","link-btn",3,"click",4,"ngFor","ngForOf"],[1,"link-btn",3,"click"]],template:function(e,a){1&e&&(t._UZ(0,"ion-header"),t.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3),t._uU(6," Setting Up System "),t.qZA()(),t.TgZ(7,"div",4)(8,"app-accordion"),t.YNc(9,Z,5,4,"app-accordion-item",5),t.ALo(10,"async"),t.qZA()()()()()),2&e&&(t.xp6(9),t.Q6J("ngForOf",t.lcZ(10,1,a.settingUpSystemData$)))},dependencies:[c.sg,c.O5,s.W2,s.Gu,u.Z,v.n,S.KC,c.Ov,c.gd],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}"]}),n})()}];let F=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[r.Bz.forChild(P),r.Bz]}),n})();var T=o(4466);let h=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.ez,g.u5,s.Pc,F,T.m]}),n})()}}]);