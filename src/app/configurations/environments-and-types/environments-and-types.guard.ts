import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { UserSelectionService } from "src/app/shared/services/user-selection.service";

@Injectable({providedIn: 'root'})

export class EnvironmentsAndTypesPageGuard implements CanActivate{
  constructor(private userSelectionService:UserSelectionService, private route: Router,){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isFromUserMenu = route.queryParams['isFromUserSelectionsMenu'];
    return this.userSelectionService.userCurrSelection$.asObservable().pipe(
      map(curruserSelection=>{
      if(curruserSelection != null || isFromUserMenu){
        return true
      }else{
        return false
      }
    }),
    tap(canNavigateToPage=>{
      if(!canNavigateToPage){
        this.route.navigate(['configurations/typical-configurations']);
      }
    }))
  }

}
