import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Animations } from './angular-animations/animations';
import { EnvironmentsService } from './configurations/environments-and-types/services/environments.service';
import { SystemTypesService } from './configurations/environments-and-types/services/system-types.service';
import { AssetsService } from './configurations/services/assets/assets.service';
import { ConfigurationsService } from './configurations/services/configurationsService/configurations.service';
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
  isClothPatternsMenuOpen$!: Observable<boolean>;

  constructor(
    private animationCtrl: AnimationController,
    private userSelectionsService: UserSelectionService,
    private configurationsService:ConfigurationsService,
    private assetsService: AssetsService,
    private environmetsService: EnvironmentsService,
    private systemTypesService: SystemTypesService
    ) {}


  ngOnInit(): void {
    this.isUserSelectionsMenuOpen$ = this.userSelectionsService.getIsUserSelectionsMenuOpen();
    this.isClothPatternsMenuOpen$ = this.environmetsService.getIsClothPatternMenuOpen();
    this.assetsService._getAssetesFromJson().pipe(takeUntil(this.destroyed$)).subscribe();
    this.configurationsService._getConfugurations().pipe(takeUntil(this.destroyed$)).subscribe();
    this.environmetsService._setEnvironments().pipe(takeUntil(this.destroyed$)).subscribe();
    this.systemTypesService._setUlcansTypes().pipe(takeUntil(this.destroyed$)).subscribe();

  }

  onBackdropClicked(val:boolean){
      this.userSelectionsService.setIsUserSelectionsMenuOpen(val);
      // this.environmetsService.setIsClothPatternsMenuOpen(val);
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
