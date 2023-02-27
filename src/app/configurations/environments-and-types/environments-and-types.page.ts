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
export class EnvironmentsAndTypesPage implements OnInit {
  sides: string[] =['A','B']

  isDiabled$!: Observable<boolean>;
  isDisabled!: boolean;

  currUserSelection!:AssetForPdf;

  constructor(
    private router: Router,
    private userSelectionsService: UserSelectionService,
    private route: ActivatedRoute,) { }


  ngOnInit() {
    this.currUserSelection = this.route.snapshot.data['currUserSelection'];
    this.isDiabled$ = this.userSelectionsService.getisDisabled().pipe(tap(isDisabled=> this.isDisabled = isDisabled));
  }

  onBack(){
    this.router.navigate(['configurations/typical-configurations', this.currUserSelection.assetId ])
  }


  onAddToYourSelections(){
    if(this.isDisabled){
      return;
    }else{
      this.userSelectionsService.addAssetForPdf();
      this.router.navigate(['/configurations/typical-configurations']);
    }
  }


}
