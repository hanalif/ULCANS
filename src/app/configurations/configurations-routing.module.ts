import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationListPage } from './configuration-list/configuration-list.page';
import { TypicalConfigurationsPage } from './typical-configurations/typical-configurations.page';



const routes: Routes = [
  {
    path:'',
    children:[
        {
            path: '',
            loadChildren: () => import('./configuration-list/configuration-list-routing.module').then(m=> m.ConfigurationListPageRoutingModule)
        },
        {
            path: 'typical-configurations',
            loadChildren: () => import('./typical-configurations/typical-configurations-routing.module').then( m => m.TypicalConfigurationsPageRoutingModule),
        },
        {
            path: 'configuration-calaulator',
            loadChildren: () => import('./configuration-calculator/configuration-calculator-routing.module').then(m=> m.ConfigurationCalculatorPageRoutingModule)
        },
        {
          path: 'configurations-and-enviorments',
          loadChildren: () => import('./configurations-and-enviorments/configurations-and-enviorments.module').then( m => m.ConfigurationsAndEnviormentsPageModule)
        }
    ]
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {}
