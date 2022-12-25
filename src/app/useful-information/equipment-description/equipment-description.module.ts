import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentDescriptionPageRoutingModule } from './equipment-description-routing.module';

import { EquipmentDescriptionPage } from './equipment-description.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentDescriptionPageRoutingModule,
    SharedModule
  ],
  declarations: [EquipmentDescriptionPage]
})
export class EquipmentDescriptionPageModule {}
