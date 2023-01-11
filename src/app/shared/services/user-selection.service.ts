import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AssetForPdf } from '../models/asset-for-pdf.model';





@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);

  constructor() { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$
  }

  getAssetsForPdf(){
    return this.assetsForPdf$
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }

  addAssetForPdf(assetForPdf:AssetForPdf){
    const assetsForPdf = this.assetsForPdf$.getValue();
    assetsForPdf.push(assetForPdf)
    console.log(assetsForPdf)
    this.assetsForPdf$.next(assetsForPdf);

  }







}
