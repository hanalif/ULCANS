import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentsAndTypesResolver implements Resolve<AssetForPdf>  {

  constructor(
     private userSelectionsService: UserSelectionService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AssetForPdf | Observable<AssetForPdf> | Promise<AssetForPdf> {
    return this.userSelectionsService.userCurrSelection$.asObservable().pipe(
      map(currUserSelection=>{
        return currUserSelection as AssetForPdf;
      })
    )
  }

}
