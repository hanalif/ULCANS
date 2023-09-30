import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AppConfirmationSelections } from "src/app/app-configurations/app-configurations.enum";
import { AppConfigurationService } from "src/app/app-configurations/app-configurations.service";
import { UserSelectionService } from "src/app/shared/services/user-selection.service";

@Injectable({providedIn: 'root'})

export class PORListPageGuard implements CanActivate{
  constructor(private appConfigService: AppConfigurationService, private route: Router,){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.appConfigService.getCurrAppConfigSettings().pipe(
      map(currAppConfig=>{
      if(currAppConfig == AppConfirmationSelections.USA){
        return true
      }else{
        this.route.navigate(['/']);
        return false

      }
    }))
  }

}
