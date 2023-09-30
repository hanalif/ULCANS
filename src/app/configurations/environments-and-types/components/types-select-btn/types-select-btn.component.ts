import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserSelections } from 'src/app/shared/models/user-selections.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { SystemType } from '../../models/type.model';
import { SystemTypesService } from '../../services/system-types.service';

@Component({
  selector: 'app-types-select-btn',
  templateUrl: './types-select-btn.component.html',
  styleUrls: ['./types-select-btn.component.scss'],
})
export class TypesSelectBtnComponent implements OnInit, OnChanges, OnDestroy {
  systemTypes!: SystemType[];
  systemTypeId!: string;

  systemTypeIndex: number = -1;

  isFromUserMenu: boolean = false;
  isFromMenuSubscription!: Subscription;
  userSelectionToUpdateId: string | undefined;
  @Input() currUserSelection!: UserSelections;
  changSrcs: string[] = ['assets/imgs/environments/png-small/check-mark.png', 'assets/imgs/environments/png-small/check-mark-greyBG.png']

  constructor(private systemTypesService: SystemTypesService,private userSelectionsService: UserSelectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.systemTypesService.systemTypes$.subscribe(systemTypes=>{
      this.systemTypes = systemTypes;
    })
    this.isFromMenuSubscription = this.route.queryParams.subscribe(params=>{
      this.isFromUserMenu = params['isFromUserSelectionsMenu'];
      if(this.isFromUserMenu){
        this.systemTypeIndex = this.systemTypes.findIndex(s=> s.id === this.systemTypeId);
        this.userSelectionToUpdateId = params['userSelectionToUpdateId'];
      }

    })

  }

  onType(index: number){
    let userSelectios: Partial<UserSelections> = {
      systemTypeId: this.systemTypes[index].id
    }

    this.userSelectionsService.updateCurrUserSelections(userSelectios);

    this.userSelectionsService.updateDisabled();
    if(!this.isFromUserMenu){
      this.userSelectionsService.setProgressBar();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    let currUserSelection: UserSelections = changes['currUserSelection'].currentValue;


    if(currUserSelection.systemTypeId){
      this.systemTypeId = currUserSelection.systemTypeId
    }
  }

  ngOnDestroy(): void {

  }

}
