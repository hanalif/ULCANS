import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationListPageRoutingModule } from './configuration-list-routing.module';

import { ConfigurationListPage } from './configuration-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationListPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfigurationListPage]
})
export class ConfigurationListPageModule {}
