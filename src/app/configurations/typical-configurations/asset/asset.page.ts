import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasureType } from 'src/app/shared/models/measure-type.model';
import { FtToMPipe } from 'src/app/shared/pipes/ft-to-m.pipe';
import { Asset } from '../../models/asset.model';
import { Configuration } from '../../models/configuration.model';
import { AssetsService } from '../../services/assets/assets.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.page.html',
  styleUrls: ['./asset.page.scss'],
})
export class AssetPage implements OnInit {
  public asset!: Asset;
  public configuration!: Configuration;
  public measureToRender!: MeasureType;



  constructor(private router: ActivatedRoute, private assetsService: AssetsService, private ftToMPipe: FtToMPipe) { }
  public measureOption: number = 1




  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
  }

  onSelectBtn(measureType:number){
    if(this.measureOption === measureType){
      return;
    }

    this.measureOption = measureType;
  }


}
