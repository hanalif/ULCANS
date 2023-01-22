import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, tap } from 'rxjs';
import { MenuCategory } from '../models/menu-category.model';
import { StartBtn } from '../models/start-btn.model';
import { EnvironmentCategory } from '../models/environment-category.model';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  public START_BTN: StartBtn = { btnTitle: 'start using ulcans', btnLink: '/configurations/typical-configurations'}

  constructor(private http: HttpClient) { }

  public configurationsClassesCategories$: BehaviorSubject<EnvironmentCategory[]> = new BehaviorSubject<EnvironmentCategory[]>([]);

  getMenuCategories(){
    return this._getMenuCategories();
  }

  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }

  getConfigurationsClassesCategories(){
    return this.configurationsClassesCategories$.asObservable();
  }

  getConfigurationsClassesCategoriesValue(){
    return this.configurationsClassesCategories$.getValue();
  }



  getConfigurationsClassesCategoriesByIds(classesIds: string[]){
    let classesList = this.configurationsClassesCategories$.getValue();
    let classesByIds: EnvironmentCategory[] = [];
    for(let i = 0; i <classesList.length; i++){
      let isClassIdFound = classesIds.find(id=> id === classesIds[i]);

      if(isClassIdFound){
        classesByIds.push(classesByIds[i]);
      }
    }

    return classesByIds;
  }
  _getEnvironmentsCategories(){
    return this.http.get<EnvironmentCategory[]>('assets/environments-types.json').pipe(map(categories => this.configurationsClassesCategories$.next(categories)));;
  }







}
