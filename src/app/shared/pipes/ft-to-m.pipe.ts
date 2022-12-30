import { Pipe, PipeTransform } from '@angular/core';
import { MeasureType } from '../models/measure-type.enum';

@Pipe({
  name: 'ftToM'
})
export class FtToMPipe implements PipeTransform {

  transform(number: number, measureType: MeasureType): number {
    let calcNumber: number;
    switch(measureType) {
      case MeasureType.METERS:
        calcNumber = number * 3.280
        return calcNumber;
      case MeasureType.FEET:
        calcNumber =  number;
        return calcNumber;

    }
  }

}
