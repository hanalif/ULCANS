import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Asset } from '../../models/asset.model';
import { BehaviorSubject, EMPTY, map, of, tap } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { CalculatorFormValue } from '../../configuration-calculator/calculator-form-value.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { MToFtPipe } from 'src/app/shared/pipes/m-to-ft.pipe';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';


@Injectable({providedIn: 'root'})

export class AssetsService {
  private MeasureType = MeasureType;

  private readonly entityType: string = 'assets';

  private assets$: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);

  constructor(
    private http: HttpClient,
    private utilService:UtilService,
    private mToFtPipe: MToFtPipe,
    private localStorage: StorageService,
    private appConfigService: AppConfigurationService
    ) { }

  getSearchResultAssets(searchKey: string){
    let assets = this._getassetsValue();
    if(searchKey === ''){
      return assets;
    }
    const serchKeyToLowerCase = searchKey.toLocaleLowerCase()
    let updatedFetchedAssets = [...assets.filter(a => a.name.toLocaleLowerCase().includes(serchKeyToLowerCase))]
    return updatedFetchedAssets;
  }

  getAssetById(assetId:string){
    let assets = this._getassetsValue();
    return assets.find(a => a.id === assetId) as Asset;
  }

  getIsAssetInList(assetId:string){
    return this.getAssetById(assetId).isInList;
  }

  getAssetsByIds(assetIds: string[]){
    let assets = this._getassetsValue();
    let assetsByIds: Asset[] = [];
    for(let i = 0; i <assets.length; i++){
      let isAssetIdFound = assetIds.find(id=> id === assets[i].id);

      if(isAssetIdFound){
        assetsByIds.push(assets[i]);
      }
    }

    return assetsByIds;
  }

  transformMToFt(calculatorFormValue: CalculatorFormValue){
    let updatedCalculatorFormValue : Partial<CalculatorFormValue>;

    if(this.MeasureType.METERS === calculatorFormValue.measureType){
      updatedCalculatorFormValue = {
        width: this.mToFtPipe.transform(calculatorFormValue.width),
        height: this.mToFtPipe.transform(calculatorFormValue.height),
        length: this.mToFtPipe.transform(calculatorFormValue.length)
      }
   } else{
     updatedCalculatorFormValue = {
      width: calculatorFormValue.width,
      height: calculatorFormValue.height,
      length: calculatorFormValue.length
    }

   }

   return updatedCalculatorFormValue = {...updatedCalculatorFormValue, measureType: calculatorFormValue.measureType};

  }

  generataAndAddAsset(assetName:string, calculatorFormValue: CalculatorFormValue, configuraionId: string | undefined, measureType: MeasureType, assetId: string | undefined = undefined){
    let id: string;

    if(assetId){
      id = assetId;
    } else{
      id = this.utilService._makeId();
    }

    let updatedCalculatorFormValue = this.transformMToFt(calculatorFormValue) as CalculatorFormValue;

    const assetToAdd:Asset = {
      id: id,
      assetImgUrl: 'assets/imgs/hexagon-bg/asset-bg.png',
      name: assetName,
      configurationId: configuraionId,
      measures: {
        widthFt: updatedCalculatorFormValue.width,
        heightFt: updatedCalculatorFormValue.height,
        lengthFt: updatedCalculatorFormValue.length,
      },
      isInList: false,
      initialMeasureType: measureType,
      appConfig: this.appConfigService.getCurrAppConfigSettingsValue()
    }



    this.addAsset(assetToAdd);
    return id;
  }

  updateAsset(assetToUpdate: Partial<Asset>, assetToUpdateId: string){
    const assets = this.assets$.getValue();
    let foundAsset = assets.find(a => a.id == assetToUpdateId);
    if(foundAsset){
      foundAsset = {...foundAsset, ...assetToUpdate} as Asset;
      this.addAsset(foundAsset);
    }else{
      console.log('No Asset Found');
    }
  }

  removeAsset(assetId: string){
    let assets = this._getassetsValue();
    let foundAssetIndex = assets.findIndex(a => a.id === assetId);
    assets.splice(foundAssetIndex, 1);
    this.addAssets(assets);
    this.localStorage.remove(this.entityType, assetId);
  }


  addAsset(assetToAdd: Asset){
    let assets = this._getassetsValue();
    let foundAssetIndex = assets.findIndex(a => a.id === assetToAdd.id);
    if(foundAssetIndex !== -1){
      assets.splice(foundAssetIndex, 1, assetToAdd);
      this.localStorage.put(this.entityType, assetToAdd);
    }else{
      assets.push(assetToAdd);
      this.localStorage.post(this.entityType, assetToAdd);
    }
    this.addAssets(assets);
  }

  addAssets(assets: Asset[]){
    this.assets$.next(assets);
  }

  getAssets(){
    return this.assets$.asObservable();
  }

  _getassetsValue(){
    return this.assets$.getValue();
  }

  _saveAssetsToLocalStorage(assets: Asset[]){
    return this.localStorage.postMany(this.entityType, assets);
  }

  _getAssetsFromLocalStorage(){
    return this.localStorage.get(this.entityType);
  }

  _resetAssets(){
    this.assets$.next([]);
    this.localStorage.removeLocalStorageSessions(this.entityType);
  }

  getAssetsByAppConfig(assets:Asset[], currConfig: AppConfirmationSelections){
      return assets.filter(asset=>{
        let assetToReturn = asset.appConfig === currConfig || asset.appConfig === AppConfirmationSelections.NONE;
        return assetToReturn;
      })
  }


  _getAssets(appConfigVal: AppConfirmationSelections){
    let assetsFromStorage = this.localStorage.get<Asset>(this.entityType);
    let assets: Asset[];
    if(assetsFromStorage.length !== 0){
      assets = this.getAssetsByAppConfig(assetsFromStorage, appConfigVal);
      this.assets$.next(assets);
    }
  }

  setAssets(appConfigVal: AppConfirmationSelections){
    let assets: Asset[];
    return this.http.get<Asset[]>('assets/assets.json').pipe(map(assetsFromJson=> {
      assets = this.getAssetsByAppConfig(assetsFromJson, appConfigVal);
      let assetsFromStorage = this._getAssetsFromLocalStorage() as Asset[];
      if(assetsFromStorage.length !== 0 ){
      assetsFromStorage = this.getAssetsByAppConfig(assetsFromStorage ,appConfigVal);
       assets = [...assets, ...assetsFromStorage as Asset[]];
      }else{
        this._saveAssetsToLocalStorage(assets);
      }
      this.assets$.next(assets as Asset[]);
    }));
  }
}


