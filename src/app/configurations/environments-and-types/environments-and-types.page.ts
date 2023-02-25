import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { UserSelectionsGuardInterface } from '../services/guards/user-selections-guard.interface';




@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, UserSelectionsGuardInterface ,OnDestroy {
  sides: string[] =['A','B']

  isDiabled$!: Observable<boolean>;
  isDisabled!: boolean;

  currUserSelection!:AssetForPdf;
  currUserSelectionSubscription!: Subscription;

  constructor(
    private route: Router,
    private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    this.currUserSelectionSubscription = this.userSelectionsService.userCurrSelection$.subscribe(currSelection=>{
      if(currSelection === null){
        this.route.navigate(['configurations/typical-configurations']);
      }else{
        this.currUserSelection = currSelection;
      }
    })

    this.isDiabled$ = this.userSelectionsService.getisDisabled().pipe(tap(isDisabled=> this.isDisabled = isDisabled));
  }

  onBack(){
    this.route.navigate(['configurations/typical-configurations', this.currUserSelection.assetId ])
  }

  onAddToYourSelections(){
    if(this.isDisabled){
      return;
    }else{
      this.userSelectionsService.addAssetForPdf();
    }
  }

  isUserSelectionPage():boolean {
    return true;
  }

  ngOnDestroy(): void {
    this.currUserSelectionSubscription.unsubscribe();
  }
}
