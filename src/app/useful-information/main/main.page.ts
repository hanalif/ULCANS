import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuCategory } from 'src/app/shared/models/menu-category.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  usfulInformationCategoryData$!: Observable<MenuCategory | undefined>

  constructor(private menuCategoriesService: MenuCategoriesService, private route: Router) { }

  ngOnInit() {
    this.usfulInformationCategoryData$ = this.menuCategoriesService.getCategoryById('MC3');

  }

  onSubCategory(link:string){
    this.menuCategoriesService.setOpenMenuLinkMaping('MC3');
    this.route.navigate([link]);
  }

}
