import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoldingSystemPageRoutingModule } from './folding-system-routing.module';

import { FoldingSystemPage } from './folding-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoldingSystemPageRoutingModule
  ],
  declarations: [FoldingSystemPage]
})
export class FoldingSystemPageModule {}
