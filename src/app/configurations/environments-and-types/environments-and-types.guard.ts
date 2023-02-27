import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { UserSelectionService } from "src/app/shared/services/user-selection.service";

@Injectable({providedIn: 'root'})

export class EnvironmentsAndTypesPageGuard implements CanActivate{
  constructor(private userSelectionService:UserSelectionService, private route: Router,){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userSelectionService.userCurrSelection$.asObservable().pipe(
      map(curruserSelection=>{
      if(curruserSelection === null){
        return false
      }else{
        return true
      }
    }),
    tap(canNavigateToPage=>{
      if(!canNavigateToPage){
        this.route.navigate(['configurations/typical-configurations']);
      }
    }))
  }

}
