import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { EMPTY, from, map, Observable, tap } from "rxjs";
import { UserSelectionService } from "src/app/shared/services/user-selection.service";
import { AlertController } from '@ionic/angular';
import { AlertConfirmationType } from "src/app/shared/models/alert-confirmation.enum";
import { AssetForPdf } from "src/app/shared/models/user-selections.model";
import { AppConfigurationService } from "src/app/app-configurations/app-configurations.service";


@Injectable({
  providedIn: 'root'
})

export class UserSelectionGuard implements CanDeactivate<unknown>{
  constructor(
    private userSelectionsService: UserSelectionService,
    private alertController: AlertController,
    private appConfigService: AppConfigurationService){}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention! If you leave this page, your changes will not be saved.',
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

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Your changes saved',
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


  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const assetId: string | undefined = (this.userSelectionsService.userCurrSelection$.value)?.assetId;
    const currUserSelection: AssetForPdf | null = this.userSelectionsService.getCurrUserSelectionValue();
    const isFromUserMenu: boolean | undefined = currentRoute.queryParams['isFromUserSelectionsMenu'];
    const isFromAppConfigCmp: boolean | undefined = nextState.root.queryParams['isFromAppConfigCmp'];

    if(isFromUserMenu){
      return true;
    }

    if(currUserSelection === null){
      return from(this.presentAlert2()).pipe(
        map(res=> res == AlertConfirmationType.Confirm),
        tap(res=> this.userSelectionsService.setIsUserSelectionsMenuOpen(res))
      )
    }


    if(assetId){

      if(currentState.url.includes(assetId)){

        if((-currentState.url.includes('environments-andtypes'))){

          if(nextState.url.includes(assetId)){
            return true;
          }

          if(isFromAppConfigCmp){
            return true;
          }

          return from(this.presentAlert()).pipe(
            map((res)=> res == AlertConfirmationType.Confirm),
            tap((isLeavePage)=> {
              if(isLeavePage){
                this.userSelectionsService.resetCurrUserSelection();
              }
            })
          )
        }


        if(nextState.url.includes('configuration-calaulator') && currUserSelection.wasStartedFromCalculator){
            return true;
        }

        if((nextState.url.includes('environments-and-types')) || (nextState.url.includes(assetId))){
          return true;
        }

        this.userSelectionsService.resetCurrUserSelection();
        return true;
      }

    }

    return EMPTY;
  }
}


