import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, } from 'rxjs';
import { Environment} from 'src/app/configurations/environments-and-types/models/environment.model';
import { CurrEnvironmentIdAndSide } from '../models/curr-environmentId-and-side.model';
import { SystemSideForDisplay } from 'src/app/shared/models/system-side-for-display.mode';
import { ClothPattern } from '../models/clothPattern.model';
import { PORVariant } from '../models/por-variant.model';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {

  constructor(private http: HttpClient) { }

  public environments$: BehaviorSubject<Environment[]> = new BehaviorSubject<Environment[]>([]);
  public PORList$: BehaviorSubject<PORVariant[]> = new BehaviorSubject<PORVariant[]>([]);
  private isClothPatternMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currClothPatterns$: BehaviorSubject<ClothPattern[] | null> = new BehaviorSubject<ClothPattern[] | null>(null);
  public currEnvironmentIdAndSide$: BehaviorSubject<CurrEnvironmentIdAndSide | null> = new BehaviorSubject<CurrEnvironmentIdAndSide | null>(null);



  getEnvironmentsValue(){
    return this.environments$.getValue();
  }

  getPORListValue(){
    return this.PORList$.getValue();
  }

  getEnvironmentsByIds(environmentsIds: string[]){
    let environments = this.getEnvironmentsValue();
    let environmentsByIds: Environment[] = [];
    for(let i = 0; i<environments.length; i++){
      let isEnvironmentFound = environmentsIds.find(id=> id === environments[i].id);
      if(isEnvironmentFound){
        environmentsByIds.push(environments[i])
      }
    }
    return environmentsByIds;
  }

  getPORVariantById(PORId: string){
    const PORList = this.PORList$.getValue();
    const porSelection: PORVariant = PORList.find(POR=> POR.id == PORId) as PORVariant;
    return porSelection;
  }

  getEnvironmentById(id: string){
    const environments = this.environments$.getValue();
    const environment: Environment = environments.find(e=> e.id === id) as Environment;
    return environment
  }

  getSystemSideForDisplay(environmentId: string, index: number){
    const environment = this.getEnvironmentById(environmentId);
    const systemSideForDisplay: SystemSideForDisplay = {environment: environment, indexForPatternUrl: index};
    return systemSideForDisplay;

  }

  getIsClothPatternMenuOpen() {
    return this.isClothPatternMenuOpen$;
 }

 setIsClothPatternsMenuOpen(val:boolean){
  this.isClothPatternMenuOpen$.next(val);
}

setCurrClothPatterns(environmentId: string, currSide:string){
  let environments = this.getEnvironmentsValue();
  let currEnvironment = environments.find(e=> e.id === environmentId);
  let clothPatterns: ClothPattern[] = currEnvironment!.clothPatterns;
  this.currClothPatterns$.next(clothPatterns);
  const currEnvironmentIdAndSide: CurrEnvironmentIdAndSide = {
    currSide: currSide,
    currEnvironmentId: environmentId
  }
  this.currEnvironmentIdAndSide$.next(currEnvironmentIdAndSide);
}


  _setEnvironments(){
    return this.http.get<Environment[]>('assets/environments.json').pipe(map(environments => this.environments$.next(environments)));
  }

  _setPORSelections(){
    return this.http.get<PORVariant[]>('assets/NSNs.json').pipe(map(porSelections=> this.PORList$.next(porSelections)));
  }





}
