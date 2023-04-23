import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MenuCategory } from '../models/menu-category.model';
import { StartBtn } from '../models/start-btn.model';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  public START_BTN: StartBtn = { btnTitle: 'start using ulcans', btnLink: '/configurations/typical-configurations'}

  constructor(private http: HttpClient) { }

  getMenuCategories(){
    return this._getMenuCategories();
  }

  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }

}
