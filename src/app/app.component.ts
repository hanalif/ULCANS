import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Animations } from './angular-animations/animations';
import { AssetsService } from './configurations/services/assets/assets.service';
import { ConfigurationsService } from './configurations/services/configurationsService/configurations.service';
import { MenuCategoriesService } from './shared/services/menu-categories.service';
import { UserSelectionService } from './shared/services/user-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [Animations.slidesFromLeft],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  isUserSelectionsMenuOpen$!: Observable<boolean>;

  constructor(
    private animationCtrl: AnimationController,
    private userSelectionsService: UserSelectionService,
    private configurationsService:ConfigurationsService,
    private assetsService: AssetsService,
    private menuCategoriesService: MenuCategoriesService
    ) {}


  ngOnInit(): void {
    this.isUserSelectionsMenuOpen$ = this.userSelectionsService.getIsUserSelectionsMenuOpen();
    this.assetsService._getAssetesFromJson().pipe(takeUntil(this.destroyed$)).subscribe();
    this.configurationsService._getConfugurations().pipe(takeUntil(this.destroyed$)).subscribe();
    this.menuCategoriesService._getEnviormentsCategories().pipe(takeUntil(this.destroyed$)).subscribe();


  }

  onBackdropClicked(val:boolean){
      this.userSelectionsService.setIsUserSelectionsMenuOpen(val);
  }

  myCustomPageTransition = ((baseEl: any, opts?: any) => {
    var anim1 = this.animationCtrl.create()
      .addElement(opts.leavingEl)
      .duration(1000)
      .iterations(1)
      .easing('ease-out')
      .fromTo('opacity', '1', '1')
    var anim2 = this.animationCtrl.create()
      .addElement(opts.enteringEl)
      .duration(1000)
      .iterations(1)
      .easing('ease-out')
      .fromTo('opacity', '1', '1')
     var anim2 = this.animationCtrl.create()
      .duration(1000)
      .iterations(1)
      .addAnimation([anim1, anim2]);
    return anim2;
});


ngOnDestroy(): void {
  this.destroyed$.next(true);
  this.destroyed$.unsubscribe();
}

}
