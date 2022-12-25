import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationsAndEnviormentsPageRoutingModule } from './configurations-and-enviorments-routing.module';

import { ConfigurationsAndEnviormentsPage } from './configurations-and-enviorments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationsAndEnviormentsPageRoutingModule
  ],
  declarations: [ConfigurationsAndEnviormentsPage]
})
export class ConfigurationsAndEnviormentsPageModule {}
