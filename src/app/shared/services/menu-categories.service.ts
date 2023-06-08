import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MenuCategory } from '../models/menu-category.model';
import { StartBtn } from '../models/start-btn.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MenuCategoriesService {

  private openMenuLinksMaping$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public START_BTN: StartBtn = { btnTitle: 'start using ulcans', btnLink: '/configurations/typical-configurations'}

  constructor(private http: HttpClient) { }

  getOpenMenuLinksMaping(){
    return this.openMenuLinksMaping$.asObservable();
  }

  setOpenMenuLinkMaping(menuCategoryId: string){
    let openMenuLinksMaping = this.openMenuLinksMaping$.getValue();
    for(let key in openMenuLinksMaping) {
      if(key !== menuCategoryId) {
        openMenuLinksMaping[key] = false;
      }
    }

    if(openMenuLinksMaping[menuCategoryId]){
      openMenuLinksMaping[menuCategoryId] = !openMenuLinksMaping[menuCategoryId];
    } else{
      openMenuLinksMaping[menuCategoryId] = true;
    }

    this.openMenuLinksMaping$.next(openMenuLinksMaping);

  }

  getMenuCategories(){
    return this._getMenuCategories();
  }

  _getMenuCategories(){
    return this.http.get<MenuCategory[]>('assets/menu-categories.json');
  }

}
