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
            path: 'typical-configurstions',
            loadChildren: () => import('./typical-configurations/typical-configurations-routing.module').then( m => m.TypicalConfigurationsPageRoutingModule)
        },
        {
            path: 'configuration-calaulator',
            loadChildren: () => import('./configuration-calculator/configuration-calculator-routing.module').then(m=> m.ConfigurationCalculatorPageRoutingModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {}
