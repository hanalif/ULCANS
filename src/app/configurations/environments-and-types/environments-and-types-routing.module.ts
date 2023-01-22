import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvironmentsAndTypesPage } from './environments-and-types.page';
import { EnvironmentsResolver } from './evironments.resolver';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentsAndTypesPage,
    resolve: {EnvironmentPageInputForDisplay: EnvironmentsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvironmentsAndTypesPageRoutingModule {}
