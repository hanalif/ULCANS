import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomePageGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [HomePageGuard]
  },
  {
    path: 'app-config-selection',
    loadChildren: () => import('./app-config-selection/app-config-selection.module').then( m => m.AppConfigSelectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
