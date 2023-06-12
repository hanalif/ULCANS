import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Configuration } from '../../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private http: HttpClient) { }

  public configurations$: BehaviorSubject<Configuration[]> = new BehaviorSubject<Configuration[]>([]);



  getConfigurationById(configurationId: string){
    let configurations = this._getConfigurationsValue();
    const configuration = configurations.find(c=>
      {return c.id === configurationId})
    return configuration;
  }

  _getConfigurationsValue(){
    let configurations = this.configurations$.getValue()
    return configurations;
  }

  getConfigurations(){
    return this.configurations$.asObservable();
  }

  getConfigurationsByIds(configurationsIds: string[]){
    let configurations = this._getConfigurationsValue();
    let conigurationsByIds: Configuration[] = [];
    for(let i = 0; i <configurations.length; i++){
      let isconfiguraionIdFound = configurationsIds.find(id=> id === configurations[i].id);
      if(isconfiguraionIdFound){
        conigurationsByIds.push(configurations[i]);
      }
    }

    return conigurationsByIds;
  }

  getConfigurationsSearchResult(searchKey: string){
    let configurations = this._getConfigurationsValue();
    if(searchKey === ''){
      return configurations;
    }
    const serchKeyToLowerCase = searchKey.toLocaleLowerCase()
    let updatedFetchedConfigurations = [...configurations.filter(a => a.name.toLocaleLowerCase().includes(serchKeyToLowerCase))]
    return updatedFetchedConfigurations;
  }

  getConfgurationIdByNetDimention(netDmention:number): string | undefined{
    let configurations = this._getConfigurationsValue();
    let configurationId!: string | undefined;

    for(let i = 0; i<configurations.length; i++){
      if(netDmention >= configurations[i].measures.areaSqFt){
        if(!configurations[i+1]){
          configurationId = undefined;
        }else{
          configurationId = configurations[i+1].id;
        }
      }
    }

    return configurationId;

  }


  _getConfugurations(){
     return this.http.get<Configuration[]>('assets/configurations.json').pipe(map(configurations => { this.configurations$.next(configurations)}));
  }
}
