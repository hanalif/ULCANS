import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main-routing.module').then( m => m.MainPageRoutingModule)
  },
  {
    path: 'equipment-description',
    loadChildren: () => import('./equipment-description/equipment-description.module').then( m => m.EquipmentDescriptionPageModule)
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule)
  },  {
    path: 'por-list',
    loadChildren: () => import('./por-list/por-list.module').then( m => m.PorListPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsefulInformationRoutingModule {}
