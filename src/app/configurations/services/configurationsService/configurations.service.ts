import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Configuration } from '../../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private http: HttpClient) { }

  private configurations$: BehaviorSubject<Configuration[]> = new BehaviorSubject<Configuration[]>([]);



  getConfigurationById(configurationId: string){
    let configurations = this.getConfigurations();
    const configuration = configurations.find(c=>
      {return c.id === configurationId})
    return configuration;

  }

  getConfigurations(){
    return this.configurations$.getValue()
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


  _getConfugurations(){
     return this.http.get<Configuration[]>('assets/configurations.json').pipe(map(configurations => { this.configurations$.next(configurations)}));
  }
}
