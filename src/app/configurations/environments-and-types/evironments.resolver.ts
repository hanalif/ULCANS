import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { Configuration } from '../models/configuration.model';
import { EnvironmentPageInputForDisplay } from '../models/environments-page-input-for-display.model';
import { AssetsService } from '../services/assets/assets.service';
import { ConfigurationsService } from '../services/configurationsService/configurations.service';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentsResolver implements Resolve<EnvironmentPageInputForDisplay | undefined>  {

  constructor(private assetsService: AssetsService, private configsService: ConfigurationsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EnvironmentPageInputForDisplay | undefined {
    const assetId = route.queryParamMap.get('assetId');
    const measurementType = route.queryParamMap.get('measureType');
    if(assetId && measurementType){
      const measurementTypeEnum: MeasureType = +measurementType
      let asset = this.assetsService.getAssetById(assetId as string);
      if(!asset){
        return undefined;
      }else{
        let config = this.configsService.getConfigurationById(asset.configurationId);
        let EnvironmentPageInputForDisplay: EnvironmentPageInputForDisplay = {
          asset: asset,
          configuration: config as Configuration,
          measureType: measurementTypeEnum
        }
        return EnvironmentPageInputForDisplay;
      }
    }else{
      return undefined;
    }







  }
}
