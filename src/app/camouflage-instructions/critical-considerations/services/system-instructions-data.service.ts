import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SystemInstructionsData } from "../../models/system-instructions-data.model";

@Injectable({
  providedIn: 'root'
})
export class SystemInstructionsDataService{

  constructor(private http: HttpClient) { }

  getSettingUpSystemData(){
    return this._getSettingUpSystemData();
  }

  getFoldingUpSystemData(){
    return this._getFoldingUpSystemData();
  }

  _getSettingUpSystemData(){
    return this.http.get<SystemInstructionsData[]>('assets/ulcans-instructions/setting-up-system.json');
  }

  _getFoldingUpSystemData(){
    return this.http.get<SystemInstructionsData[]>('assets/ulcans-instructions/folding-up-system.json');
  }
}
