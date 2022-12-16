import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Asset } from '../../models/asset.model';



@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) { }



  _getAssetes(){
    return this.http.get<Asset[]>('assets/assets.json');
  }
}
