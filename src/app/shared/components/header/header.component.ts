import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Animations } from 'src/app/angular-animations/animations';
import { MenuCategory } from '../../models/menu-category.model';
import { StartBtn } from '../../models/start-btn.model';
import { MenuCategoriesService } from '../../services/menu-categories.service';
import { UserSelectionService } from '../../services/user-selection.service';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { appConfigBtnsMode } from '../../models/app-config-btns-mode.enum';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.slidesDownAnimation]

})
export class HeaderComponent implements OnInit, OnDestroy {
  menuCategories$!: Observable<MenuCategory[]>
  isDropdownMenuOpen: boolean = false;
  public openMenuLinksMaping: any = {};
  startBtn!: StartBtn;
  numsOfUserSelections$!: Observable<number>;
  progressBarSubscription!: Subscription;
  progressBar: number = 0;

  openMenuLinksMapingSubscription!: Subscription;

  showAppConfigBtns!: boolean;
  showOnlyHeaderAppConfigBtn!: boolean;
  showAppConfigBtnsSubscription!: Subscription;


  appConfigBtnsMode = appConfigBtnsMode;
  appConfigSettings!: AppConfirmationSelections;
  AppConfigSettings = AppConfirmationSelections;
  appConfigSubscriptions!: Subscription;


  constructor(
    private route: Router,
    private menuCategoriesServive: MenuCategoriesService,
    private userSelectionsService: UserSelectionService,
    private appConfigService: AppConfigurationService) { }


  ngOnInit() {
      this.appConfigSubscriptions = this.appConfigService.getCurrAppConfigSettings().subscribe(appConfig=>{
        this.appConfigSettings = appConfig;
      });
      this.showAppConfigBtnsSubscription = this.appConfigService.getShowAppConfigBtns().pipe(
        switchMap(showAppConfigBtns=>{
          this.showAppConfigBtns = showAppConfigBtns;
          return this.appConfigService.getShowOnlyHeaderConfigBtns()
        })
      ).subscribe((showOnlyHeader)=>{
        this.showOnlyHeaderAppConfigBtn = showOnlyHeader;
      })



      this.menuCategories$ = this.menuCategoriesServive.getMenuCategories();
      this.startBtn = this.menuCategoriesServive.START_BTN;
      this.numsOfUserSelections$ = this.userSelectionsService.getnumOfSelections();
      this.progressBarSubscription = this.userSelectionsService.getprogressBar().subscribe(progressBar=>{
        this.progressBar = progressBar;
      })

      this.openMenuLinksMapingSubscription = this.menuCategoriesServive.getOpenMenuLinksMaping().subscribe((maping)=>{
        this.openMenuLinksMaping = maping;
      });
  }

  onLogo(){
    this.route.navigate(['home']);
    this.isDropdownMenuOpen = false;
  }

  onHamburgerIcon(){
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen
  }



  onMenuLink(id: string){
    this.menuCategoriesServive.setOpenMenuLinkMaping(id);
  }

  onAccordionItemHeader(){
    this.isDropdownMenuOpen = false;
  }

  onReaderIcon(val:boolean){
    this.userSelectionsService.setIsUserSelectionsMenuOpen(val);
  }

  ngOnDestroy(): void {
   this.progressBarSubscription?.unsubscribe();
   this.openMenuLinksMapingSubscription.unsubscribe();
   this.showAppConfigBtnsSubscription.unsubscribe();
   this.appConfigSubscriptions.unsubscribe();
  }

}
