import { Component, OnInit } from '@angular/core';
import { StartBtn } from 'src/app/shared/models/start-btn.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';


@Component({
  selector: 'app-welcome-txt',
  templateUrl: './welcome-txt.component.html',
  styleUrls: ['./welcome-txt.component.scss'],
})
export class WelcomeTxtComponent implements OnInit {
  imgs: string[] = 
  [
    '../../../assets/imgs/home/ulcans-5.jpg',
    '../../../assets/imgs/home/ulcans-4.jpg',
    '../../../assets/imgs/home/ulcans-3.jpg',
    '../../../assets/imgs/home/ulcans-2.jpg'];
  

  constructor(private menuCategoriesService: MenuCategoriesService) { }

  startBtn!: StartBtn;

  ngOnInit()
  {
    this.startBtn = this.menuCategoriesService.START_BTN;
  }

}
