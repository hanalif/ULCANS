import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoldingSystemPageRoutingModule } from './folding-system-routing.module';

import { FoldingSystemPage } from './folding-system.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoldingSystemPageRoutingModule,
    SharedModule
  ],
  declarations: [FoldingSystemPage]
})
export class FoldingSystemPageModule {}
