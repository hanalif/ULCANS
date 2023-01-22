import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { EnvironmentCategory } from 'src/app/shared/models/environment-category.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
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
  environmentsCategories!:EnvironmentCategory[];
  isEnvironmentSelected: boolean = false;
  public selectEnvironmentLinksMaping: any = {"11aa": true};
  environmentId:string = "11aa";

  constructor(
    private router: ActivatedRoute,
    private menuCategoriesServive: MenuCategoriesService,
    private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
    this.environmentsCategories = this.menuCategoriesServive.getConfigurationsClassesCategories();
  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }

    this.measureType = measureType;
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

  onAddToSelections(){
    const assetForPdf:AssetForPdf = {
      assetId: this.asset.id,
      measureType: this.measureType,
      environmentId: this.environmentId,
      configuraionId: this.asset.configurationId,
      quantity: 0
    }

    this.userSelectionsService.addAssetForPdf(assetForPdf);
  }
}
