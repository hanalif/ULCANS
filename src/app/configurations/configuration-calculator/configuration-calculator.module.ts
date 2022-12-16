import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationCalculatorPageRoutingModule } from './configuration-calculator-routing.module';

import { ConfigurationCalculatorPage } from './configuration-calculator.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationCalculatorPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfigurationCalculatorPage]
})
export class ConfigurationCalculatorPageModule {}
