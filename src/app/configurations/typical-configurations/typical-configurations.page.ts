import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon, IonSearchbar, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { debounceTime, EMPTY, from, map, Subscription, tap } from 'rxjs';
import {AlertConfirmationType} from '../../shared/models/alert-confirmation.enum';
import { Asset } from '../models/asset.model';
import { AssetsService } from '../services/assets/assets.service';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';

@Component({
  selector: 'app-typical-configurations',
  templateUrl: './typical-configurations.page.html',
  styleUrls: ['./typical-configurations.page.scss'],
})
export class TypicalConfigurationsPage implements OnInit, AfterViewInit, OnDestroy {
  public assetsList!: Asset[];
  @ViewChild(IonSearchbar) searchBarEl!: IonSearchbar;

  areAssetsFound: boolean = true;
  assetsSuscription!: Subscription;

  alertSubscription!: Subscription;



  constructor(
    private assetsService:AssetsService,
    private cd: ChangeDetectorRef,
    private route: Router,
    private navCntrl: NavController,
    private userSelectionService: UserSelectionService,
    private alertController: AlertController) { }



    ngOnInit() {
      this.assetsSuscription = this.assetsService.getAssets().subscribe(assets =>{
        this.assetsList = assets;
        this.cd.detectChanges();
      });

    }

    ngOnDestroy(): void {
      this.assetsSuscription.unsubscribe();
      if(this.alertSubscription){
        this.alertSubscription.unsubscribe();
      }
    }

    onAssetLink(assetId: string){
    this.route.navigate(['configurations', 'typical-configurations', assetId]);
    }

    onEdit(assetId:string, $event: Event){
      $event.stopPropagation();

      this.route.navigate(['configurations', 'configuration-calaulator', assetId], {queryParams: {isFromAssetsList: true}});
    }

    onRemoveAsset(assetId:string, $event: Event){
      $event.stopPropagation();

      let isAssetInUserSelection = this.userSelectionService.getIsAssetInAssetsForPDF(assetId);
      if(isAssetInUserSelection){
          this.alertSubscription = from(this.presentAlert()).subscribe(()=>{
            this.userSelectionService.setIsUserSelectionsMenuOpen(true);
          });
      }else{
        this.assetsService.removeAsset(assetId);
      }
    }

    ngAfterViewInit(): void {
      this.searchBarEl.ionInput.pipe(
        debounceTime(300)
      ).subscribe(res => {
        const target = res.target as HTMLInputElement;
        this.assetsList = this.assetsService.getSearchResultAssets(target.value);
        this.areAssetsFound = this.assetsList.length === 0? false : true;
      })

    }

    async presentAlert() {

      const alert = await this.alertController.create({
        message:
        '<div>Please remove the asset from your selections first.</div>' +
        '<ion-icon name="arrow-forward-outline"></ion-icon> <ion-icon name="reader-outline"></ion-icon>',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'OK',
            role: AlertConfirmationType.Confirm,
          },
        ],
      });

      await alert.present();

      const { role } = await alert.onDidDismiss();
      return role as AlertConfirmationType;
    }


}
