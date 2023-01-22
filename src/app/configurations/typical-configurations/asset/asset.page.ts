import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
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




  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }

    this.measureType = measureType;
  }


  // onAddToSelections(){
  //   const assetForPdf:AssetForPdf = {
  //     assetId: this.asset.id,
  //     measureType: this.measureType,
  //     environmentId: '',
  //     configuraionId: this.asset.configurationId,
  //     quantity: 0
  //   }

  //   this.userSelectionsService.addAssetForPdf(assetForPdf);
  // }

  onChooseYourEnvironment(){
    console.log('measurment', this.measureType);

    this.route.navigate(['/configurations/environments-and-types'], {queryParams: {assetId: this.asset.id, measureType:1}});
  }

}
