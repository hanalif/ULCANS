import { Component, OnInit } from '@angular/core';
import { StartBtn } from '../shared/models/start-btn.model';
import { MenuCategoriesService } from '../shared/services/menu-categories.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  startBtn!: StartBtn;

  constructor(private menuCategoriesService: MenuCategoriesService) {}

  ngOnInit(): void {
    this.startBtn = this.menuCategoriesService.START_BTN;
  }



}
