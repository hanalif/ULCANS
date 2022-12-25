import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefrencesPageRoutingModule } from './refrences-routing.module';

import { RefrencesPage } from './refrences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefrencesPageRoutingModule
  ],
  declarations: [RefrencesPage]
})
export class RefrencesPageModule {}
