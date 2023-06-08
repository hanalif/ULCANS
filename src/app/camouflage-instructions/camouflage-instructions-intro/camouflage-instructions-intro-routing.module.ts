import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamouflageInstructionsIntroPage } from './camouflage-instructions-intro.page';

const routes: Routes = [
  {
    path: '',
    component: CamouflageInstructionsIntroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamouflageInstructionsIntroPageRoutingModule {}
