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
  isDisabled!: boolean;
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
  tabIndex: number = 0;


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
        }
      }else{
          this.currUserSelection = this.userSelectionsService.getCurrUserSelectionValue() as UserSelections;
      }
    })

    this.isDiabled$ = this.userSelectionsService.getisDisabled().pipe(tap(isDisabled=> this.isDisabled = isDisabled));
  }

  tabItemClicked(tabIndex: number){
    this.userSelectionsService.setTabIndex(tabIndex);
    this.userSelectionsService.setProgressBar();
    this.tabIndex = tabIndex;
  }

  onBack(){
    this.router.navigate(['configurations/typical-configurations', this.currUserSelection.assetId])
  }

  onPORClick(index:number){
    this.selectedPorId = this.porSelectionsList[index].id;
    let userSelectios: Partial<UserSelections> = {
      porVariantSelectionId: this.selectedPorId
    }
    this.userSelectionsService.updateCurrUserSelections(userSelectios);
    this.userSelectionsService.setProgressBar();
  }


  onAddToYourSelections(){
    if(this.isDisabled){
      return;

    }else{
      if(this.isFromUserSelections){
        this.userSelectionsService.setIsUserSelectionsMenuOpen(true);

      }else{
        let userSelectios: Partial<UserSelections> = {
          initialIndexses: [0,1,2],
          patternsSelections: this.tabIndex
        }

        this.userSelectionsService.updateCurrUserSelections(userSelectios);
        this.userSelectionsService.addUserSelection();
      }

      this.router.navigate(['/configurations/typical-configurations']);
    }
  }

  ngOnDestroy(): void {
    this.isFromUserSelectionsSubscription?.unsubscribe();
    this.currAppEnvironmentSubscriptions?.unsubscribe();
  }

}
