import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path:'',
    children:[
        {
            path: 'configurations-list',
            loadChildren: () => import('./configuration-list/configuration-list-routing.module').then(m=> m.ConfigurationListPageRoutingModule)
        },
        {
            path: 'typical-configurations',
            loadChildren: () => import('./typical-configurations/typical-configurations-routing.module').then( m => m.TypicalConfigurationsPageRoutingModule)
        },
        {
            path: 'configuration-calaulator',
            loadChildren: () => import('./configuration-calculator/configuration-calculator-routing.module').then(m=> m.ConfigurationCalculatorPageRoutingModule)
        },
        {
          path: 'environments-and-types',
          loadChildren: () => import('./environments-and-types/environments-and-types-routing.module').then(m => m.EnvironmentsAndTypesPageRoutingModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsRoutingModule {}
