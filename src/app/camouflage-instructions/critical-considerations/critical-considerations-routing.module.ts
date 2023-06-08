import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriticalConsiderationsPage } from './critical-considerations.page';
import { InfoPagesResolver } from 'src/app/shared/resolvers/info-pages.resolver';

const routes: Routes = [
  {
    path: '',
    component: CriticalConsiderationsPage,
    resolve: {indexesForAccordion: InfoPagesResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CriticalConsiderationsPageRoutingModule {}
