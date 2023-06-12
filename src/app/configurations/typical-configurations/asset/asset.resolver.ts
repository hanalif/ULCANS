import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { AssetForPreview } from '../../models/assetForPreview.model';
import { AssetsService } from '../../services/assets/assets.service';
import { ConfigurationsService } from '../../services/configurationsService/configurations.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<AssetForPreview | undefined>  {

  constructor(
    private assetsService: AssetsService, private configsService: ConfigurationsService, private userSelectionsService: UserSelectionService) { }

  resolve(route: ActivatedRouteSnapshot): AssetForPreview | undefined {
    const assetId = route.params['assetId'];
    let asset = this.assetsService.getAssetById(assetId);
    if(!asset){
      return undefined;
    }else{
      const areSpecialPoles = asset.measures.heightFt >= 12.1030 ? true : false;
      //save to curr user selection
      let userSelections: Partial<AssetForPdf> = {
        assetId: assetId,
        configuraionId: asset.configurationId,
        areSpecialPoles: areSpecialPoles
      }

      this.userSelectionsService.updateCurrUserSelections(userSelections);

      //generate asset for preview
      let config = this.configsService.getConfigurationById(asset.configurationId);
      let assetForPreview: AssetForPreview = {
        asset: asset,
        configuration: config
      }
      return assetForPreview;
    }

  }
}
