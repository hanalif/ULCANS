import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mToFt'
})
export class MToFtPipe implements PipeTransform {

  transform(number: number): number {
    let calcNumber: number;
        calcNumber = number * 3.280
        return calcNumber;
    }
  }


