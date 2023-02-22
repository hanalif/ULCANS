import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentsAndTypesPage } from './environments-and-types.page';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[],
    component: EnvironmentsAndTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentsAndTypesPageRoutingModule {}
