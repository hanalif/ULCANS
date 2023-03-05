import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PdfPageComponent } from './shared/components/pdf-page/pdf-page.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'configurations',
    loadChildren: () => import('./configurations/configurations-routing.module').then( m => m.ConfigurationsRoutingModule)
  },
  {
    path: 'camouflage-instructions',
    loadChildren: () => import('./camouflage-instructions/camouflage-instructions-routing.module').then(m => m.CamouflageInstructionsRoutingModule)
  },
  {
    path: 'useful-information',
    loadChildren: () => import('./useful-information/useful-information-routing.module').then(m => m.UsefulInformationRoutingModule)
  },
  {
    path:'pdf-page',
    component: PdfPageComponent

  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
