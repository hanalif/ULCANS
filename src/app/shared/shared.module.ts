import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './cmps/header/header.component';
import { MainBtnComponent } from './cmps/main-btn/main-btn.component';
import { FtToMPipe } from './pipes/ft-to-m.pipe';

@NgModule({
  declarations: [HeaderComponent,MainBtnComponent, FtToMPipe],
  imports: [IonicModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [HeaderComponent, MainBtnComponent, FtToMPipe, FormsModule],
  providers:[ FtToMPipe]
})
export class SharedModule {}
