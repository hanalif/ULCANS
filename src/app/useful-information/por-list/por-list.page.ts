import { Component, OnInit } from '@angular/core';
import { PORVariant } from 'src/app/configurations/environments-and-types/models/por-variant.model';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';

@Component({
  selector: 'app-por-list',
  templateUrl: './por-list.page.html',
  styleUrls: ['./por-list.page.scss'],
})
export class PorListPage implements OnInit {
  nsnsList: PORVariant[] = [];
  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.nsnsList = this.environmentsService.getPORListValue()
  }

}
