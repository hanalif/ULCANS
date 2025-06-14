import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { appConfigBtnsMode } from '../../models/app-config-btns-mode.enum';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { Subscription, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { AlertController } from '@ionic/angular';
import { AlertConfirmationType } from '../../models/alert-confirmation.enum';
import { UserSelectionService } from '../../services/user-selection.service';
import { Router } from '@angular/router';
import { AppConfigData } from 'src/app/app-configurations/app-config-data.model';

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


  btnsData!: AppConfigData[];

  constructor(private appConfigService: AppConfigurationService,
              private assetsService:AssetsService,
              private alertController: AlertController,
              private userSelectionsService: UserSelectionService,
              private route: Router) { }

  ngOnInit() {
    this.initialAppConfigSubscription = this.appConfigService.getCurrAppConfigSettings().subscribe(currConfig=>{
      this.initialAppConfirmationSelection = currConfig;
    })

    this.appConfigService.getAppConfigurationsData().subscribe(appConfigData=>{
      this.btnsData = appConfigData;
    });

  }

  onConfigBtn(configVal: AppConfirmationSelections){

    let isConfigBtnPushed = this.appConfigService.getShowOnlyHeaderConfigBtnsValue();
    if(isConfigBtnPushed){
      from(this.presentAlert()).pipe(
        switchMap(alertResult=> {
          let isLeavePage = alertResult == AlertConfirmationType.Confirm;
          if(isLeavePage){
            this.userSelectionsService.resetUserSelections();
            this.route.navigate(['home'], {queryParams: {isFromAppConfigCmp: true}});
            this.appConfigService.setAppConfig(configVal);
            return this.assetsService.setAssets(configVal, true);
          }
          return of();
        })
      ).subscribe();
    }else{
      this.appConfigService.setAppConfig(configVal);
      this.assetsService.setAssets(configVal, true).subscribe();

    }
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
