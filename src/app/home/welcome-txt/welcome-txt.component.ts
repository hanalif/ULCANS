import { Component, OnInit } from '@angular/core';
import { StartBtn } from 'src/app/shared/models/start-btn.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';


@Component({
  selector: 'app-welcome-txt',
  templateUrl: './welcome-txt.component.html',
  styleUrls: ['./welcome-txt.component.scss'],
})
export class WelcomeTxtComponent implements OnInit {

  constructor(private menuCategoriesService: MenuCategoriesService) { }

  startBtn!: StartBtn;

  ngOnInit()
  {
    this.startBtn = this.menuCategoriesService.START_BTN;
  }

}
