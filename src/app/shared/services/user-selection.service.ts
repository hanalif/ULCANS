import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { AssetForPdf } from '../models/asset-for-pdf.model';
import { FtToMPipe } from '../pipes/ft-to-m.pipe';
import { MenuCategoriesService } from './menu-categories.service';





@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);

  constructor(
    private measurmentsPipe: FtToMPipe,
    private assetsService: AssetsService,
    private menuCategoriesService: MenuCategoriesService,
    private configurationsService: ConfigurationsService) { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$;
  }

  getnumOfSelections(){
    return this.numOfSelections$.asObservable();
  }

  getAssetsForPdf(){
    return this.assetsForPdf$.asObservable();
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }

  addAssetForPdf(assetForPdf:AssetForPdf){
    const assetsForPdf = this.assetsForPdf$.getValue();
    const foundAssetIndex = assetsForPdf.findIndex(a=> a.assetId === assetForPdf.assetId);
    if(foundAssetIndex !== -1){
      assetsForPdf.splice(foundAssetIndex, 1, assetForPdf);
    }else{
      assetsForPdf.push(assetForPdf);
      this.setNumberOfNewSelections(1);
    }
    this.assetsForPdf$.next(assetsForPdf);
  }

  getAssetsForDisplay(assetsForPdf: AssetForPdf[]){
        const assetIds = assetsForPdf.map(asset => asset.assetId);
        const classesIds = assetsForPdf.map(asset => asset.enviormentId);
        const configurationsIds = assetsForPdf.map(asset => asset.configuraionId);

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const classes = this.menuCategoriesService.getConfigurationsClassesCategories();
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);

        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === assetsForPdf[i].configuraionId),
          enviorment: classes.find( e => e.id === assetsForPdf[i].enviormentId),
          measureType: assetsForPdf[i].measureType
        }

        assetsForDisplay.push(assetForDisplay);
      }

      return assetsForDisplay;
  }

  setNumberOfNewSelections(num: number){

    let currNum = this.numOfSelections$.getValue();
    if( num === 0){
      this.numOfSelections$.next(0);
    }

    this.numOfSelections$.next(currNum + num);

  }

}


