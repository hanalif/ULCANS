import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriticalConsiderationsPageRoutingModule } from './critical-considerations-routing.module';

import { CriticalConsiderationsPage } from './critical-considerations.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriticalConsiderationsPageRoutingModule,
    SharedModule
  ],
  declarations: [CriticalConsiderationsPage]
})
export class CriticalConsiderationsPageModule {}
