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


  _setEnvironments(){
    return this.http.get<SystemType[]>('../../../../assets/types.json').pipe(map(types => this.systemTypes$.next(types)));;
  }


}
