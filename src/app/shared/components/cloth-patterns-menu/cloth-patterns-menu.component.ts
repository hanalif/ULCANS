import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClothPatternsUrls } from 'src/app/configurations/environments-and-types/models/cloth-patterns-url.model';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import Swiper, { Navigation, Thumbs } from 'swiper';
import { AssetForPdf } from '../../models/asset-for-pdf.model';
import { SystemSide } from '../../models/system-side.model';
import { UserSelectionService } from '../../services/user-selection.service';


@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit, OnDestroy, AfterViewInit {

  swiper!: Swiper;
  swiper2!: Swiper;



  clothPatternsUrls!: ClothPatternsUrls | null;
  clothPatternsSubscription!: Subscription;
  currSide!: string;
  currEnvironmentId!: string;
  selectedPatternIndex: number = -1;
  currSideSelection!: Subscription;

  constructor(private environmentsService: EnvironmentsService, private userSelectionService: UserSelectionService) { }


  ngOnInit() {
    this.clothPatternsSubscription = this.environmentsService.currClothPatterns$.subscribe(currClothPatternsUrls=>{
      this.clothPatternsUrls = currClothPatternsUrls;

    })
    this.clothPatternsSubscription = this.environmentsService.currEnvironmentIdAndSide$.subscribe(environmentIdAndSide=>{
      this.currSide = environmentIdAndSide?.currSide as string;
      this.currEnvironmentId = environmentIdAndSide?.currEnvironmentId as string;
    })
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(".mySwiper", {
      modules: [Navigation, Thumbs],

      loop: true,
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
    });

    this.swiper2 = new Swiper(".mySwiper2", {
      modules: [Navigation, Thumbs],
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: this.swiper,
      },
    });
 }


  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

  onClothPatternLink(index: number){
    this.selectedPatternIndex = index;
  }

  onSave(){
    if(this.selectedPatternIndex === -1){
      return;
    }else{
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
  }

  ngOnDestroy(): void {
    this.clothPatternsSubscription?.unsubscribe()
  }

}
