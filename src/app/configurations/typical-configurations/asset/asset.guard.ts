import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AssetsService } from "../../services/assets/assets.service";


@Injectable({providedIn: 'root'})

export class AssetPageGuard implements CanActivate{
  constructor(private assetsService:AssetsService, private router: Router,){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let assetId: string = route.params['assetId'];

    const isAssetIdFound = this.assetsService.getAssetById(assetId)? true : false;

    if(isAssetIdFound){
      return true
    }else{
      this.router.navigate(['configurations/typical-configurations']);
      return false;
    }
  }

}
