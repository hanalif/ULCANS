import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamouflageInstructionsIntroPageRoutingModule } from './camouflage-instructions-intro-routing.module';

import { CamouflageInstructionsIntroPage } from './camouflage-instructions-intro.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamouflageInstructionsIntroPageRoutingModule,
    SharedModule
  ],
  declarations: [CamouflageInstructionsIntroPage]
})
export class CamouflageInstructionsIntroPageModule {}
