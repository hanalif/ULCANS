import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypicalConfigurationsPageRoutingModule } from './typical-configurations-routing.module';

import { TypicalConfigurationsPage } from './typical-configurations.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypicalConfigurationsPageRoutingModule,
    SharedModule
  ],
  declarations: [TypicalConfigurationsPage]
})
export class TypicalConfigurationsPageModule {}
