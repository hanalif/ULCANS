import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private calculatorService: CalculatorService,
    private assetService: AssetsService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.calculatorForm = new FormGroup({
        'assetName': new FormControl(),
        'calculatorFormValue': new FormGroup({
          'length': new FormControl(),
          'width': new FormControl(),
          'height': new FormControl(),
          'measureType': new FormControl(),
        })
    })

  }

  getCalculatorFormValue(){
    return this.calculatorForm.value;
  }

  onCalculateConfiguration(){
    let formOutput = this.getCalculatorFormValue();
    let calculatorValue = formOutput.calculatorFormValue as CalculatorFormValue;
    const configurayionId = this.calculatorService.getCalculatedConfigurationId(calculatorValue);
    this.assetService.generataAndAddNewAsset(formOutput.assetName, calculatorValue, configurayionId);
  }

}
