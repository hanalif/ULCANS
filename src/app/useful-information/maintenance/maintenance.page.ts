import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemInstructionsData } from 'src/app/models/system-instructions-data.model';
import { UsefulInformationDataService } from 'src/app/services/useful-information.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  maintenanceData$!: Observable<SystemInstructionsData[]>

  constructor(private usefulInformationService: UsefulInformationDataService) { }

  ngOnInit() {
    this.maintenanceData$ = this.usefulInformationService.getMaintenanceData();
  }

}
