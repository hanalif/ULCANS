import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }









}
