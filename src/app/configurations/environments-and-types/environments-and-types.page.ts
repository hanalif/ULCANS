import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';




@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, OnDestroy {
  sides: string[] =['A','B']

  isDiabled$!: Observable<boolean>;
  isDisabled!: boolean;
  isFromUserSelections: boolean = false;
  isFromUserSelectionsSubscription: Subscription | undefined;
  userSelectionToUpdateId: string | undefined;

  currUserSelection!:AssetForPdf;

  constructor(
    private router: Router,
    private userSelectionsService: UserSelectionService,
    private route: ActivatedRoute,) { }



  ngOnInit() {
    this.isFromUserSelectionsSubscription = this.route.queryParams.subscribe(params=>{
      this.isFromUserSelections = params['isFromUserSelectionsMenu'];

      if(this.isFromUserSelections){
        this.userSelectionToUpdateId = params['userSelectionToUpdateId'];
        if(this.userSelectionToUpdateId){
          this.currUserSelection = this.userSelectionsService.getUserSelectionById(this.userSelectionToUpdateId) as AssetForPdf;
        }
      }else{
          this.currUserSelection = this.userSelectionsService.getCurrUserSelectionValue() as AssetForPdf;
      }
    })

    this.isDiabled$ = this.userSelectionsService.getisDisabled().pipe(tap(isDisabled=> this.isDisabled = isDisabled));
  }

  onBack(){
    this.router.navigate(['configurations/typical-configurations', this.currUserSelection.assetId])
  }


  onAddToYourSelections(){
    if(this.isDisabled){
      return;

    }else{
      if(this.isFromUserSelections){
        this.userSelectionsService.setIsUserSelectionsMenuOpen(true);

      }else{
        let userSelectios: Partial<AssetForPdf> = {
          initialIndexses: [0,1,2]
        }
        this.userSelectionsService.updateCurrUserSelections(userSelectios);
        this.userSelectionsService.addAssetForPdf();
      }

      this.router.navigate(['/configurations/typical-configurations']);
    }
  }

  ngOnDestroy(): void {
    this.isFromUserSelectionsSubscription?.unsubscribe();
  }


}
