"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[463],{463:(b,_,e)=>{e.r(_),e.d(_,{MaintenancePageModule:()=>N});var c=e(6895),r=e(433),d=e(8779),p=e(5472),n=e(1571),s=e(1275),m=e(7415),l=e(2621),g=e(3162);function u(i,a){if(1&i&&(n.TgZ(0,"div",16)(1,"span"),n._uU(2),n.qZA()()),2&i){const t=n.oxw().$implicit;n.xp6(2),n.hij("Note: ",t.note,"")}}function v(i,a){if(1&i&&(n.TgZ(0,"p"),n._uU(1),n.qZA()),2&i){const t=a.$implicit;n.xp6(1),n.Oqu(t)}}function f(i,a){if(1&i&&(n.TgZ(0,"div",16)(1,"span"),n._uU(2),n.qZA()()),2&i){const t=n.oxw().$implicit;n.xp6(2),n.hij("Note: ",t.note2,"")}}function x(i,a){if(1&i&&(n.TgZ(0,"p"),n._uU(1),n.qZA()),2&i){const t=a.$implicit;n.xp6(1),n.Oqu(t)}}function Z(i,a){if(1&i&&(n.TgZ(0,"div",12),n.YNc(1,x,2,1,"p",6),n.qZA()),2&i){const t=n.oxw().$implicit;n.xp6(1),n.Q6J("ngForOf",t.text2)}}function A(i,a){if(1&i&&(n.TgZ(0,"div",17),n._UZ(1,"img",18),n.qZA()),2&i){const t=n.oxw().$implicit;n.xp6(1),n.Q6J("src",t.imgUrl,n.LSH)}}function M(i,a){if(1&i&&(n.TgZ(0,"p"),n._uU(1),n.qZA()),2&i){const t=a.$implicit;n.xp6(1),n.Oqu(t)}}function T(i,a){if(1&i&&(n.TgZ(0,"div",20)(1,"div",10)(2,"div",12),n.YNc(3,M,2,1,"p",6),n.qZA()()()),2&i){const t=a.$implicit;n.xp6(3),n.Q6J("ngForOf",t.text)}}function h(i,a){if(1&i&&(n.TgZ(0,"app-accordion-item")(1,"div",7),n._uU(2),n.ALo(3,"uppercase"),n.qZA(),n.YNc(4,T,4,1,"div",19),n.qZA()),2&i){const t=a.$implicit;n.xp6(2),n.hij(" ",n.lcZ(3,2,t.title)," "),n.xp6(2),n.Q6J("ngForOf",t.content)}}function P(i,a){if(1&i&&(n.TgZ(0,"div",9)(1,"div")(2,"app-accordion"),n.YNc(3,h,5,4,"app-accordion-item",6),n.qZA()()()),2&i){const t=a.$implicit;n.xp6(3),n.Q6J("ngForOf",t.subData)}}function F(i,a){if(1&i&&(n.TgZ(0,"app-accordion-item")(1,"div",7),n._uU(2),n.ALo(3,"uppercase"),n.qZA(),n.YNc(4,P,4,1,"div",8),n.qZA()),2&i){const t=a.$implicit;n.xp6(2),n.hij(" ",n.lcZ(3,2,t.title)," "),n.xp6(2),n.Q6J("ngForOf",t.content)}}function O(i,a){if(1&i&&(n.TgZ(0,"div",9)(1,"div",10),n.YNc(2,u,3,1,"div",11),n.TgZ(3,"div",12),n.YNc(4,v,2,1,"p",6),n.qZA(),n.YNc(5,f,3,1,"div",11),n.YNc(6,Z,2,1,"div",13),n.qZA(),n.TgZ(7,"div",14),n.YNc(8,A,2,1,"div",15),n.qZA(),n.TgZ(9,"app-accordion",5),n.YNc(10,F,5,4,"app-accordion-item",6),n.qZA()()),2&i){const t=a.$implicit,o=n.oxw(2);n.xp6(2),n.Q6J("ngIf",t.note),n.xp6(2),n.Q6J("ngForOf",t.text),n.xp6(1),n.Q6J("ngIf",t.note2),n.xp6(1),n.Q6J("ngIf",t.text2),n.xp6(2),n.Q6J("ngIf",""!==t.imgUrl),n.xp6(1),n.Q6J("initialOpenIndex",o.indexesForAccordion.innerIndex),n.xp6(1),n.Q6J("ngForOf",t.subData)}}function I(i,a){if(1&i&&(n.TgZ(0,"app-accordion-item")(1,"div",7),n._uU(2),n.ALo(3,"uppercase"),n.qZA(),n.YNc(4,O,11,7,"div",8),n.qZA()),2&i){const t=a.$implicit;n.xp6(2),n.hij(" ",n.lcZ(3,2,t.title)," "),n.xp6(2),n.Q6J("ngForOf",t.content)}}const Y=[{path:"",component:(()=>{class i{constructor(t,o,$){this.usefulInformationService=t,this.route=o,this.cd=$}ngOnInit(){this.indexesForAccordionSubscription=this.route.data.subscribe(t=>{this.indexesForAccordion=t.indexesForAccordion,this.cd.detectChanges()}),this.maintenanceData$=this.usefulInformationService.getMaintenanceData()}ngOnDestroy(){this.indexesForAccordionSubscription.unsubscribe()}}return i.\u0275fac=function(t){return new(t||i)(n.Y36(s.f),n.Y36(p.gz),n.Y36(n.sBO))},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-maintenance"]],decls:11,vars:5,consts:[[1,"scrollbar",3,"autoHeightDisabled"],[1,"page-container","style1","main-layout"],[1,"top"],[1,"title"],[1,"middle"],[3,"initialOpenIndex"],[4,"ngFor","ngForOf"],["accordionItemHeader",""],["class","data-content","accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody","",1,"data-content"],[1,"main-data"],["class","note-box",4,"ngIf"],[1,"text-container"],["class","text-container",4,"ngIf"],[1,"img-box"],["class","img-container",4,"ngIf"],[1,"note-box"],[1,"img-container"],["alt","dataImg",3,"src"],["accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody",""]],template:function(t,o){1&t&&(n._UZ(0,"ion-header"),n.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3),n._uU(6," Maintenance "),n.qZA()(),n.TgZ(7,"div",4)(8,"app-accordion",5),n.YNc(9,I,5,4,"app-accordion-item",6),n.ALo(10,"async"),n.qZA()()()()()),2&t&&(n.xp6(2),n.Q6J("autoHeightDisabled",!1),n.xp6(6),n.Q6J("initialOpenIndex",o.indexesForAccordion.index),n.xp6(1),n.Q6J("ngForOf",n.lcZ(10,3,o.maintenanceData$)))},dependencies:[c.sg,c.O5,d.W2,d.Gu,m.Z,l.n,g.KC,c.Ov,c.gd],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}"]}),i})(),resolve:{indexesForAccordion:e(8975).V}}];let y=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[p.Bz.forChild(Y),p.Bz]}),i})();var D=e(4466);let N=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[c.ez,r.u5,d.Pc,y,D.m]}),i})()}}]);