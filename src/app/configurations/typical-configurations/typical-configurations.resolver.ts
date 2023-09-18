import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Asset } from '../models/asset.model';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { AssetsService } from '../services/assets/assets.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypicalConfigurationsPageResolver implements Resolve<Asset[]>  {

  constructor(private appConfigService: AppConfigurationService, private assetsService: AssetsService ) { }

  resolve(route: ActivatedRouteSnapshot):Observable<Asset[]> {
       return this.appConfigService.getCurrAppConfigSettings().pipe(
        switchMap(currConfig=>{
           return this.assetsService.getAssets()
        })
       )



    }

}
