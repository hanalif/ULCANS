import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefrencesPage } from './refrences.page';

const routes: Routes = [
  {
    path: '',
    component: RefrencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefrencesPageRoutingModule {}
