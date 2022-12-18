import { AfterContentChecked, AfterContentInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from '../../models/asset.model';
import { AssetForPreview } from '../../models/assetForPreview.model';
import { Configuration } from '../../models/configuration.model';
import { AssetsService } from '../../services/assets/assets.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.page.html',
  styleUrls: ['./asset.page.scss'],
})
export class AssetPage implements OnInit {
  public asset!: Asset;
  public configuration!: Configuration



  constructor(private router: ActivatedRoute, private assetsService: AssetsService) { }




  ngOnInit() {
    const assetForPreview = this.router.snapshot.data['assetForPreview'];
    this.asset = assetForPreview.asset;
    this.configuration = assetForPreview.configuration;
    console.log(this.asset)

  }


}
