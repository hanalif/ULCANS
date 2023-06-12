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
export class AssetPage implements OnInit {
  public asset!: Asset;
  public configuration!: Configuration;
  public areSpecialPoles!: boolean;
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;
  tableHeaderTitles:  string[] = ['Type', 'Hexagon', 'Rhombus' ,'Width', 'Length', 'Area SQ', 'Poles', 'Pins', 'Name', 'Width', 'Height', 'Length'];
  wideScreenTitles: any = [{mainTitle: 'Configuration', tableTitles: ['Type', 'Hexagon', 'Rhombus' ,'Width', 'Length', 'Area SQ', 'Poles', 'Pins']},{mainTitle: 'Asset', tableTitles: ['Name', 'Width', 'Height', 'Length']}]


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private userSelectionsService: UserSelectionService) { }


  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
    this.areSpecialPoles = assetForPreview.areSpecialPoles;

  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }
    this.measureType = measureType;
  }

  onChooseYourEnvironment(){
    let userSelections: Partial<AssetForPdf> = {
      measureType: this.measureType,
    }
    this.userSelectionsService.updateCurrUserSelections(userSelections);
    this.route.navigate(['/configurations/environments-and-types'], {queryParams: {assetId: this.asset.id, measureType:this.measureType}});
  }

  onBack(){
    this.route.navigate(['/configurations/typical-configurations']);
  }
}
