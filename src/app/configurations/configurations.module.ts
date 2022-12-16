import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationCalculatorPageModule } from './configuration-calculator/configuration-calculator.module';
import { TypicalConfigurationsPageModule } from './typical-configurations/typical-configurations.module';
import { ConfigurationListPageModule } from './configuration-list/configuration-list.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationsRoutingModule,
    ConfigurationCalculatorPageModule,
    TypicalConfigurationsPageModule,
    ConfigurationListPageModule,
    SharedModule

  ],
  declarations: []
})
export class ConfigurationsModule {}
