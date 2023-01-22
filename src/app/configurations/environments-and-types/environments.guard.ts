import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentsGuard implements CanLoad {
  constructor( private router: Router, private route: ActivatedRouteSnapshot){}
  canLoad(): boolean  | Observable<boolean> | Promise<boolean> {
      console.log('from guard', this.route.queryParamMap.get('assetId'))
      let canAccessEnvironmentsPage: boolean = false;
      if(canAccessEnvironmentsPage === false){
        this.router.navigate(['/configurations/typical-configurations']);
      }else{
        canAccessEnvironmentsPage = true;
      }
    return canAccessEnvironmentsPage;
  }


}
