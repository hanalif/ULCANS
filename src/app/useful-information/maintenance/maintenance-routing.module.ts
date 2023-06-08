import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePage } from './maintenance.page';
import { InfoPagesResolver } from 'src/app/shared/resolvers/info-pages.resolver';

const routes: Routes = [
  {
    path: '',
    component: MaintenancePage,
    resolve: {indexesForAccordion: InfoPagesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancePageRoutingModule {}
