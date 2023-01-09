import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { catchError, map, Observable, of } from 'rxjs';
import { MenuCategory } from '../models/menu-category.model';
import { StartBtn } from '../models/start-btn.model';
import { EnviormentCategory } from '../models/enviorment-category.model';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  public START_BTN: StartBtn = { btnTitle: 'start using ulcans', btnLink: '/configurations/typical-configurations'}

  constructor(private http: HttpClient) { }

  getMenuCategories(){
    return this._getMenuCategories();
  }

  getEnviormentCategories(){
    return this._getEnviormentsCategories();
  }


  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }

  _getEnviormentsCategories(){
    return this.http.get<EnviormentCategory[]>('assets/enviorments-types.json');
  }







}
