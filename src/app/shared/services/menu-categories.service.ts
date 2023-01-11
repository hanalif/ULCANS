import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { MenuCategory } from '../models/menu-category.model';
import { StartBtn } from '../models/start-btn.model';
import { EnviormentCategory } from '../models/enviorment-category.model';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  public START_BTN: StartBtn = { btnTitle: 'start using ulcans', btnLink: '/configurations/typical-configurations'}

  constructor(private http: HttpClient) { }

  private configurationsClassesCategories$: BehaviorSubject<EnviormentCategory[]> = new BehaviorSubject<EnviormentCategory[]>([]);

  getMenuCategories(){
    return this._getMenuCategories();
  }

  getEnviormentCategories(){
    return this._getEnviormentsCategories();
  }


  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }

  getConfigurationsClassesCategories(){
    return this.configurationsClassesCategories$.getValue();
  }
  _getEnviormentsCategories(){
    return this.http.get<EnviormentCategory[]>('assets/enviorments-types.json').pipe(map(categories => this.configurationsClassesCategories$.next(categories)));;
  }







}
