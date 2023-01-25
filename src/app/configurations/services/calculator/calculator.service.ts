import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MeasureType } from 'src/app/shared/models/measure-type.enum';





@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private GAP_METERS: number = 0.3; //Gap from roof top to net
  private GAP_FEET: number = 2; //Gap from roof top to net




  constructor(private http: HttpClient, ) { }

  getCalculatedConfiguration(length:number, width:number, height:number, measureType: MeasureType){




  }


}
