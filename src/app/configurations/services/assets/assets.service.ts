import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Asset } from '../../models/asset.model';
import { BehaviorSubject, EMPTY, map, of, tap } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { CalculatorFormValue } from '../../configuration-calculator/calculator-form-value.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { MToFtPipe } from 'src/app/shared/pipes/m-to-ft.pipe';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Entity } from 'src/app/shared/models/entity.model';

@Injectable({providedIn: 'root'})

export class AssetsService {
  private MeasureType = MeasureType;

  private readonly entityType: string = 'assets';

  private assets$: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);

  constructor(
    private http: HttpClient,
    private utilService:UtilService,
    private mToFtPipe: MToFtPipe,
    private localStorage: StorageService
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
    return assets.find(a => a.id === assetId);
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

  generataAndAddNewAsset(assetName:string, calculatorFormValue: CalculatorFormValue, configuraionId: string | undefined){
    let widhtFt: number;
    let heightFt:number;
    let lengthFt: number;
    let id: string = this.utilService._makeId();

    if(this.MeasureType.METERS === calculatorFormValue.measureType){
       widhtFt =this.mToFtPipe.transform(calculatorFormValue.width);
       heightFt = this.mToFtPipe.transform(calculatorFormValue.height);
       lengthFt = this.mToFtPipe.transform(calculatorFormValue.length);
    } else{
      widhtFt = calculatorFormValue.width;
      heightFt = calculatorFormValue.height;
      lengthFt = calculatorFormValue.length;
    }
    const newAsset:Asset = {
      id: id,
      assetImgUrl: 'assets/imgs/hexagon-bg/asset-bg.png',
      name: assetName,
      configurationId: configuraionId,
      measures: {
        widthFt: widhtFt,
        heightFt: heightFt,
        lengthFt: lengthFt,
      },
      isInList: false
    }

    this.addAsset(newAsset);
    return id;
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


  _getAssetes(){
    let assetsFromStorage = this.localStorage.get<Asset>(this.entityType);
    if(assetsFromStorage.length !== 0){
      this.assets$.next(assetsFromStorage);
      return of();
    }

    return this.http.get<Asset[]>('assets/assets.json').pipe(map(assetsFromJson=> {
      this.assets$.next(assetsFromJson);
      let assetsFromStorage = this._getAssetsFromLocalStorage();
      if(assetsFromStorage.length != 0 ){
       let assets = [...this.assets$.getValue(), ...assetsFromStorage as Asset[]];
      this.assets$.next(assets as Asset[]);
      }else{
        this._saveAssetsToLocalStorage(assetsFromJson);
      }
    }));
  }
}
