"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[790],{790:(B,T,o)=>{o.r(T),o.d(T,{AssetPageModule:()=>N});var r=o(6895),A=o(433),u=o(8779),c=o(5472),Z=o(5978),e=o(1571),d=o(5615),l=o(2260);let v=(()=>{class s{constructor(t,n,a){this.assetsService=t,this.userSelectionService=n,this.router=a}canActivate(t,n){return!!this.assetsService.getAssetById(t.params.assetId)||(this.router.navigate(["configurations/typical-configurations"]),this.userSelectionService.resetCurrUserSelection(),!1)}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(d.z),e.LFG(l.U),e.LFG(c.F0))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();var f=o(9924),h=o(3162),_=o(8982),q=o(4178);function y(s,i){if(1&s&&(e.TgZ(0,"th"),e._uU(1),e.qZA()),2&s){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function M(s,i){1&s&&(e.TgZ(0,"span",30),e._uU(1,"The size of your asset requires a custom configuration. Please contact us for more information. "),e.qZA())}function S(s,i){if(1&s&&(e.TgZ(0,"th"),e._uU(1),e.qZA()),2&s){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function U(s,i){1&s&&(e.TgZ(0,"span"),e._uU(1,"*"),e.qZA())}function b(s,i){1&s&&(e.TgZ(0,"div")(1,"span",34),e._uU(2," * Special poles require "),e.qZA()())}const x=function(){return["Type","Hexagon","Rhombus","Width","Length","Area SQ","Poles","Pins"]};function P(s,i){if(1&s&&(e.TgZ(0,"div")(1,"table",12)(2,"thead")(3,"tr"),e.YNc(4,S,2,1,"th",13),e.qZA()(),e.TgZ(5,"tbody")(6,"tr")(7,"td",31)(8,"div",32),e._UZ(9,"img",33),e.qZA(),e._uU(10),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.qZA(),e.TgZ(13,"td"),e._uU(14),e.qZA(),e.TgZ(15,"td"),e._uU(16),e.ALo(17,"number"),e.ALo(18,"ftToM"),e.qZA(),e.TgZ(19,"td"),e._uU(20),e.ALo(21,"number"),e.ALo(22,"ftToM"),e.qZA(),e.TgZ(23,"td"),e._uU(24),e.ALo(25,"number"),e.ALo(26,"sqftToSqm"),e.qZA(),e.TgZ(27,"td"),e.YNc(28,U,2,0,"span",15),e._uU(29),e.qZA(),e.TgZ(30,"td"),e._uU(31),e.qZA()()()(),e.YNc(32,b,3,0,"div",15),e.qZA()),2&s){const t=e.oxw();e.xp6(4),e.Q6J("ngForOf",e.DdM(33,x)),e.xp6(5),e.Q6J("src",t.configuration.imgUrl,e.LSH),e.xp6(1),e.hij(" ",t.configuration.name," "),e.xp6(2),e.Oqu(t.configuration.hexagon),e.xp6(2),e.Oqu(t.configuration.rhombus),e.xp6(2),e.AsE(" ",e.xi3(17,15,e.xi3(18,18,t.configuration.measures.widthFt,t.measureType),"1.1-1")," ",t.measureType===t.MeasureType.METERS?"M":"FT"," "),e.xp6(4),e.AsE(" ",e.xi3(21,21,e.xi3(22,24,t.configuration.measures.lengthFt,t.measureType),"1.1-1")," ",t.measureType===t.MeasureType.METERS?"M":"FT"," "),e.xp6(4),e.AsE(" ",e.xi3(25,27,e.xi3(26,30,t.configuration.measures.areaSqFt,t.measureType),"1.0-0")," ",t.measureType===t.MeasureType.METERS?"SQM":"SQFT"," "),e.xp6(4),e.Q6J("ngIf",t.areSpecialPoles),e.xp6(1),e.hij(" ",t.configuration.poles," "),e.xp6(2),e.Oqu(t.configuration.pins),e.xp6(1),e.Q6J("ngIf",t.areSpecialPoles)}}function F(s,i){1&s&&(e.TgZ(0,"div",20)(1,"div",21)(2,"div",30),e._uU(3," The size of your asset requires a custom configuration. Please contact us for more information. "),e.qZA()()())}function E(s,i){1&s&&(e.TgZ(0,"span"),e._uU(1,"*"),e.qZA())}function L(s,i){1&s&&(e.TgZ(0,"div",38),e._uU(1," * Special poles require "),e.qZA())}function C(s,i){if(1&s&&(e.TgZ(0,"div")(1,"div",20)(2,"span",21),e._uU(3),e.qZA(),e.TgZ(4,"span",22),e._uU(5),e.TgZ(6,"div",35),e._UZ(7,"img",36),e.qZA()()(),e.TgZ(8,"div",20)(9,"span",21),e._uU(10),e.qZA(),e.TgZ(11,"span",22),e._uU(12),e.qZA()(),e.TgZ(13,"div",20)(14,"span",21),e._uU(15),e.qZA(),e.TgZ(16,"span",22),e._uU(17),e.qZA()(),e.TgZ(18,"div",20)(19,"span",21),e._uU(20),e.qZA(),e.TgZ(21,"span",22),e._uU(22),e.ALo(23,"number"),e.ALo(24,"ftToM"),e.qZA()(),e.TgZ(25,"div",20)(26,"span",21),e._uU(27),e.qZA(),e.TgZ(28,"span",22),e._uU(29),e.ALo(30,"number"),e.ALo(31,"ftToM"),e.qZA()(),e.TgZ(32,"div",20)(33,"span",21),e._uU(34),e.qZA(),e.TgZ(35,"span",22),e._uU(36),e.ALo(37,"number"),e.ALo(38,"sqftToSqm"),e.qZA()(),e.TgZ(39,"div",20)(40,"span",21),e._uU(41),e.qZA(),e.TgZ(42,"span",22),e.YNc(43,E,2,0,"span",15),e._uU(44),e.qZA()(),e.TgZ(45,"div",20)(46,"span",21),e._uU(47),e.qZA(),e.TgZ(48,"span",22),e._uU(49),e.qZA()(),e.YNc(50,L,2,0,"div",37),e.qZA()),2&s){const t=e.oxw();e.xp6(3),e.Oqu(t.tableHeaderTitles[0]),e.xp6(2),e.hij(" ",t.configuration.name," "),e.xp6(2),e.Q6J("src",t.configuration.imgUrl,e.LSH),e.xp6(3),e.Oqu(t.tableHeaderTitles[1]),e.xp6(2),e.hij(" ",t.configuration.hexagon," "),e.xp6(3),e.Oqu(t.tableHeaderTitles[2]),e.xp6(2),e.hij(" ",t.configuration.rhombus," "),e.xp6(3),e.Oqu(t.tableHeaderTitles[3]),e.xp6(2),e.AsE(" ",e.xi3(23,22,e.xi3(24,25,t.configuration.measures.widthFt,t.measureType),"1.1-1")," ",t.measureType===t.MeasureType.METERS?"M":"FT"," "),e.xp6(5),e.Oqu(t.tableHeaderTitles[4]),e.xp6(2),e.AsE(" ",e.xi3(30,28,e.xi3(31,31,t.configuration.measures.lengthFt,t.measureType),"1.1-1")," ",t.measureType===t.MeasureType.METERS?"M":"FT"," "),e.xp6(5),e.Oqu(t.tableHeaderTitles[5]),e.xp6(2),e.AsE(" ",e.xi3(37,34,e.xi3(38,37,t.configuration.measures.areaSqFt,t.measureType),"1.0-0")," ",t.measureType===t.MeasureType.METERS?"SQM":"SQFT"," "),e.xp6(5),e.Oqu(t.tableHeaderTitles[6]),e.xp6(2),e.Q6J("ngIf",t.areSpecialPoles),e.xp6(1),e.hij(" ",t.configuration.poles," "),e.xp6(3),e.Oqu(t.tableHeaderTitles[7]),e.xp6(2),e.hij(" ",t.configuration.pins," "),e.xp6(1),e.Q6J("ngIf",t.areSpecialPoles)}}const m=function(s){return{active:s}},O=function(){return["Name","Width","Height","Length"]};let I=(()=>{class s{constructor(t,n,a){this.router=t,this.route=n,this.userSelectionsService=a,this.measureType=f.C.METERS,this.MeasureType=f.C,this.tableHeaderTitles=["Type","Hexagon","Rhombus","Width","Length","Area SQ","Poles","Pins","Name","Width","Height","Length"],this.wideScreenTitles=[{mainTitle:"Configuration",tableTitles:["Type","Hexagon","Rhombus","Width","Length","Area SQ","Poles","Pins"]},{mainTitle:"Asset",tableTitles:["Name","Width","Height","Length"]}]}ngOnInit(){const t=this.router.snapshot.data.assetForPreview;this.asset=t.asset,this.configuration=t.configuration,this.areSpecialPoles=t.areSpecialPoles}onSelectBtn(t){this.measureType!==t&&(this.measureType=t)}onChooseYourEnvironment(){this.userSelectionsService.updateCurrUserSelections({measureType:this.measureType}),this.route.navigate(["/configurations/environments-and-types"],{queryParams:{assetId:this.asset.id,measureType:this.measureType}})}onBack(){this.route.navigate(["/configurations/typical-configurations"])}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(c.gz),e.Y36(c.F0),e.Y36(l.U))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-asset"]],decls:98,vars:71,consts:[[1,"scrollbar",3,"autoHeightDisabled"],[1,"page-container","main-layout"],[1,"top"],[1,"btns-section"],[1,"icon-btn",3,"click"],["name","arrow-back-outline"],[1,"icon-btn",3,"ngClass","click"],[1,"title"],[1,"body"],[1,"wide-screen"],[1,"middle"],[1,"table-container"],[1,"styled-table","style1"],[4,"ngFor","ngForOf"],["class","note",4,"ngIf"],[4,"ngIf"],[1,"cards-container","mobile"],[1,"card"],[1,"card-body"],[1,"card-title"],[1,"card-row"],[1,"card-row_title"],[1,"card-row_content","mobile"],["class","card-row",4,"ngIf"],[1,"footer-container","main-layout"],[1,"next-button-wrapper"],[1,"regular-btn",3,"click"],[1,"mobile-buttom"],["name","arrow-forward-outline"],[1,"footer-txt"],[1,"note"],[1,"td-img"],[1,"table-img"],["alt","configuration-pic",3,"src"],[1,"poles-note"],[1,"card-img"],["alt","",3,"src"],["class","note-txt",4,"ngIf"],[1,"note-txt"]],template:function(t,n){1&t&&(e._UZ(0,"ion-header"),e.TgZ(1,"ion-content")(2,"ng-scrollbar",0)(3,"div",1)(4,"div",2)(5,"div",3)(6,"button",4),e.NdJ("click",function(){return n.onBack()}),e._UZ(7,"ion-icon",5),e.qZA(),e.TgZ(8,"div")(9,"button",6),e.NdJ("click",function(){return n.onSelectBtn(1)}),e._uU(10," M "),e.qZA(),e.TgZ(11,"button",6),e.NdJ("click",function(){return n.onSelectBtn(2)}),e._uU(12," FT "),e.qZA()()(),e.TgZ(13,"div",7)(14,"span"),e._uU(15,"ULCANS Configuration"),e.qZA(),e.TgZ(16,"span"),e._uU(17,"Based On Your Asset Measurements"),e.qZA()()(),e.TgZ(18,"div",8)(19,"div",9)(20,"div",10)(21,"div",11)(22,"h1"),e._uU(23),e.qZA(),e.TgZ(24,"table",12)(25,"thead")(26,"tr"),e.YNc(27,y,2,1,"th",13),e.qZA()(),e.TgZ(28,"tbody")(29,"tr")(30,"td"),e._uU(31),e.qZA(),e.TgZ(32,"td"),e._uU(33),e.ALo(34,"number"),e.ALo(35,"ftToM"),e.qZA(),e.TgZ(36,"td"),e._uU(37),e.ALo(38,"number"),e.ALo(39,"ftToM"),e.qZA(),e.TgZ(40,"td"),e._uU(41),e.ALo(42,"number"),e.ALo(43,"ftToM"),e.qZA()()()()(),e.TgZ(44,"div",11)(45,"h1"),e._uU(46,"Configuration"),e.qZA(),e.YNc(47,M,2,0,"span",14),e.YNc(48,P,33,34,"div",15),e.qZA()(),e.TgZ(49,"div",16)(50,"div",17)(51,"div",18)(52,"div",19),e._uU(53,"Asset"),e.qZA(),e.TgZ(54,"div",20)(55,"span",21),e._uU(56),e.qZA(),e.TgZ(57,"span",22),e._uU(58),e.qZA()(),e.TgZ(59,"div",20)(60,"span",21),e._uU(61),e.qZA(),e.TgZ(62,"span",22),e._uU(63),e.ALo(64,"number"),e.ALo(65,"ftToM"),e.qZA()(),e.TgZ(66,"div",20)(67,"span",21),e._uU(68),e.qZA(),e.TgZ(69,"span",22),e._uU(70),e.ALo(71,"number"),e.ALo(72,"ftToM"),e.qZA()(),e.TgZ(73,"div",20)(74,"span",21),e._uU(75),e.qZA(),e.TgZ(76,"span",22),e._uU(77),e.ALo(78,"number"),e.ALo(79,"ftToM"),e.qZA()()()(),e.TgZ(80,"div",17)(81,"div",18)(82,"div",19),e._uU(83,"Configuration"),e.qZA(),e.TgZ(84,"div"),e.YNc(85,F,4,0,"div",23),e.YNc(86,C,51,40,"div",15),e.qZA()()()()()()()()(),e.TgZ(87,"ion-footer")(88,"ion-toolbar")(89,"div",24)(90,"div",25)(91,"button",26),e.NdJ("click",function(){return n.onChooseYourEnvironment()}),e.TgZ(92,"span",27),e._uU(93),e.ALo(94,"uppercase"),e.qZA(),e._UZ(95,"ion-icon",28),e.qZA()(),e.TgZ(96,"p",29),e._uU(97," The app offers limited ULCANS preferences. For more options, please reach out. "),e.qZA()()()()),2&t&&(e.xp6(2),e.Q6J("autoHeightDisabled",!1),e.xp6(7),e.Q6J("ngClass",e.VKq(66,m,n.measureType===n.MeasureType.METERS)),e.xp6(2),e.Q6J("ngClass",e.VKq(68,m,n.measureType===n.MeasureType.FEET)),e.xp6(12),e.Oqu(n.wideScreenTitles[1].mainTitle),e.xp6(4),e.Q6J("ngForOf",e.DdM(70,O)),e.xp6(4),e.Oqu(n.asset.name),e.xp6(2),e.AsE(" ",e.xi3(34,28,e.xi3(35,31,n.asset.measures.widthFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(4),e.AsE(" ",e.xi3(38,34,e.xi3(39,37,n.asset.measures.heightFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(4),e.AsE(" ",e.xi3(42,40,e.xi3(43,43,n.asset.measures.lengthFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(6),e.Q6J("ngIf",!n.configuration),e.xp6(1),e.Q6J("ngIf",n.configuration),e.xp6(8),e.Oqu(n.tableHeaderTitles[8]),e.xp6(2),e.hij(" ",n.asset.name," "),e.xp6(3),e.Oqu(n.tableHeaderTitles[9]),e.xp6(2),e.AsE(" ",e.xi3(64,46,e.xi3(65,49,n.asset.measures.widthFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(5),e.Oqu(n.tableHeaderTitles[10]),e.xp6(2),e.AsE(" ",e.xi3(71,52,e.xi3(72,55,n.asset.measures.heightFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(5),e.Oqu(n.tableHeaderTitles[11]),e.xp6(2),e.AsE(" ",e.xi3(78,58,e.xi3(79,61,n.asset.measures.lengthFt,n.measureType),"1.1-1")," ",n.measureType===n.MeasureType.METERS?"M":"FT"," "),e.xp6(8),e.Q6J("ngIf",!n.configuration),e.xp6(1),e.Q6J("ngIf",n.configuration),e.xp6(7),e.Oqu(e.lcZ(94,64,"continue to choose your environment and type")))},dependencies:[r.mk,r.sg,r.O5,u.W2,u.fr,u.Gu,u.gu,u.sr,h.KC,r.gd,r.JJ,_.k,q.v],styles:[".scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color: #7a7a7a}.table-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:22px}.table-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{height:65px}.table-container[_ngcontent-%COMP%]   .td-img[_ngcontent-%COMP%]{align-items:center;gap:10px}.card[_ngcontent-%COMP%]{background-color:#000}"]}),s})();var R=o(8112);const H=[{path:"",component:I,canActivate:[v],resolve:{assetForPreview:(()=>{class s{constructor(t,n,a){this.assetsService=t,this.configsService=n,this.userSelectionsService=a}resolve(t){const n=t.params.assetId;let a=this.assetsService.getAssetById(n);if(a){const g=a.measures.heightFt>=12.103;let p;return this.userSelectionsService.updateCurrUserSelections({assetId:n,configuraionId:a.configurationId,areSpecialPoles:g,isCustomConfiguration:!a.configurationId}),p=a.configurationId?this.configsService.getConfigurationById(a.configurationId):void 0,{asset:a,configuration:p,areSpecialPoles:g}}}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(d.z),e.LFG(R.x),e.LFG(l.U))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},canDeactivate:[Z.b]}];let J=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[c.Bz.forChild(H),c.Bz]}),s})();var Q=o(4466);let N=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[r.ez,A.u5,u.Pc,J,Q.m]}),s})()}}]);