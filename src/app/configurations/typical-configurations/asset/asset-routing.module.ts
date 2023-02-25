import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSelectionGuard } from '../../services/guards/user-selection.guard';

import { AssetPage } from './asset.page';
import { AssetResolver } from './asset.resolver';

const routes: Routes = [
  {
    path: '',
    component: AssetPage,
    resolve: {assetForPreview: AssetResolver},
    canDeactivate: [UserSelectionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetPageRoutingModule {}
