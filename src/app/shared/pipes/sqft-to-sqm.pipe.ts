import { Pipe, PipeTransform } from '@angular/core';
import { MeasureType } from '../models/measure-type.enum';

@Pipe({
  name: 'sqftToSqm'
})
export class SqftToSqmPipe implements PipeTransform {

  transform(number: number, measureType: MeasureType): number {
    let calcNumber: number;
    switch(measureType) {
      case MeasureType.METERS:
        calcNumber = number * 0.092903003
        return calcNumber;
      case MeasureType.FEET:
        calcNumber =  number;
        return calcNumber;

    }
  }

  }
