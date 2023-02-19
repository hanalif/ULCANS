import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { SystemType } from '../../models/type.model';
import { SystemTypesService } from '../../services/system-types.service';

@Component({
  selector: 'app-types-select-btn',
  templateUrl: './types-select-btn.component.html',
  styleUrls: ['./types-select-btn.component.scss'],
})
export class TypesSelectBtnComponent implements OnInit {
  systemTypes$!: Observable<SystemType[]>;
  systemTypeId!: string;
  currUserSelectionSubscription!: Subscription;



  constructor(private systemTypesService: SystemTypesService, private route: Router,private userSelectionsService: UserSelectionService) { }

  ngOnInit() {
    this.systemTypes$ = this.systemTypesService.systemTypes$
    this.currUserSelectionSubscription = this.userSelectionsService.userCurrSelection$.subscribe(currSelection=>{
      if(!currSelection){
        this.route.navigate(['configurations/typical-configurations']);
      }
    })
  }

  onType(id:string){
    this.systemTypeId = id;
    let userSelectios: Partial<AssetForPdf> = {
      systemTypeId: id
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios);
  }

}
