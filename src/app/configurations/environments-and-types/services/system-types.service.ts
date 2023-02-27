import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, } from 'rxjs';
import { SystemType } from '../models/type.model';






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
      let isTypeIdFound = typesIds.find(id => id === types[i].id);
      if(isTypeIdFound){
        typesByIds.push(types[i]);
      }
    }

    return typesByIds;

  }


  _setUlcansTypes(){
    return this.http.get<SystemType[]>('../../../../assets/types.json').pipe(map(types => this.systemTypes$.next(types)));;
  }


}
