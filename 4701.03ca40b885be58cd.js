"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4701],{4701:(F,r,a)=>{a.r(r),a.d(r,{CriticalConsiderationsPageModule:()=>O});var c=a(6895),s=a(433),e=a(8779),d=a(5472),i=a(1571),p=a(7862),l=a(7415),_=a(2621),m=a(3162);function g(t,n){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const o=n.$implicit;i.xp6(1),i.Oqu(o)}}function C(t,n){if(1&t&&(i.TgZ(0,"div",13),i._UZ(1,"img",14),i.qZA()),2&t){const o=i.oxw().$implicit;i.xp6(1),i.Q6J("src",o.imgUrl,i.LSH)}}function v(t,n){if(1&t&&(i.TgZ(0,"video",15),i._UZ(1,"source",16),i._uU(2," Your browser does not support HTML video. "),i.qZA()),2&t){const o=i.oxw().$implicit;i.xp6(1),i.Q6J("src",o.videoUrl,i.LSH)}}function u(t,n){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const o=n.$implicit;i.xp6(1),i.Oqu(o)}}function f(t,n){if(1&t&&(i.TgZ(0,"div",13),i._UZ(1,"img",14),i.qZA()),2&t){const o=i.oxw().$implicit;i.xp6(1),i.Q6J("src",o.imgUrl,i.LSH)}}function Z(t,n){if(1&t&&(i.TgZ(0,"div",8)(1,"div",9)(2,"div",10),i.YNc(3,u,2,1,"p",5),i.qZA(),i.YNc(4,f,2,1,"div",11),i.qZA()()),2&t){const o=n.$implicit;i.xp6(3),i.Q6J("ngForOf",o.text),i.xp6(1),i.Q6J("ngIf",""!==o.imgUrl)}}function x(t,n){if(1&t&&(i.TgZ(0,"app-accordion-item")(1,"div",6),i._uU(2),i.ALo(3,"uppercase"),i.qZA(),i.YNc(4,Z,5,2,"div",7),i.qZA()),2&t){const o=n.$implicit;i.xp6(2),i.hij(" ",i.lcZ(3,2,o.title)," "),i.xp6(2),i.Q6J("ngForOf",o.content)}}function T(t,n){if(1&t&&(i.TgZ(0,"div",13),i._UZ(1,"img",14),i.qZA()),2&t){const o=i.oxw().$implicit;i.xp6(1),i.Q6J("src",o.imgUrl2,i.LSH)}}function P(t,n){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const o=n.$implicit;i.xp6(1),i.Oqu(o)}}function A(t,n){if(1&t&&(i.TgZ(0,"div",8)(1,"div",9)(2,"div",10),i.YNc(3,g,2,1,"p",5),i.qZA(),i.YNc(4,C,2,1,"div",11),i.qZA(),i.YNc(5,v,3,1,"video",12),i.TgZ(6,"app-accordion"),i.YNc(7,x,5,4,"app-accordion-item",5),i.qZA(),i.TgZ(8,"div",9),i.YNc(9,T,2,1,"div",11),i.TgZ(10,"div",10),i.YNc(11,P,2,1,"p",5),i.qZA()()()),2&t){const o=n.$implicit;i.xp6(3),i.Q6J("ngForOf",o.text),i.xp6(1),i.Q6J("ngIf",""!==o.imgUrl),i.xp6(1),i.Q6J("ngIf","none"!==o.videoUrl),i.xp6(2),i.Q6J("ngForOf",o.subData),i.xp6(2),i.Q6J("ngIf",""!==o.imgUrl2),i.xp6(2),i.Q6J("ngForOf",o.text2)}}function U(t,n){if(1&t&&(i.TgZ(0,"app-accordion-item")(1,"div",6),i._uU(2),i.ALo(3,"uppercase"),i.qZA(),i.YNc(4,A,12,6,"div",7),i.qZA()),2&t){const o=n.$implicit;i.xp6(2),i.hij(" ",i.lcZ(3,2,o.title)," "),i.xp6(2),i.Q6J("ngForOf",o.content)}}const y=[{path:"",component:(()=>{class t{constructor(o){this.systemDataService=o}ngOnInit(){this.criticalConsiderationsData$=this.systemDataService.getCriticalConsidarationsData()}}return t.\u0275fac=function(o){return new(o||t)(i.Y36(p.v))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-critical-considerations"]],decls:11,vars:4,consts:[[1,"scrollbar",3,"autoHeightDisabled"],[1,"page-container","style1","main-layout"],[1,"top"],[1,"title"],[1,"middle"],[4,"ngFor","ngForOf"],["accordionItemHeader",""],["class","data-content","accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody","",1,"data-content"],[1,"main-data"],[1,"text-container"],["class","img-container",4,"ngIf"],["width","100%","controls","",4,"ngIf"],[1,"img-container"],["alt","dataImg",3,"src"],["width","100%","controls",""],["type","video/mp4",3,"src"]],template:function(o,Q){1&o&&(i._UZ(0,"ion-header"),i.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3),i._uU(6," Critical Considerations "),i.qZA()(),i.TgZ(7,"div",4)(8,"app-accordion"),i.YNc(9,U,5,4,"app-accordion-item",5),i.ALo(10,"async"),i.qZA()()()()()),2&o&&(i.xp6(2),i.Q6J("autoHeightDisabled",!1),i.xp6(7),i.Q6J("ngForOf",i.lcZ(10,2,Q.criticalConsiderationsData$)))},dependencies:[c.sg,c.O5,e.W2,e.Gu,l.Z,_.n,m.KC,c.Ov,c.gd],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}.middle[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),t})()}];let J=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[d.Bz.forChild(y),d.Bz]}),t})();var h=a(4466);let O=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[c.ez,s.u5,e.Pc,J,h.m]}),t})()}}]);