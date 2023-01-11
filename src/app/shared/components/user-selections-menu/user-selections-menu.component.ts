import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Asset } from 'src/app/configurations/models/asset.model';
import { AssetForPreview } from 'src/app/configurations/models/assetForPreview.model';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { MenuCategoriesService } from '../../services/menu-categories.service';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;


  constructor(
    private userSelectionService: UserSelectionService,
    private measurmentsPipe: FtToMPipe) { }

  ngOnInit() {
    this.assetsForPdfSubscription = this.userSelectionService.getAssetsForPdf().subscribe(assetsForPdf=>{
      let assetsForDisplay = this.userSelectionService.getAssetsForDisplay(assetsForPdf);
      if(assetsForDisplay.length === -1 || assetsForDisplay.length === 0 ){
        this.areThereAssetsToDisplay = false;
      }else{
        this.areThereAssetsToDisplay = true;
        this.assetsForDisplay = assetsForDisplay;
      }
    });
  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription?.unsubscribe()

  }
}
