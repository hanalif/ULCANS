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
    let configurations = this.getConfigurations();
    const configuration = configurations.find(c=>
      {return c.id === configurationId})
    return configuration;
  }

  getConfigurations(){
    let configurations = this.configurations$.getValue()
    return configurations;
  }

  getConfigurationsByIds(configurationsIds: string[]){
    let configurations = this.getConfigurations();
    let conigurationsByIds: Configuration[] = [];
    for(let i = 0; i <configurations.length; i++){
      let isconfiguraionIdFound = configurationsIds.find(id=> id === configurations[i].id);
      if(isconfiguraionIdFound){
        conigurationsByIds.push(configurations[i]);
      }
    }

    return conigurationsByIds;
  }

  getConfgurationIdByNetDimention(netDmention:number){
    let configurations = this.getConfigurations();
    let configurationId!: string;

    for(let i = 0; i<configurations.length; i++){
      if(netDmention >= configurations[i].measures.areaSqFt){
        if(!configurations[i+1]){
          configurationId = configurations[i].id
        }else{
          configurationId = configurations[i+1].id
        }
      }
    }

    return configurationId;

  }


  _getConfugurations(){
     return this.http.get<Configuration[]>('assets/configurations.json').pipe(map(configurations => { this.configurations$.next(configurations)}));
  }
}
