import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Asset } from '../../models/asset.model';
import { catchError, map, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) { }

  getSearchResultAssets(searchKey: string){
    if(searchKey === ''){
      return this._getAssetes()
    }
    return this._getAssetes().pipe(
      map(fetchedAssets =>{
        const serchKeyToLowerCase = searchKey.toLocaleLowerCase()
        let updatedFetchedAssets = [...fetchedAssets.filter(asset=> asset.name.toLocaleLowerCase().includes(serchKeyToLowerCase))]
        return updatedFetchedAssets;
      })
    )
  }

  getAssetById(assetId:string){
    return this._getAssetes().pipe(map(assets=>{
      return assets.find(a => a.id === assetId);
    })
    )
  }

  _getAssetes(){
    return this.http.get<Asset[]>('assets/assets.json');
  }
}
