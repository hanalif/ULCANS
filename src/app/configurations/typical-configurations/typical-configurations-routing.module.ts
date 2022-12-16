import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypicalConfigurationsPage } from './typical-configurations.page';

const routes: Routes = [
  {
    path: '',
    component: TypicalConfigurationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypicalConfigurationsPageRoutingModule {}
