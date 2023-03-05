import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, } from 'rxjs';
import { SystemType } from '../models/type.model';
import { type } from 'os';






@Injectable({
  providedIn: 'root'
})
export class SystemTypesService {
  public systemTypes$: BehaviorSubject<SystemType[]> = new BehaviorSubject<SystemType[]>([]);

  constructor(private http: HttpClient) { }

  getTypes(){
    return this.systemTypes$.getValue()
  }

  getUlcansTypesByIds(typesIds: string[]){
    let types = this.getTypes();
    let typesByIds: SystemType[] = [];
    for(let i = 0; i < typesIds.length; i++){
      let isTypeIdFound = types.find(type => type.id === typesIds[i]);
      if(isTypeIdFound){
        typesByIds.push(isTypeIdFound);
      }
    }
    let arr = typesByIds
    return arr;

  }


  _setUlcansTypes(){
    return this.http.get<SystemType[]>('../../../../assets/types.json').pipe(map(types => this.systemTypes$.next(types)));;
  }


}
