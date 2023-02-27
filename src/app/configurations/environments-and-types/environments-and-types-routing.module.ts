import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentsAndTypesPageGuard } from './environments-and-types.guard';
import { UserSelectionGuard } from '../services/guards/user-selection.guard';

import { EnvironmentsAndTypesPage } from './environments-and-types.page';
import { EnvironmentsAndTypesResolver } from './environments-and-types.resolver';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[UserSelectionGuard],
    canActivate:[EnvironmentsAndTypesPageGuard],
    resolve: {currUserSelection: EnvironmentsAndTypesResolver},
    component: EnvironmentsAndTypesPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentsAndTypesPageRoutingModule {}
