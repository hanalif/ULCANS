import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { appConfigBtnsMode } from '../../models/app-config-btns-mode.enum';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-app-config-selections-btns',
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

  constructor(private appConfigService: AppConfigurationService) { }

  ngOnInit() {
    this.initialAppConfigSubscription = this.appConfigService.getCurrAppConfigSettings().subscribe(currConfig=>{
      this.initialAppConfirmationSelection = currConfig;
    })


  }

  onConfigBtn(configVal: AppConfirmationSelections){
    this.appConfigService.setAppConfig(configVal);
  }

  ngOnDestroy(): void {
    this.initialAppConfigSubscription.unsubscribe();
  }

}
