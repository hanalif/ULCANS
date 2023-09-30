import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { UserSelections } from 'src/app/shared/models/user-selections.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { PORVariant } from './models/por-variant.model';
import { DisplayHeadersMode } from 'src/app/shared/components/tab/models/display-headers-mode';
import { EnvironmentsService } from './services/environments.service';
import { PatternsSelections } from 'src/app/shared/models/patterns-selections.enum';




@Component({
  selector: 'app-environments-and-types',
  templateUrl: './environments-and-types.page.html',
  styleUrls: ['./environments-and-types.page.scss'],
})
export class EnvironmentsAndTypesPage implements OnInit, OnDestroy {
  sides: string[] =['A','B']

  isDiabled$!: Observable<boolean>;
  isFromUserSelections: boolean = false;
  isFromUserSelectionsSubscription: Subscription | undefined;
  userSelectionToUpdateId: string | undefined;

  currUserSelection!:UserSelections;
  currAppEnvironment!: AppConfirmationSelections;
  currAppEnvironmentSubscriptions!: Subscription;
  appConfigSettings!: AppConfirmationSelections;
  AppConfigSettings = AppConfirmationSelections;
  tabDisplayMode!: DisplayHeadersMode;


  porSelectionsList!: PORVariant[];
  selectedPorId: string | undefined = undefined;
  tabIndex!: number;
  porIndexClicked: number = -1;


  constructor(
    private router: Router,
    private userSelectionsService: UserSelectionService,
    private route: ActivatedRoute,
    private appConfigService: AppConfigurationService,
    private environmnetsService: EnvironmentsService) { }



  ngOnInit() {
   this.currAppEnvironmentSubscriptions = this.appConfigService.getCurrAppConfigSettings().subscribe(currAppEnvironment=>{
    this.currAppEnvironment = currAppEnvironment;
   })


    this.appConfigService.getCurrAppConfigSettings().subscribe(appConfig=>{
      this.appConfigSettings = appConfig;
      this.tabDisplayMode = appConfig == AppConfirmationSelections.GLOBAL? DisplayHeadersMode.dontShowHeaders : DisplayHeadersMode.showHeders;
    });

    this.porSelectionsList = this.environmnetsService.getPORListValue();
    this.isFromUserSelectionsSubscription = this.route.queryParams.subscribe(params=>{
    this.isFromUserSelections = params['isFromUserSelectionsMenu'];

      if(this.isFromUserSelections){

        this.userSelectionToUpdateId = params['userSelectionToUpdateId'];
        if(this.userSelectionToUpdateId){
          this.currUserSelection = this.userSelectionsService.getUserSelectionById(this.userSelectionToUpdateId) as UserSelections;
          this.userSelectionsService.updateCurrUserSelections(this.currUserSelection);
          if(this.currUserSelection.porVariantSelectionId){
            this.porIndexClicked = this.porSelectionsList.findIndex(por=> por.id == this.currUserSelection.porVariantSelectionId);
            this.tabIndex = PatternsSelections.POR
          }else{
            this.tabIndex = PatternsSelections.custom
          }
        }
      }else{
          this.currUserSelection = this.userSelectionsService.getCurrUserSelectionValue() as UserSelections;
          this.tabIndex = PatternsSelections.custom;
      }

      let userSelectios: Partial<UserSelections> = {
        patternType: this.tabIndex
      }
      this.userSelectionsService.updateCurrUserSelections(userSelectios);

    })

    this.isDiabled$ = this.userSelectionsService.getisDisabled();

    this.isDiabled$.subscribe(isDisabled => {
      console.log(isDisabled);
    })
  }

  tabItemClicked(tabIndex: number){
    this.userSelectionsService.setTabIndex(tabIndex);
    this.tabIndex = tabIndex;
    let userSelectios: Partial<UserSelections> = {
      patternType: this.tabIndex
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios);

    this.userSelectionsService.updateDisabled();
    if(!this.userSelectionToUpdateId){
      this.userSelectionsService.setProgressBar();
    }
  }

  onBack(){
    this.router.navigate(['configurations/typical-configurations', this.currUserSelection.assetId])
  }

  onPORClick(index:number){
    this.porIndexClicked = index;

    this.selectedPorId = this.porSelectionsList[index].id;
    let userSelectios: Partial<UserSelections> = {
      porVariantSelectionId: this.selectedPorId
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios);

    this.userSelectionsService.updateDisabled();
    if(!this.isFromUserSelections){
      this.userSelectionsService.setProgressBar();
    }

  }


  onAddToYourSelections(){
    if(this.isFromUserSelections){
      let currUserSelections = this.userSelectionsService.getCurrUserSelectionValue();
      if((!currUserSelections?.sideA || !currUserSelections.sideB || !currUserSelections.systemTypeId || currUserSelections.patternType != PatternsSelections.custom) && (!currUserSelections?.porVariantSelectionId || currUserSelections.patternType != PatternsSelections.POR)){

        console.log('didt do right');
        return;
      }
      this.userSelectionsService.setIsUserSelectionsMenuOpen(true);
    }else{
      let userSelectios: Partial<UserSelections> = {
        initialIndexses: [0,1,2]
      }
      this.userSelectionsService.updateCurrUserSelections(userSelectios);
    }
    this.router.navigate(['/configurations/typical-configurations']);


    this.userSelectionsService.addUserSelection();
  }

  ngOnDestroy(): void {
    this.isFromUserSelectionsSubscription?.unsubscribe();
    this.currAppEnvironmentSubscriptions?.unsubscribe();
  }

}
