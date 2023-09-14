import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppConfigSelectionPage } from './app-config-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AppConfigSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppConfigSelectionPageRoutingModule {}
