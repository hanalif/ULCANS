import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorListPage } from './por-list.page';
import { PORListPageGuard } from './por-list.guard';

const routes: Routes = [
  {
    path: '',
    component: PorListPage,
    canActivate: [PORListPageGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorListPageRoutingModule {}
