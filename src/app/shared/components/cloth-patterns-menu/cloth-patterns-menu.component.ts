import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SystemType } from 'src/app/configurations/environments-and-types/models/type.model';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { AssetForPdf } from '../../models/asset-for-pdf.model';
import { SystemSide } from '../../models/system-side.model';
import { UserSelectionService } from '../../services/user-selection.service';


@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit, OnDestroy {
  clothPatterns: string[] = [];
  clothPatternsSubscription!: Subscription;
  currSide!: string;
  currEnvironmentId!: string;
  selectedPatternIndex: number = 0
  currSideSelection!: Subscription;

  constructor(private environmentsService: EnvironmentsService, private userSelectionService: UserSelectionService) { }


  ngOnInit() {
    this.clothPatternsSubscription = this.environmentsService.currClothPatterns$.subscribe(currClothPatterns=>{
      this.clothPatterns = currClothPatterns;
    })
    this.clothPatternsSubscription = this.environmentsService.currEnvironmentIdAndSide$.subscribe(environmentIdAndSide=>{
      this.currSide = environmentIdAndSide?.currSide as string;
      this.currEnvironmentId = environmentIdAndSide?.currEnvironmentId as string;

    })
  }

  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

  onClothPatternLink(index: number){
    this.selectedPatternIndex = index;
  }

  onSave(){
    let systemSide: SystemSide = {
      environmentId: this.currEnvironmentId,
      clothPatternIndex: this.selectedPatternIndex
    }

    let userSelections: Partial<AssetForPdf>;

    if(this.currSide === 'A'){
      userSelections ={
        sideA: systemSide
      }
    }else{
      userSelections ={
        sideB: systemSide
      }
    }

    this.userSelectionService.updateCurrUserSelections(userSelections);
    this.onClose();
  }

  ngOnDestroy(): void {
    this.clothPatternsSubscription?.unsubscribe()
  }

}
