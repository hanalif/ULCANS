import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorListPage } from './por-list.page';

const routes: Routes = [
  {
    path: '',
    component: PorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorListPageRoutingModule {}
