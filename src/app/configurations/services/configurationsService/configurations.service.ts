import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Configuration } from '../../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private http: HttpClient) { }

  getConfigurationById(configurationId: string){
    return this._getConfugurations().pipe(map(configurations=>{
      const configuration = configurations.find(c=>
        {return c.id === configurationId})
      return configuration;
    }))
  }

  _getConfugurations(){
    return this.http.get<Configuration[]>('assets/configurations.json');
  }
}
