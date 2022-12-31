import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';



import { HeaderComponent } from './cmps/header/header.component';
import { MainBtnComponent } from './cmps/main-btn/main-btn.component';
import { FtToMPipe } from './pipes/ft-to-m.pipe';
import { SlideDownMenuComponent } from './cmps/slide-down-menu/slide-down-menu.component';
import {RouterModule} from '@angular/router';
import { PageIndexComponent } from './cmps/page-index/page-index.component';
import { IndexComponent } from './cmps/page-index/index/index.component';



@NgModule({
  declarations: [HeaderComponent,MainBtnComponent, FtToMPipe, SlideDownMenuComponent, PageIndexComponent, IndexComponent],
  imports: [ IonicModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule,CommonModule, RouterModule ],
  exports: [HeaderComponent, MainBtnComponent, FtToMPipe, FormsModule, SlideDownMenuComponent, PageIndexComponent, IndexComponent],
  providers:[ FtToMPipe]
})
export class SharedModule {}
