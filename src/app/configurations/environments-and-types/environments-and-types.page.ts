import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
import { Asset } from '../models/asset.model';
import { Configuration } from '../models/configuration.model';
import { EnvironmentsService } from './services/environments.service';

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

  asset!: Asset;
  configuration!: Configuration;

  sideASelection: string = "11aa";
  sideBSelection: string = "11aa";


  constructor( private router: ActivatedRoute, private route: Router, private environmentsSetvice: EnvironmentsService) { }


  ngOnInit() {
     this.enviromentSubscription = this.environmentsSetvice.environments$.subscribe(enviroments=>{
      this.environments = enviroments;
    })
    const environmentPageInputForDisplay = this.router.snapshot.data['EnvironmentPageInputForDisplay'];
    if(!environmentPageInputForDisplay){
      this.route.navigate(['configurations/typical-configurations']);
    }else{
      this.asset = environmentPageInputForDisplay.asset;
      this.configuration = environmentPageInputForDisplay.configuration;
    }
  }

  onEnvironmentLinkSideA(id:string){
    this.sideASelection = id;
    this.environmentsSetvice.setIsClothPatternsMenuOpen(true);
  }

  onEnvironmentLinkSideB(id:string){
    this.sideBSelection = id;
  }

  onBack(){
    console.log('on back')
  }

  ngOnDestroy(): void {
    this.enviromentSubscription.unsubscribe();
  }


}
