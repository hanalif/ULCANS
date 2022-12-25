import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingUpSystemPageRoutingModule } from './setting-up-system-routing.module';

import { SettingUpSystemPage } from './setting-up-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingUpSystemPageRoutingModule
  ],
  declarations: [SettingUpSystemPage]
})
export class SettingUpSystemPageModule {}
