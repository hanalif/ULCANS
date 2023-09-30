import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeTxtComponent } from './welcome-txt/welcome-txt.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, WelcomeTxtComponent],
  exports: [WelcomeTxtComponent]
})
export class HomePageModule {}
