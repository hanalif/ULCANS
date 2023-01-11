import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Asset } from '../../models/asset.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private assets$: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);

  constructor(private http: HttpClient) { }

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

  addAsset(assetToAdd: Asset){
    let assets = this._getassetsValue();
    let foundAssetIndex = assets.findIndex(a => a.id === assetToAdd.id);
    if(foundAssetIndex !== -1){
      assets.splice(foundAssetIndex, 1, assetToAdd);
    }else{
      assets.push(assetToAdd);
    }

    this.addAssets(assets);
  }

  addAssets(assets: Asset[]){
    this.assets$.next(assets);
  }

  getAssets(){
    return this.assets$
  }

  _getassetsValue(){
    return this.assets$.getValue();
  }


  _getAssetesFromJson(){
    return this.http.get<Asset[]>('assets/assets.json').pipe(map(assets=> {
      this.assets$.next(assets)
    }));
  }
}
