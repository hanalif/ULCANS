import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IndexesForAccordion } from '../models/indexes-for-accordion.model';


@Injectable({
  providedIn: 'root'
})
export class InfoPagesResolver implements Resolve<IndexesForAccordion>  {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IndexesForAccordion | Observable<IndexesForAccordion> | Promise<IndexesForAccordion> {

    const index: number[] = route.queryParams['index']? (route.queryParams['index']).split(',') : [];
    const innerIndex: number[] = route.queryParams['innerIndex']? (route.queryParams['innerIndex']).split(',') : [];
    const indexesForAccordion: IndexesForAccordion = {index: index, innerIndex: innerIndex};
    return indexesForAccordion;
  }

}
