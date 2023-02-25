import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnvironmentsAndTypesPageRoutingModule } from './environments-and-types-routing.module';

import { EnvironmentsAndTypesPage } from './environments-and-types.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnvironmentsRadioBtnComponent } from './components/environments-radio-btn/environments-radio-btn.component';
import { TypesSelectBtnComponent } from './components/types-select-btn/types-select-btn.component';
import { UserSelectionGuard } from '../services/guards/user-selection.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnvironmentsAndTypesPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    EnvironmentsAndTypesPage,
    EnvironmentsRadioBtnComponent,
    TypesSelectBtnComponent
  ],

})
export class EnvironmentsAndTypesPageModule {}
