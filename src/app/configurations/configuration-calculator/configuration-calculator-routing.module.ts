import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSelectionGuard } from '../services/guards/user-selection.guard';

import { ConfigurationCalculatorPage } from './configuration-calculator.page';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[UserSelectionGuard],
    component: ConfigurationCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationCalculatorPageRoutingModule {}
