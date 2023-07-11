import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, ReplaySubject, Subscription, of, switchMap, takeUntil } from 'rxjs';
import { Environment } from 'src/app/configurations/environments-and-types/models/environment.model';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import Swiper, { Navigation, Thumbs } from 'swiper';
import { AssetForPdf } from '../../models/asset-for-pdf.model';
import { SystemSide } from '../../models/system-side.model';
import { UserSelectionService } from '../../services/user-selection.service';
import { ClothPattern } from 'src/app/configurations/environments-and-types/models/clothPattern.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  swiper!: Swiper;
  swiper2!: Swiper;

  clothPatterns!: ClothPattern[];
  currEnvironment!: Environment;

  currSide!: string;
  currEnvironmentId!: string;
  selectedPatternIndex: number = 0;

  isFromUserMenu: boolean = false;
  userSelectionToEditId: string | undefined;


  constructor(private environmentsService: EnvironmentsService, private userSelectionService: UserSelectionService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.environmentsService.currClothPatterns$.pipe(takeUntil(this.destroyed$)).subscribe(currClothPatterns=>{
      this.clothPatterns = currClothPatterns as ClothPattern[];
    })

    this.environmentsService.currEnvironmentIdAndSide$.pipe(takeUntil(this.destroyed$)).subscribe(environmentIdAndSide=>{
      this.currSide = environmentIdAndSide?.currSide as string;
      this.currEnvironmentId = environmentIdAndSide?.currEnvironmentId as string;
    })

    this.currEnvironment = this.environmentsService.getEnvironmentById(this.currEnvironmentId);

    this.route.queryParams.pipe(
      switchMap(params=>{
        console.log(params);
          this.isFromUserMenu = params['isFromUserSelectionsMenu'];
          if(this.isFromUserMenu){
            this.userSelectionToEditId = params['userSelectionToUpdateId'];
            if(this.userSelectionToEditId){
              return of(this.userSelectionService.getUserSelectionById(this.userSelectionToEditId))
            }
          }else{
            return this.userSelectionService.userCurrSelection$
          }

          return EMPTY;
      }),
      takeUntil(this.destroyed$)).subscribe(userSelection=>{
        if(this.currSide === 'A'){
          if(userSelection!.sideA){
            if(this.currEnvironmentId === userSelection!.sideA.environmentId){
              this.selectedPatternIndex = userSelection!.sideA.clothPatternIndex;
            }
          }
        }

        if(this.currSide === 'B'){
          if(userSelection!.sideB){
            if(this.currEnvironmentId === userSelection!.sideB.environmentId){
              this.selectedPatternIndex = userSelection!.sideB.clothPatternIndex;
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

      if(this.isFromUserMenu){
        if(this.userSelectionToEditId){
          this.userSelectionService.addAssetForPdf(userSelections, this.userSelectionToEditId);
        }
      }else{
        this.userSelectionService.updateCurrUserSelections(userSelections);
      }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
