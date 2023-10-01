import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorListPageRoutingModule } from './por-list-routing.module';

import { PorListPage } from './por-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorListPageRoutingModule,
    SharedModule
  ],
  declarations: [PorListPage]
})
export class PorListPageModule {}
