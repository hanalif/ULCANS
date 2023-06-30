import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationCalculatorPage } from './configuration-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationCalculatorPage
  },
  {
    path: ':assetId',
    component: ConfigurationCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationCalculatorPageRoutingModule {}
