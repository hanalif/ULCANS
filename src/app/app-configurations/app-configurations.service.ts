import { Injectable } from '@angular/core';
import { AppConfirmationSelections } from './app-configurations.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {
  private appConfig$: BehaviorSubject<AppConfirmationSelections | undefined> = new BehaviorSubject<AppConfirmationSelections | undefined>(undefined);
  private readonly appConfigKey: string = 'appCofig';
  private appEnvironment = environment;
  constructor(private storageService: StorageService ) { }

  getAppConfig(){
    return this.appConfig$.asObservable();
  }

  setInitialAppConfig(){
     let appConfigFromStorage: AppConfirmationSelections | undefined = this._getFromStorage(this.appConfigKey);
     console.log(appConfigFromStorage);
     let environmentVal =  this.appEnvironment.appConfigSelection;
    if(!appConfigFromStorage){
      this.appConfig$.next(environmentVal);
    }else{
      this.appConfig$.next(appConfigFromStorage);
    }
  }


  _getFromStorage(keyInStorage:string){
    let appCofigVal: AppConfirmationSelections;
    const json = localStorage.getItem(keyInStorage);
    appCofigVal = json != null ? JSON.parse(json) : undefined;
    return appCofigVal;
  }

  setAppConfig(val: AppConfirmationSelections){
    localStorage.setItem(this.appConfigKey, JSON.stringify(val));
  }



}
