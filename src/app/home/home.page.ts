import { Component, OnInit } from '@angular/core';
import { StartBtn } from '../shared/models/start-btn.model';
import { MenuCategoriesService } from '../shared/services/menu-categories.service';
import { AppConfigurationService } from '../app-configurations/app-configurations.service';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { appConfigBtnsMode } from '../shared/models/app-config-btns-mode.enum';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  startBtn!: StartBtn;
  showAppConfigBtns$!: Observable<boolean>;
  showOnlyHeaderConfigBtns$!: Observable<boolean>;


  appConfigBtnsMode = appConfigBtnsMode;
  constructor(private menuCategoriesService: MenuCategoriesService, private appConfigService: AppConfigurationService) {}

  ngOnInit(): void {
    this.startBtn = this.menuCategoriesService.START_BTN;
    this.showAppConfigBtns$ = this.appConfigService.getShowAppConfigBtns();
    this.showOnlyHeaderConfigBtns$ = this.appConfigService.getShowOnlyHeaderConfigBtns();
  }

  get showHomPageAppConfigBtns$(){
    return combineLatest(
      [this.showAppConfigBtns$,
      this.showOnlyHeaderConfigBtns$],
      (one,two)=> one && !two);
  }



}
