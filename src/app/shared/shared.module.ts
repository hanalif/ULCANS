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
import { PdfPageComponent } from './components/pdf-page/pdf-page.component';




@NgModule({
  declarations: [HeaderComponent,MainBtnComponent, FtToMPipe, AccordionComponent, AccordionItemComponent, UserSelectionsMenuComponent, PdfPageComponent],
  imports: [ IonicModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule,CommonModule, RouterModule ],
  exports: [HeaderComponent, MainBtnComponent, FtToMPipe, FormsModule, AccordionComponent, AccordionItemComponent, UserSelectionsMenuComponent, PdfPageComponent],
  providers:[ FtToMPipe, FileOpener, File]
})
export class SharedModule {}
