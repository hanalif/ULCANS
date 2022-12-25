import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { CamouflageInstructionsRoutingModule } from './camouflage-instructions-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CamouflageInstructionsRoutingModule

  ],
  declarations: []
})
export class CamouflageInstructionsModule {}
