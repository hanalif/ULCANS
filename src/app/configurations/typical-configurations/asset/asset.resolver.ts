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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AssetForPreview | undefined {
    const assetId = route.params['assetId'];
    let asset = this.assetsService.getAssetById(assetId);
    if(!asset){
      return undefined;
    }else{
      let config = this.configsService.getConfigurationById(asset.configurationId);
      let assetForPreview: AssetForPreview = {
        asset: asset,
        configuration: config
      }
      return assetForPreview;
    }

  }
}
