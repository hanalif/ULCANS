import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EnviormentCategory } from 'src/app/shared/models/enviorment-category.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
import { Asset } from '../../models/asset.model';
import { Configuration } from '../../models/configuration.model';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.page.html',
  styleUrls: ['./asset.page.scss'],
})
export class AssetPage implements OnInit{
  public asset!: Asset;
  public configuration!: Configuration;
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;
  openConfigurationType:boolean = false;
  enviormentCategories$!: Observable<EnviormentCategory[]>
  isEnviormentSelected: boolean = false;
  public selectEnviormentLinksMaping: any = {"11aa": true};

  constructor(private router: ActivatedRoute, private menuCategoriesServive: MenuCategoriesService) { }

  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
    this.enviormentCategories$ = this.menuCategoriesServive._getEnviormentsCategories();
  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }

    this.measureType = measureType;
  }

  onConfigurationType(){
    this.openConfigurationType = !this.openConfigurationType;
  }

  onEnviormentLink(id:string){

    for(let key in this.selectEnviormentLinksMaping) {
      if(key !== id) {
        this.selectEnviormentLinksMaping[key] = false;
      }
    }

    if(this.selectEnviormentLinksMaping[id]){
      this.selectEnviormentLinksMaping[id] = !this.selectEnviormentLinksMaping[id];
    } else{
      this.selectEnviormentLinksMaping[id] = true;
    }




  }
}
