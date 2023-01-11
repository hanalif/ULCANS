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

  _getConfugurations(){
     return this.http.get<Configuration[]>('assets/configurations.json').pipe(map(configurations => { this.configurations$.next(configurations)}));
  }
}
