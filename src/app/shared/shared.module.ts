import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';



import { IonicModule } from '@ionic/angular';
import { EmphFirstLetter } from '../pipes/emph-first-letter.pipe';

import { HeaderComponent } from './cmps/header/header.component';
import { MainBtnComponent } from './cmps/main-btn/main-btn.component';

@NgModule({
  declarations: [HeaderComponent, EmphFirstLetter, MainBtnComponent],
  imports: [IonicModule, HttpClientModule],
  exports: [HeaderComponent, MainBtnComponent],
  providers:[ ]
})
export class SharedModule {}
