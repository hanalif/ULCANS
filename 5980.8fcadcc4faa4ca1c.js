"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5980],{5980:(M,r,e)=>{e.r(r),e.d(r,{FoldingSystemPageModule:()=>h});var c=e(6895),m=e(433),d=e(8779),s=e(5472),t=e(1571),p=e(4800),v=e(7415),_=e(2621),u=e(3162);function f(o,i){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const n=i.$implicit;t.xp6(1),t.Oqu(n)}}function y(o,i){if(1&o&&(t.TgZ(0,"div",17),t._UZ(1,"img",18),t.qZA()),2&o){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("src",n.imgUrl,t.LSH)}}function F(o,i){if(1&o&&(t.TgZ(0,"video",19),t._UZ(1,"source",20),t._uU(2," Your browser does not support HTML video. "),t.qZA()),2&o){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("src",n.videoUrl,t.LSH)}}function x(o,i){if(1&o){const n=t.EpF();t.TgZ(0,"a",24),t.NdJ("click",function(){const l=t.CHM(n).$implicit,I=t.oxw(4);return t.KtG(I.onLink(l.link,l.index,l.innerIndex))}),t._uU(1),t.qZA()}if(2&o){const n=i.$implicit;t.xp6(1),t.hij(" ",n.txt," ")}}function Z(o,i){if(1&o&&(t.TgZ(0,"div",21)(1,"div",22),t._uU(2,"For More Information:"),t.qZA(),t.YNc(3,x,2,1,"a",23),t.qZA()),2&o){const n=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",n.linksForMoreInformation)}}function S(o,i){if(1&o&&(t.TgZ(0,"div",8)(1,"div",9)(2,"div",10),t.YNc(3,f,2,1,"p",5),t.qZA(),t.TgZ(4,"div",11),t.YNc(5,y,2,1,"div",12),t.qZA()(),t.TgZ(6,"div",13)(7,"div",14),t.YNc(8,F,3,1,"video",15),t.qZA()(),t.YNc(9,Z,4,1,"div",16),t.qZA()),2&o){const n=i.$implicit;t.xp6(3),t.Q6J("ngForOf",n.text),t.xp6(2),t.Q6J("ngIf",""!==n.imgUrl),t.xp6(3),t.Q6J("ngIf","none"!==n.videoUrl),t.xp6(1),t.Q6J("ngIf",n.linksForMoreInformation)}}function P(o,i){if(1&o&&(t.TgZ(0,"app-accordion-item")(1,"div",6),t._uU(2),t.ALo(3,"uppercase"),t.qZA(),t.YNc(4,S,10,4,"div",7),t.qZA()),2&o){const n=i.$implicit;t.xp6(2),t.hij(" ",t.lcZ(3,2,n.title)," "),t.xp6(2),t.Q6J("ngForOf",n.content)}}const T=[{path:"",component:(()=>{class o{constructor(n,a){this.systemDataService=n,this.route=a}ngOnInit(){this.foldingUpSystemData$=this.systemDataService.getFoldingUpSystemData()}onLink(n,a,g=[]){this.route.navigate([n],{queryParams:{index:a.join(","),innerIndex:g.join(",")}})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(p.v),t.Y36(s.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-folding-system"]],decls:11,vars:3,consts:[[1,"scrollbar"],[1,"page-container","style1","main-layout"],[1,"top"],[1,"title"],[1,"middle"],[4,"ngFor","ngForOf"],["accordionItemHeader",""],["class","data-content","accordionItemBody","",4,"ngFor","ngForOf"],["accordionItemBody","",1,"data-content"],[1,"main-data"],[1,"text-container"],[1,"img-box"],["class","img-container",4,"ngIf"],[1,"video-box"],[1,"video-container"],["width","100%","controls","",4,"ngIf"],["class","links-box",4,"ngIf"],[1,"img-container"],["alt","dataImg",3,"src"],["width","100%","controls",""],["type","video/mp4",3,"src"],[1,"links-box"],[1,"links-title"],["class","link-btn",3,"click",4,"ngFor","ngForOf"],[1,"link-btn",3,"click"]],template:function(n,a){1&n&&(t._UZ(0,"ion-header"),t.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3),t._uU(6," Folding Up System "),t.qZA()(),t.TgZ(7,"div",4)(8,"app-accordion"),t.YNc(9,P,5,4,"app-accordion-item",5),t.ALo(10,"async"),t.qZA()()()()()),2&n&&(t.xp6(9),t.Q6J("ngForOf",t.lcZ(10,1,a.foldingUpSystemData$)))},dependencies:[c.sg,c.O5,d.W2,d.Gu,v.Z,_.n,u.KC,c.Ov,c.gd],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}"]}),o})()}];let A=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[s.Bz.forChild(T),s.Bz]}),o})();var U=e(4466);let h=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[c.ez,m.u5,d.Pc,A,U.m]}),o})()}}]);