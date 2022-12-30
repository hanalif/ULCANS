import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { SharedModule } from './shared/shared.module';
import { UsefulInformationModule } from './useful-information/useful-information.module';
import { CamouflageInstructionsModule } from './camouflage-instructions/camouflage-instructions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ConfigurationsModule, UsefulInformationModule, CamouflageInstructionsModule, SharedModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}
