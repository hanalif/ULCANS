import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSelectionGuard } from '../services/guards/user-selection.guard';

import { EnvironmentsAndTypesPage } from './environments-and-types.page';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[UserSelectionGuard],
    component: EnvironmentsAndTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentsAndTypesPageRoutingModule {}
