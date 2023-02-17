import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { SystemType } from './models/type.model';
import { EnvironmentsService } from './services/environments.service';
import { SystemTypesService } from './services/system-types.service';

@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, OnDestroy {

  environments!:Environment[];
  environmentId:string = "11aa";
  isEnvironmentSelected: boolean = false;
  enviromentSubscription!: Subscription;

  systemTypes$!: Observable<SystemType[]>;

  sideASelection: string = "11aa";
  sideBSelection: string = "11aa";

  sideAClothPatternIndex: number = 0;
  sideBClothPatternIndex: number = 0;

  systemTypeId: string = 'TRS'
  currUserSelectionSubscription!: Subscription;

  currAssetId!: string;
  currEnvironment!: Environment;


  constructor(
    private route: Router,
    private environmentsService: EnvironmentsService,
    private systemTypesService: SystemTypesService,
    private userSelectionsService: UserSelectionService) { }


  ngOnInit() {
     this.enviromentSubscription = this.environmentsService.environments$.subscribe(enviroments=>{
      this.environments = enviroments;
      this.currEnvironment = (enviroments.find(e=> e.id === '11aa')) as Environment;

    })

    this.systemTypes$ = this.systemTypesService.systemTypes$
    this.currUserSelectionSubscription = this.userSelectionsService.userCurrSelection$.subscribe(currSelection=>{
      if(!currSelection){
        this.route.navigate(['configurations/typical-configurations']);
      }else{
        this.currAssetId = currSelection.assetId;
      }
    })
  }

  onEnvironmentLinkSideA(id:string, currSide:string){
    this.currEnvironment = (this.environments.find(e => e.id === id)) as Environment;
    this.sideASelection = id;
    this.environmentsService.setIsClothPatternsMenuOpen(true);
    this.environmentsService.setCurrClothPatterns(id, currSide);
  }

  onEnvironmentLinkSideB(id:string, currSide:string){
    this.sideBSelection = id;
    console.log(this.sideBSelection);

    this.environmentsService.setIsClothPatternsMenuOpen(true);
    this.environmentsService.setCurrClothPatterns(id, currSide);
  }

  onBack(){
    this.route.navigate(['configurations/typical-configurations', this.currAssetId ])
  }

  onType(id:string){
    this.systemTypeId = id;
    let userSelectios: Partial<AssetForPdf> = {
      systemTypeId: id
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios)
  }


  onAddToYourSelections(){
    this.userSelectionsService.addAssetForPdf();

  }

  ngOnDestroy(): void {
    this.enviromentSubscription.unsubscribe();
    this.currUserSelectionSubscription.unsubscribe();
  }
}
