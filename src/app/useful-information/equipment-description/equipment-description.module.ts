import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentDescriptionPageRoutingModule } from './equipment-description-routing.module';

import { EquipmentDescriptionPage } from './equipment-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentDescriptionPageRoutingModule
  ],
  declarations: [EquipmentDescriptionPage]
})
export class EquipmentDescriptionPageModule {}
