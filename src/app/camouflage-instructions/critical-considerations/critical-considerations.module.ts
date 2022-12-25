import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriticalConsiderationsPageRoutingModule } from './critical-considerations-routing.module';

import { CriticalConsiderationsPage } from './critical-considerations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriticalConsiderationsPageRoutingModule
  ],
  declarations: [CriticalConsiderationsPage]
})
export class CriticalConsiderationsPageModule {}
