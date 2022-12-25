import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { UsefulInformationRoutingModule } from './useful-information-routing.module';
import { MainPage } from './main/main.page';
import { MainPageModule } from './main/main.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UsefulInformationRoutingModule,

  ],
  declarations: []
})
export class UsefulInformationModule {}
