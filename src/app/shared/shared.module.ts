import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { IonicModule, IonicRouteStrategy} from '@ionic/angular';


import { HeaderComponent } from './cmps/header/header.component';
import { MainBtnComponent } from './cmps/main-btn/main-btn.component';
import { FtToMPipe } from './pipes/ft-to-m.pipe';
import { RouteReuseStrategy } from '@angular/router';
import { SlideDownMenuComponent } from './cmps/slide-down-menu/slide-down-menu.component';

@NgModule({
  declarations: [HeaderComponent,MainBtnComponent, FtToMPipe, SlideDownMenuComponent],
  imports: [ IonicModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [HeaderComponent, MainBtnComponent, FtToMPipe, FormsModule, SlideDownMenuComponent],
  providers:[ FtToMPipe]
})
export class SharedModule {}
