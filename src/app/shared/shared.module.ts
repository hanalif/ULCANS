import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './cmps/header/header.component';
import { MainBtnComponent } from './cmps/main-btn/main-btn.component';

@NgModule({
  declarations: [HeaderComponent,MainBtnComponent],
  imports: [IonicModule, HttpClientModule, FormsModule],
  exports: [HeaderComponent, MainBtnComponent],
  providers:[ ]
})
export class SharedModule {}
