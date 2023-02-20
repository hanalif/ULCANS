import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TypesSelectBtnComponent implements OnInit, OnChanges {
  systemTypes$!: Observable<SystemType[]>;
  systemTypeId!: string;
  @Input() currUserSelection!: AssetForPdf;




  constructor(private systemTypesService: SystemTypesService, private route: Router,private userSelectionsService: UserSelectionService) { }


  ngOnInit() {
    this.systemTypes$ = this.systemTypesService.systemTypes$
  }

  onType(id:string){
    this.systemTypeId = id;
    let userSelectios: Partial<AssetForPdf> = {
      systemTypeId: id
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currUserSelection: AssetForPdf = changes['currUserSelection'].currentValue
    if(currUserSelection.systemTypeId){
      this.systemTypeId = currUserSelection.systemTypeId
    }
  }

}
