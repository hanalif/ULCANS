import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnvironmentCategory } from 'src/app/shared/models/environment-category.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
import { Asset } from '../models/asset.model';
import { Configuration } from '../models/configuration.model';

@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, OnDestroy {
  environmentsCategories!:EnvironmentCategory[];
  environmentId:string = "11aa";
  isEnvironmentSelected: boolean = false;
  public selectEnvironmentLinksMaping: any = {"11aa": true};
  enviromentSubscription!: Subscription;

  asset!: Asset;
  configuration!: Configuration;


  constructor(private menuCategoriesServive: MenuCategoriesService,  private router: ActivatedRoute,) { }


  ngOnInit() {
     this.enviromentSubscription = this.menuCategoriesServive.configurationsClassesCategories$.subscribe(enviroments=>{
      this.environmentsCategories = enviroments;
    })
    const environmentPageInputForDisplay = this.router.snapshot.data['EnvironmentPageInputForDisplay'];
    this.asset = environmentPageInputForDisplay.asset;
    this.configuration = environmentPageInputForDisplay.configuration;
    console.log('asset',this.asset, 'confuguration', this.configuration);



  }

  onEnvironmentLink(id:string){
    this.environmentId = id;
    for(let key in this.selectEnvironmentLinksMaping) {
      if(key !== id) {
        this.selectEnvironmentLinksMaping[key] = false;
      }
    }

    if(this.selectEnvironmentLinksMaping[id]){
      this.selectEnvironmentLinksMaping[id] = !this.selectEnvironmentLinksMaping[id];
    } else{
      this.selectEnvironmentLinksMaping[id] = true;
    }
  }

  onBack(){
    console.log('on back')
  }

  ngOnDestroy(): void {
    this.enviromentSubscription.unsubscribe();
  }


}
