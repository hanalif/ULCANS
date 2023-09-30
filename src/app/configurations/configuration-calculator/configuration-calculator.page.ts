import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { AssetsService } from '../services/assets/assets.service';
import { CalculatorService } from '../services/calculator/calculator.service';
import { CalculatorFormValue } from './calculator-form-value.model';
import { Asset } from '../models/asset.model';
import { FtToMPipe } from 'src/app/shared/pipes/ft-to-m.pipe';
import { DecimalPipe } from '@angular/common';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { UserSelections } from 'src/app/shared/models/user-selections.model';
import { Subscription } from 'rxjs';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';

@Component({
  selector: 'app-configuration-calculator',
  templateUrl: './configuration-calculator.page.html',
  styleUrls: ['./configuration-calculator.page.scss'],
})
export class ConfigurationCalculatorPage implements OnInit, OnDestroy{
  calculatorForm!: FormGroup;
  assetName: FormControl = new FormControl();
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;
  isFromAssetsList: boolean = false;
  isFromUserSelectionsMenu: boolean = false;
  isFromAssetsSubscription?: Subscription;
  userSelectionId: string | undefined;



  constructor(
    private calculatorService: CalculatorService,
    private userSelectionsService: UserSelectionService,
    private assetService: AssetsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private measurmentsPipe: FtToMPipe,
    private _decimalPipe: DecimalPipe,
    private appConfigService: AppConfigurationService) { }

    assetToUpdate: Asset | undefined;

  ngOnInit() {
    let assetId = this.activatedRoute.snapshot.paramMap.get('assetId');
    if(assetId){
      let assetById = this.assetService.getAssetById(assetId);
      if(assetById){
        this.measureType = assetById.initialMeasureType;
        this.assetToUpdate = assetById;
      }else{
        this.assetToUpdate = undefined;
      }
    }else{
      const appConfigSettings = this.appConfigService.getCurrAppConfigSettingsValue();
      if(appConfigSettings == AppConfirmationSelections.USA){
        this.measureType = MeasureType.FEET;
      }else{
        this.measureType = MeasureType.METERS;
      }
    }

    this.isFromAssetsSubscription = this.activatedRoute.queryParams.subscribe(params=>{
      this.isFromAssetsList = params['isFromAssetsList'];
      this.isFromUserSelectionsMenu = params['isFromUserSelectionsMenu'];
      if(this.isFromUserSelectionsMenu){
        this.userSelectionId = params['userSelectionToUpdateId'];
      }
    })

    this.initForm(this.assetToUpdate);
  }

  initForm(assetToUpdate: Asset | undefined){
    let initialFormValues: Partial<CalculatorFormValue | undefined>;

    if(assetToUpdate){
      if(this.measureType === MeasureType.METERS){
        initialFormValues = {
          width: this.getFtToM(assetToUpdate.measures.widthFt),
          height: this.getFtToM(assetToUpdate.measures.heightFt),
          length: this.getFtToM(assetToUpdate.measures.lengthFt)
        }
      }else{
        initialFormValues ={
          width: assetToUpdate.measures.widthFt,
          height: assetToUpdate.measures.heightFt,
          length: assetToUpdate.measures.lengthFt,
        }
      }

    }else{
      initialFormValues = undefined;
    }

    this.calculatorForm = new FormGroup({
        'assetName': new FormControl(assetToUpdate?.name,[Validators.required]),
        'calculatorFormValue': new FormGroup({
          'length': new FormControl(initialFormValues?.length,[Validators.required, Validators.min(0)]),
          'width': new FormControl(initialFormValues?.width,[Validators.required, Validators.min(0)]),
          'height': new FormControl(initialFormValues?.height,[Validators.required, Validators.min(0)])
        })
    })

  }

  onBack(){
    if(!this.isFromAssetsList){
       this.userSelectionsService.resetCurrUserSelection();
    }

    this.router.navigate(['configurations/typical-configurations']);
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
    if(this.calculatorForm.invalid || this.calculatorForm.pristine){
      return;
    }


    let formOutput = this.getCalculatorFormValue();
    let calculatorValue = formOutput.calculatorFormValue as CalculatorFormValue;
    calculatorValue.measureType = this.measureType;
    const configurayionId = this.calculatorService.getCalculatedConfigurationId(calculatorValue);

    let assetId: string;

    if(this.assetToUpdate){
      if(this.assetToUpdate.isInList){
        return;
      }
      assetId = this.assetService.generataAndAddAsset(formOutput.assetName, calculatorValue, configurayionId, this.measureType, this.assetToUpdate.id);

    }else{
      assetId = this.assetService.generataAndAddAsset(formOutput.assetName, calculatorValue, configurayionId, this.measureType);
    }

    let userSelections: Partial<UserSelections>;

    userSelections = {
      assetId: assetId,
    }

    if(!this.isFromAssetsList){
      if(this.isFromUserSelectionsMenu){
        this.userSelectionsService.setIsUserSelectionsMenuOpen(true);
        this.router.navigate(['configurations/typical-configurations']);

      }else{
        userSelections = {
          wasStartedFromCalculator:true
        }


        this.userSelectionsService.updateCurrUserSelections(userSelections);
        this.userSelectionsService.setProgressBar();
        this.router.navigate(['configurations/typical-configurations', assetId]);
      }

    }else{
      this.router.navigate(['configurations/typical-configurations']);
    }

    this.calculatorForm.reset();
  }

  getFtToM(numberFT:number){
    let numberInMeters = Number(this._decimalPipe.transform(this.measurmentsPipe.transform(numberFT, this.measureType), '1.1-2')) ;
    return numberInMeters;

  }

  ngOnDestroy(): void {
    this.isFromAssetsSubscription?.unsubscribe();
  }


}
