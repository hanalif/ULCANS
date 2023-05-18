import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SystemInstructionsData } from "../models/system-instructions-data.model";

@Injectable({
  providedIn: 'root'
})
export class UsefulInformationDataService{

  constructor(private http: HttpClient) { }


  getEquipmentDescriptionData(){
    return this._getEquipmentDescriptionData();
  }

  _getEquipmentDescriptionData(){
    return this.http.get<SystemInstructionsData[]>('assets/equipment-description/equipment-description.json');
  }
}
