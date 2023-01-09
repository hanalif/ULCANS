import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Animations } from './angular-animations/animations';
import { UserSelectionService } from './shared/services/user-selection.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [Animations.slidesFromLeft],
})
export class AppComponent implements OnInit {

  isUserSelectionsMenuOpen$!: Observable<boolean>;
  constructor(private animationCtrl: AnimationController, private userSelectionsService: UserSelectionService) {}


  ngOnInit(): void {
    this.isUserSelectionsMenuOpen$ = this.userSelectionsService.getIsUserSelectionsMenuOpen();
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


}
