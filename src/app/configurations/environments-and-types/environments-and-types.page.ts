import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { SystemType } from './models/type.model';
import { EnvironmentsService } from './services/environments.service';
import { SystemTypesService } from './services/system-types.service';

@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.currUserSelectionSubscription.unsubscribe();
  }
}
