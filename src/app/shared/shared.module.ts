import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';

import { HeaderComponent } from './components/header/header.component';
import { MainBtnComponent } from './components/main-btn/main-btn.component';
import { FtToMPipe } from './pipes/ft-to-m.pipe';
import {RouterModule} from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionItemComponent } from './components/accordion/accordion-item/accordion-item.component';
import { UserSelectionsMenuComponent } from './components/user-selections-menu/user-selections-menu.component';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClothPatternsMenuComponent } from './components/cloth-patterns-menu/cloth-patterns-menu.component';
import { MToFtPipe } from './pipes/m-to-ft.pipe';
import { SqftToSqmPipe } from './pipes/sqft-to-sqm.pipe';
import { BtnSelectionComponent } from './components/btn-selection/btn-selection.component';
import {Swiper} from 'swiper';





@NgModule({
  declarations: [HeaderComponent, BtnSelectionComponent,MainBtnComponent, SqftToSqmPipe ,FtToMPipe, MToFtPipe,AccordionComponent, AccordionItemComponent, UserSelectionsMenuComponent, ClothPatternsMenuComponent],
  imports: [ IonicModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule,CommonModule, RouterModule, NgScrollbarModule ],
  exports: [HeaderComponent,BtnSelectionComponent, MainBtnComponent,SqftToSqmPipe, FtToMPipe, FormsModule, AccordionComponent, AccordionItemComponent, UserSelectionsMenuComponent,NgScrollbarModule, ClothPatternsMenuComponent],
  providers:[ FtToMPipe ,MToFtPipe, SqftToSqmPipe,FileOpener, File, Swiper]
})
export class SharedModule {}
