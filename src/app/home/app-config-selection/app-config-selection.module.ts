import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppConfigSelectionPageRoutingModule } from './app-config-selection-routing.module';

import { AppConfigSelectionPage } from './app-config-selection.page';
import { HomePageModule } from '../home.module';
import { WelcomeTxtComponent } from '../welcome-txt/welcome-txt.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppConfigSelectionPageRoutingModule,
    HomePageModule,
    SharedModule

  ],
  declarations: [AppConfigSelectionPage]
})
export class AppConfigSelectionPageModule {}
