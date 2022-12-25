import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationsAndEnviormentsPage } from './configurations-and-enviorments.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationsAndEnviormentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsAndEnviormentsPageRoutingModule {}
