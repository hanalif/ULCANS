import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { AssetForPdf } from '../models/asset-for-pdf.model';
import { Platform } from '@ionic/angular';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { SystemSide } from '../models/system-side.model';
import { SystemSideForDisplay } from '../models/system-side-for-display.mode';
import { UtilService } from './util.service';
import { SystemTypesService } from 'src/app/configurations/environments-and-types/services/system-types.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);
  private isProcessingPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private progressBar$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  public userCurrSelection$: BehaviorSubject<AssetForPdf | null> = new BehaviorSubject<AssetForPdf | null>(null);

  public FOOTER_FORM_TXT: string = "";
  private readonly entityType: string = 'userSelections';



  constructor(
    private assetsService: AssetsService,
    private configurationsService: ConfigurationsService,
    public plt: Platform,
    public environmentsService: EnvironmentsService,
    public utilService: UtilService,
    public systemTypesService: SystemTypesService,
    public localStorage: StorageService
    ) { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$;
  }

  getisDisabled(){
    return this.isDisabled$.asObservable();
  }

  getnumOfSelections(){
    return this.numOfSelections$.asObservable();
  }

  getAssetsForPdf(){
    return this.assetsForPdf$.asObservable();
  }

  getIsProcessingPdf(){
    return this.isProcessingPdf$.asObservable();
  }

  getprogressBar(){
    return this.progressBar$.asObservable();
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }
  getCurrUserSelectionValue(){
    return this.userCurrSelection$.getValue();
  }

  _getAssetsForPdfValue(){
    return this.assetsForPdf$.getValue();
  }

  updateCurrUserSelections(userSelections: Partial<AssetForPdf>){
    let currSelctionValue = this.getCurrUserSelectionValue();
    currSelctionValue = {...currSelctionValue, ...userSelections} as AssetForPdf;
    let numsOfKeys = Object.values(currSelctionValue).length;
    let progressNum = numsOfKeys * 12.5;
    this.progressBar$.next(progressNum);
    if(numsOfKeys === 8){
      this.isDisabled$.next(false);
    }
    this.userCurrSelection$.next(currSelctionValue);
  }

  resetCurrUserSelection(){
    this.userCurrSelection$.next(null);
    this.progressBar$.next(0);
  }

  addAssetForPdf(){
    const assetForPdf = this.getCurrUserSelectionValue() as AssetForPdf;
    if(!assetForPdf.id){
      assetForPdf.id = this.utilService._makeId();
      this.progressBar$.next(0);
    }
    const assetsForPdf = this.assetsForPdf$.getValue();
    const foundAssetIndex = assetsForPdf.findIndex(a=> a.id === assetForPdf.assetId);
    if(foundAssetIndex !== -1){
      assetsForPdf.splice(foundAssetIndex, 1, assetForPdf);
    }else{
      assetsForPdf.push(assetForPdf);
      this.setNumberOfNewSelections(1);
      this.userCurrSelection$.next(null);
      this.isDisabled$.next(true);
    }
    this.localStorage.post(this.entityType, assetForPdf);
    this.assetsForPdf$.next(assetsForPdf);
    this.resetCurrUserSelection();
  }

  removeUserSelection(userSelectionId: string){
    let userSelections = this.assetsForPdf$.getValue();
    const index = userSelections.findIndex(selection=> selection.id === userSelectionId);
    userSelections.splice(index, 1);

    this.localStorage.remove(this.entityType, userSelectionId);

    this.assetsForPdf$.next(userSelections);
    this.setNumberOfNewSelections(-1);
  }

  getAssetsForDisplay(assetsForPdf: AssetForPdf[]){

        const assetIds = (assetsForPdf.map(asset => asset.assetId)) as string[];
        const configurationsIds = (assetsForPdf.map(asset => asset.configuraionId)) as string[];
        const sidesA = (assetsForPdf.map(asset => asset.sideA));
        const sidesB = (assetsForPdf.map(asset => asset.sideB));
        const ulcansTypesIds = (assetsForPdf.map(asset=> asset.systemTypeId));

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const sidesAForDisplay = this.getSidesForDisplay(sidesA);
        const sidesBForDisplay = this.getSidesForDisplay(sidesB);
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);
        const ulcansTypes = this.systemTypesService.getUlcansTypesByIds(ulcansTypesIds)

        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          id: assetsForPdf[i].id,
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === assetsForPdf[i].configuraionId),
          sideA: sidesAForDisplay[i],
          sideB: sidesBForDisplay[i],
          measureType: assetsForPdf[i].measureType,
          ulcansType: ulcansTypes[i],
          areSpecialPoles: assetsForPdf[i].areSpecialPoles
        }

        assetsForDisplay.push(assetForDisplay);
      }
      return assetsForDisplay;
  }

  getSidesForDisplay(sidesArr: SystemSide[]){
      return sidesArr.map(side => {
      const sideForDispaly: SystemSideForDisplay = this.environmentsService.getSystemSideForDisplay(side.environmentId, side.clothPatternIndex);
      return sideForDispaly;
    })
  }


  setNumberOfNewSelections(num: number){
    let currNum = this.numOfSelections$.getValue();
    if( num == 0){
      this.numOfSelections$.next(0);
    }else{
      this.numOfSelections$.next(currNum + num);
    }
  }

  getIsAssetInAssetsForPDF(assetId:string){
    let assetsForPdf = this._getAssetsForPdfValue();
    let isAssetIdFound = assetsForPdf.find(a => a.assetId === assetId);
    if(isAssetIdFound){
      return true;
    }else{
      return false;
    }

  }



  _initialUserSelections(){
    let userSelectionsFromStorage = this.localStorage.get<AssetForPdf>(this.entityType);

    if(userSelectionsFromStorage.length !== 0){
      this.numOfSelections$.next(userSelectionsFromStorage.length);
      this.assetsForPdf$.next(userSelectionsFromStorage);
      return of();
    }

    return this.assetsForPdf$.asObservable();
  }

}







