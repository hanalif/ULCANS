import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MenuCategory } from 'src/app/shared/models/menu-category.model';
import { MenuCategoriesService } from 'src/app/shared/services/menu-categories.service';

@Component({
  selector: 'app-camouflage-instructions-intro',
  templateUrl: './camouflage-instructions-intro.page.html',
  styleUrls: ['./camouflage-instructions-intro.page.scss'],
})
export class CamouflageInstructionsIntroPage implements OnInit {
  camouflageInstructionsCategoryData$!: Observable<MenuCategory | undefined>

  constructor(private menuCategoryService: MenuCategoriesService, private route: Router,) { }

  ngOnInit() {
    this.camouflageInstructionsCategoryData$ = this.menuCategoryService.getCategoryById('MC2');
  }


  onSubCategory(link:string){
    this.menuCategoryService.setOpenMenuLinkMaping('MC2');
    this.route.navigate([link]);
  }

}
