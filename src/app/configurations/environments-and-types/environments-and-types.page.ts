import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { Asset } from '../models/asset.model';
import { Configuration } from '../models/configuration.model';
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


  constructor(
    private route: Router,
    private environmentsService: EnvironmentsService,
    private systemTypesService: SystemTypesService,
    private userSelectionsService: UserSelectionService) { }


  ngOnInit() {
     this.enviromentSubscription = this.environmentsService.environments$.subscribe(enviroments=>{
      this.environments = enviroments;
    })

    this.systemTypes$ = this.systemTypesService.systemTypes$

    this.currUserSelectionSubscription = this.userSelectionsService.userCurrSelection$.subscribe(currSelection=>{
      if(!currSelection){
        this.route.navigate(['configurations/typical-configurations']);
      }
    })
  }

  onEnvironmentLinkSideA(id:string, currSide:string){
    this.sideASelection = id;
    this.environmentsService.setIsClothPatternsMenuOpen(true);
    this.environmentsService.setCurrClothPatterns(id, currSide);
  }

  onEnvironmentLinkSideB(id:string, currSide:string){
    this.sideBSelection = id;

    this.environmentsService.setIsClothPatternsMenuOpen(true);
    this.environmentsService.setCurrClothPatterns(id, currSide);
  }

  onBack(){
    console.log('on back')
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
