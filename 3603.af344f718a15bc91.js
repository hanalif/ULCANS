"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3603],{3603:(I,d,e)=>{e.r(d),e.d(d,{EquipmentDescriptionPageModule:()=>J});var a=e(6895),s=e(433),p=e(8779),r=e(5472),i=e(1571),m=e(1275),u=e(7415),l=e(2621),g=e(3162);function _(t,o){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const n=o.$implicit;i.xp6(1),i.Oqu(n)}}function v(t,o){if(1&t&&(i.TgZ(0,"div",17),i._UZ(1,"img",18),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.Q6J("src",n.imgUrl,i.LSH)}}function f(t,o){if(1&t&&(i.TgZ(0,"video",19),i._UZ(1,"source",20),i._uU(2," Your browser does not support HTML video. "),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.Q6J("src",n.videoUrl,i.LSH)}}function x(t,o){if(1&t&&(i.TgZ(0,"p"),i._uU(1),i.qZA()),2&t){const n=o.$implicit;i.xp6(1),i.Oqu(n)}}function Z(t,o){if(1&t&&(i.TgZ(0,"div",17),i._UZ(1,"img",18),i.qZA()),2&t){const n=i.oxw().$implicit;i.xp6(1),i.Q6J("src",n.imgUrl,i.LSH)}}function q(t,o){if(1&t&&(i.TgZ(0,"div",9)(1,"div",10)(2,"div",11),i.YNc(3,x,2,1,"p",6),i.qZA(),i.TgZ(4,"div",12),i.YNc(5,Z,2,1,"div",13),i.qZA()()()),2&t){const n=o.$implicit;i.xp6(3),i.Q6J("ngForOf",n.text),i.xp6(2),i.Q6J("ngIf",""!==n.imgUrl)}}function D(t,o){if(1&t&&(i.TgZ(0,"app-accordion-item")(1,"div",7),i._uU(2),i.ALo(3,"uppercase"),i.qZA(),i.YNc(4,q,6,2,"div",8),i.qZA()),2&t){const n=o.$implicit;i.xp6(2),i.hij(" ",i.lcZ(3,2,n.title)," "),i.xp6(2),i.Q6J("ngForOf",n.content)}}function A(t,o){if(1&t&&(i.TgZ(0,"div",9)(1,"div",10)(2,"div",11),i.YNc(3,_,2,1,"p",6),i.qZA(),i.TgZ(4,"div",12),i.YNc(5,v,2,1,"div",13),i.qZA()(),i.TgZ(6,"div",14)(7,"div",15),i.YNc(8,f,3,1,"video",16),i.qZA()(),i.TgZ(9,"app-accordion",5),i.YNc(10,D,5,4,"app-accordion-item",6),i.qZA()()),2&t){const n=o.$implicit,c=i.oxw(2);i.xp6(3),i.Q6J("ngForOf",n.text),i.xp6(2),i.Q6J("ngIf",""!==n.imgUrl),i.xp6(3),i.Q6J("ngIf","none"!==n.videoUrl),i.xp6(1),i.Q6J("initialOpenIndex",c.indexesForAccordion.innerIndex),i.xp6(1),i.Q6J("ngForOf",n.subData)}}function T(t,o){if(1&t&&(i.TgZ(0,"app-accordion-item")(1,"div",7),i._uU(2),i.ALo(3,"uppercase"),i.qZA(),i.YNc(4,A,11,5,"div",8),i.qZA()),2&t){const n=o.$implicit;i.xp6(2),i.hij(" ",i.lcZ(3,2,n.title)," "),i.xp6(2),i.Q6J("ngForOf",n.content)}}const E=[{path:"",component:(()=>{class t{constructor(n,c,y){this.usefulInformationService=n,this.route=c,this.cd=y}ngOnInit(){this.indexesForAccordionSubscription=this.route.data.subscribe(n=>{this.indexesForAccordion=n.indexesForAccordion,this.cd.detectChanges()}),this.equipmentDescriptionData$=this.usefulInformationService.getEquipmentDescriptionData()}ngOnDestroy(){this.indexesForAccordionSubscription.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(i.Y36(m.f),i.Y36(r.gz),i.Y36(i.sBO))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-equipment-description"]],decls:11,vars:5,consts:[[1,"scrollbar",3,"autoHeightDisabled"],[1,"page-container","style1","main-layout"],[1,"top"],[1,"title"],[1,"middle"],[3,"initialOpenIndex"],[4,"ngFor","ngForOf"],["accordionItemHeader",""],["class","data-content","accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody","",1,"data-content"],[1,"main-data"],[1,"text-container"],[1,"img-box"],["class","img-container",4,"ngIf"],[1,"video-box"],[1,"video-container"],["width","100%","controls","",4,"ngIf"],[1,"img-container"],["alt","dataImg",3,"src"],["width","100%","controls",""],["type","video/mp4",3,"src"]],template:function(n,c){1&n&&(i._UZ(0,"ion-header"),i.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3),i._uU(6," Equipment Description "),i.qZA()(),i.TgZ(7,"div",4)(8,"app-accordion",5),i.YNc(9,T,5,4,"app-accordion-item",6),i.ALo(10,"async"),i.qZA()()()()()),2&n&&(i.xp6(2),i.Q6J("autoHeightDisabled",!1),i.xp6(6),i.Q6J("initialOpenIndex",c.indexesForAccordion.index),i.xp6(1),i.Q6J("ngForOf",i.lcZ(10,3,c.equipmentDescriptionData$)))},dependencies:[a.sg,a.O5,p.W2,p.Gu,u.Z,l.n,g.KC,a.Ov,a.gd],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}.middle[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),t})(),resolve:{indexesForAccordion:e(8975).V}}];let F=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[r.Bz.forChild(E),r.Bz]}),t})();var O=e(4466);let J=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({imports:[a.ez,s.u5,p.Pc,F,O.m]}),t})()}}]);