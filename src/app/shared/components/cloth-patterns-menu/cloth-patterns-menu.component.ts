import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ClothPatternsUrls } from 'src/app/configurations/environments-and-types/models/cloth-patterns-url.model';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
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
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  swiper!: Swiper;
  swiper2!: Swiper;

  clothPatternsUrls!: ClothPatternsUrls | null;
  currEnvironment!: Environment;

  currSide!: string;
  currEnvironmentId!: string;
  selectedPatternIndex: number = 0;

  constructor(private environmentsService: EnvironmentsService, private userSelectionService: UserSelectionService) { }


  ngOnInit() {
    this.environmentsService.currClothPatterns$.pipe(takeUntil(this.destroyed$)).subscribe(currClothPatternsUrls=>{
      this.clothPatternsUrls = currClothPatternsUrls;
    })

    this.environmentsService.currEnvironmentIdAndSide$.pipe(takeUntil(this.destroyed$)).subscribe(environmentIdAndSide=>{
      this.currSide = environmentIdAndSide?.currSide as string;
      this.currEnvironmentId = environmentIdAndSide?.currEnvironmentId as string;
    })

    this.currEnvironment = this.environmentsService.getEnvironmentById(this.currEnvironmentId);



    this.userSelectionService.userCurrSelection$.pipe(takeUntil(this.destroyed$)).subscribe(currSelection=>{
      if(this.currSide === 'A'){
        if(currSelection!.sideA){
          if(this.currEnvironmentId === currSelection!.sideA.environmentId){
            this.selectedPatternIndex = currSelection!.sideA.clothPatternIndex;
          }
        }
      }

      if(this.currSide === 'B'){
        if(currSelection!.sideB){
          if(this.currEnvironmentId === currSelection!.sideB.environmentId){
            this.selectedPatternIndex = currSelection!.sideB.clothPatternIndex;
          }
        }
      }
    })

    this.onSave();
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
      loop: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      thumbs: {
        swiper: this.swiper,
      },
    });

    this.swiper2.on('activeIndexChange',(swiper) => {
      this.selectedPatternIndex = swiper.activeIndex;
    });

    this.swiper2.slideToLoop(this.selectedPatternIndex);
 }


  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

  onClothPatternLink(index: number){
    this.selectedPatternIndex = index;
  }

  onSaveBtn(){
    this.onSave();
    this.onClose();
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
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  this.destroyed$.unsubscribe();
  }

}
