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
import { PatternsSelections } from '../models/patterns-selections.enum';


@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userSelections$: BehaviorSubject<UserSelections[]> = new BehaviorSubject<UserSelections[]>([]);
  private isProcessingPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private progressBar$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  public tabIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
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

  getIsDisabledValue(){
    return this.isDisabled$.getValue();
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

  setTabIndex(index: number){
    this.tabIndex$.next(index);
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

  updateDisabled() {
    const progressPercent = this.getProgressPercentage();
    this.setIsDisabled(progressPercent < 100);
  }

  setProgressBar(){
    const progressPercent = this.getProgressPercentage();
    this.progressBar$.next(progressPercent);
  }

  getProgressPercentage(): number {
    let currSelctionValue = this.getCurrUserSelectionValue() as UserSelections;
    if(!currSelctionValue){
      return 0;
    }
    let tabIndex = currSelctionValue.patternType;
    let totalControls: number = 0;
    let usedControls: number = 0;
    let progressPercent: number = 0;
    let relevantControls: Partial<UserSelections> = {
      ...currSelctionValue
    };
    if(currSelctionValue.id){
      if(currSelctionValue.patternType == PatternsSelections.POR && currSelctionValue.porVariantSelectionId){
        progressPercent = 100;
      }

      if(currSelctionValue.patternType == PatternsSelections.custom && currSelctionValue.sideA && currSelctionValue.sideB && currSelctionValue.systemTypeId){
        progressPercent = 100;
      }

    }else{
      totalControls = tabIndex == PatternsSelections.POR ? 6 : 8;
      if (tabIndex == PatternsSelections.POR) {
        delete relevantControls.sideA;
        delete relevantControls.sideB;
        delete relevantControls.systemTypeId;
      }
      else {
        delete relevantControls.porVariantSelectionId;
      }
      usedControls = Object.values(relevantControls).length;
      progressPercent = usedControls / totalControls * 100;
    }

    return progressPercent;
  }


  updateCurrUserSelections(userSelections?: Partial<UserSelections>){
    let currSelctionValue = this.getCurrUserSelectionValue() as UserSelections;
      currSelctionValue = {...currSelctionValue, ...userSelections} as UserSelections;
    this.userCurrSelection$.next(currSelctionValue);
  }

  resetCurrUserSelection(){
    this.userCurrSelection$.next(null);
    this.progressBar$.next(0);
  }

  setUserSelectionsPatterns(userSelections: UserSelections){
    if(userSelections.patternType == PatternsSelections.POR){
      userSelections.sideA = undefined,
      userSelections.sideB = undefined,
      userSelections.systemTypeId = undefined
    }else{
      userSelections.porVariantSelectionId = undefined
    }

    return userSelections;
  }

  addUserSelection(){
    let userSelections: UserSelections;
    let currUserSelections = this.getCurrUserSelectionValue() as UserSelections;
    if(currUserSelections.id){
      let userSelectionToUpdate = this.setUserSelectionsPatterns(currUserSelections);
      userSelections = this.updateUserSelection(userSelectionToUpdate, currUserSelections.id) as UserSelections;
    } else{
      userSelections = this.setUserSelectionsPatterns(currUserSelections) as UserSelections;
      userSelections.id = this.utilService._makeId();
    }
    this.addUserSelectionToSelectionsList(userSelections);
  }

  addUserSelectionToSelectionsList(userSelection: UserSelections){
    const userSelections = this.userSelections$.getValue();
    const foundAssetIndex = userSelections.findIndex(a=> a.id === userSelection.id);
    if(foundAssetIndex !== -1){
      userSelections.splice(foundAssetIndex, 1, userSelection);
    }else{
      userSelections.push(userSelection);
      this.setNumberOfNewSelections(1);
      this.resetCurrUserSelection();
    }

    this.localStorage.put(this.entityType, userSelection);
    this.userSelections$.next(userSelections);
  }

  updateUserSelection(userSelectionToUpdate: Partial<UserSelections>, userSelectionToUpdateId: string){
    const userSelections = this.userSelections$.getValue();
    let foundUserSelection = userSelections.find(us => us.id == userSelectionToUpdateId);
    if(foundUserSelection){
      foundUserSelection = {...foundUserSelection, ...userSelectionToUpdate} as UserSelections;
      // if((foundUserSelection.sideA && foundUserSelection.sideB && foundUserSelection.systemTypeId && this.tabIndex$.getValue() ==  PatternsSelections.custom) || (foundUserSelection.porVariantSelectionId && this.tabIndex$.getValue() == PatternsSelections.POR)){
      //   this.setIsDisabled(false);
      // }
      // else {
      //   this.setIsDisabled(true);
      // }

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

  getAssetsForDisplay(userSelections: UserSelections[]){
        const porSelectionsIds = userSelections.map(us =>
          {
            if(!us.porVariantSelectionId){
              return  us.porVariantSelectionId = undefined;
            }
            return us.porVariantSelectionId;
          });

        const assetIds = (userSelections.map(us => us.assetId)) as string[];

        const sidesA = (userSelections.map(us =>
          {
            if(!us.sideA){
               return us.sideA = undefined;
            }
            return us.sideA;
          }));

        const sidesB = (userSelections.map(us =>
          {
            if(!us.sideB){
              return us.sideA = undefined;
            }
            return us.sideB
          }));

        const ulcansTypesIds = (userSelections.map(us=> {
          if(!us.systemTypeId){
            return us.systemTypeId = undefined
          }
          return us.systemTypeId
        }));

        const initialIndexes = (userSelections.map(us=> us.initialIndexses));

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const configurationsIds = (assets.map(a => a.configurationId)) as string[];
        const sidesAForDisplay = this.getSidesForDisplay(sidesA);
        const sidesBForDisplay = this.getSidesForDisplay(sidesB);
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);
        const ulcansTypes = ulcansTypesIds.map(ulcansTypeId=>{
          if(!ulcansTypeId){
            return undefined;
          }
          return this.systemTypesService.getUlcansTypeById(ulcansTypeId);
        })
        const porSelections = porSelectionsIds.map(porId=>{
          if(porId){
            return this.environmentsService.getPORVariantById(porId);
          }
          return undefined;
        })



        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< userSelections.length; i++){
          let assetForDisplay = {
          id: userSelections[i].id,
          asset: assets.find(a=> a.id === userSelections[i].assetId),
          configuratoin: configurations.find(c => c.id === configurationsIds[i]),
          sideA: sidesAForDisplay[i],
          sideB: sidesBForDisplay[i],
          ulcansType: ulcansTypes[i],
          areSpecialPoles: userSelections[i].areSpecialPoles,
          initialIndexes: initialIndexes[i],
          porSelection: porSelections[i]
        }
        assetsForDisplay.push(assetForDisplay);
      }
      return assetsForDisplay;
  }

  getSidesForDisplay(sidesArr: (SystemSide | undefined)[] ){
      return sidesArr.map(side => {
        let sideForDispaly: SystemSideForDisplay | undefined;
        if(!side){
          return sideForDispaly = undefined
        }

        sideForDispaly = this.environmentsService.getSystemSideForDisplay(side.environmentId, side.clothPatternIndex);
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







