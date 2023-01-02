import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/angular-animations/animations';
import { MenuCategory } from '../../models/menu-category.model';
import { MenuCategoriesService } from '../../services/menu-categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.slidesDownAnimation]

})
export class HeaderComponent implements OnInit {
  menuCategories$!: Observable<MenuCategory[]>
  isDropdownMenuOpen: boolean = false;
  public openMenuLinksMaping: any = {};

  constructor(private route: Router, private menuCategoriesServive: MenuCategoriesService) { }

  ngOnInit() {
      this.menuCategories$ = this.menuCategoriesServive.getMenuCategories()
  }

  onLogo(){
    this.route.navigate(['home']);
    this.isDropdownMenuOpen = false;

  }

  onHamburgerIcon(){
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen
  }



  onMenuLink(id: string){
    for(let key in this.openMenuLinksMaping) {
      if(key !== id) {
        this.openMenuLinksMaping[key] = false;
      }
    }

    if(this.openMenuLinksMaping[id]){
      this.openMenuLinksMaping[id] = !this.openMenuLinksMaping[id];
    } else{
      this.openMenuLinksMaping[id] = true;
    }
  }

  onAccordionItemHeader(){
    this.isDropdownMenuOpen = false;
  }

}
