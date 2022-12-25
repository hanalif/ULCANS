import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingUpSystemPage } from './setting-up-system.page';

const routes: Routes = [
  {
    path: '',
    component: SettingUpSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingUpSystemPageRoutingModule {}
