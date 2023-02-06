import { Component, Input, OnInit } from '@angular/core';
import { MeasureType } from '../../models/measure-type.enum';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-selection',
  templateUrl: './btn-selection.component.html',
  styleUrls: ['./btn-selection.component.scss'],
})
export class BtnSelectionComponent implements OnInit {
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;
  @Output() onMeasureType = new EventEmitter<MeasureType>();

  constructor() { }

  ngOnInit() {
    this.onMeasureType.emit(MeasureType.METERS);

  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }
    this.measureType === measureType;
    this.onMeasureType.emit(measureType);
  }


}
