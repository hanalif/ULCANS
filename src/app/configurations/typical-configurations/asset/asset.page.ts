import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';
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
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;

  constructor(private router: ActivatedRoute) { }

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
}
