import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { catchError, map, Observable, of } from 'rxjs';
import { MenuCategory } from '../models/menu-category.model';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  constructor(private http: HttpClient) { }

  getMenuCategories(){
    return this._getMenuCategories();
  }


  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }
}
