import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { Asset } from '../../models/asset.model';
import { Configuration } from '../../models/configuration.model';
import { AssetsService } from '../../services/assets/assets.service';
import { AssetForPreview } from '../../models/assetForPreview.model';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-asset',
  templateUrl: './asset.page.html',
  styleUrls: ['./asset.page.scss'],
})
export class AssetPage implements OnInit,OnDestroy {
  public asset!: Asset;
  public configuration!: Configuration;
  public areSpecialPoles!: boolean;
  public measureType!: MeasureType;
  public MeasureType = MeasureType;
  tableHeaderTitles:  string[] = ['Type', 'Hexagon', 'Rhombus' ,'Width', 'Length', 'Area SQ', 'Poles', 'Pins', 'Name', 'Length', 'Width', 'Height' ];
  wideScreenTitles: any = [{mainTitle: 'Configuration', tableTitles: ['Type', 'Hexagon', 'Rhombus' ,'Width', 'Length', 'Area SQ', 'Poles', 'Pins']},{mainTitle: 'Asset', tableTitles: ['Name','Length', 'Width', 'Height']}]
  dataSubscription!: Subscription;
  wasStartedFromCalculator!: boolean;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private assetsService: AssetsService) { }


  ngOnInit() {
    this.router.data.subscribe(data=>{
      const assetForPreview = data['assetForPreview'];
      this.asset = assetForPreview.asset;
      this.configuration = assetForPreview.configuration;
      this.areSpecialPoles = assetForPreview.areSpecialPoles;
      this.wasStartedFromCalculator = assetForPreview.wasStartedFromCalculator;
      this.measureType = this.asset.initialMeasureType;
    })

  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){

    }
    this.measureType = measureType;
  }

  onChooseYourEnvironment(){

    if(!(this.measureType == this.asset.initialMeasureType)){
      let assetToUpdate: Partial<Asset> = {
        initialMeasureType: this.measureType
      }
      this.assetsService.updateAsset(assetToUpdate, this.asset.id);
    }

    this.route.navigate(['/configurations/environments-and-types']);
  }

  onBack(){

      if(this.wasStartedFromCalculator){
        this.route.navigate(['configurations/configuration-calaulator', this.asset.id]);
      }else{
        this.route.navigate(['/configurations/typical-configurations']);
      }
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

}
