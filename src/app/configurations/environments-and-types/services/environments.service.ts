import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, map, } from 'rxjs';
import { Environment} from 'src/app/configurations/environments-and-types/models/environment.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {

  constructor(private http: HttpClient) { }

  public environments$: BehaviorSubject<Environment[]> = new BehaviorSubject<Environment[]>([]);
  private isClothPatternMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  getEvironments(){
    return this.environments$.asObservable();
  }

  getEnvironmentsValue(){
    return this.environments$.getValue();
  }

  getEnvironmentsByIds(environmentsIds: string[]){
    let environments = this.getEnvironmentsValue();
    let environmentsByIds: Environment[] = [];
    for(let i = 0; i<environments.length; i++){
      let isEnvironmentFound = environmentsIds.find(id=> id === environments[i].id);
      if(isEnvironmentFound){
        console.log('environment found', environments[i])
        environmentsByIds.push(environments[i])
      }
    }
    return environmentsByIds;
  }

  getIsClothPatternMenuOpen() {
    return this.isClothPatternMenuOpen$;
 }

 setIsClothPatternsMenuOpen(val:boolean){
  this.isClothPatternMenuOpen$.next(val);
}



  getConfigurationsClassesCategoriesByIds(classesIds: string[]){
    let classesList = this.environments$.getValue();
    let classesByIds: Environment[] = [];
    for(let i = 0; i <classesList.length; i++){
      let isClassIdFound = classesIds.find(id=> id === classesIds[i]);

      if(isClassIdFound){
        classesByIds.push(classesByIds[i]);
      }
    }

    return classesByIds;
  }
  _setEnvironments(){
    return this.http.get<Environment[]>('../../../../assets/environments.json').pipe(map(environments => this.environments$.next(environments)));;
  }


}
