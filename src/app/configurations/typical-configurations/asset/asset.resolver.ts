import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AssetForPreview } from '../../models/assetForPreview.model';
import { AssetsService } from '../../services/assets/assets.service';
import { ConfigurationsService } from '../../services/configurationsService/configurations.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<AssetForPreview | undefined>  {

  constructor(
    private assetsService: AssetsService, private configsService: ConfigurationsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AssetForPreview | undefined> {
    const assetId = route.params['assetId'];
    const assetForPreview$ = this.assetsService.getAssetById(assetId).pipe(
      switchMap(asset=>{
        if(!asset){
          return of(undefined);
        }else{
          return this.configsService.getConfigurationById(asset.configurationId).pipe(
            map(config=>{
              let assetForPreview: AssetForPreview = {
                asset: asset,
                configuration: config
              }
              return assetForPreview;
            })
          )
        }
      })
    )
    return assetForPreview$;
  }
}
