import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { appConfigBtnsMode } from '../../models/app-config-btns-mode.enum';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { Subscription, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { AlertController } from '@ionic/angular';
import { AlertConfirmationType } from '../../models/alert-confirmation.enum';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-config-selections-btns',
  templateUrl: './app-config-selections-btns.component.html',
  styleUrls: ['./app-config-selections-btns.component.scss'],
})
export class AppConfigSelectionsBtnsComponent implements OnInit, OnDestroy {
  @Input() displayMode!: appConfigBtnsMode;
  appConfigBtnsMode = appConfigBtnsMode;

  initialAppConfirmationSelection: AppConfirmationSelections | undefined = undefined;
  initialAppConfigSubscription!: Subscription;


  btnsData =
  [
    {
      code: AppConfirmationSelections.USA,
      txt: 'USA',
      shortTxt: 'US',
      imgLink: '../../../assets/imgs/logo/usa.png'
    },
    {
      code: AppConfirmationSelections.GLOBAL,
      txt: 'GLOBAL',
      shortTxt: 'GL',
      imgLink: '../../../assets/imgs/logo/global.png'
    }
  ]

  constructor(private appConfigService: AppConfigurationService,
              private assetsService:AssetsService,
              private alertController: AlertController,
              private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    this.initialAppConfigSubscription = this.appConfigService.getCurrAppConfigSettings().subscribe(currConfig=>{
      this.initialAppConfirmationSelection = currConfig;
    })


  }

  onConfigBtn(configVal: AppConfirmationSelections){
    let isConfigBtnPushed = this.appConfigService.getShowOnlyHeaderConfigBtnsValue();
    if(isConfigBtnPushed){
      from(this.presentAlert()).pipe(
        switchMap(alertResult=> {
          let isLeavePage = alertResult == AlertConfirmationType.Confirm;
          if(isLeavePage){
            this.userSelectionsService.resetUserSelections();
            return this.assetsService.setAssets(configVal);
          }
          return of();
        })
      ).subscribe();
    }else{
      this.assetsService.setAssets(configVal).subscribe();
    }
    this.appConfigService.setAppConfig(configVal);

  }

  ngOnDestroy(): void {
    this.initialAppConfigSubscription.unsubscribe();

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention! Changing app settings will reset your preferences and any saved data.',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: AlertConfirmationType.Cancel,
        },
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
