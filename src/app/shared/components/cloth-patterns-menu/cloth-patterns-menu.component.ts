import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';

@Component({
  selector: 'app-cloth-patterns-menu',
  templateUrl: './cloth-patterns-menu.component.html',
  styleUrls: ['./cloth-patterns-menu.component.scss'],
})
export class ClothPatternsMenuComponent implements OnInit {

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {}

  onClose(){
    this.environmentsService.setIsClothPatternsMenuOpen(false);
  }

}
