import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentDescriptionPage } from './equipment-description.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentDescriptionPageRoutingModule {}
