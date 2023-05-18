import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemInstructionsData } from 'src/app/models/system-instructions-data.model';
import { UsefulInformationDataService } from 'src/app/services/useful-information.service';

@Component({
  selector: 'app-equipment-description',
  templateUrl: './equipment-description.page.html',
  styleUrls: ['./equipment-description.page.scss'],
})
export class EquipmentDescriptionPage implements OnInit {
  equipmentDescriptionData$!: Observable<SystemInstructionsData[]>

  constructor(private usefulInformationService: UsefulInformationDataService) { }

  ngOnInit() {
    this.equipmentDescriptionData$ = this.usefulInformationService.getEquipmentDescriptionData();
  }

}
