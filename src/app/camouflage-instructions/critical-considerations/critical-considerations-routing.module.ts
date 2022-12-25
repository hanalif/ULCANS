import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriticalConsiderationsPage } from './critical-considerations.page';

const routes: Routes = [
  {
    path: '',
    component: CriticalConsiderationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriticalConsiderationsPageRoutingModule {}
