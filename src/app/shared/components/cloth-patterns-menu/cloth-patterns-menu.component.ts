import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { UserSelectionService } from '../../services/user-selection.service';


@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit, OnDestroy {
  clothPatterns: string[] = [];
  clothPatternsSubscription!: Subscription;
  currSide$!: Observable<string>;
  selectedPatternIndex: number = 0

  constructor(private environmentsService: EnvironmentsService, private userSelectionService: UserSelectionService) { }


  ngOnInit() {
    this.clothPatternsSubscription = this.environmentsService.currClothPatterns$.subscribe(currClothPatterns=>{
      this.clothPatterns = currClothPatterns;
    })
    this.currSide$ = this.environmentsService.currSide$
  }

  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

  onClothPatternLink(index: number){
    console.log(index);
    this.selectedPatternIndex = index;
  }

  onSave(){




  }

  ngOnDestroy(): void {
    this.clothPatternsSubscription?.unsubscribe()
  }

}
