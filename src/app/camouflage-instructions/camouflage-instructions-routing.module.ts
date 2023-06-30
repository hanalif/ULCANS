import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./camouflage-instructions-intro/camouflage-instructions-intro.module').then( m => m.CamouflageInstructionsIntroPageModule)

  },
  {
    path: 'setting-up-system',
    loadChildren: () => import('./setting-up-system/setting-up-system.module').then( m => m.SettingUpSystemPageModule)
  },
  {
    path: 'folding-system',
    loadChildren: () => import('./folding-system/folding-system.module').then( m => m.FoldingSystemPageModule)
  },
  {
    path: 'critical-considerations',
    loadChildren: () => import('./critical-considerations/critical-considerations.module').then( m => m.CriticalConsiderationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamouflageInstructionsRoutingModule {}
