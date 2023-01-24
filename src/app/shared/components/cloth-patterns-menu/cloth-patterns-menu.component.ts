import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';


@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit, OnDestroy {
  clothPatterns: string[] = [];
  clothPatternsSubscription!: Subscription;
  currSide!: string;

  constructor(private environmentsService: EnvironmentsService) { }


  ngOnInit() {
    this.clothPatternsSubscription = this.environmentsService.currClothPatterns$.subscribe(currClothPatterns=>{
      this.clothPatterns = currClothPatterns;
      console.log(this.clothPatterns);
    })
  }

  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

  onClothPatternLink(index: number){


  }

  onSave(){

  }

  ngOnDestroy(): void {
    this.clothPatternsSubscription?.unsubscribe()
  }

}
