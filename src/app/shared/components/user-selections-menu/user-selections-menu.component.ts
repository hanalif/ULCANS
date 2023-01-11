import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Asset } from 'src/app/configurations/models/asset.model';
import { AssetForPreview } from 'src/app/configurations/models/assetForPreview.model';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];

  constructor(private userSelectionService: UserSelectionService, private measurmentsPipe: FtToMPipe, private assetsService: AssetsService, private configurationService: ConfigurationsService  ) { }

  ngOnInit() {
    // this.assetsForPdfSubscription = this.userSelectionService.getAssetsForPdf().pipe(
    //   switchMap(assetsForPdf => {
    //     const assetIds = assetsForPdf.map(asset => asset.assetId);
    //     return this.assetsService.getAssetsByIds(assetIds).pipe(
    //       map(assets => {
    //         return {
    //           asset,
    //           assetsForPdf
    //         }
    //       })
    //     );
    //   }),
    //   switchMap(assets => {

    //   })
    // )

  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription.unsubscribe();
  }
}
