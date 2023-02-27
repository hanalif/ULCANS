import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { from, map, Observable, tap } from "rxjs";
import { UserSelectionService } from "src/app/shared/services/user-selection.service";
import { AlertController } from '@ionic/angular';
import { AlertConfirmationType } from "src/app/shared/models/alert-confirmation.enum";
import { AssetForPdf } from "src/app/shared/models/asset-for-pdf.model";




@Injectable({
  providedIn: 'root'
})

export class UserSelectionGuard implements CanDeactivate<unknown>{
  constructor(private userSelectionsService: UserSelectionService, private alertController: AlertController){}

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
    if(currUserSelection === null){
      return from(this.presentAlert2()).pipe(
        map(res=> res == AlertConfirmationType.Confirm),
        tap(res=> this.userSelectionsService.setIsUserSelectionsMenuOpen(res))
      )
    }

    if(assetId){
      if((nextState.url.includes('environments-and-types')) || (nextState.url.includes(assetId))){
        return true;
      }
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
}


