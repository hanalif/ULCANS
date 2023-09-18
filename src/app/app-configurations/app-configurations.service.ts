import { Injectable } from '@angular/core';
import { AppConfirmationSelections } from './app-configurations.enum';
import { BehaviorSubject} from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {
  private currAppConfigSettings$:BehaviorSubject<AppConfirmationSelections> = new BehaviorSubject<AppConfirmationSelections>(0)
  private showAppConfigBtns$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private showOnlyHeaderConfigBtns$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly appConfigKey: string = 'appCofig';
  private appEnvironment = environment;
  constructor() { }

  getShowOnlyHeaderConfigBtnsValue(){
    return this.showOnlyHeaderConfigBtns$.getValue();
  }

  getShowAppConfigBtnsValue(){
    return this.showAppConfigBtns$.getValue();
  }

  getShowAppConfigBtns(){
    return this.showAppConfigBtns$.asObservable();
  }

  getCurrAppConfigSettings(){
    return this.currAppConfigSettings$.asObservable();
  }

getShowOnlyHeaderConfigBtns(){
    return this.showOnlyHeaderConfigBtns$.asObservable();
  }

  setAndGetInitialAppConfig(){
     let appConfigFromStorage: AppConfirmationSelections | undefined = this._getFromStorage(this.appConfigKey);
     let environmentVal =  this.appEnvironment.appConfigSelection;
    if(!appConfigFromStorage){
      if( environmentVal == AppConfirmationSelections.USA ||environmentVal == AppConfirmationSelections.GLOBAL){
        this.showAppConfigBtns$.next(false);
      }
      this.currAppConfigSettings$.next(environmentVal);
    }else{
      this.showOnlyHeaderConfigBtns$.next(true);
      this.currAppConfigSettings$.next(appConfigFromStorage);
    }
    return this.currAppConfigSettings$.getValue();
  }

  _getFromStorage(keyInStorage:string){
    let appCofigVal: AppConfirmationSelections;
    const json = localStorage.getItem(keyInStorage);
    appCofigVal = json != null ? JSON.parse(json) : undefined;
    return appCofigVal;
  }

  setAppConfig(val: AppConfirmationSelections){
    localStorage.setItem(this.appConfigKey, JSON.stringify(val));
    this.currAppConfigSettings$.next(val);
    if(!this.showOnlyHeaderConfigBtns$.getValue()){
      this.showOnlyHeaderConfigBtns$.next(true);
    }

  }

}
