import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable, map, switchMap, tap } from "rxjs";
import { AppConfirmationSelections } from "src/app/app-configurations/app-configurations.enum";
import { AppConfigurationService } from "src/app/app-configurations/app-configurations.service";


@Injectable({providedIn: 'root'})
export class HomePageGuard implements CanActivate{

  constructor(private appConfigService:AppConfigurationService, private route: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.appConfigService.getAppConfig().pipe(
      map(appConfigVal => {
        if(appConfigVal == AppConfirmationSelections.USA || appConfigVal == AppConfirmationSelections.GLOBAL){
          return true;
        }else{
          return false;
        }
      }),
      tap(canNavigateToPage=>{
        if(!canNavigateToPage){
          this.route.navigate(['home/app-config-selection'])
        }
      })

    )
    throw new Error("Method not implemented.");
  }



}


