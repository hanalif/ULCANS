import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { EnviormentCategory } from 'src/app/shared/models/enviorment-category.model';
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
  enviormentCategories!:EnviormentCategory[];
  isEnviormentSelected: boolean = false;
  public selectEnviormentLinksMaping: any = {"11aa": true};
  enviormentId:string = "11aa";

  constructor(
    private router: ActivatedRoute,
    private menuCategoriesServive: MenuCategoriesService,
    private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
    this.enviormentCategories = this.menuCategoriesServive.getConfigurationsClassesCategories();
  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }

    this.measureType = measureType;
  }

  onEnviormentLink(id:string){
    this.enviormentId = id;
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

  onAddToSelections(){
    const assetForPdf:AssetForPdf = {
      assetId: this.asset.id,
      measureType: this.measureType,
      enviormentId: this.enviormentId,
      configuraionId: this.asset.configurationId,
      quantity: 0
    }

    this.userSelectionsService.addAssetForPdf(assetForPdf);
  }
}
