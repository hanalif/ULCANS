import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoldingSystemPage } from './folding-system.page';

const routes: Routes = [
  {
    path: '',
    component: FoldingSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoldingSystemPageRoutingModule {}
