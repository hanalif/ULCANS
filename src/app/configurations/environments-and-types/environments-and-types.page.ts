import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
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

  asset!: Asset;
  configuration!: Configuration;

  sideASelection: string = "11aa";
  sideBSelection: string = "11aa";

  sideAClothPatternIndex: number = 0;
  sideBClothPatternIndex: number = 0;


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private environmentsService: EnvironmentsService,
    private systemTypesService: SystemTypesService,) { }


  ngOnInit() {
     this.enviromentSubscription = this.environmentsService.environments$.subscribe(enviroments=>{
      this.environments = enviroments;
    })

    this.systemTypes$ = this.systemTypesService.systemTypes$

    const environmentPageInputForDisplay = this.router.snapshot.data['EnvironmentPageInputForDisplay'];
    if(!environmentPageInputForDisplay){
      this.route.navigate(['configurations/typical-configurations']);
    }else{
      this.asset = environmentPageInputForDisplay.asset;
      this.configuration = environmentPageInputForDisplay.configuration;
    }
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
    console.log('on type', id);
  }

  ngOnDestroy(): void {
    this.enviromentSubscription.unsubscribe();
  }


}
