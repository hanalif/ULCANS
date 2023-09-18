import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { appConfigBtnsMode } from '../../models/app-config-btns-mode.enum';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { Observable, Subscription } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { AssetPage } from 'src/app/configurations/typical-configurations/asset/asset.page';

@Component({
  selector: 'app-config-selections-btns',
  templateUrl: './app-config-selections-btns.component.html',
  styleUrls: ['./app-config-selections-btns.component.scss'],
})
export class AppConfigSelectionsBtnsComponent implements OnInit, OnDestroy {
  @Input() displayMode!: appConfigBtnsMode;
  appConfigBtnsMode = appConfigBtnsMode;
  appConfigBtnSubscription!: Subscription;

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

  constructor(private appConfigService: AppConfigurationService, private assetsService:AssetsService) { }

  ngOnInit() {
    this.initialAppConfigSubscription = this.appConfigService.getCurrAppConfigSettings().subscribe(currConfig=>{
      this.initialAppConfirmationSelection = currConfig;
    })


  }

  onConfigBtn(configVal: AppConfirmationSelections){
    this.appConfigService.setAppConfig(configVal);
    this.appConfigBtnSubscription = this.assetsService.setAssets(configVal).subscribe();
  }

  ngOnDestroy(): void {
    this.initialAppConfigSubscription.unsubscribe();
  }

}
