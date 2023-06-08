import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentDescriptionPage } from './equipment-description.page';
import { InfoPagesResolver } from 'src/app/shared/resolvers/info-pages.resolver';

const routes: Routes = [
  {
    path: '',
    component: EquipmentDescriptionPage,
    resolve: {indexesForAccordion: InfoPagesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentDescriptionPageRoutingModule {}
