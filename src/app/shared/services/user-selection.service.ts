import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { UserSelections } from '../models/user-selections.model';
import { Platform } from '@ionic/angular';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { SystemSide } from '../models/system-side.model';
import { SystemSideForDisplay } from '../models/system-side-for-display.mode';
import { UtilService } from './util.service';
import { SystemTypesService } from 'src/app/configurations/environments-and-types/services/system-types.service';
import { StorageService } from './storage.service';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';


@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public userSelections$: BehaviorSubject<UserSelections[]> = new BehaviorSubject<UserSelections[]>([]);
  private isProcessingPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private progressBar$: BehaviorSubject<number> = new BehaviorSubject<number>(0);



  public userCurrSelection$: BehaviorSubject<UserSelections | null> = new BehaviorSubject<UserSelections | null>(null);

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

  getIsProcessingPdf(){
    return this.isProcessingPdf$.asObservable();
  }

  getprogressBar(){
    return this.progressBar$.asObservable();
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }


  setIsDisabled(val:boolean){
    this.isDisabled$.next(val);
  }
  getCurrUserSelectionValue(){
    return this.userCurrSelection$.getValue();
  }

  getCurrUserSelectionValueAsObservable(){
    return this.userCurrSelection$.asObservable();
  }

  _getUserSelections(){
    return this.userSelections$.getValue();
  }

  updateCurrUserSelections(userSelections: Partial<UserSelections>){
    let currSelctionValue = this.getCurrUserSelectionValue();
    currSelctionValue = {...currSelctionValue, ...userSelections} as UserSelections;
    let numsOfKeys = Object.values(currSelctionValue).length;
    let progressNum = numsOfKeys * 14.2857;
    this.progressBar$.next(progressNum);
    if(numsOfKeys === 7){
      this.setIsDisabled(false);
    }
    this.userCurrSelection$.next(currSelctionValue);
  }

  resetCurrUserSelection(){
    this.setIsDisabled(false);
    this.userCurrSelection$.next(null);
    this.progressBar$.next(0);
  }

  addUserSelection(userSelectionToUpdate?: Partial<UserSelections>, userSelectionToUpdateId?: string){
    let userSelections: UserSelections;
    if(userSelectionToUpdate && userSelectionToUpdateId){
      userSelections = this.updateUserSelection(userSelectionToUpdate, userSelectionToUpdateId) as UserSelections;
    } else{
      userSelections = this.getCurrUserSelectionValue() as UserSelections;
      if(!userSelections.id){
        userSelections.id = this.utilService._makeId();
      }
    }

    this.addUserSelectionToSelectionsList(userSelections);

  }

  addUserSelectionToSelectionsList(userSelection: UserSelections){
    const assetsForPdf = this.userSelections$.getValue();
    const foundAssetIndex = assetsForPdf.findIndex(a=> a.id === userSelection.id);
    if(foundAssetIndex !== -1){
      assetsForPdf.splice(foundAssetIndex, 1, userSelection);
    }else{
      assetsForPdf.push(userSelection);
      this.setNumberOfNewSelections(1);
      this.resetCurrUserSelection();

    }

    this.localStorage.put(this.entityType, userSelection);
    this.userSelections$.next(assetsForPdf);
  }

  updateUserSelection(userSelectionToUpdate: Partial<UserSelections>, userSelectionToUpdateId: string){
    const userSelections = this.userSelections$.getValue();
    let foundUserSelection = userSelections.find(us => us.id == userSelectionToUpdateId);
    if(foundUserSelection){
      foundUserSelection = {...foundUserSelection, ...userSelectionToUpdate} as UserSelections;
      return foundUserSelection;
    }
    return undefined;
  }



  removeUserSelection(userSelectionId: string){
    let userSelections = this.userSelections$.getValue();
    const index = userSelections.findIndex(selection=> selection.id === userSelectionId);
    userSelections.splice(index, 1);

    this.localStorage.remove(this.entityType, userSelectionId);

    this.userSelections$.next(userSelections);
    this.setNumberOfNewSelections(-1);
  }

  resetUserSelections(){
    this.userSelections$.next([]);
    this.localStorage.removeLocalStorageSessions(this.entityType);
    this.numOfSelections$.next(0);
  }

  getAssetsForDisplay(assetsForPdf: UserSelections[]){

        const assetIds = (assetsForPdf.map(asset => asset.assetId)) as string[];

        const sidesA = (assetsForPdf.map(asset => asset.sideA));
        const sidesB = (assetsForPdf.map(asset => asset.sideB));
        const ulcansTypesIds = (assetsForPdf.map(asset=> asset.systemTypeId));
        const initialIndexes = (assetsForPdf.map(asset=> asset.initialIndexses));

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const configurationsIds = (assets.map(a => a.configurationId)) as string[];
        const sidesAForDisplay = this.getSidesForDisplay(sidesA);
        const sidesBForDisplay = this.getSidesForDisplay(sidesB);
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);
        const ulcansTypes = this.systemTypesService.getUlcansTypesByIds(ulcansTypesIds);


        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          id: assetsForPdf[i].id,
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === configurationsIds[i]),
          sideA: sidesAForDisplay[i],
          sideB: sidesBForDisplay[i],
          ulcansType: ulcansTypes[i],
          areSpecialPoles: assetsForPdf[i].areSpecialPoles,
          initialIndexes: initialIndexes[i]
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

  getUserSelectionById(userSelectionId: string){
    let userSelections = this._getUserSelections();
    return userSelections.find(us=> us.id == userSelectionId);
  }

  getIsAssetInUserSelection(assetId:string){
    let userSelections = this._getUserSelections();
    let isUserSelectionFound = userSelections.find(us => us.assetId === assetId);
    if(isUserSelectionFound){
      return true;
    }else{
      return false;
    }

  }

  _initialUserSelections(appCurrConfigVal: AppConfirmationSelections){
    let userSelectionsFromStorage = this.localStorage.get<UserSelections>(this.entityType);

    if(userSelectionsFromStorage.length !== 0){
      this.numOfSelections$.next(userSelectionsFromStorage.length);
      this.userSelections$.next(userSelectionsFromStorage);
      return of();
    }

    return this.userSelections$.asObservable();
  }

}







