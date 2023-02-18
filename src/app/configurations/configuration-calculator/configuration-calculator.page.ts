import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { AssetsService } from '../services/assets/assets.service';
import { CalculatorService } from '../services/calculator/calculator.service';
import { CalculatorFormValue } from './calculator-form-value.model';

@Component({
  selector: 'app-configuration-calculator',
  templateUrl: './configuration-calculator.page.html',
  styleUrls: ['./configuration-calculator.page.scss'],
})
export class ConfigurationCalculatorPage implements OnInit {
  calculatorForm!: FormGroup;
  assetName: FormControl = new FormControl();
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;

  constructor(
    private calculatorService: CalculatorService,
    private assetService: AssetsService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.calculatorForm = new FormGroup({
        'assetName': new FormControl(null,[Validators.required]),
        'calculatorFormValue': new FormGroup({
          'length': new FormControl(null,[Validators.required, Validators.min(0)]),
          'width': new FormControl(null,[Validators.required, Validators.min(0)]),
          'height': new FormControl(null,[Validators.required, Validators.min(0)])
        })
    })

  }

  getCalculatorFormValue(){
    return this.calculatorForm.value;
  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }

    this.measureType = measureType;
  }

  onCalculate(){
    if(this.calculatorForm.invalid){
      return;
    }

    let formOutput = this.getCalculatorFormValue();
    let calculatorValue = formOutput.calculatorFormValue as CalculatorFormValue;
    calculatorValue.measureType = this.measureType;
    const configurayionId = this.calculatorService.getCalculatedConfigurationId(calculatorValue);
    let newId = this.assetService.generataAndAddNewAsset(formOutput.assetName, calculatorValue, configurayionId);
    this.router.navigate(['configurations/typical-configurations', newId]);
  }


}
