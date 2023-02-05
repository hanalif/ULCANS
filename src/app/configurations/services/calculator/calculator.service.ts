import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { ConfigurationsService } from '../configurationsService/configurations.service';
import { CalculatorFormValue } from '../../configuration-calculator/calculator-form-value.model';
import { UtilService } from 'src/app/shared/services/util.service';





@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private GAP_METERS: number = 0.3; //Gap from roof top to net
  private GAP_FEET: number = 2; //Gap from roof top to net
  private MeasureType = MeasureType;




  constructor( private configurationsService: ConfigurationsService ) { }

  getCalculatedConfigurationId(calculatorFormInput: CalculatorFormValue){
    let measureType = calculatorFormInput.measureType;
    let length = calculatorFormInput.length;
    let width = calculatorFormInput.width;
    let height = calculatorFormInput.height;

    let netDimentions: number;
    let configurationId: string;

    if(MeasureType.METERS === measureType){
      let netDimentionsCalc = this.calculateNetDimentions(length, width, height, this.GAP_METERS);
      netDimentions = netDimentionsCalc / 10.76391042;
    }else{
      netDimentions = this.calculateNetDimentions(length, width, height, this.GAP_FEET);
    }
    configurationId = this.configurationsService.getConfgurationIdByNetDimention(netDimentions);
    return configurationId;
  }

  calculateNetDimentions(length:number, width:number, height:number, gap: number){
      let netDimentions: number;
      let netLength: number = this.calculateNetLenthOrWidth(height, gap, length);
      let netWidth: number = this.calculateNetLenthOrWidth(height, gap, width);
      netDimentions = netLength * netWidth;
      return netDimentions;
  }

  calculateNetLenthOrWidth(height: number, gap: number, measure:number){
    let x = height + gap;
     x = Math.pow(x, 2);
     x = x * 2;
     x = Math.sqrt(x);
     x = x * 2;
     x = x + measure;
    return x;
  }


}
