import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Animations } from 'src/app/angular-animations/animations';
import { MenuCategory } from '../../models/menu-category.model';
import { StartBtn } from '../../models/start-btn.model';
import { MenuCategoriesService } from '../../services/menu-categories.service';
import { UserSelectionService } from '../../services/user-selection.service';

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


  constructor(
    private route: Router,
    private menuCategoriesServive: MenuCategoriesService,
    private userSelectionsService: UserSelectionService) { }


  ngOnInit() {
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
  }

}
