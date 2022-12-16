import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationListPage } from './configuration-list.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationListPageRoutingModule {}
